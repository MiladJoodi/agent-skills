---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/traffic-layer/
title: لایه ترافیک (Traffic Layer)
---

# مستندات فعال‌سازی لایه ترافیک در نقشه

## نسخه 1.0.3

در این بخش بر روی نقشه لایه ترافیک آنلاین نشان را فعال یا غیرفعال میکنیم.

## اعمال تغییرات در لی‌اوت **`activity_traffic_layer.xml`**

در این صفحه علاوه بر المان نقشه نشان یک `ToggleButton` وجود دارد که با هر بار لمس شدنش، متد `toggleTrafficLayer` فراخوانی می‌شود و لایه ترافیک فعال یا غیرفعال می‌شود.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".activity.TrafficLayer">

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
        android:textOff="لایه ترافیک"
        android:textOn="لایه ترافیک"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:drawableStart="@drawable/ic_traffic_layer"
        android:drawableTint="@color/toggle_button_text_color"
        android:drawablePadding="8dp"
        android:background="@drawable/toggle_button_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        tools:targetApi="m"
        android:onClick="toggleTrafficLayer"/>

</android.support.constraint.ConstraintLayout>
```

## افزودن لایه ترافیک

در فایل **`TrafficLayer.java`** و یا فایل **`TrafficLayer.kt`** مراحل زیر را انجام می‌دهیم.

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
        setContentView(R.layout.activity_traffic_layer);
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
    setContentView(R.layout.activity_traffic_layer)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

در متد `toggleTrafficLayer` بررسی می‌شود که اگر `toggleButton` انتخاب شده باشد، لایه ترافیک فعال شود و در غیر این صورت لایه ترافیک را غیرفعال می کند. برای فعال شدن لایه ترافیک فقط کافیست تا متد `setTrafficEnabled` از شیء نقشه را با مقدار `true` صدا کنیم و برای غیرفعال کردن آن را `false` کنیم.

- java
- kotlin

```java
public void toggleTrafficLayer(View view) {
    ToggleButton toggleButton = (ToggleButton) view;
    if (toggleButton.isChecked())
        map.setTrafficEnabled(true);
    else
        map.setTrafficEnabled(false);
}
```

```kotlin
fun toggleTrafficLayer(view: View) {
    val toggleButton = view as ToggleButton
    map.isTrafficEnabled = toggleButton.isChecked
}
```
