---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-sdk-camera-bearing/
title: تغییر جهت دوربین (Camera Bearing)
---

# نسخه 1.0.3

هدف این بخش از پروژه تغییر جهت دوربین (از حالتی که دوربین به سمت شمال نقشه است به جهت‌های دیگر) است.

## اعمال تغییرات در لی‌اوت `activity_change_camera_bearing.xml`

در این صفحه، علاوه بر المان نقشه نشان، یک `ConstraintLayout` دیگر نیز وجود دارد که درون آن یک `CircularSeekBar` و چهار `TextView` وجود دارد. در `TextView` ها عبارت‌های **شمال**، **شرق**، **جنوب** و **غرب** نوشته شده است. المان `CircularSeekBar` نیز در کلاس `CircularSeekBar.java` تعریف شده است.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.ChangeCameraBearing">

    <org.neshan.mapsdk.MapView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"/>

    <ToggleButton
        android:checked="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="@color/toggle_button_text_color"
        android:textOff="تغییر جهت دوربین"
        android:textOn="تغییر جهت دوربین"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:drawableStart="@drawable/ic_change_tilt"
        android:drawableTint="@color/toggle_button_text_color"
        android:drawablePadding="8dp"
        android:background="@drawable/toggle_button_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        tools:targetApi="m"
        android:onClick="toggleCameraRotation"/>

    <android.support.constraint.ConstraintLayout
        android:layout_width="250dp"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:gravity="center"
        android:background="@drawable/rounded_white_bg"
        android:padding="16dp"
        android:layout_marginTop="32dp"
        android:layout_marginStart="64dp"
        android:layout_marginEnd="64dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent">

        <TextView
            android:id="@+id/north_label"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@color/textPrimaryColor"
            android:text="شمال"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"/>

        <TextView
            android:id="@+id/south_label"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@color/textPrimaryColor"
            android:text="جنوب"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"/>

        <TextView
            android:id="@+id/west_label"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@color/textPrimaryColor"
            android:text="غرب"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent"/>

        <TextView
            android:id="@+id/east_label"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@color/textPrimaryColor"
            android:text="شرق"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"/>

        <org.neshan.sample.starter.custom_view.CircularSeekBar
            android:id="@+id/bearing_seek_bar"
            android:layout_width="100dp"
            android:layout_height="100dp"
            app:cs_move_outside_circle = "true"
            app:cs_max = "360"
            app:cs_progress = "0"
            app:cs_circle_style = "round"
            app:cs_circle_stroke_width = "16dp"
            app:cs_pointer_stroke_width = "16dp"
            app:cs_circle_color = "@color/darkPrimaryColor"
            app:cs_circle_progress_color = "@color/lightPrimaryColor"
            app:cs_pointer_color = "@color/accentColor"
            android:layout_marginTop="8dp"
            android:layout_marginBottom="8dp"
            app:layout_constraintTop_toBottomOf="@id/north_label"
            app:layout_constraintBottom_toTopOf="@id/south_label"
            app:layout_constraintStart_toEndOf="@id/west_label"
            app:layout_constraintEnd_toStartOf="@id/east_label"/>

    </android.support.constraint.ConstraintLayout>

</android.support.constraint.ConstraintLayout>
```

## تغییر جهت دوربین

در فایل `ChangeCameraBearing.java` و یا فایل `ChangeCameraBearing.kt` مراحل زیر را انجام می‌دهیم.

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
    setContentView(R.layout.activity_change_camera_bearing);
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
    setContentView(R.layout.activity_camera_bearing)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

بر روی `bearingSeekBar` یک `CircularSeekBarChangeListener` ست شده است و هنگامی که تابع `onProgressChanged` صدا زده می‌شود، مقدار `progress` این تابع به ورودی متد `setBearing` – که بر روی شی `map` صدا زده می‌شود – داده می‌شود. این متد تغییر جهت دوربین را پیاده‌سازی کرده است.

برای همگام‌سازی زمانی که جهت نقشه، با استفاده از gesture های از پیش‌تعریف شده بر روی نقشه تغییر می‌کند با درجه ‌ی نشان داده شده بر روی `SeekBar` موجود در رابطه کاربری، یک `OnCameraMoveListener` بر روی `map` ست می‌شود. در متد `Listener` مقدار تغییر جهت نقشه به مقدار قابل نمایش بر روی `SeekBar` تبدیل می‌شود. به این صورت که در صورتی که میزان تغییر جهت نقشه کمتر از ۰ درجه باشد، این مقدار با ۳۶۰ جمع شده و در غیر این صورت، همان مقدار تغییر جهت نقشه در نظر گرفته می‌شود.

برای نمایش این میزان تغییر بر روی `SeekBar` نخ رابط کاربری جدیدی ایجاد‌ می‌شود و متد `setProgress` بر روی `bearingSeekBar` صدا زده می‌شود. دلیل استفاده از UIThread جدید در تغییر زاویه دوربین توضیح داده شده‌است.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
    // Initializing views
    initViews();
    // Initializing mapView element
    initMap();
    // connect bearing seek bar to camera
    bearingSeekBar.setOnSeekBarChangeListener(new CircularSeekBar.OnCircularSeekBarChangeListener() {
        @Override
        public void onProgressChanged(CircularSeekBar circularSeekBar, float progress, boolean fromUser) {
            // change camera bearing programmatically
            map.setBearing(progress, 0f);
        }

        @Override
        public void onStopTrackingTouch(CircularSeekBar seekBar) {

        }

        @Override
        public void onStartTrackingTouch(CircularSeekBar seekBar) {

        }
    });

    map.setOnCameraMoveListener(() -> {
        // updating seek bar with new camera bearing value
        if (map.getBearing() < 0) {
            cameraBearing = (180 + map.getBearing()) + 180;
        } else {
            cameraBearing = map.getBearing();
        }
        // updating own ui element must run on ui thread not in map ui thread
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                bearingSeekBar.setProgress(cameraBearing);
            }
        });
    });
}
```

```kotlin
// Initializing layout references (views, map and map events)
private fun initLayoutReferences() {
    initViews()

    initMap()

    // connect bearing seek bar to camera
    bearingSeekBar.setOnSeekBarChangeListener(object :
        CircularSeekBar.OnCircularSeekBarChangeListener {
        override fun onProgressChanged(
            circularSeekBar: CircularSeekBar?,
            progress: Float,
            fromUser: Boolean
        ) {
            // change camera bearing programmatically
            map.setBearing(progress, 0f)
        }

        override fun onStopTrackingTouch(seekBar: CircularSeekBar?) {}
        override fun onStartTrackingTouch(seekBar: CircularSeekBar?) {}
    })

    map.setOnCameraMoveListener {
        // updating seek bar with new camera bearing value
        if (map.bearing < 0) {
            cameraBearing = 180 + map.bearing + 180
        } else {
            cameraBearing = map.bearing
        }
        // updating own ui element must run on ui thread not in map ui thread
        runOnUiThread { bearingSeekBar.progress = cameraBearing }
    }
}
```

هنگامی که `ToggleButton` موجود در رابط کاربری، در حالت انتخاب شده باشد، با استفاده از شی `Settings` که از صدا زدن متد `getSettings` بر روی المان نقشه به دست می‌آید و صدا زدن متد `setMapRotationEnabled` با ورودی `true` امکان تغییر جهت دوربین فراهم می‌شود و در غیر این صورت، ورودی `false` به این متد داده می‌شود و امکان تغییر جهت دوربین غیرفعال می‌شود.

- java
- kotlin

```java
public void toggleCameraRotation (View view){
    ToggleButton toggleButton = (ToggleButton) view;
    isCameraRotationEnable = !isCameraRotationEnable;
    if (toggleButton.isChecked())
        map.getSettings().setMapRotationEnabled(true);
    else
        map.getSettings().setMapRotationEnabled(false);
}
```

```kotlin
fun toggleCameraRotation(view: View) {
    val toggleButton = view as ToggleButton
    map.settings.isMapRotationEnabled = toggleButton.isChecked
}
```
