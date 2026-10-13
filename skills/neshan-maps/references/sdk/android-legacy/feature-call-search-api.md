---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/call-search-api/
title: فراخوانی سرویس جست‌و‌جو (Search API)
---

# نسخه 1.0.3

هدف از این بخش از پروژه، جستجوی نام خیابان ها و مکان های ثبت شده بر روی نقشه ، به وسیله سرویس جستجوی مکان محور نشان است. با استفاده از این سرویس ، بهترین نتایج ممکن پیرامون یک نقطه مشخص بدست می آید.

برای آشنایی سریع با وب سرویس جستجوی مکان محور نشان ، میتوانید از لینک زیر استفاده کنید

وب سرویس جستجو

اطلاع

1. ۱

   اولین قدم [ثبت‌نام و دریافت API KEY](https://platform.neshan.org/panel) برای اپلیکیشنی است که قصد دارید در آن از Map Api نشان استفاده کنید. کافیست در لینک فوق فرم مربوطه را تکمیل کنید تا بلافاصله API KEY را دریافت نمایید.
2. ۲

   Api Key دریافتی از پنل توسعه‌دهندگان نشان را به صورتی که در ادامه مشاهده می‌کنید از طریق کلید Api-Key در header درخواست سرویس بگنجانید.
3. ۳

   درخواست خود را با توجه به پارامترهایی که مربوط به سرویس موردنظرتان است با متد GET فراخوانی کنید.
4. ۴

   چنانچه درخواست شما با موفقیت پردازش و پاسخ داده شود، خروجی با فرمت JSON دریافت خواهید کرد و چنانچه به هر دلیل خطایی رخ دهد، کد خطا بصورت HTTP Status Code و نوع آن با فرمت JSON ارسال می‌گردد. کدهای خطای احتمالی نیز در ادامه به صورت کامل توضیح داده شده‌اند.

برای جستجوی یک عبارت حول یک طول و عرض جغرافیایی مشخص ، فرمت درخواست ما باید به صورت زیر و از نوع Get باشد:

```http
https://api.neshan.org/v1/search?term=YOUR_SEARCH_TERM&lat=LATITUDE&lng=LONGITUDE
```

برای مثال جستجوی کلمه **آزادی** حول طول و عرض جغرافیایی 59.543695 , 36.327371 (**مشهد**) به این صورت می باشد:

```http
https://api.neshan.org/v1/search?term=آزادی&lat=36.327371&lng=59.543695
```

و پاسخ دریافت شده از سرور به صورت زیر می باشد:

```json
{
    "count": 30,
    "items": [
        {
            "title": "بزرگراه آزادی",
            "category": "municipal",
            "type": "trunk",
            "region": "مشهد، خراسان رضوی",
            "neighbourhood": "محله شهید فرامرز عباسی",
            "location": {
                "x": 59.54418939716518,
                "y": 36.328338876612705,
                "z": "NaN"
            }
        },
        // ... (سایر آیتم ها)
    ]
}
```

اینبار جستجوی کلمه **آزادی** ولی حول طول و عرض جغرافیایی 51.3355413 , 35.6999053 (**تهران**) به این صورت است:

```http
https://api.neshan.org/v1/search?term=آزادی&lat=35.6999053&lng=51.3355413
```

و پاسخ دریافت شده از سرور به صورت زیر می باشد:

```json
{
    "count": 30,
    "items": [
        {
            "title": "برج میدان آزادی",
            "address": "میدان آزادی",
            "category": "place",
            "type": "point_of_interest",
            "region": "تهران، استان تهران",
            "neighbourhood": "محله استاد معین",
            "location": {
                "x": 51.33806134577803,
                "y": 35.699739812739935,
                "z": "NaN"
            }
        },
        // ... (سایر آیتم ها)
    ]
}
```

حال که معنی عبارت جستجوی **مکان محور** کاملا مشخص شده است، به توضیح برنامه پرداخته می‌شود

## اضافه کردن وابستگی ها `build.gradle (Module.app)`:

```java
dependencies {
implementation 'neshan-android-sdk:services-sdk:1.0.1'
implementation 'neshan-android-sdk:common-sdk:0.0.2'
}
```

می توانید سورس پروژه SDK سرویس های نشان را در لینک زیر مشاهده کنید

[سورس کد پروژه SDK سرویس های نشان](https://github.com/NeshanMaps/android-neshan-services-sdk)

## دریافت دسترسی ها `androidManifest.xml`

دسترسی‌ زیر را برای استفاده از اینترنت به فایل مانیفست برنامه اضافه کنید:

```java
<uses-permission android:name="android.permission.INTERNET"/>
```

## اعمال تغییرات در لی‌اوت `activity_search.xml`

در این صفحه علاوه بر المان نقشه ، یک `EditText` برای نوشتن عبارت جستجو ، یک `RecyclerView` برای نمایش لیست نتایج جستجو و دو `ImageButton` وجود دارد که `ImageButton` با `id = show_markers_imageButton` برای نمایش نتایج جستجو بر روی نقشه به صورت مارکر استفاده میشود و `ImageButton` با `id = show_search_imageButton` برای نمایش نتایج جستجو در `RecyclerView` استفاده میشود .

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    tools:context=".activity.Search">

    <org.neshan.mapsdk.MapView
        android:id="@+id/map"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <EditText
        android:id="@+id/search_editText"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginLeft="6dp"
        android:layout_marginTop="3dp"
        android:layout_marginRight="6dp"
        android:background="@drawable/edit_text_search_bg"
        android:hint="جستجو"
        android:imeOptions="actionSearch"
        android:inputType="text"
        android:textSize="16dp" />

    <ImageButton
        android:id="@+id/show_markers_imageButton"
        android:layout_width="100dp"
        android:layout_height="50dp"
        android:layout_below="@id/search_editText"
        android:layout_marginTop="3dp"
        android:layout_marginRight="15dp"
        android:layout_toLeftOf="@+id/center_point"
        android:background="@drawable/toggle_button_on_bg"
        android:onClick="showMarkersClick"
        android:tint="#ffffff"
        app:srcCompat="@drawable/ic_marker_two" />

    <TextView
        android:id="@+id/center_point"
        android:layout_width="0dip"
        android:layout_height="wrap_content"
        android:layout_below="@id/search_editText"
        android:layout_centerHorizontal="true"
        android:text="" />

    <ImageButton
        android:id="@+id/show_search_imageButton"
        android:layout_width="100dp"
        android:layout_height="50dp"
        android:layout_below="@id/search_editText"
        android:layout_marginLeft="15dp"
        android:layout_marginTop="4dp"
        android:layout_marginBottom="4dp"
        android:layout_toRightOf="@+id/center_point"
        android:background="@drawable/toggle_button_on_bg"
        android:onClick="showSearchClick"
        android:tint="#ffffff"
        app:srcCompat="@drawable/ic_list_search" />

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/show_markers_imageButton" />
</RelativeLayout>
```

## فراخوانی سرویس

در فایل **`Search.java`** و یا فایل **`Search.kt`** مراحل زیر را انجام می‌دهیم.

متد `initLayoutRefrences` برای دادن مقادیر اولیه به تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است.

همچنین Listenerهای مربوط به `EditText` نیز در همین متد قرار دارد .

بعد از تغییر در متن `EditText` ، متد `afterTextChanged` فراخوانی میشود که در این متد ، متد `search` فراخوانی میشود تا درخواست جستجو ارسال و پاسخ آن دریافت شود.

با کلیک بر روی آیکون جستجوی کیبرد ، متد `onEditorAction` فراخوانی میشود که در این متد نیز متد `search` فراخوانی میشود .

- java
- kotlin

```java
// Initializing layout references (views, map and events)
private void initLayoutReferences() {
    // Initializing views
    initViews();
    // Initializing mapView elements
    initMap();

    //listen for search text change
    editText.addTextChangedListener(new TextWatcher() {
        @Override
        public void beforeTextChanged(CharSequence s, int start, int count, int after) {

        }

        @Override
        public void onTextChanged(CharSequence s, int start, int before, int count) {
        }

        @Override
        public void afterTextChanged(Editable s) {
            doSearch(s.toString());
        }
    });

     editText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
        @Override
        public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
            if (actionId == EditorInfo.IME_ACTION_SEARCH){
                closeKeyBoard();
                doSearch(editText.getText().toString());

            }
            return false;
        }
    });
}
```

```kotlin
// Initializing layout references (views, map and map events)
private fun initLayoutReferences() {
    // Initializing views
    initViews()
    // Initializing mapView element
    initMap()

    //listen for search text change
    editText.addTextChangedListener(object : TextWatcher {
        override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
        override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {}
        override fun afterTextChanged(s: Editable) {
            search(s.toString())
            Log.i(TAG, "afterTextChanged: $s")
        }
    })

    editText.setOnEditorActionListener(object :TextView.OnEditorActionListener{
        override fun onEditorAction(p0: TextView?, p1: Int, p2: KeyEvent?): Boolean {
            if(p1 == EditorInfo.IME_ACTION_SEARCH){
                closeKeyBoard()
                search(editText.text.toString())
            }
            return false
        }
    })
}
```

در متد `initViews` ارتباط بین `View`های فایل `activity_search.xml` و اشیای مربوطه در جاوا برقرار شده است.

- java
- kotlin

```java
// We use findViewByID for every element in our layout file here
private void initViews() {
    map = findViewById(R.id.map);
    editText = findViewById(R.id.search_editText);
    recyclerView = findViewById(R.id.recyclerView);
    items = new ArrayList<>();
    adapter = new SearchAdapter(items, this);
    recyclerView.setLayoutManager(new LinearLayoutManager(this));
    recyclerView.setAdapter(adapter);
}
```

```kotlin
// We use findViewByID for every element in our layout file here
private fun initViews() {
    map = findViewById(R.id.mapview)
    editText = findViewById(R.id.search_editText)
    recyclerView = findViewById(R.id.recyclerView)
    items = java.util.ArrayList()
    adapter = SearchAdapter(items, this@SearchActivity)
    recyclerView.layoutManager = LinearLayoutManager(this)
    recyclerView.adapter = adapter
}
```

در متد `initMap` یک موقعیت جغرافیایی ساخته می شود، سپس نقشه به این موقعیت منتقل شده و یک نشانگر نیز در این مکان اضافه می شود که نشان دهنده مکانی است که جستجو با محوریت آن انجام می شود.

- java
- kotlin

```java
private void initMap() {
    // Setting map focal position to a fixed position and setting camera zoom
    LatLng LatLng = new LatLng(35.767234, 51.330743);
    map.moveCamera(LatLng, 0);
    map.setZoom(14f, 0);
    centerMarker = new Marker(LatLng, getCenterMarkerStyle());
    map.addMarker(centerMarker);
}
```

```kotlin
private fun initMap() {
    // Setting map focal position to a fixed position and setting camera zoom
    val latLng = LatLng(35.767234, 51.330743)
    map.moveCamera(latLng, 0f)
    map.setZoom(14f, 0f)
    centerMarker = Marker(latLng, getCenterMarkerStyle())
    map.addMarker(centerMarker)
}
```

قبل از بررسی متد `search` که متد اصلی این اکتیویتی است ، به پکیج `model.search` نگاهی بیندازید . برای دریافت و تجزیه فایل `json` که به عنوان نتیجه جستجو برگردانده میشود ، به این کلاس ها که بر اساس همان پاسخ سرور است نیاز داریم .

هچنین به کلاس `RetrofitClientInstance` و اینترفیس `GetDataService` بروید و به متد `getNeshanSearch` که برای دریافت نتایج جستجو استفاده میشود نگاه کنید . برای استفاده از سرویس های نشان به `API_KEY` مرتبط با سرویس مورد نظر خود نیاز دارید که میتوانید به صورت رایگان از پنل توسعه دهندگان نشان بدست آروید .

اگر متوجه نشدید که این کلاس ها و اینترفیس چه کاری انجام میدهند هیچ جای نگرانی نیست ، به لینک های اوایل صفحه مراجعه کنید و با Retrofit و Gson آشنا شوید .

- java
- kotlin

```java
public interface ReverseService{

// TODO: replace "YOUR_SERVICE_API_KEY" with your api key
@Headers("Api-Key: YOUR_SERVICE_API_KEY")
@GET
Call<NeshanSearch> getNeshanSearch(@Url String url);
}
```

حالا به متد `search` نگاه بیندازید .

این متد بعد از هر بار تغییر در `EditText` در متد `afterTextChanged` فراخوانی میشود . طول و عرض جغرافیایی وسط صفحه ، به عنوان طول و عرض جغرافیایی مرجع انتخاب میشود و `centerMarker` در همین مکان نشان داده میشد تا مشخص شود جستجو پیرامون چه نقطه ای انجام شده است .

سپس با استفاده از متد Builder از کلاس NeshanSearch، پارامترهای ورودی وب سرویس مقدار دهی می شود و شی از نوع NeshanSearch با صدا زدن متد build ساخته می شود. حال با صدا زدن متد call این شی می توانیم وب سرویس را صدا زده و نتیجه آن را در Callback که به عنوان ورودی متد call تعریف کرده ایم دریافت کنیم.

در صورت موفقیت آمیز بودن دریافت پاسخ از سرور، onResponse فراخوانی می شود و بدنه ( body ) پارامتر response که از نوع NeshanSearchResult است شامل لیستی از کلاس `Item` خواهد بود. برای نمایش لیست نتایج در `RecyclerView` این لیست به متد `updateList` فرستاده میشود

- java
- kotlin

```java
private void search(String term) {
    LatLng searchPosition = map.getCameraTargetPosition();
    new NeshanSearch.Builder("service.PnRV9ocd8zm9QYYlJUNLJoAihE3hfy34WUZ6jcjr")
            .setLocation(searchPosition)
            .setTerm(term)
            .build()
            .call(new Callback<NeshanSearchResult>() {
        @Override
        public void onResponse(Call<NeshanSearchResult> call, Response<NeshanSearchResult> response) {
            NeshanSearchResult result = response.body();
            items=result.getItems();
            adapter.updateList(items);
            updateCenterMarker(searchPosition);
        }

        @Override
        public void onFailure(Call<NeshanSearchResult> call, Throwable t) {
            Log.i(TAG, "onFailure: " + t.getMessage());
            Toast.makeText(Search.this, "ارتباط برقرار نشد!", Toast.LENGTH_SHORT).show();
        }
    });

}
```

```kotlin
private fun search(term: String) {
    val searchPosition: LatLng = map.getCameraTargetPosition()
    updateCenterMarker(searchPosition)
    NeshanSearch.Builder("YOUR_SERVICE_API_KEY")
        .setLocation(searchPosition)
        .setTerm(term)
        .build().call(object : Callback<NeshanSearchResult?> {
            override fun onResponse(
                call: Call<NeshanSearchResult?>,
                response: Response<NeshanSearchResult?>
            ) {
                if (response.code() == 403) {
                    Toast.makeText(
                        this@SearchActivity,
                        "کلید دسترسی نامعتبر",
                        Toast.LENGTH_LONG
                    ).show()
                    return
                }
                if (response.body() != null) {
                    val result = response.body()
                    items = result!!.items
                    adapter.updateList(items)
                }
            }

            override fun onFailure(call: Call<NeshanSearchResult?>, t: Throwable) {
                Log.i(TAG, "onFailure: " + t.message)
                Toast.makeText(this@SearchActivity, "ارتباط برقرار نشد!", Toast.LENGTH_SHORT)
                    .show()
            }
        })
}
```

با کلیک بر روی `ImageButton` با `id = show_markers_imageButton` متد `showMarkersClick` فراخوانی میشود . در این متد ، مکان های یافت شده به وسیله مارکرها بر روی نقشه نمایش داده میشوند و بعد از آن به وسیله متد `moveToCameraBounds` میزان نمایش نقشه ، بر اساس محدوده مارکرهای روی نقشه تنظیم میشود .

متد `moveToCameraBounds` به آبجکت از کلاس `LatLngBounds` نیاز دارد که مقادیر مینیمم طول و عرض جغرافیایی و ماکسیمم طول و عرض جغرافیایی را که میخواهیم به عنوان محدوده نمایش نقشه در در نظر بگیریم به constructor کلاس `Bound` میدهیم .

- java
- kotlin

```java
public void showMarkersClick(View view) {
    adapter.updateList(new ArrayList<Item>());
    closeKeyBoard();
    clearMarkers();
    double minLat = Double.MAX_VALUE;
    double minLng = Double.MAX_VALUE;
    double maxLat = Double.MIN_VALUE;
    double maxLng = Double.MIN_VALUE;
    for (Item item : items) {
        Location location = item.getLocation();
        LatLng latLng = location.getLatLng();
        markers.add(addMarker(latLng, 15f));
        minLat = Math.min(latLng.getLatitude(), minLat);
        minLng = Math.min(latLng.getLongitude(), minLng);
        maxLat = Math.max(latLng.getLatitude(), maxLat);
        maxLng = Math.max(latLng.getLongitude(), maxLng);
    }

    if (items.size() > 0) {
        map.moveToCameraBounds(new LatLngBounds(new LatLng(minLat,minLng ), new LatLng(maxLat, maxLng)),
                new ScreenBounds(new ScreenPos(0, 0), new ScreenPos(map.getWidth(), map.getHeight())),
                true, 0.5f);
    }

}

private void clearMarkers() {
    map.clearMarkers();
    markers.clear();
}
```

```kotlin
fun showMarkersClick(view: View) {
    adapter.updateList(java.util.ArrayList())
    closeKeyBoard()
    clearMarkers()
    var minLat = Double.MAX_VALUE
    var minLng = Double.MAX_VALUE
    var maxLat = Double.MIN_VALUE
    var maxLng = Double.MIN_VALUE
    for (item in items) {
        val location = item.location
        val latLng = location.latLng
        markers.add(addMarker(latLng, 15f)!!)
        minLat = Math.min(latLng.latitude, minLat)
        minLng = Math.min(latLng.longitude, minLng)
        maxLat = Math.max(latLng.latitude, maxLat)
        maxLng = Math.max(latLng.longitude, maxLng)
    }
    if (items.isNotEmpty()) {
        map.moveToCameraBounds(
            LatLngBounds(LatLng(minLat, minLng), LatLng(maxLat, maxLng)),
            ScreenBounds(
                ScreenPos(0f, 0f),
                ScreenPos(map.width.toFloat(), map.height.toFloat())
            ),
            true, 0.5f
        )
    }
}

private fun clearMarkers() {
    for (marker in markers) {
        map.removeMarker(marker)
    }
    markers.clear()
}
```

با کلیک بر روی `ImageButton` با `id = show_search_imageButton` متد `showSearchClick` فراخوانی میشود و دوباره `RecyclerView` نمایش داده میشود .

- java
- kotlin

```java
public void showSearchClick(View view) {
    closeKeyBoard();
    adapter.updateList(items);
    markerLayer.clear();
}
```

```kotlin
fun showSearchClick(view: View?) {
    closeKeyBoard()
    adapter!!.updateList(items!!)
    clearMarkers()
}
```

با کلیک بر روی هر یک از آیتم های `RecyclerView` متد `onSearchItemClick` فراخوانی میشود و مکان آیتم کلیک شده بر روی نقشه نمایش داده میشود . به کلاس `SearchAdapter` و فایل `item_search.xml` مراجعه کنید .

- java
- kotlin

```java
@Override
public void onSeachItemClick(LngLat lngLat) {
    closeKeyBoard();
    clearMarkers();
    adapter.updateList(new ArrayList<Item>());
    map.moveCamera(LatLng, 0);
    map.setZoom(16f, 0);
    addMarker(LatLng, 30f);
}
```

```kotlin
override fun onSearchItemClick(LatLng: LatLng?) {
    closeKeyBoard()
    clearMarkers()
    adapter.updateList(java.util.ArrayList())
    map.moveCamera(LatLng, 0f)
    map.setZoom(16f, 0f)
    addMarker(LatLng!!, 30f)
}
```
