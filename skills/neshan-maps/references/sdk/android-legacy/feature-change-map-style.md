---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-sdk-change-map-style/
title: تغییر استایل نقشه (Change Map Style)
---

# نسخه 1.0.3

## اعمال تغییرات در لی‌اوت `activity_change_style.xml`

در این صفحه، به جز المان نقشه نشان، یک `CardView` وجود دارد که در آن یک `ImageView` وجود دارد. با کلیک بر روی این تصویر، متد `changeStyle` صدا زده می‌شود و استایل نقشه به استایلی که پیش‌نمایش آن در این تصویر دیده می‌شود تغییر می‌کند. پیش‌نمایش‌ استایل‌ها در پوشه `drawable` با نام‌های زیر ذخیره شده است:

- `map_style_neshan.png`
- `map_style_standard_day.png`
- `map_style_standard_night.png`
- `map_style_1`
- `map_style_2`
- `map_style_3`
- `map_style_4`
- `map_style_5`
- `map_style_6`

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".ChangeStyle">

    <org.neshan.mapsdk.MapView
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/map"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"/>

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

## تغییر استایل نقشه

در فایل `ChangeStyle.java` و یا فایل `ChangeStyle.kt` مراحل زیر را انجام می‌دهیم.

متغیری از نوع `int` و با انوتیشن `@NeshanMapStyle` جهت ذخیره استایل نقشه و متغیری از نوع `ImageView` جهت نمایش پیش‌نمایش نقشه تعریف شده‌است.

- java
- kotlin

```java
// save current map style
@NeshanMapStyle private int mapStyle;
// map style control
private ImageView themePreview;
```

```kotlin
@NeshanMapStyle
private var mapStyle = 0
private lateinit var themePreview: ImageView
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
    setContentView(R.layout.activity_change_style);
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
    setContentView(R.layout.activity_change_style)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

در متد `initLayoutReferences` پس از مقداردهی کردن View ها و مقداردهی اولیه نقشه، متد `validateThemePreview` صدا زده می‌شود. این متد پیش‌نمایش استایل بعدی نقشه را آماده می‌کند و نمایش می‌دهد.

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
// Initializing layout references (views, map and map events)
private fun initLayoutReferences() {
    // Initializing views
    initViews()
    // Initializing mapView element
    initMap()
    // Initializing theme preview
    validateThemePreview()
}
```

در متد `validateThemePreview` استایل فعلی نقشه – که در متغیر `mapStyle` ذخیره شده‌است – بررسی می‌شود و با توجه به مقدار آن، پیش‌نمایش استایل بعدی به کاربر نمایش داده می‌شود. برای نمایش پیش‌نمایش استایل بعدی، متد `setImageDrawable` بر روی شی `themePreview` صدا زده می‌شود و فایل عکس پیش‌نمایش مربوطه، از پوشه `drawable` دریافت می‌شود.

- java
- kotlin

```java
private void validateThemePreview() {
    switch (mapStyle) {
        case NeshanMapStyle.NESHAN:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_standard_day, getTheme()));
            break;
        case NeshanMapStyle.STANDARD_DAY:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_standard_night, getTheme()));
            break;
        case NeshanMapStyle.NESHAN_NIGHT:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_1, getTheme()));
            break;
        case NeshanMapStyle.STYLE_1:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_2, getTheme()));
            break;
        case NeshanMapStyle.STYLE_2:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_3, getTheme()));
            break;
        case NeshanMapStyle.STYLE_3:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_4, getTheme()));
            break;
        case NeshanMapStyle.STYLE_4:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_5, getTheme()));
            break;
        case NeshanMapStyle.STYLE_5:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_6, getTheme()));
            break;
        case NeshanMapStyle.STYLE_6:
            themePreview.setImageDrawable(ResourcesCompat.getDrawable(getResources(), R.drawable.map_style_neshan, getTheme()));
            break;
    }
}
```

```kotlin
private fun validateThemePreview() {
	when (mapStyle) {
		NeshanMapStyle.NESHAN -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_standard_day, theme
			)
		)
		NeshanMapStyle.STANDARD_DAY -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_standard_night, theme
			)
		)
		NeshanMapStyle.NESHAN_NIGHT -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_1, theme
			)
		)
		NeshanMapStyle.STYLE_1 -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_2,
				theme
			)
		)
		NeshanMapStyle.STYLE_2 -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_3,
				theme
			)
		)
		NeshanMapStyle.STYLE_3 -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_4,
				theme
			)
		)
		NeshanMapStyle.STYLE_4 -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_5,
				theme
			)
		)
		NeshanMapStyle.STYLE_5 -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_6,
				theme
			)
		)
		NeshanMapStyle.STYLE_6 -> themePreview.setImageDrawable(
			ResourcesCompat.getDrawable(
				resources, R.drawable.map_style_neshan,
				theme
			)
		)
	}
}
```

متد `changeStyle` با هر بار کلیک کردن بر روی تصویر `theme_preview` (در رابط کاربری) اجرا می‌شود. با بررسی استایل فعلی نقشه، استایل بعدی – با استفاده از کلاس `NeshanMapStyle` – به وجود آمده و در متغیر `mapStyle` ذخیره می‌شود.

سپس در یک UI Thread جدید، تصویر پیش‌نمایش استایل بعدی با صدا زدن متد `validateThemePreview` به‌روزرسانی می‌شود.

و در نهایت در خط آخر متد، استایل جدید با استفاده از متد `setStyle` به نقشه `set` می شود.

- java
- kotlin

```java
public void changeStyle(View view) {
    switch (mapStyle) {
        case NeshanMapStyle.NESHAN:
            mapStyle = NeshanMapStyle.STANDARD_DAY;
            break;
        case NeshanMapStyle.STANDARD_DAY:
            mapStyle = NeshanMapStyle.NESHAN_NIGHT;
            break;
        case NeshanMapStyle.NESHAN_NIGHT:
            mapStyle = NeshanMapStyle.STYLE_1;
            break;
        case NeshanMapStyle.STYLE_1:
            mapStyle = NeshanMapStyle.STYLE_2;
            break;
        case NeshanMapStyle.STYLE_2:
            mapStyle = NeshanMapStyle.STYLE_3;
            break;
        case NeshanMapStyle.STYLE_3:
            mapStyle = NeshanMapStyle.STYLE_4;
            break;
        case NeshanMapStyle.STYLE_4:
            mapStyle = NeshanMapStyle.STYLE_5;
            break;
        case NeshanMapStyle.STYLE_5:
            mapStyle = NeshanMapStyle.STYLE_6;
            break;
        case NeshanMapStyle.STYLE_6:
            mapStyle = NeshanMapStyle.NESHAN;
            break;
    }
    runOnUiThread(new Runnable() {
        @Override
        public void run() {
            validateThemePreview();
        }
    });
    map.setMapStyle(mapStyle);
}
```

```kotlin
private fun changeStyle(view: View) {
	when (mapStyle) {
		NeshanMapStyle.NESHAN -> mapStyle = NeshanMapStyle.STANDARD_DAY
		NeshanMapStyle.STANDARD_DAY -> mapStyle = NeshanMapStyle.NESHAN_NIGHT
		NeshanMapStyle.NESHAN_NIGHT -> mapStyle = NeshanMapStyle.STYLE_1
		NeshanMapStyle.STYLE_1 -> mapStyle = NeshanMapStyle.STYLE_2
		NeshanMapStyle.STYLE_2 -> mapStyle = NeshanMapStyle.STYLE_3
		NeshanMapStyle.STYLE_3 -> mapStyle = NeshanMapStyle.STYLE_4
		NeshanMapStyle.STYLE_4 -> mapStyle = NeshanMapStyle.STYLE_5
		NeshanMapStyle.STYLE_5 -> mapStyle = NeshanMapStyle.STYLE_6
		NeshanMapStyle.STYLE_6 -> mapStyle = NeshanMapStyle.NESHAN
	}
	runOnUiThread { validateThemePreview() }
	map.mapStyle = mapStyle
}
```

## شخصی سازی استایل

در نسخه 1.0.2 امکان شخصی سازی برخی از المانهای نقشه فراهم شده است.

از طریق **attribute** های زیر که روی **xml** مربوط به نقشه اعمال میشود میتوانید رنگ برخی از المانهای نقشه را تغییر دهید:

- **streetColor**: رنگ خیابان ها
- **trunkColor**: رنگ بزرگراه ها
- **cyclewayColor**: رنگ مسیر دوچرخه
- **countriesBorderColor**: رنگ خط دور مرز کشورها
- **provincesBorderColor**: رنگ خط دور مرز استان ها
- **hospitalColor**: رنگ مربوط به بیمارستان ها
- **residentialAreaColor**: رنگ مناطق مسکونی

توسط 2 **attribute** زیر نیز میتوانید نمایش مناطق طرح ترافیک و طرح زوج و فرد را فعال نمایید:

- **oddEvenZoneEnabled**: مناطق طرح زوج و فرد
- **trafficZoneEnabled**: مناطق طرح ترافیک

```xml
<org.neshan.mapsdk.MapView
    android:layout_width="0dp"
    android:layout_height="0dp"
    android:id="@+id/map"
    app:streetColor="#ff0000"
    app:trunkColor="#0000ff"
    app:layout_constraintTop_toTopOf="parent"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintEnd_toEndOf="parent"/>
```

در مثال بالا رنگ خیابان ها به رنگ **قرمز** و رنگ بزرگراه ها به رنگ **آبی** نمایش داده خواهند شد.
