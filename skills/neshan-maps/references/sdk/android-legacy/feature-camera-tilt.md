---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-sdk-camera-tilt/
title: تغییر زاویه دوربین (Camera tilt)
---

# نسخه 1.0.3

هدف این بخش از پروژه تغییر زاویه (یا شیب) دوربین است. تغییر شیب دوربین در ایجاد حالت navigation یا برای مشاهده ساختمان‌های سه‌بعدی کاربرد دارد.

## اعمال تغییرات در لی‌اوت `activity_change_camera_tilt.xml`

در فایل لی‌اوت این بخش از پروژه، علاوه بر المان نقشه نشان، یک `LinearLayout` وجود دارد که در آن یک `SeekBar` و دو `TextView` وجود دارد. در دو `TextView` عبارات **۳۰ درجه** و **۹۰ درجه** نوشته شده‌اند که میزان شیب نقشه نشان را در حالت مینیمم و ماکزیمم مشخص می‌کند. `SeekBar` نیز برای تنظیم میزان شیب به کار می‌رود. نکته‌ای که در `SeekBar` وجود دارد این است که میزان مینیمم و ماکزیمم آن به ترتیب ۰ و ۶۰ است در حالی که همان‌طور که گفته شد این میزان برای نقشه نشان برابر با ۳۰ و ۹۰ است، پس در طول برنامه برای استفاده از مقداری که این `SeekBar` مشخص می‌کند، آن مقدار را با ۳۰ جمع می‌کنیم.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.ChangeCameraTilt">

    <org.neshan.mapsdk.MapView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"/>

    <ToggleButton
        android:checked="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="@color/toggle_button_text_color"
        android:textOff="تغییر زاویه دوربین"
        android:textOn="تغییر زاویه دوربین"
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
        android:onClick="toggleCameraTilt"/>

    <LinearLayout
        android:layout_width="300dp"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        android:gravity="center"
        android:background="@drawable/rounded_white_bg"
        android:padding="16dp"
        android:layout_marginTop="32dp"
        android:layout_marginStart="32dp"
        android:layout_marginEnd="32dp"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@color/textPrimaryColor"
            android:text="۳۰ درجه"/>

        <!--it is not possible to set min range for seek bar (default value = 0)-->
        <!--so we get seek bar range 0-60 (camera tilt range in neshan is 30-90)-->
        <!--and add 30 in every read value of seek bar-->
        <SeekBar
            android:id="@+id/tilt_seek_bar"
            android:layout_weight="99"
            android:layout_width="0dp"
            android:layout_height="wrap_content"
            android:max="60"
            android:progress="60"
            android:progressDrawable="@drawable/seek_bar_bg"
            android:thumb="@drawable/seek_bar_thumb"
            android:layout_marginStart="4dp"
            android:layout_marginEnd="4dp"/>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:textColor="@color/textPrimaryColor"
            android:text="۹۰ درجه"/>

    </LinearLayout>

</android.support.constraint.ConstraintLayout>
```

## تغییر زاویه دوربین

در فایل `ChangeCameraTilt.java` و یا فایل `ChangeCameraTilt.kt` مراحل زیر را انجام می‌دهیم.

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
    setContentView(R.layout.activity_change_camera_tilt);
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

در این‌ جا بر روی `tiltSeekBar` یک `OnSeekBarChangeListener` ست شده است. هرگاه متد `onProgressChanged` صدا زده شود، مقدار `progress` را با عدد ۳۰ جمع کرده (به دلیلی که در بالاتر توضیح داده شد) و این مقدار را به عنوان ورودی متد `setTilt` که بر روی `map` صدا زده می‌شود داده می‌شود.

متد `setTilt` میزان زاویه (یا شیب) نقشه را تنظیم می‌کند.

ممکن است کاربر بدون استفاده از `tiltSeekBar` و با استفاده از دو انگشت و با gesture های از پیش تعریف شده بر روی نقشه، میزان زاویه را تغییر دهد. برای این که بعد از تغییر در این‌حالت، `progress` نشان داده‌شده بر روی `tiltSeekBar` نیز مقدار درستی داشته باشد، یک `OnCameraMoveListener` برای تشخیص تغییر دوربین به map ست می‌شود و در هنگام **حرکت** نقشه، میزان زاویه نقشه گرفته شده، ۳۰ واحد از آن کم‌می‌شود، به بالا گرد می‌شود و به ورودی متد `setProgress` – که بر روی `tiltSeekBar` صدا زده ‌می‌شود – داده می‌شود.

در متد `onMapMoved`، همین متد بر روی `super` نیز صدا زده می‌شود تا عملیاتی که در SDK برای زمانی که نقشه حرکت می‌کند پیاده‌سازی شده است نیز انجام شود.

برای به‌روز‌رسانی میزان پیشرفت نشان‌داده شده بر روی `SeekBar` موجود در رابط کاربری، بهتر است نخ جدیدی در رابط کاربری ایجاد کرده و این کار را به جای این‌که در نخی که نقشه در آن وجود دارد، در نخ جدید انجام دهیم. دلیل این کار این است که عملیات مربوط به نمایش نقشه، عملیات سنگینی است و در صورتی که بخواهیم تغییرات دیگر عناصر رابط کاربری را نیز در این نخ انجام دهیم، ممکن است به‌روزرسانی‌های نقشه یا دیگر المان‌های رابط کاربری به درستی انجام نشود. برای ایجاد یک نخ رابط‌کاربری جدید، متد `runOnUiThread` را صدا زده، یک شی `Runnable` جدید ایجاد کرده، تابع `run` را **Override** کرده و عملیاتی که برای آپدیت دیگر المان‌های رابط کاربری باید انجام شود را در این متد می‌نویسیم.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
    // Initializing views
    initViews();
    // Initializing mapView element
    initMap();
    // connect tilt seek bar to camera
    tiltSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
        @Override
        public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
            // change camera tilt programmatically

            // because of we can not set min range for seek bar we take seek bar range 0-60
            // then add 30 in each read seek bar to convert it to neshan camera tilt range(30-90)
            // for reverse converting subtract 30 in each setting progress for seek bar
            map.setTilt(progress + 30, 0f);
        }

        @Override
        public void onStartTrackingTouch(SeekBar seekBar) {

        }

        @Override
        public void onStopTrackingTouch(SeekBar seekBar) {

        }
    });

    // sync map with tilt controller
    map.setOnCameraMoveListener(()-> {
            // because of we can not set min range for seek bar we take seek bar range 0-60
            // then add 30 in each read seek bar to convert it to neshan camera tilt range(30-90)
            // for reverse converting subtract 30 in each setting progress for seek bar

            // updating own ui element must run on ui thread not in map ui thread
            runOnUiThread(() -> tiltSeekBar.setProgress(Math.round(map.getTilt()) - 30));
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

    //tilt camera
    seekBar.setOnSeekBarChangeListener(object : SeekBar.OnSeekBarChangeListener {

        override fun onProgressChanged(p0: SeekBar?, p1: Int, p2: Boolean) {
            map.setTilt(seekBar.progress + 30f, 0f)
        }

        override fun onStartTrackingTouch(p0: SeekBar?) {

        }

        override fun onStopTrackingTouch(p0: SeekBar?) {
            Log.d("asd", seekBar.progress.toString());
        }
    })

    map.setOnCameraMoveListener {
        runOnUiThread {
            seekBar.progress = Math.round(map.tilt) - 30
        }
    }
}
```

هنگامی که `ToggleButton` موجود در رابط کاربری، در حالت انتخاب شده باشد، با استفاده از شی `Settings` که از صدا زدن متد `getSettings` بر روی المان نقشه به دست می‌آید و صدا زدن متد `setMinTiltRange` و `setMaxTiltRange` بر روی آن، حداقل و حداکثر بازه تنظیم شیب نقشه بین ۳۰ درجه تا ۹۰ درجه (تمام مقدار ممکن) انتخاب می‌شود. در صورتی که `ToggleButton` انتخاب نشده باشد، حداقل و حداکثر بازه تنظیم برابر با درجه فعلی شیب نقشه قرار می‌گیرد و در این صورت امکان تغییر شیب وجود نخواهد داشت.

- java
- kotlin

```java
public void toggleCameraTilt(View view) {
    ToggleButton toggleButton = (ToggleButton) view;
    isCameraTiltEnable = !isCameraTiltEnable;
    if (toggleButton.isChecked()) {
        //set tilt range from 30 to 90 degrees
        map.getSettings().setMinTiltAngle(30);
        map.getSettings().setMaxTiltAngle(90);
    } else {
        //set tilt range to 1 degree (only current tilt degree)
        map.getSettings().setMinTiltAngle(map.getTilt());
        map.getSettings().setMaxTiltAngle(map.getTilt());
    }
}
```

```kotlin
fun toggleCameraTilt(view: View) {
    val toggleButton = view as ToggleButton
    if (toggleButton.isChecked) {
        //set tilt range from 30 to 90 degrees
        map.settings.minTiltAngle = 30f
        map.settings.maxTiltAngle = 90f
    } else {
        //set tilt range to 1 degree (only current tilt degree)
        map.settings.minTiltAngle = map.tilt
        map.settings.maxTiltAngle = map.tilt
    }
}
```
