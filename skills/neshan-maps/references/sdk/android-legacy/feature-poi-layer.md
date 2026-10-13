---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/poi-layer/
title: لایه اطلاعات کسب و کار ها (POI Layer)
---

# مستندات فعال‌سازی لایه اطلاعات کسب و کارها (POI)

## نسخه 1.0.3

هدف از این بخش از پروژه بررسی نحوه فعال‌سازی و غیرفعال‌سازی لایه اطلاعات کسب و کارها و بررسی دو حالت نمایش روشن و تاریک در این لایه است.

## اعمال تغییرات در لی‌اوت **`activity_poi_layer.xml`**

در این صفحه، علاوه بر المان نقشه نشان، یک `ToggleButton` برای فعال‌ یا غیرفعال کردن لایه اطلاعات کسب و کارها وجود دارد. همچنین یک `ImageView` برای تغییر استایل نقشه و به طور همزمان تغییر استایل لایه اطلاعات کسب و کارها وجود دارد.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".activity.POILayer">

    <org.neshan.mapsdk.MapView
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/map"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"/>

    <ToggleButton
        android:checked="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="@color/toggle_button_text_color"
        android:textOff="لایه POI"
        android:textOn="لایه POI"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:drawableStart="@drawable/ic_poi_layer"
        android:drawableTint="@color/toggle_button_text_color"
        android:drawablePadding="8dp"
        android:background="@drawable/toggle_button_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        tools:targetApi="m"
        android:onClick="togglePOILayer"/>

    <android.support.v7.widget.CardView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:cardCornerRadius="4dp"
        app:cardElevation="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent">

        <ImageView
            android:id="@+id/theme_preview"
            android:layout_width="75dp"
            android:layout_height="75dp"
            android:scaleType="centerCrop"
            android:onClick="changeStyle"/>

    </android.support.v7.widget.CardView>

</android.support.constraint.ConstraintLayout>
```

## نمایش لایه

در فایل **`POILayer.java`** و یا فایل **`POILayer.kt`** مراحل زیر را انجام می‌دهیم.

متغیر`themePreview` جهت نمایش پیش‌نمایش حالت بعدی نقشه است و متغییر`isPOIEnable` برای نشان‌دادن این که لایه اطلاعات کسب و کارها فعال است یا خیر، استفاده می‌شود.

- java
- kotlin

```java
// map style control
private ImageView themePreview;
private boolean isPOIEnable = true;
```

متد `initLayoutRefrences` جهت مقداردهی اولیه کردن به تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است. به دلیل این که لازم است تا المان اندرویدی نقشه نشان ابتدا به طور کامل ایجاد شود و سپس با آن تعامل برقرار شود (متدهای مختلف بر روی المان نقشه اجرا شود)، تمامی متدهای مربوط به رابط کاربری باید در متد `onStart` انجام شوند.

- java
- kotlin

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // starting app in full screen
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_poi_layer);
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
    setContentView(R.layout.activity_poi_layer)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

پس از مقداردهی اولیه viewها و نقشه نشان، متد `validateThemePreview` صدا زده می‌شود. این متد پیش‌نمایش نقشه بعدی را در `themePreview` نشان می‌دهد و در صفحه تغییر استایل نقشه توضیح داده شده است.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
    // Initializing views
    initViews();
    // Initializing mapView element
    initMap();
    // Initializing theme preview
    validateThemePreview();
}
```

```kotlin
// We use findViewByID for every element in our layout file here
private fun initViews() {
    map = findViewById(R.id.mapview)
}
```

در متد `initMap` ابتدا موقعیت و بزرگنمایی نقشه به حالت دلخواه تنظیم می شود. سپس لایه اطلاعات کسب و کار ها با استفاده از متد `setPoiEnabled` فعال می گردد و در خط آخر هم استایل فعلی نقشه در متغیر `mapStyle` جهت استفاده های بعدی ذخیره می شود

- java
- kotlin

```java
// Initializing map
private void initMap(){
    // Setting map focal position to a fixed position and setting camera zoom
    map.moveCamera(new LatLng(35.767234, 51.330743),0 );
    map.setZoom(14,0);
    map.setPoiEnabled(true);
    mapStyle=map.getMapStyle();
}
```

```kotlin
// Initializing map
private void initMap(){
    // Setting map focal position to a fixed position and setting camera zoom
    map.moveCamera(new LatLng(35.767234, 51.330743),0 );
    map.setZoom(14,0);
    map.setPoiEnabled(true);
}
```

در این متد بررسی می‌شود که اگر `toggleButton` موجود در رابط کاربری در حالت انتخاب شده باشد، لایه اطلاعات کسب و کارها با استفاده از متد `setPoiEnabled` شیء `map` فعال می شود و در غیر اینصورت این لایه غیرفعال می شود.

- java
- kotlin

```java
public void togglePOILayer(View view) {
    ToggleButton toggleButton = (ToggleButton) view;
    isPOIEnable = !isPOIEnable;
    if (toggleButton.isChecked())
        map.setPoiEnabled(true);
    else
        map.setPoiEnabled(false);
}
```

```kotlin
fun togglePOILayer(view: View) {
    var toggleButton: ToggleButton = view as ToggleButton
    map.isPoiEnabled = toggleButton.isChecked
}
```

- java
- kotlin

```java
public void changeStyle(View view) {
    switch (mapStyle) {
        case NeshanMapStyle.STANDARD_DAY:
            mapStyle = NeshanMapStyle.NESHAN_NIGHT;
            break;
        case NeshanMapStyle.NESHAN_NIGHT:
            mapStyle = NeshanMapStyle.NESHAN;
            break;
        case NeshanMapStyle.NESHAN:
            mapStyle = NeshanMapStyle.STANDARD_DAY;
            break;
    }
    runOnUiThread(() -> validateThemePreview());
    map.setMapStyle(mapStyle);
}
```
