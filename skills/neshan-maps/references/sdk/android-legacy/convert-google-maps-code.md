---
source: https://platform.neshan.org/docs/sdk/android/legacy/convert-google-code/
title: تبدیل کد گوگل به نشان (jetpack-compose)
---

# تبدیل کد گوگل به نشان

این آموزش برخی از موارد استفاده بسیار ابتدایی را نمایش می‌دهد تا به شما کمک کند برنامه اندروید خود را در سریع‌ترین زمان ممکن از API های **گوگل** به **نشان** تغییر دهید.

## نحوه بدست آوردن لایسنس برای استفاده از نقشه نشان

جهت نمایش نقشه نشان، باید پس از ثبت نام، اقدام به ساخت یک فایل لایسنس از طریق پنل توسعه دهندگان نشان کرده و آن را در پروژه خود جایگذاری کنید.

- [ثبت نام و ایجاد کلید دسترسی](https://platform.neshan.org/panel)
- جهت اطلاع از نحوه ساخت فایل لایسنس می‌توانید به صفحه شروع کار با کیت توسعه اندروید مراجعه نمایید.

## مقداردهی اولیه و افزودن نقشه به پروژه

### نحوه افزودن نقشه در فایل `layout`

- Google
- Neshan

افزودن یک map fragment به `MainActivity`

```xml
<fragment
android:id="@+id/mapFragment"
android:name="com.google.android.gms.maps.SupportMapFragment"
android:layout_width="match_parent"
android:layout_height="match_parent"/>
```

افزودن `View` ی مربوط به نقشه به فایل `layout` مربوط به `MainActivity`

```xml
<org.neshan.mapsdk.MapView
android:id="@+id/map"
android:layout_width="match_parent"
android:layout_height="match_parent"/>
```

### نحوه مقداردهی و استفاده از نقشه در Activity

- Google
- Neshan

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    SupportMapFragment mapFragment =
            (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
    mapFragment.getMapAsync(this);
}

@Override
public void onMapReady(GoogleMap googleMap) {

}
```

- java
- kotlin

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    //Init mapView
    mapView = findViewById(R.id.map_view);
}

@Override
    protected void onStart() {
    super.onStart();
    //Use mapView object
}
```

```kotlin
  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)
      setContentView(R.layout.activity_add_label)
      //Init mapView
      mapView = findViewById(R.id.mapview)
  }

  override fun onStart() {
      super.onStart()
      //Use mapView object here
  }
```

## افزودن نشانگر (مارکر) به نقشه

- Google
- Neshan

```java
LatLng tehran= new LatLng(35.716896, 51.361854);
googleMap.addMarker(new MarkerOptions().position(tehran).title("تهران"));
googleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(amsterdam, 10));
```

- java
- kotlin

```java
LatLng tehran = new LatLng(35.713153, 51.3665584);

AnimationStyleBuilder animStBl = new AnimationStyleBuilder();
animStBl.setFadeAnimationType(AnimationType.ANIMATION_TYPE_SMOOTHSTEP);
animStBl.setSizeAnimationType(AnimationType.ANIMATION_TYPE_SPRING);
animStBl.setPhaseInDuration(0.5f);
animStBl.setPhaseOutDuration(0.5f);
AnimationStyle animSt = animStBl.buildStyle();

MarkerStyleBuilder markStCr = new MarkerStyleBuilder();
markStCr.setSize(30f);
markStCr.setBitmap(BitmapUtils.createBitmapFromandroidBitmap(BitmapFactory.decodeResource(getResources(), org.neshan.mapsdk.R.drawable.ic_marker)));
markStCr.setAnimationStyle(animSt);
MarkerStyle markSt = markStCr.buildStyle();

Marker marker = new Marker(tehran, markSt);

neshanMap.addMarker(marker);

neshanMap.moveCamera(tehran,0.5f);
neshanMap.setZoom(10,0.5f);
```

```kotlin
val tehran = LatLng(35.713153, 51.3665584)

val animStBl = AnimationStyleBuilder()
animStBl.fadeAnimationType = AnimationType.ANIMATION_TYPE_SMOOTHSTEP
animStBl.sizeAnimationType = AnimationType.ANIMATION_TYPE_SPRING
animStBl.phaseInDuration = 0.5f
animStBl.phaseOutDuration = 0.5f
val animSt = animStBl.buildStyle()

val markStCr = MarkerStyleBuilder()
markStCr.size = 30f
markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
    BitmapFactory.decodeResource(
        resources, org.neshan.mapsdk.R.drawable.ic_marker
    )
)
markStCr.animationStyle = animSt
val markSt = markStCr.buildStyle()

val marker = Marker(tehran, markSt)

neshanMap.addMarker(marker)

neshanMap.moveCamera(tehran, 0.5f)
neshanMap.setZoom(10, 0.5f)
```
