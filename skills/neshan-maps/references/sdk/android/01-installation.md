---
source: https://platform.neshan.org/docs/sdk/android/installation/
title: نصب Android SDK راهنمای نصب و راه‌اندازی
---

# مستندات کیت توسعه اندروید (Android SDK) نشان

این نسخه از کیت توسعه اندروید نشان، بر پایه‌ی **MapLibre** ساخته شده است. یعنی دقیقاً مثل یک پروژه‌ی استاندارد MapLibre Native با آن کار می‌کنید — همان کلاس‌ها، همان متدها، همان style JSON — و تنها تفاوت، افزودن یک کلید API است.

## پـیش نیازها

برای استفاده از `SDK` نقشه نشان ابتدا بایستی یک کلید API دریافت کنید:

اطلاع

از طریق لینک زیر در پنل توسعه‌دهندگان نشان به صورت **کاملاً رایگان** ثبت‌نام کنید و کلید API خود را دریافت کنید.

- [ثبت نام و دریافت کلید API](https://platform.neshan.org/panel)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

## راه‌اندازی اپلیکیشن

### ۱- افزودن dependency

از آنجایی که این SDK از طریق **Maven Central** منتشر شده است، نیازی به افزودن هیچ مخزن (repository) اختصاصی نیست. مخزن mavenCentral که معمولاً به صورت پیش‌فرض در پروژه‌های اندروید استودیو وجود دارد کافی است.

در فایل settings.gradle.kts (یا settings.gradle) پروژه، از وجود mavenCentral در بخش repositories مطمئن شوید:

```kotlin
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
```

سپس در build.gradle.kts ماژول (app module):

```kotlin
dependencies {
    // Neshan native map SDK
    implementation("org.neshan.maplibre:android-sdk-opengl:13.4.1")
}
```

### ۲- تـعریف دسترسی INTERNET برای اپلیکیشن

در فایل AndroidManifest.xml پروژه:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### ۳- افزودن کلید API در AndroidManifest.xml

تنها تنظیم اختصاصی این SDK، افزودن کلید API به صورت یک meta-data در تگ application است:

```xml
<application>
    <meta-data
        android:name="org.maplibre.android.API_KEY"
        android:value="YOUR_API_KEY" />
    ...
</application>
```

### ۴- تعریف layout اصلی نقشه

در `res/layout/activity_main.xml` و استفاده از المان استاندارد `org.maplibre.android.maps.MapView`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <org.maplibre.android.maps.MapView
        android:id="@+id/mapView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### ۵- مقداردهی اولیه نقشه در Activity

پیش از استفاده از MapView، باید یک‌بار `MapLibre.getInstance(context)` فراخوانی شود. همچنین تمامی رویدادهای چرخه‌حیات (lifecycle) اکتیویتی باید به MapView هم منتقل شوند تا رندرر به درستی مدیریت شود.

- kotlin
- java

```kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var mapView: MapView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        MapLibre.getInstance(this)
        setContentView(R.layout.activity_main)

        mapView = findViewById(R.id.mapView)
        mapView.onCreate(savedInstanceState)

        mapView.getMapAsync { map ->
            map.setStyle(Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/light.json"))
            map.cameraPosition = CameraPosition.Builder()
                .target(LatLng(35.6892, 51.3890)) // تهران
                .zoom(11.0)
                .build()
        }
    }

    override fun onStart() { super.onStart(); mapView.onStart() }
    override fun onResume() { super.onResume(); mapView.onResume() }
    override fun onPause() { mapView.onPause(); super.onPause() }
    override fun onStop() { mapView.onStop(); super.onStop() }
    override fun onLowMemory() { super.onLowMemory(); mapView.onLowMemory() }
    override fun onDestroy() { mapView.onDestroy(); super.onDestroy() }
    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        mapView.onSaveInstanceState(outState)
    }

}
```

```java
public class MainActivity extends AppCompatActivity {

    private MapView mapView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        MapLibre.getInstance(this);
        setContentView(R.layout.activity_main);

        mapView = findViewById(R.id.mapView);
        mapView.onCreate(savedInstanceState);

        mapView.getMapAsync(map -> {
            map.setStyle(new Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/light.json"));
            map.setCameraPosition(new CameraPosition.Builder()
                .target(new LatLng(35.6892, 51.3890)) // تهران
                .zoom(11.0)
                .build());
        });
    }

    @Override protected void onStart() { super.onStart(); mapView.onStart(); }
    @Override protected void onResume() { super.onResume(); mapView.onResume(); }
    @Override protected void onPause() { mapView.onPause(); super.onPause(); }
    @Override protected void onStop() { mapView.onStop(); super.onStop(); }
    @Override public void onLowMemory() { super.onLowMemory(); mapView.onLowMemory(); }
    @Override protected void onDestroy() { mapView.onDestroy(); super.onDestroy(); }
    @Override protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }
}
```

نکته

فراخوانی `mapView.onCreate(savedInstanceState)` و بقیه‌ی متدهای چرخه‌حیات دقیقاً همان چیزی است که در مستندات رسمی MapLibre Native هم آمده — هیچ متد اختصاصی دیگری برای راه‌اندازی نیاز نیست.

### ۶- تبــریک!

نقشه شما آماده است. برای انتخاب استایل‌های مختلف نقشه، صفحه‌ی تغییر استایل نقشه و برای افزودن نشانگر یا رسم خط، صفحات افزودن نشانگر و رسم خط را مطالعه کنید.
