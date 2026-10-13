---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-sdk-draw-arc/
title: رسم کمان (Draw Arc)
---

# نسخه 1.0.3

در این بخش از پروژه، هدف رسم یک کمان بر روی نقشه است.
بخش‌هایی از این قسمت از پروژه که در قسمت‌های قبلی نیز بوده‌است، توضیح مجدد داده نخواهد شد. در صورت نیاز به صفحات قبلی مراجعه کنید.

## تنظیمات در لی‌اوت `activity_draw_arc.xml`

تنها المان اضافه شده، یک **ToggleButton** است که در صورت کلیک بر روی آن، متد **drawArc** صدا زده می شود و کمانی بر روی نقشه رسم می‌شود.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.DrawPolygon">

    <org.neshan.mapsdk.MapView
        android:id="@+id/map"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <ToggleButton
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="8dp"
        android:background="@drawable/toggle_button_bg"
        android:checked="true"
        android:elevation="8dp"
        android:onClick="drawArc"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:textColor="@color/toggle_button_text_color"
        android:textOff="حذف کمان"
        android:textOn="رسم کمان"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        tools:targetApi="m" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

## افزودن کمان

در فایل `DrawArc.java` و یا فایل `DrawArc.kt` مراحل زیر را انجام می‌دهیم.

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
    setContentView(R.layout.activity_draw_arc);
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
    setContentView(R.layout.activity_add_marker)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

متد **drawArc** کمانی را بین 2 نقطه داده شده بر روی نقشه رسم می‌کند.

- java
- kotlin

```java
public void drawArc(View view) {
    if (arc == null) {
        arc = map.drawArc(new LatLng(35.701029742703604, 51.33399009376021), new LatLng(35.72488915365864, 51.38092935533464), getLineStyle());
    } else {
        map.removePolyline(arc);
        arc = null;
    }
}
```

```kotlin
public void drawArc(View view) {
    if (arc == null) {
        arc = map.drawArc(new LatLng(35.701029742703604, 51.33399009376021), new LatLng(35.72488915365864, 51.38092935533464), getLineStyle());
    } else {
        map.removePolyline(arc);
        arc = null;
    }
}
```

خروجی متد **drawArc** یک شی از نوع **Polyline** است.

## حذف کمان

برای حذف کمان کافیست از متد **removePolyline** روی نقشه استفاده نمایید و کمان ایجاد شده توسط متد **drawArc** را به عنوان پارامتر آن ارسال نمایید.

- java
- kotlin

```java
map.removePolyline(arc);
```

```kotlin
map.removePolyline(arc);
```
