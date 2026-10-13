---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/static-map/
title: نقشه استاتیک (Static Map)
---

# نسخه 1.0.3

هدف از این بخش از پروژه استفاده از نقشه به صورت استاتیک است. نقشه استاتیک نقشه ای است که کاربر نمیتواند هیچ تعاملی با آن داشته باشد و صرفا برای نمایش اطلاعاتی خاص یا بخش خاصی از نقشه است.

## اعمال تغییرات در لی‌اوت `activity_static_map.xml`

در این صفحه، علاوه بر المان نقشه نشان، یک `ToggleButton` برای فعال‌ یا غیرفعال کردن نقشه استاتیک وجود دارد.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".StaticMap">

    <org.neshan.mapsdk.MapView
        android:id="@+id/map"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <ToggleButton
        android:checked="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="@color/toggle_button_text_color"
        android:textOff="نقشه استاتیک"
        android:textOn="نقشه استاتیک"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:background="@drawable/toggle_button_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        tools:targetApi="m"
        android:onClick="toggleStaticMap"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

## نمایش نقشه استاتیک

در فایل `StaticMap.java` و یا فایل `StaticMap.kt` مراحل زیر را انجام می‌دهیم.

متد `initLayoutRefrences` جهت مقداردهی اولیه تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است. به دلیل این که لازم است تا المان اندرویدی نقشه نشان ابتدا به طور کامل ایجاد شود و سپس با آن تعامل برقرار شود (متدهای مختلف بر روی المان نقشه اجرا شود)، تمامی متدهای مربوط به رابط کاربری باید در متد `onStart` انجام شوند.

- java
- kotlin

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_static_map);
}

@Override
protected void onStart() {
    super.onStart();

    // everything related to ui is initialized here
    initLayoutReferences();
}
```

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_static_map)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

پس از مقداردهی اولیه **view**ها با کلیک بر روی دکمه "نقشه استاتیک" که یک دکمه **toggle** است. نقشه به صورت استاتیک و عادی توسط متد **setStaticMap** که روی شی نقشه صدا زده میشود تغییر میکند.

متغیر **isStaticMapEnabled** متغیری است که وضعیت کنونی نقشه را که آیا در حالت استاتیک هست یا خیر نمایش میدهد. در صورتی که نقشه در حالت استاتیک باشد مقدار **true** و در غیر اینصورت مقدار **false** را برمیگرداند.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
    // Initializing views
    initViews();
}

// We use findViewByID for every element in our layout file here
private void initViews() {
    map = findViewById(R.id.map);
}

public void toggleStaticMap(View view) {
    map.setStaticMap(!map.isStaticMapEnabled);
}
```

```kotlin
    // Initializing layout references (views, map and map events)
    private fun initLayoutReferences() {
        // Initializing views
        initViews()
    }

    // We use findViewByID for every element in our layout file here
    private fun initViews() {
        map = findViewById(R.id.map)
    }

    private fun toggleStaticMap(view: View?) {
        map.setStaticMap(!map.isStaticMapEnabled)
    }
```
