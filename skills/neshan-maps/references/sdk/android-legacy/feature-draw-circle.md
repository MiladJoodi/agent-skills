---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-sdk-draw-circle/
title: رسم دایره (Draw Circle)
---

# نسخه 1.0.3

در این بخش از پروژه، هدف رسم یک دایره بر روی نقشه است.
بخش‌هایی از این قسمت از پروژه که در قسمت‌های قبلی نیز بوده‌است، توضیح مجدد داده نخواهد شد. در صورت نیاز به صفحات قبلی مراجعه کنید.

## اعمال تغییرات در لی‌اوت `activity_draw_circle.xml`

تنها المان اضافه شده، یک `Button` است که در صورت کلیک بر روی آن، متد `drawCircle` صدا زده می شود و دایره ای بر روی نقشه رسم می‌شود.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.DrawCircle">

    <org.neshan.mapsdk.MapView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"/>

    <Button
        android:id="@+id/draw_circle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="رسم دایره"
        android:textColor="#ffffff"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:background="@drawable/toggle_button_on_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:onClick="drawCircle"
        tools:targetApi="m" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## افزودن دایره

در فایل `DrawCircle.java` و یا فایل `DrawCircle.kt` مراحل زیر را انجام می‌دهیم.

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
    setContentView(R.layout.activity_draw_circle);
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
    setContentView(R.layout.activity_draw_circle)
}

override fun onStart() {
    super.onStart()

    initLayoutReferences()
}
```

متد `drawCircle` دایره ای را بر روی نقشه رسم می‌کند.

با استفاده از استایل خط گرفته شده از متد `getLineStyle` ( که در ادامه توضیح داده خواهد شد ) یک `Circle` ساخته می‌شود. شی `Circle` شامل یک `LatLng` که مشخص کننده مرکز دایره و یک عدد `double` که مشخص کننده شعاع دایره بر اساس متر است، می باشد. فیلد Color نیز مشخص کننده رنگ دایره است.

شی ساخته شده توسط متد `addCircle` به نقشه اضافه میشود، با این کار یک دایره با شعاع 100 متر با مرکزیت 35.769368,51.327650 و رنگ آبی و خط دور آبی روی نقشه رسم میشود.

در نهایت دوربین بر روی نقطه مرکز دایره متمرکز می شود. بزرگنمایی دوربین برابر با ۱۴ است.

- java
- kotlin

```java
// Drawing circle on map
public Circle drawCircle(View view){
    // Here we use getLineStyle() method to define line styles
    Circle circle = new Circle(new LatLng(35.769368,51.327650), 100, new Color((short) 2, (short) 119, (short) 189, (short)190), getLineStyle());
    // adding the created circle on map
    map.addCircle(circle);
    // Focusing camera on center point of circle
    map.moveCamera(new LatLng(35.769368,51.327650),0.25f);
    map.setZoom(14,0);
    return circle;
}
```

```kotlin
fun drawCircle(view: View) {
        var toggleButton = view as ToggleButton
        if (toggleButton.isChecked) {
            circle =
                Circle(LatLng(35.708743, 51.338570), 500.0, Color(2, 119, 189, 190), getLineStyle())
            map.addCircle(circle)
            map.moveCamera(LatLng(35.708743, 51.338570), .5f)
        } else {
            removeCircle()
        }
    }

//Remove circle if exists
    private fun removeCircle() {
        if (circle != null) {
            map.removeCircle(circle)
        }
    }
```

متد `getLineStyle`، استایل مورد نیاز برای خط‌هایی که قرار است رسم شوند را بر‌می‌گرداند. برای ایجاد **style** برای خطوط، ابتدا یک شی از کلاس `LineStyleBuilder` ساخته می‌شود. ویژگی‌های خطوط، از جمله رنگ و عرض خطوط، بر روی این شی **set** می‌شوند. برای تعریف رنگ، باید شی‌ای از نوع Color ساخته شود که پارامترهای آن شامل میزان رنگ قرمز، سبز، آبی و شفافیت رنگ است و شی ساخته شده به عنوان آرگومان ورودی به سازنده `setColor` داده شود.

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
private fun getLineStyle(): LineStyle {
    val lineStyleBuilder = LineStyleBuilder()
    lineStyleBuilder.color = Color(2, 119, 189, 190)
    lineStyleBuilder.width = 4f
    return lineStyleBuilder.buildStyle()
}
```

## حذف دایره

برای حذف دایره از روی نقشه میتوان از متد **removeCircle** که شی دایره را به عنوان پارامتر از ورودی دریافت میکنید، روی شی نقشه استفاده کرد:

- java
- kotlin

```java
map.removeCircle(circle);
```

```kotlin
map.removeCircle(circle)
```
