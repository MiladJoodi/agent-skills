---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/clustring/
title: خوشه بندی مارکر ها (Clustring)
---

# نسخه 1.0.3

هدف از این بخش از پروژه بررسی نحوه فعال‌سازی و غیرفعال‌سازی خوشه بندی ( Clustering ) نشانه هاست. خوشه بندی زمانی کاربرد دارد که تعداد نشانه های موجود بر روی نقشه زیاد باشد و برای جلوگیری از شلوغی نقشه با تکنیک خوشه بندی، نشانه های نزدیک به هم را با هم ادغام می کنیم و در صورتی که زوم نقشه بر روی نشانه ها باشد آن ها را از حالت ادغام خارج میکنیم. این کار براحتی در sdk نقشه نشان بطور خودکار انجام می شود که نحوه فعال یا غیرفعالسازی آن را در ادامه توضیح می دهیم.

## اعمال تغییرات در لی‌اوت `activity_marker_clustering.xml`

در این صفحه، علاوه بر المان نقشه نشان، یک `ToggleButton` برای فعال‌ یا غیرفعال کردن خوشه بندی وجود دارد.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".activity.MarkerClustering">

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
        android:textOff="خوشه بندی"
        android:textOn="خوشه بندی"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:background="@drawable/toggle_button_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        tools:targetApi="m"
        android:onClick="toggleClustering"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

## پیاده سازی

در فایل **`MarkerClustering.java`** و یا فایل **`MarkerClustering.kt`** مراحل زیر را انجام می‌دهیم.

متد `initLayoutRefrences` جهت مقداردهی اولیه تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است. به دلیل این که لازم است تا المان اندرویدی نقشه نشان ابتدا به طور کامل ایجاد شود و سپس با آن تعامل برقرار شود (متدهای مختلف بر روی المان نقشه اجرا شود)، تمامی متدهای مربوط به رابط کاربری باید در متد `onStart` انجام شوند.

- java
- kotlin

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // starting app in full screen
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_marker_clustering);
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
    setContentView(R.layout.activity_marker_clustering)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

پس از مقداردهی اولیه viewها یک رویداد کلیک ( `OnMapClickListener` ) بر روی نقشه تعریف می شود تا با هر کلیک بر روی نقشه یک نشانه جدید اضافه شود. نشانه جدید با کمک متد `createMarker` ساخته شده و با `map.addMarker` به نقشه اضافه می شود.

توضیحات نحوه ایجاد نشانه را می توانید در بخش اضافه کردن نشانگر ببینید.

اینجا یک پارامتر دیگر به متد `createMarker` افزوده شده که در صورت `false` بودن نشانگر قرمز و در صورت `true` نشانگر آبی رنگ ایجاد می شود. پس با هر بار کلیک بر روی نقشه یک نشانگر **قرمز** به نقشه اضافه می شود. همچنین یک رویداد لمس طولانی ( `setOnMapLongClickListener` ) بر روی نقشه تعریف می شود که مشابه رویداد کلیک یک نشانگر به نقشه اضافه میکند، با این تفاوت که نشانگر افزوده شده آبی رنگ است و همچنین متد `map.addMarker` در اینجا با یک پارامتر `false` برای ورودی `clusterable` صدا زده می شود. این کار باعث میشود نشانگرهای اضافه شده به این شکل شامل خوشه بندی ( clustering ) نشوند. و در آخر یک رویداد `setOnMarkerClickListener` برای نقشه تعریف شده که با کلیک بر روی هر نشانگر صدا زده می شود و با استفاده از متد `map.removeMarker` نشانگر مربوطه را از روی نقشه حذف می کند.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
    // Initializing views
    initViews();

    // when clicked on map, a marker is added in clicked location
    map.setOnMapClickListener(latLng -> {
       map.addMarker(createMarker(latLng,false));
    });
    // when clicked on map, a marker is added in clicked location
    map.setOnMapLongClickListener(latLng -> {
       map.addMarker(createMarker(latLng,true),false);
    });
    map.setOnMarkerClickListener(marker -> map.removeMarker(marker));
}
```

```kotlin
// Initializing layout references (views, map and map events)
    private fun initLayoutReferences() {
        // Initializing views
        initViews()
        // Initializing mapView element
        initMap()

        // when clicked on map, a red marker will added in clicked location on map and it's clusterable
        map.setOnMapClickListener { latLng: LatLng ->
            map.addMarker(createMarker(latLng, true))
        }

        // when long click on map, a blue marker will added to clicked location on map and it's not clusterable
        map.setOnMapLongClickListener {
            map.addMarker(createMarker(it, false), false)
        }

        // Remove marker when click on it
        map.setOnMarkerClickListener {
            map.removeMarker(it)
        }
    }

// This method gets a LatLng as input and adds a marker on that position
    private fun createMarker(loc: LatLng, clusterable: Boolean): Marker {
        // Creating animation for marker. We should use an object of type AnimationStyleBuilder, set
        // all animation features on it and then call buildStyle() method that returns an object of type
        // AnimationStyle
        val animStBl = AnimationStyleBuilder()
        animStBl.fadeAnimationType = AnimationType.ANIMATION_TYPE_SMOOTHSTEP
        animStBl.sizeAnimationType = AnimationType.ANIMATION_TYPE_SPRING
        animStBl.phaseInDuration = 0.5f
        animStBl.phaseOutDuration = 0.5f
        animSt = animStBl.buildStyle()

        // Creating marker style. We should use an object of type MarkerStyleCreator, set all features on it
        // and then call buildStyle method on it. This method returns an object of type MarkerStyle
        val markStCr = MarkerStyleBuilder()
        markStCr.size = 30f
        if (clusterable) {
            markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
                BitmapFactory.decodeResource(
                    resources,
                    R.drawable.ic_marker
                )
            )
        } else {
            markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
                BitmapFactory.decodeResource(
                    resources,
                    R.drawable.ic_marker_blue
                )
            )
        }
        // AnimationStyle object - that was created before - is used here
        markStCr.animationStyle = animSt
        val markSt = markStCr.buildStyle()

        // Creating marker
        return Marker(loc, markSt)
    }
```

متد toggleClustering که با هر بار کلیک بر روی `toggleButton` صدا زده می شود، بررسی می‌ کند که اگر `toggleButton` موجود در رابط کاربری در حالت انتخاب شده باشد، خوشه بندی نشانه ها با استفاده از متد `map.getSettings().setMarkerClusteringEnabled(true)` فعال می شود و در غیر اینصورت این متد با مقدار `false` فراخوانی شده و در نتیجه خوشه بندی غیرفعال می شود.

- java
- kotlin

```java
public void toggleClustering(View view) {
    ToggleButton toggleButton = (ToggleButton) view;
    isClusteringEnable = !isClusteringnable;
    if (toggleButton.isChecked())
        map.getSettings().setMarkerClusteringEnabled(true)
    else
        map.getSettings().setMarkerClusteringEnabled(false)
}
```

```kotlin
fun toggleClustering(view: View) {
    val toggleButton = view as ToggleButton
    map.settings.isMarkerClusteringEnabled = toggleButton.isChecked
}
```
