---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/call-api-retrofit/
title: فراخوانی سرویس ها با Retrofit (Retrofit API Call)
---

# نسخه 1.0.3

با استفاده از REST API می‌توانیم از وب‌سرویس‌های ارائه شده توسط زیرساخت نقشه نشان استفاده کنیم. لیست این وب‌سرویس‌ها و ساختار درخواست و پاسخی که از سرور دریافت می‌شود در لینک زیر آمده است:

[وب‌سرویس‌های نشان](https://platform.neshan.org/api/)

برای استفاده از REST API در اندروید کتابخانه‌های مختلفی وجود دارد، که در این بخش، به معرفی و نحوه استفاده از آن برای دریافت آدرس یک موقعیت جغرافیایی توسط وب‌سرویس «تبدیل موقعیت به آدرس» خواهیم پرداخت.

توضیح نحوه استفاده از این وب‌سرویس را می‌توانید از اینجا مطالعه کنید.

اگر بخواهیم آدرس موقعیت جغرافیایی زیر را به دست آوریم:

```text
35.702918, 51.340880
```

درخواست ما باید از نوع GET و با آدرس زیر باشد:

```http
https://api.neshan.org/v4/reverse?lat=35.702918&lng=51.340880
```

پاسخ دریافت شده از سمت سرور:

```json
{
    "status": "OK",
    "neighbourhood": "طرشت",
    "municipality_zone": "2",
    "state": "استان تهران",
    "city": "تهران",
    "in_traffic_zone": false,
    "in_odd_even_zone": false,
    "route_name": "عزیزی",
    "route_type": "secondary",
    "place": null,
    "district": "بخش مرکزی شهرستان تهران",
    "formatted_address": "تهران، بزرگراه جناح، عزیزی، بین آزادی و سلطان محمدی",
    "village": null
}
```

در این پروژه می‌خواهیم آدرس نقطه‌ای که در وسط نقشه است و توسط ImageView مشخص میشود را از وب‌سرویس «تبدیل نقطه به آدرس» به دست آوریم و این آدرس را در بالای صفحه نمایش دهیم.

## اعمال تغییرات در لی‌اوت **`activity_api_retrofit.xml`**

در این فایل که رابط کاربری کلی این بخش از پروژه است، علاوه بر المان نقشه نشان، شامل این المان ها نیز می شود: یک `ImageView` که مشخص کننده وسط نقشه است. یک `TextView` جهت نمایش آدرس دریافت شده از سرور و یک `ProgressBar` که در زمان انتظار برای دریافت آدرس از سرور نمایش داده می شود.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.coordinatorlayout.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".activity.APIRetrofit">

    <org.neshan.mapsdk.MapView
        android:id="@+id/map"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:src="@drawable/ic_marker" />

    <androidx.cardview.widget.CardView
        android:id="@+id/cvAddressHolder"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginStart="24dp"
        android:layout_marginEnd="24dp"
        android:clickable="true"
        android:layout_alignParentBottom="true"
        android:layout_marginTop="32dp"
        android:focusable="true"
        android:paddingStart="16dp"
        android:paddingTop="8dp"
        android:paddingEnd="16dp"
        android:layout_gravity="top"
        android:paddingBottom="8dp"
        app:cardCornerRadius="16dp"
        app:cardElevation="8dp">

        <ProgressBar
            android:id="@+id/progressBar"
            android:layout_width="wrap_content"
            android:scaleY="0.5"
            android:scaleX="0.5"
            android:layout_gravity="center"
            style="@style/Widget.AppCompat.ProgressBar"
            android:layout_height="wrap_content"/>

        <TextView
            android:id="@+id/addressTitle"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_margin="16dp"
            android:includeFontPadding="false"
            android:textSize="16sp"
            android:gravity="right"
            android:ellipsize="end"
            android:textStyle="bold" />

    </androidx.cardview.widget.CardView>

</androidx.coordinatorlayout.widget.CoordinatorLayout>
```

## افزودن کتابخانه در `build.gradle (Module: app)`

برای استفاده از کتابخانه Retrofit دو خط زیر را به لیست وابستگی‌های پروژه در این فایل اضافه می‌کنیم.

```java
implementation 'com.squareup.retrofit2:retrofit:2.3.0'
implementation 'com.squareup.retrofit2:converter-gson:2.3.0'
```

## دریافت دسترسی `androidManifest.xml`

برای استفاده از وب‌سرویس‌ها، دسترسی اینترنت را به لیست دسترسی‌های اپلیکیشن خود در این فایل اضافه کنید:

```java
<uses-permission android:name="android.permission.INTERNET" />
```

## ساخت مدل قبل از فراخوانی

در فایل **`NeshanAddress.java`** و یا فایل **`NeshanAddress.kt`** مراحل زیر را انجام می‌دهیم.

در این مرحله، مدل داده پاسخ سرور را می‌سازیم. دو نوع پاسخ ممکن است از سمت سرور دریافت شود، یک نمونه آن – زمانی که وب‌سرویس به درستی می‌تواند آدرس موقعیت جغرافیایی مورد نظر را به دست آورد. حالت دیگری نیز وجود دارد که وب‌سرویس نمی‌تواند آدرس مناسبی برای محل مورد نظر ما پیدا کند. فرض کنید درخواست ما درخواست زیر باشد:

```text
https://api.neshan.org/v4/reverse?lat=34.359564&lng=53.966197
```

در این حالت پاسخ سرور به صورت زیر است:

```json
{
	"status": "ERROR",
	"code": 470,
	"message": "Invalid argument!"
}
```

برای این که هر دو حالت پاسخ‌های سرور را بتوانیم مدیریت کنیم، مدلی میسازیم که تمامی متغیرهای مربوط به هر دو پاسخ را داشته باشد.

در این کلاس، ابتدا تمامی متغیرهای مربوط به پاسخ در هر دو حالت تعریف شده است و سپس برای هر حالت یک متد سازنده تعریف شده است. تمامی متدهای `setter` و `getter` نیز تعریف شده اند.

- java
- kotlin

```java
package org.neshan.sample.starter.model;

import com.google.gson.annotations.SerializedName;

public class NeshanAddress {

    // when address is found
    @SerializedName("neighbourhood")
    private String neighbourhood;
    @SerializedName("address")
    private String address;
    @SerializedName("municipality_zone")
    private String municipality_zone;
    @SerializedName("in_traffic_zone")
    private Boolean in_traffic_zone;
    @SerializedName("in_odd_even_zone")
    private Boolean in_odd_even_zone;
    @SerializedName("city")
    private String city;
    @SerializedName("state")
    private String state;

    // when address is not found
    @SerializedName("status")
    private String status;
    @SerializedName("code")
    private Integer code;
    @SerializedName("message")
    private String message;

    public NeshanAddress(String neighbourhood, String address, String municipality_zone, Boolean in_traffic_zone, Boolean in_odd_even_zone, String city, String state) {
        this.neighbourhood = neighbourhood;
        this.address = address;
        this.municipality_zone = municipality_zone;
        this.in_traffic_zone = in_traffic_zone;
        this.in_odd_even_zone = in_odd_even_zone;
        this.city = city;
        this.state = state;
    }

    public NeshanAddress(String status, Integer code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public String getNeighbourhood() {
        return neighbourhood;
    }

    public void setNeighbourhood(String neighbourhood) {
        this.neighbourhood = neighbourhood;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMunicipality_zone() {
        return municipality_zone;
    }

    public void setMunicipality_zone(String municipality_zone) {
        this.municipality_zone = municipality_zone;
    }

    public Boolean getIn_traffic_zone() {
        return in_traffic_zone;
    }

    public void setIn_traffic_zone(Boolean in_traffic_zone) {
        this.in_traffic_zone = in_traffic_zone;
    }

    public Boolean getIn_odd_even_zone() {
        return in_odd_even_zone;
    }

    public void setIn_odd_even_zone(Boolean in_odd_even_zone) {
        this.in_odd_even_zone = in_odd_even_zone;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

```kotlin
package org.neshan.kotlinsample.model.address

import com.google.gson.annotations.SerializedName
import java.io.Serializable

class NeshanAddress : Serializable {
    // when address is found
    @SerializedName("neighbourhood")
    var neighbourhood: String? = null

    @SerializedName("formatted_address")
    var address: String? = null

    @SerializedName("municipality_zone")
    var municipality_zone: String? = null

    @SerializedName("in_traffic_zone")
    var in_traffic_zone: Boolean? = null

    @SerializedName("in_odd_even_zone")
    var in_odd_even_zone: Boolean? = null

    @SerializedName("city")
    var city: String? = null

    @SerializedName("state")
    var state: String? = null

    // when address is not found
    @SerializedName("status")
    var status: String? = null

    @SerializedName("code")
    var code: Int? = null

    @SerializedName("message")
    var message: String? = null

    constructor(
        neighbourhood: String?,
        address: String?,
        municipality_zone: String?,
        in_traffic_zone: Boolean?,
        in_odd_even_zone: Boolean?,
        city: String?,
        state: String?
    ) {
        this.neighbourhood = neighbourhood
        this.address = address
        this.municipality_zone = municipality_zone
        this.in_traffic_zone = in_traffic_zone
        this.in_odd_even_zone = in_odd_even_zone
        this.city = city
        this.state = state
    }

    constructor(status: String?, code: Int?, message: String?) {
        this.status = status
        this.code = code
        this.message = message
    }
}
```

## ساخت شی از `Retrofit.builder` برای آماده سازی درخواست

در فایل **`RetrofitClientInstance.java`** و یا فایل **`RetrofitClientInstance.kt`** مراحل زیر را انجام می‌دهیم.

برای انجام درخواست‌های تحت شبکه به یک REST API با استفاده از Retrofit، با استفاده از کلاس `Retrofit.Builder` یک شی از می‌سازیم و `BASE_URL` – که آدرس پایه وب‌سرویس است را به آن می‌دهیم.

- java
- kotlin

```java
package org.neshan.sample.starter.network;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitClientInstance {

    private static Retrofit retrofit;
    private static final String BASE_URL = "https://api.neshan.org/v1/";

    public static Retrofit getRetrofitInstance() {

        // adding the created certPinner to OkHttpClient
        OkHttpClient client = new OkHttpClient.Builder()
                .build();

        if (retrofit == null) {
            retrofit = new retrofit2.Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(client)
                    .build();
        }
        return retrofit;
    }
}
```

```kotlin
    package org.neshan.kotlinsample.network

    import retrofit2.Retrofit
    import okhttp3.OkHttpClient
    import retrofit2.converter.gson.GsonConverterFactory

    object RetrofitClientInstance {

        private const val BASE_URL = "https://api.neshan.org/"
        private var retrofit: Retrofit? = null

        val retrofitInstance: Retrofit?
            get() {
                val client = OkHttpClient.Builder()
                    .build()
                if (retrofit == null) {
                    retrofit = Retrofit.Builder()
                        .baseUrl(BASE_URL)
                        .addConverterFactory(GsonConverterFactory.create())
                        .client(client)
                        .build()
                }
                return retrofit
            }
    }
```

## تعریف `interface` درخواست

در فایل **`ReverseService.java`** و یا فایل **`ReverseService.kt`** مراحل زیر را انجام می‌دهیم.

نقاط پایانی (درخواست‌های مختلف به وب‌سرویس‌های مختلف نشان) را در این interface تعریف می‌کنیم.
در تعریف هر نقطه پایانی (Endpoint)، در خط اول کلید API خود را در سرآمد درخواست قرار داده‌ایم. در خط دوم مشخص کرده‌ایم که درخواست از نوع GET است. در خط سوم، نام متد، مقدار بازگشتی آن – که از نوع مدل داده‌ای است که در مراحل قبل ساختیم – و ورودی متد – که آدرس کامل درخواست ما است – را می‌دهیم.

- java
- kotlin

```java
package org.neshan.sample.starter.network;

import org.neshan.sample.starter.model.NeshanAddress;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Url;

public interface ReverseService {

    // TODO: replace "<YOUR_API_KEY>" with your api key
    @Headers("Api-Key: <YOUR_API_KEY>")
    @GET
    Call<NeshanAddress> getNeshanAddress(@Url String url);
}
```

```kotlin
    package org.neshan.kotlinsample.network

    import retrofit2.http.GET
    import org.neshan.kotlinsample.model.address.NeshanAddress
    import retrofit2.Call
    import retrofit2.http.Headers
    import retrofit2.http.Query

    interface ReverseService {
        // TODO: replace "YOUR_SERVICE_API_KEY" with your api key
        @Headers("Api-Key: YOUR_SERVICE_API_KEY")
        @GET("/v2/reverse")
        fun getReverse(@Query("lat") lat: Double?, @Query("lng") lng: Double?): Call<NeshanAddress?>?
    }
```

آدرس دریافت شده از یک موقعیت توسط وب سرویس، در متغیر `neshanAddress` ذخیره می‌شود.

در ادامه نیز المان‌های رابط کاربری تعریف شده است.

- java
- kotlin

```java
//ui elements in bottom sheet
private TextView addressTitle;
```

```kotlin
private lateinit var addressTitle: TextView
```

هنگامی که نقشه جابجا شود، ابتدا `progressBar` نمایش داده شده و سپس متد `getReverseApi` با استفاده از موقعیت فعلی نقشه صدا زده می شود که جلوتر این متد توضیح داده خواهد شد.

- java
- kotlin

```java
private void initMap() {
    // Setting map focal position to a fixed position and setting camera zoom
    map.moveCamera(new LatLng(35.767234,51.330743), 0);
    map.setZoom(14, 0);

    map.setOnCameraMoveFinishedListener(i -> {
        runOnUiThread(() -> progressBar.setVisibility(View.VISIBLE));
        getReverseApi(map.getCameraTargetPosition());
    });
}
```

```kotlin
// Initializing map
private fun initMap() {
    // Setting map focal position to a fixed position and setting camera zoom
    map.moveCamera(LatLng(35.767234, 51.330743), 0f)
    map.setZoom(14f, 0f)

    map.setOnCameraMoveFinishedListener { i: Int ->
        runOnUiThread { progressBar.visibility = View.VISIBLE }
        getReverseApi(map.cameraTargetPosition)
    }
}
```

در اینجا، علاوه بر دریافت المان نقشه، سایر المان‌های موجود در صفحه نیز دریافت می‌شود.

- java
- kotlin

```java
// We use findViewByID for every element in our layout file here
private void initViews(){
    map = findViewById(R.id.map);

    // UI elements in bottom sheet
    addressTitle = findViewById(R.id.title);
    progressBar = findViewById(R.id.progressBar);
}
```

```kotlin
// We use findViewByID for every element in our layout file here
private fun initViews() {
    map = findViewById(R.id.mapview)
    addressTitle = findViewById(R.id.addressTitle)
    progressBar = findViewById(R.id.progressBar)
}
```

برای اجرای یک درخواست، متدی که برای آن درخواست در `GetDataService` نوشته شده است صدا زده شده است و خروجی آن در متغیر `call` ذخیره می‌شود. برای بررسی پاسخ دریافتی از سرور، بر روی این متغیر متد `enqueue` صدا زده می‌شود. در متد `getReverseApi` متد `getReverse` از `getDataService` را فراخوانی کرده و متد `enqueue` را بر روی آن صدا میزنیم و یک `<Callback<NeshanAddress` جدید به عنوان ورودی به آن داده می‌شود و دو متد `onResponse` و `onFailure` در آن Override می‌شود.

در متد `onResponse` اطلاعات محله و آدرس در صورت وجود در `addressTitle` نمایش داده می‌شود و در غیر این صورت عبارت «معبر بی نام» نمایش داده خواهد شد. و درآخر `progressBar` مخفی خواهد شد.

- java
- kotlin

```java
private void getReverseApi(LatLng currentLocation) {
    getDataService.getReverse(currentLocation.getLatitude() , currentLocation.getLongitude()).enqueue(new Callback<NeshanAddress>() {
        @Override
        public void onResponse(Call<NeshanAddress> call, Response<NeshanAddress> response) {
            String address = response.body().getAddress();
            if (address != null && !address.isEmpty()) {
                addressTitle.setText(address);
            } else {
                addressTitle.setText("معبر بی‌نام");
            }
            progressBar.setVisibility(View.INVISIBLE);
        }

        @Override
        public void onFailure(Call<NeshanAddress> call, Throwable t) {
            addressTitle.setText("معبر بی‌نام");
            progressBar.setVisibility(View.INVISIBLE);
        }
    });
}
```

```kotlin
private fun getReverseApi(currentLocation: LatLng) {
    getDataService.getReverse(currentLocation.latitude,currentLocation.longitude).enqueue(object : Callback<NeshanAddress> {
        override fun onResponse(call: Call<NeshanAddress>, response: Response<NeshanAddress>) {
            val address: String? = response.body()!!.address
            if (address != null && !address.isEmpty()) {
                addressTitle.text = address
            } else {
                addressTitle.text = "معبر بی‌نام"
            }
            progressBar.visibility = View.INVISIBLE
        }

        override fun onFailure(call: Call<NeshanAddress>, t: Throwable) {
            addressTitle.text = "معبر بی‌نام"
            progressBar.visibility = View.INVISIBLE
        }
    })
}
```
