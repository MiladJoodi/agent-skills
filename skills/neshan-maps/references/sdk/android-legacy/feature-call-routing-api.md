---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/call-routing-api/
title: فراخوانی سرویس مسیریابی (Routing API)
---

# نسخه 1.0.3

هدف از این بخش از پروژه، مسیریابی بین دو نقطه از نقشه ، به وسیله سرویس مسیریابی نشان است. با استفاده از این سرویس ، بهترین مسیر جهت رفتن از نقطه مبدا به نقشه مقصد محاسبه می شود.

برای آشنایی سریع با وب سرویس مسیریابی نشان ، میتوانید از لینک زیر استفاده کنید

معرفی وب سرویس مسیریابی نشان

در این پروژه برای ارسال درخواست مسیریابی و دریافت نتیجه از SDK سرویس های نشان استفاده شده است که در ادامه با نحوه استفاده از آن آشنا می شویم.

اطلاع

1. ۱

   اولین قدم [ثبت‌نام و دریافت API KEY](https://platform.neshan.org/panel) برای اپلیکیشنی است که قصد دارید در آن از Map Api نشان استفاده کنید. کافیست در لینک فوق فرم مربوطه را تکمیل کنید تا بلافاصله API KEY را دریافت نمایید.
2. ۲

   Api Key دریافتی از پنل توسعه‌دهندگان نشان را به صورتی که در ادامه مشاهده می‌کنید از طریق کلید Api-Key در header درخواست سرویس بگنجانید.
3. ۳

   درخواست خود را با توجه به پارامترهایی که مربوط به سرویس موردنظرتان است با متد GET فراخوانی کنید.
4. ۴

   چنانچه درخواست شما با موفقیت پردازش و پاسخ داده شود، خروجی با فرمت JSON دریافت خواهید کرد و چنانچه به هر دلیل خطایی رخ دهد، کد خطا بصورت HTTP Status Code و نوع آن با فرمت JSON ارسال می‌گردد. کدهای خطای احتمالی نیز در ادامه به صورت کامل توضیح داده شده‌اند.

می توانید سورس پروژه SDK سرویس های نشان را در لینک زیر مشاهده کنید

[سورس کد پروژه SDK سرویس های نشان](https://github.com/NeshanMaps/android-neshan-services-sdk)

## دریافت مجوز دسترسی `androidManifest.xml`

دسترسی‌ زیر را برای استفاده از اینترنت به فایل مانیفست برنامه اضافه کنید:

```java
<uses-permission android:name="android.permission.INTERNET"/>
```

## اعمال تغییرات در لی‌اوت `activity_routing.xml`

در این صفحه علاوه بر المان نقشه ، دو `ToggleButton` برای فعالسازی نمایش مسیر دریافت شده از سرور بر روی نقشه وجود دارد و یک `Guideline` که جهت کمک به چیدمان این 2 کلید استفاده شده است. به این شکل که `Guideline` در وسط صفحه قرار گرفته و `ToggleButton`ها یکی در سمت چپ و یکی در سمت راست آن ها قرار می گیرند.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="org.neshan.sample.starter.activity.Routing">

    <org.neshan.mapsdk.MapView
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/map"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"/>

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintGuide_percent="0.5" />

    <ToggleButton
        android:id="@+id/overviewToggleButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        android:background="@drawable/toggle_button_bg"
        android:checked="false"
        android:drawablePadding="8dp"
        android:drawableTint="@color/toggle_button_text_color"
        android:elevation="8dp"
        android:onClick="findRoute"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:textColor="@color/toggle_button_text_color"
        android:textOff="رسم Overview"
        android:textOn="رسم Overview"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/guideline"
        app:layout_constraintStart_toStartOf="parent"
        tools:targetApi="m" />

    <ToggleButton
        android:id="@+id/stepByStepToggleButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        android:background="@drawable/toggle_button_bg"
        android:checked="false"
        android:drawablePadding="8dp"
        android:drawableTint="@color/toggle_button_text_color"
        android:elevation="8dp"
        android:onClick="findRoute"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:textColor="@color/toggle_button_text_color"
        android:textOff="رسم StepByStep"
        android:textOn="رسم StepByStep"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="@+id/guideline"
        tools:targetApi="m" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## فراخوانی سرویس

در فایل **`Routing.java`** و یا فایل **`Routing.kt`** مراحل زیر را انجام می‌دهیم.

متد `initLayoutRefrences` برای دادن مقادیر اولیه به تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است.

همچنین Listener مربوط به نقشه نیز در همین متد قرار دارد .

با افزودن `setOnMapLongClickListener` به نقشه پس از هر بار کلیک طولانی بر روی نقشه بررسی می شود که اگر تعداد نشانه های روی نقشه کمتر از 2 عدد است، یک نشانه جدید به قشه اضافه شود و اگر با افزودن نشانه جدید، تعداد نشانه ها 2 عدد شد، یعنی مبدا و مقصد تعیین شده و متد `neshanRoutingApi` جهت دریافت مسیر صدا زده می شود تا مسیریابی انجام شود.

- java
- kotlin

```java
// Initializing layout references (views, map and events)
private void initLayoutReferences() {
    // Initializing views
    initViews();
    // Initializing mapView element
    initMap();

    // when long clicked on map, a marker is added in clicked location
    map.setOnMapLongClickListener(latLng -> {
        if (markers.size() < 2) {
            markers.add(addMarker(latLng));
            if (markers.size() == 2) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        overviewToggleButton.setChecked(true);
                        neshanRoutingApi();
                    }
                });
            }
        } else {
            runOnUiThread(() -> Toast.makeText(Routing.this, "مسیریابی بین دو نقطه انجام میشود!", Toast.LENGTH_SHORT).show());
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

    // when long clicked on map, a marker is added in clicked location
    map.setOnMapLongClickListener {
        if (markers.size < 2) {
            markers.add(addMarker(it));
            if (markers.size == 2) {
                runOnUiThread {
                    overviewToggleButton.isChecked = true
                    neshanRoutingApi();
                }
            }
        } else {
            runOnUiThread {
                Toast.makeText(this@RoutingActivity,"مسیریابی بین دو نقطه انجام میشود!",Toast.LENGTH_SHORT).show()
            }
        }
    }

}
```

در متد `initViews` ارتباط بین `View`های فایل `activity_routing.xml` و اشیای مربوطه در جاوا برقرار شده است. همچین یک `OnCheckedChangeListener` تعریف و به هر دو `ToggleButton` اضافه می شود تا با فعال شدن هر کدام، کلید دیگر غیرفعال شود و در صورت نیاز، مسیر ترسیم شده بر روی نقشه که در متغیر `onMapPolyline` ذخیره شده، از روی نقشه حذف شود.

- java
- kotlin

```java
// We use findViewByID for every element in our layout file here
private void initViews() {
    map = findViewById(R.id.map);
    // CheckChangeListener for Toggle buttons
    CompoundButton.OnCheckedChangeListener changeChecker = new CompoundButton.OnCheckedChangeListener() {
        @Override
        public void onCheckedChanged(CompoundButton toggleButton, boolean isChecked) {
            // if any toggle button checked:
            if (isChecked) {
                // if overview toggle button checked other toggle button is uncheck
                if (toggleButton == overviewToggleButton) {
                    stepByStepToggleButton.setChecked(false);
                    overview = true;
                }
                if (toggleButton == stepByStepToggleButton) {
                    overviewToggleButton.setChecked(false);
                    overview = false;
                }
            }
            if (!isChecked && onMapPolyline!=null) {
                map.removePolyline(onMapPolyline);
            }
        }
    };

    // each toggle button has a checkChangeListener for uncheck other toggle button
    overviewToggleButton = findViewById(R.id.overviewToggleButton);
    overviewToggleButton.setOnCheckedChangeListener(changeChecker);

    stepByStepToggleButton = findViewById(R.id.stepByStepToggleButton);
    stepByStepToggleButton.setOnCheckedChangeListener(changeChecker);
}
```

```kotlin
// We use findViewByID for every element in our layout file here
private fun initViews() {
    map = findViewById(R.id.mapview)

    // CheckChangeListener for Toggle buttons
    val changeChecker = CompoundButton.OnCheckedChangeListener { toggleButton, isChecked -> // if any toggle button checked:
            if (isChecked) {
                // if overview toggle button checked other toggle button is uncheck
                if (toggleButton === overviewToggleButton) {
                    stepByStepToggleButton.isChecked = false
                    overview = true
                }
                if (toggleButton === stepByStepToggleButton) {
                    overviewToggleButton.isChecked = false
                    overview = false
                }
            }
            if (!isChecked && onMapPolyline != null) {
                map.removePolyline(onMapPolyline)
            }
        }

    // each toggle button has a checkChangeListener for uncheck other toggle button
    overviewToggleButton = findViewById(R.id.overviewToggleButton)
    overviewToggleButton.setOnCheckedChangeListener(changeChecker)

    stepByStepToggleButton = findViewById(R.id.stepByStepToggleButton)
    stepByStepToggleButton.setOnCheckedChangeListener(changeChecker)
}
```

قبل از بررسی متد `neshanRoutingApi`، یادآوری می کنیم که برای استفاده از سرویس های نشان به `API_KEY` مرتبط با سرویس مورد نظر خود نیاز دارید که میتوانید به صورت رایگان از پنل توسعه دهندگان نشان بدست آروید .

این متد بعد از تعیین دو نقطه مبدا و مقصد صدا زده می شود. ابتدا با کمک متد Builder از کلاس `NeshanDirection` مقادیر مورد نیاز مبدا، مقصد، کلید دسترسی و سایر پارامترهای ممکن ست شده و با صدا زدن متد build یک شی از نوع `NeshanDirection` ساخته شده می شود. اکنون با صدا زدن متد call این شیء ساخته شده میتوانیم درخواست مسیریابی را به سرور ارسال نماییم. ورودی این متد یک Callback است که با override کردن تابع `onResponse` و `onFailure` میتوان از نتیجه وب سرویس در آن مطلع شد.

سپس با استفاده از متد `Builder` از کلاس `NeshanSearch`، پارامترهای ورودی وب سرویس مقدار دهی می شود و شی از نوع `NeshanSearch` با صدا زدن متد `build` ساخته می شود. حال با صدا زدن متد `call` این شی می توانیم وب سرویس را صدا زده و نتیجه آن را در `Callback` که به عنوان ورودی متد `call` تعریف کرده ایم دریافت کنیم.

در صورت موفقیت آمیز بودن دریافت پاسخ از سرور، `onResponse` فراخوانی می شود و بدنه ( `body` ) پارامتر `response` که از نوع `NeshanDirectionResult` است شامل اطلاعات مسیرهای پیشنهادی خواهد بود. ( توضیحات اجزای پاسخ وب سرویس مسیریابی را می توانید در اینجا ببینید ) مسیرها در پاسخی که از سرور دریافت می شوند به شکل `encode` شده هستند که می توان با استفاده از متد `decode` از کلاس `PolylineEncoding` آن ها را به آرایه ای از نقاط تبدیل و در رسم روی نقشه استفاده کرد.

- java
- kotlin

```java
private void neshanRoutingApi() {
new NeshanDirection.Builder("YOUR_SERVICE_API_KEY", markers.get(0).getLatLng(), markers.get(1).getLatLng())
        .build().call(new Callback<NeshanDirectionResult>() {
    @Override
    public void onResponse(Call<NeshanDirectionResult> call, Response<NeshanDirectionResult> response) {

        // two type of routing
        Route route = response.body().getRoutes().get(0);
        routeOverviewPolylinePoints = new ArrayList<>(PolylineEncoding.decode(route.getOverviewPolyline().getEncodedPolyline()));
        decodedStepByStepPath = new ArrayList<>();

        // decoding each segment of steps and putting to an array
        for (DirectionStep step : route.getLegs().get(0).getDirectionSteps()) {
            decodedStepByStepPath.addAll(PolylineEncoding.decode(step.getEncodedPolyline()));
        }

        onMapPolyline = new Polyline(routeOverviewPolylinePoints, getLineStyle());
        //draw polyline between route points
        map.addPolyline(onMapPolyline);
        // focusing camera on first point of drawn line
        mapSetPosition(overview);
    }

    @Override
    public void onFailure(Call<NeshanDirectionResult> call, Throwable t) {

    }
});
```

```kotlin
// request routing method from Neshan Server
private fun neshanRoutingApi() {
    NeshanDirection.Builder(
        "service.VNlPhrWb3wYRzEYmstQh3GrAXyhyaN55AqUSRR3V",
        markers[0].latLng,
        markers[1].latLng
    )
        .build().call(object : Callback<NeshanDirectionResult?> {
            override fun onResponse(
                call: Call<NeshanDirectionResult?>,
                response: Response<NeshanDirectionResult?>
            ) {

                // two type of routing
                if (response.body() != null && response.body()!!.routes != null && !response.body()!!.routes.isEmpty()
                ) {
                    val route: Route = response.body()!!.routes[0]
                    routeOverviewPolylinePoints = java.util.ArrayList(
                        PolylineEncoding.decode(
                            route.overviewPolyline.encodedPolyline
                        )
                    )
                    decodedStepByStepPath = java.util.ArrayList()

                    // decoding each segment of steps and putting to an array
                    for (step in route.legs[0].directionSteps) {
                        decodedStepByStepPath!!.addAll(PolylineEncoding.decode(step.encodedPolyline))
                    }
                    onMapPolyline = Polyline(routeOverviewPolylinePoints, getLineStyle())
                    //draw polyline between route points
                    map.addPolyline(onMapPolyline)
                    // focusing camera on first point of drawn line
                    mapSetPosition(overview)
                } else {
                    Toast.makeText(this@RoutingActivity, "مسیری یافت نشد", Toast.LENGTH_LONG)
                        .show()
                }
            }
            override fun onFailure(call: Call<NeshanDirectionResult?>, t: Throwable) {}
        })
}
```
