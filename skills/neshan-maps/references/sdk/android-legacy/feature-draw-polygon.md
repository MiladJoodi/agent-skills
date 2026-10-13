---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-sdk-draw-polygon/
title: رسم چند ضلعی (Draw Polygon)
---

# نسخه 1.0.3

هدف این بخش از پروژه، رسم یک چندضلعی بر روی نقشه است. مانند بخش‌های قبل، بخش‌هایی که در کدهای قبلی نیز موجود است دوباره توضیح داده نشده است.

## اعمال تغییرات در لی‌اوت `activity_draw_polygon.xml`

یک دکمه به این صفحه اضافه شده است که در صورت فشار داده شدن، متد `drawPolygon` صدا زده می‌شود و یک چندضلعی از پیش تعریف شده بر روی نقشه نمایش داده می‌شود.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.DrawPolygon">

    <org.neshan.mapsdk.MapView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"/>

    <Button
        android:onClick="drawPolygon"
        android:id="@+id/draw_polygon"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:text="رسم چندضلعی"
        android:textColor="#ffffff"
        android:elevation="8dp"
        android:background="@drawable/toggle_button_on_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        tools:targetApi="m" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## افزودن چندضلعی

در فایل `DrawPolygon.java` و یا فایل `DrawPolygon.kt` مراحل زیر را انجام می‌دهیم.

متد `initLayoutRefrences` جهت مقداردهی اولیه به تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است. به دلیل این که لازم است تا المان اندرویدی نقشه نشان ابتدا به طور کامل ایجاد شود و سپس با آن تعامل برقرار شود (متدهای مختلف بر روی المان نقشه اجرا شود)، تمامی متدهای مربوط به رابط کاربری باید در متد `onStart` انجام شوند.

- java
- kotlin

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // starting app in full screen
    requestWindowFeature(Window.FEATURE_NO_TITLE);
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
    setContentView(R.layout.activity_draw_polygon);
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
    setContentView(R.layout.activity_draw_polygon)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

متد `drawPolygon` یک چندضلعی از پیش تعریف شده را بر روی نقشه نمایش می‌دهد.

به این منظور ابتدا اگر متغیر `polygon` از قبل حاوی شی باشد ( null نباشد )، آن شکل را با استفاده از متد `removePolygon` از روی نقشه حذف میکند. سپس یک `<ArrayList<LatLng` – که لیستی از نقاط جغرافیایی است – ساخته می‌شود و چهار نقطه‌ (راس‌های چندضلعی) به این لیست اضافه می‌شود.

با استفاده از لیست نقاط ساخته شده و استایلی که از متد `getPolygonStyle` ( که در ادامه توضیح داده خواهد شد) گرفته می شود یک چندضلعی یا `Polylgon` ساخته می‌شود.

چندضلعی ساخته شده با استفاده از متد `addPolygon` به `map` اضافه می‌شود که با این کار، چندضلعی بر روی نقشه نشان داده خواهد شد.

در نهایت دوربین بر روی اولین نقطه چندضلعی متمرکز می شود. بزرگنمایی دوربین برابر با ۱۴ است.

- java
- kotlin

```java
public void drawPolygon(View view){
    //remove polyline from map if exist
    if(polygon!=null){
        map.removePolygon(polygon);
    }
    // Adding some LatLng points to a latLngs
    ArrayList<LatLng> latLngs = new ArrayList<>();
    latLngs.add(new LatLng(35.762294,51.325525));
    latLngs.add(new LatLng(35.756548,51.323768));
    latLngs.add(new LatLng(35.755394,51.328617));
    latLngs.add(new LatLng(35.760905,51.330666));
    // Creating a polygon from list of latlngs. here we use getPolygonStyle() method to define polygon styles
    polygon = new Polygon(latLngs, getPolygonStyle());
    // adding the created polygon on map
    map.addPolygon(polygon);
    // focusing camera on first point of drawn polygon
    map.moveCamera(new LatLng(35.762294,51.325525),0.25f );
    map.setZoom(14,0);
}
```

```kotlin
fun drawPolygon(view: View) {
    var toggleButton = view as ToggleButton
    if (toggleButton.isChecked) {
        var latLngs = ArrayList<LatLng>()
        latLngs.add(LatLng(35.762294, 51.325525))
        latLngs.add(LatLng(35.756548, 51.323768))
        latLngs.add(LatLng(35.755394, 51.328617))
        latLngs.add(LatLng(35.760905, 51.330666))

        polygon = Polygon(latLngs, getPolygonStyle())

        map.addPolygon(polygon)

        map.moveCamera(LatLng(35.762294, 51.325525), .5f)
    } else {
        if (polygon != null) {
            map.removePolygon(polygon)
        }
    }
}
```

متد `getPolygonStyle` استایل مورد نیاز برای چندضلعی‌هایی که قرار است رسم شوند را برمی‌گرداند. برای ایجاد **style** برای چندضلعی‌ها، ابتدا یک شی از کلاس `PolygonStyleBuilder` ساخته می‌شود. ویژگی‌های چندضلعی بر روی این شی **set** می‌شوند. در این‌جا تنها ویژگی، **style** خطوط تشکیل دهنده یک چند ضلعی است که با استفاده از متد `getLineStyle` به دست می‌‌آیند. این متد در بخش رسم خط توضیح داده شده است.

- java
- kotlin

```java
private PolygonStyle getPolygonStyle(){
    PolygonStyleBuilder polygonStCr = new PolygonStyleBuilder();
    polygonStCr.setLineStyle(getLineStyle());
    return polygonStCr.buildStyle();
}
```

```kotlin
private fun getPolygonStyle(): PolygonStyle {
    var polygonStyleBuilder = PolygonStyleBuilder()
    polygonStyleBuilder.lineStyle = getLineStyle()
    polygonStyleBuilder.color = Color(2, 130, 189, 190)
    return polygonStyleBuilder.buildStyle()
}
```

## حذف چند ضلعی

جهت حذف چندضلعی رسم شده روی نقشه میتوانید از متد **removePolygon** استفاده نمایید.

- java
- kotlin

```java
map.removePolygon(polygon);
```

```kotlin
map.removePolygon(polygon)
```
