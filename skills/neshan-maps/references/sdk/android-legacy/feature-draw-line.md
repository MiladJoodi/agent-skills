---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-sdk-draw-line/
title: رسم خط (Draw line)
---

# نسخه 1.0.3

در این بخش از پروژه، هدف رسم یک خط بر روی نقشه است.
بخش‌هایی از این قسمت از پروژه که در قسمت‌های قبلی نیز بوده‌است، توضیح مجدد داده نخواهد شد. در صورت نیاز به صفحات قبلی مراجعه کنید.

## اعمال تغییرات در لی‌اوت `activity_draw_line.xml`

تنها المان اضافه شده، یک `Button` است که در صورت کلیک بر روی آن، متد `drawLine` صدا زده می شود و خطی بر روی نقشه رسم می‌شود.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.DrawLine">

    <org.neshan.mapsdk.MapView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"/>

    <Button
        android:id="@+id/draw_line"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="رسم خط"
        android:textColor="#ffffff"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:background="@drawable/toggle_button_on_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:onClick="drawLine"
        tools:targetApi="m" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## افزودن خط

در فایل `DrawLine.java` و یا فایل `DrawLine.kt` مراحل زیر را انجام می‌دهیم.

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
    setContentView(R.layout.activity_draw_line);
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
    setContentView(R.layout.activity_draw_polyline)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

متد `drawLine` خطی را بر روی نقشه رسم می‌کند.

برای این منظور ابتدا یک `<ArrayList<LatLng`– که لیستی از نقاط جغرافیایی است – ساخته می‌شود و سپس نقاط مشخص کننده راس های خط به این لیست اضافه می‌شود.

با استفاده از لیست نقاط و استایل خط گرفته شده از متد `getLineStyle` ( که در ادامه توضیح داده خواهد شد ) یک `PolyLine` ساخته می‌شود. شی `Polyline` شامل مجموعه ای از رئوس و یک استایل است که تعریف کننده یک خط هستند.

شی ساخته شده با متد `addPolyline` به `map` اضافه می‌شود. با این کار، خط مورد نظر بر روی نقشه نمایش داده خواهد شد.

در نهایت دوربین بر روی نقطه ابتدای خط متمرکز می شود. بزرگنمایی دوربین برابر با ۱۴ است.

- java
- kotlin

```java
// Drawing line on map
public Polyline drawLine(View view){
    // Adding some LatLng points to a latLngs
    ArrayList<LatLng> latLngs = new ArrayList<>();
    latLngs.add(new LatLng(35.769368,51.327650));
    latLngs.add(new LatLng(35.756670,51.323889));
    latLngs.add(new LatLng(35.746670,51.383889));
    // Creating a line from LineGeom. here we use getLineStyle() method to define line styles
    Polyline polyline = new Polyline(latLngs, getLineStyle());
    // adding the created line to lineLayer, showing it on map
    map.addPolyline(polyline);
    // focusing camera on first point of drawn line
    map.moveCamera(new LatLng(35.769368,51.327650),0.25f );
    map.setZoom(14,0);
    return polyline;
}
```

```kotlin
// Drawing line on map
public Polyline drawLine(View view){
    // Adding some LatLng points to a latLngs
    ArrayList<LatLng> latLngs = new ArrayList<>();
    latLngs.add(new LatLng(35.769368,51.327650));
    latLngs.add(new LatLng(35.756670,51.323889));
    latLngs.add(new LatLng(35.746670,51.383889));
    // Creating a line from LineGeom. here we use getLineStyle() method to define line styles
    Polyline polyline = new Polyline(latLngs, getLineStyle());
    // adding the created line to lineLayer, showing it on map
    map.addPolyline(polyline);
    // focusing camera on first point of drawn line
    map.moveCamera(new LatLng(35.769368,51.327650),0.25f);
    map.setZoom(14,0);
    return polyline;
}
```

متد `getLineStyle`، استایل مورد نیاز برای خط‌هایی که قرار است رسم شوند را بر‌می‌گرداند. برای ایجاد **style** برای خطوط، ابتدا یک شی از کلاس `LineStyleBuilder` ساخته می‌شود. ویژگی‌های خطوط، از جمله رنگ و عرض خطوط، بر روی این شی **set** می‌شوند. برای تعریف رنگ، باید شی‌ای از نوع Color ساخته شود که پارامترهای آن شامل میزان رنگ قرمز، سبز، آبی و شفافیت رنگ است و شی ساخته شده به عنوان آرگومان ورودی به متد `setColor` داده شود.

پس از مشخص کردن ویژگی‌ها، با صدا زدن متد `buildStyle` بر روی شی مربوط به کلاس `LineStyleBuilder` یک شی از نوع `LineStyle` ایجاد می‌شود و این شی به عنوان خروجی تابع بازگردانده می‌شود.

- java
- kotlin

```java
private LineStyle getLineStyle(){
    LineStyleBuilder lineStCr = new LineStyleBuilder();
    lineStCr.setColor(new Color((short) 2, (short) 119, (short) 189, (short)190));
    lineStCr.setWidth(12f);
    lineStCr.setStretchFactor(0f);
    return lineStCr.buildStyle();
}
```

```kotlin
fun getLineStyle(): LineStyle {
    val lineStyleBuilder = LineStyleBuilder()
    lineStyleBuilder.color = Color(2, 119, 189, 190)
    lineStyleBuilder.width = 4f
    return lineStyleBuilder.buildStyle()
}
```

## حذف خط

همچنین با استفاده از شی `polyline` ساخته شده و متد `removePolyline` می توان خطوط رسم شده بر روی نقشه را بصورت زیر از روی نقشه حذف کرد:

- java
- kotlin

```java
map.removePolyline(polyline);
```

```kotlin
map.removePolyline(polyline)
```
