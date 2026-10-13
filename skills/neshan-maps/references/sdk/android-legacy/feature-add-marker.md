---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-sdk-add-marker/
title: افزودن نشانه گر (Add Marker)
---

# نسخه 1.0.3

در این آموزش هدف ما اضافه کردن یک نشانگر بر روی نقطه‌ای از نقشه است که کاربر بر روی آن نقطه لمس طولانی کرده است.

## ایجاد نشانه‌گر

### تغییرات در لی‌اوت `activity_add_marker.xml`

فایل لی‌اوت این بخش صرفا شامل یک نقشه از کلاس `org.neshan.mapsdk.MapView` است.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="activity.AddLabel">

    <org.neshan.mapsdk.MapView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"/>

</android.support.constraint.ConstraintLayout>
```

### اضافه کردن نشانه گر

در فایل `AddMarker.java` و یا فایل `DrawArc.kt` مراحل زیر را انجام می‌دهیم.

متغیری از نوع `MapView` جهت دریافت المان نقشه که در فایل لی‌اوت وجود دارد در نظر گرفته شده‌است و متغیری از نوع `AnimationStyle` برای انیمیشن ایجاد نشانه ها.

- java
- kotlin

```java
// map UI element
private MapView map;

// marker animation style
private AnimationStyle animSt;
```

```kotlin
// map UI element
private lateinit var mapView: MapView

// marker animation style
private lateinit var animSt: AnimationStyle
```

متد `initLayoutRefrences` جهت مقداردهی اولیه کردن به تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است. به دلیل این که لازم است تا المان اندرویدی **نقشه نشان** ابتدا به طور کامل ایجاد شود و سپس با آن تعامل برقرار شود (متدهای مختلف بر روی المان نقشه اجرا شود)، تمامی متدهای مربوط به رابط کاربری باید در متد `onStart` انجام شوند.

- java
- kotlin

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);

  // starting app in full screen
  requestWindowFeature(Window.FEATURE_NO_TITLE);
  getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
  setContentView(R.layout.activity_add_marker);
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

در این متد تمامی المان‌های مربوط به رابط کاربری – که در اینجا فقط نقشه نشان است – دریافت شده و به متغیری نسبت داده می‌شوند.

- java
- kotlin

```java
// We use findViewByID for every element in our layout file here
private void initViews(){
  map = findViewById(R.id.map);
}
```

```kotlin
// We use findViewByID for every element in our layout file here
private fun initViews() {
    mapView = findViewById(R.id.mapview)
}
```

در این متد ابتدا متد `initViews` صدا زده می شود که برای دریافت المان‌های رابط کاربری است و سپس `listener` های مورد نیاز برای نقشه تعریف می شود که در ادامه توضیح داده می شوند. یک `OnMapClickListener` بر روی نقشه **set** می‌شود. هنگامی که هر کلیک بر روی نقشه انجام شود، تابع `onMapClick` صدا زده می‌شود که اینجا بدلیل استفاده از کد **lambda** نام این تابع نوشته نشده است. در این تابع با استفاده از موقعیتی که کاربر بر روی آن کلیک کرده، متد `createMarker` جهت ساخت یک نشانه جدید فراخوانی می شود و خروجی آن که یک شی از نوع `Marker` است به متد `addMarker` نقشه ارسال می شود تا نشانه جدید بر روی نقشه اضافه شده و نمایش داده شود.

همچنین یک `OnMarkerClickListener` تعریف شده که به هنگام کلیک شدن بر روی هر یک از نشانه های موجود بر روی نقشه فرخوانی خواهد شد. در این تابع نشانه ای که بر روی آن کلیک شده را دریافت کرده و با کمک تابع `changeMarkerToBlue` که جلوتر توضیح داده می شود، رنگ آن نشانه را به آبی تغییر می دهیم.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
    // Initializing views
    initViews();

    // when clicked on map, a marker is added in clicked location
    map.setOnMapLongClickListener(latLng -> {
       map.addMarker(createMarker(latLng));
    });
    // when on marker clicked, change marker style to blue
    map.setOnMarkerClickListener(marker1 -> {
        changeMarkerToBlue(marker1);
    });
}
```

```kotlin
// Initializing layout references (views, map and map events)
private fun initLayoutReferences() {
  // Initializing views
  initViews()

  // when long clicked on map, a marker is added in clicked location
  mapView.setOnMapLongClickListener {
      mapView.addMarker(createMarker(it))
  }
  // when on marker clicked, change marker style to blue
  mapView.setOnMarkerClickListener { marker1: Marker ->
      changeMarkerToBlue(marker1)
  }
}
```

متد `addMarker` یک نقطه جغرافیایی از نوع `LatLng` دریافت می‌کند. سپس برای ساخت انیمیشنِ ایجاد نشانگر بر روی نقشه، ابتدا یک شی از کلاس `AnimationStyleBuilder` ساخته و ویژگی‌های انیمیشن از جمله اندازه آن، نوع محو شدن و مدت ‌زمان‌های شروع و پایان انیمیشن در این شی **set** می‌شود. در نهایت با صدا زدن متد `buildStyle` بر روی این شی، شی‌ای از نوع `AnimationStyle` ساخته می‌شود. برای ایجاد **style** نشان‌گر نیز ابتدا یک شی از کلاس `MarkerStyleBuilder` ساخته می‌شود، سپس ویژگی‌های نشان‌گر مورد نظر بر روی آن **set** می‌شود. از جمله این ویژگی‌ها، نوع انیمیشن آن است که در بخش قبل ساخته شده است. در نهایت با صدا زدن متد `buildStyle` شی ای از نوع `MarkerStyle` به وجود می‌آید. در ادامه یک شی از نوع **Marker** ساخته می‌شود که سازنده آن، مکان درج نشان‌گر و **style** آن را به عنوان ورودی دریافت می‌کند. نشان‌گر ساخته شده به عنوان خروجی متد برگردانده می شود تا با استفاده از متد `map.addMarker(marker)` به نقشه اضافه شود

- java
- kotlin

```java
// This method gets a LatLng as input and adds a marker on that position
private Marker createMarker(LatLng loc) {
    // Creating animation for marker. We should use an object of type AnimationStyleBuilder, set
    // all animation features on it and then call buildStyle() method that returns an object of type
    // AnimationStyle
    AnimationStyleBuilder animStBl = new AnimationStyleBuilder();
    animStBl.setFadeAnimationType(AnimationType.ANIMATION_TYPE_SMOOTHSTEP);
    animStBl.setSizeAnimationType(AnimationType.ANIMATION_TYPE_SPRING);
    animStBl.setPhaseInDuration(0.5f);
    animStBl.setPhaseOutDuration(0.5f);
    animSt = animStBl.buildStyle();

    // Creating marker style. We should use an object of type MarkerStyleCreator, set all features on it
    // and then call buildStyle method on it. This method returns an object of type MarkerStyle
    MarkerStyleBuilder markStCr = new MarkerStyleBuilder();
    markStCr.setSize(30f);
    markStCr.setBitmap(BitmapUtils.createBitmapFromandroidBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.ic_marker)));
    // AnimationStyle object - that was created before - is used here
    markStCr.setAnimationStyle(animSt);
    MarkerStyle markSt = markStCr.buildStyle();

    // Creating marker
    return new Marker(loc, markSt);
}
```

```kotlin
// This method gets a LatLng as input and adds a marker on that position
private fun createMarker(loc: LatLng): Marker {
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
    markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
        BitmapFactory.decodeResource(
            resources, R.drawable.ic_marker
        )
    )
    // AnimationStyle object - that was created before - is used here
    markStCr.animationStyle = animSt
    val markSt = markStCr.buildStyle()

    // Creating marker
    return Marker(loc, markSt)
}
```

متد `changeMarkerToBlue` که با کلیک بر روی هر نشانه فراخوانی می شود، یک نشانگر را به عنوان پارامتر ورودی دریافت میکند و با استفاده از `MarkerStyleBuilder` یک استایل با آیکون `ic_marker_blue` ساخته و به نشانه مورد نظر ست میکند. به این ترتیب با کلیک بر روی هر نشانه، آیکون آن از قرمز به رنگ آبی تغییر میکند.

- java
- kotlin

```java
private void changeMarkerToBlue(Marker redMarker) {
    // create new marker style
    MarkerStyleBuilder markStCr = new MarkerStyleBuilder();
    markStCr.setSize(30f);
    // Setting a new bitmap as marker
    markStCr.setBitmap(BitmapUtils.createBitmapFromandroidBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.ic_marker_blue)));
    markStCr.setAnimationStyle(animSt);
    MarkerStyle blueMarkSt = markStCr.buildStyle();

    // changing marker style using setStyle
    redMarker.setStyle(blueMarkSt);
}
```

```kotlin
private fun changeMarkerToBlue(redMarker: Marker) {
  // create new marker style
  val markStCr = MarkerStyleBuilder()
  markStCr.size = 30f
  // Setting a new bitmap as marker
  markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
      BitmapFactory.decodeResource(
          resources, R.drawable.ic_marker_blue
      )
  )
  markStCr.animationStyle = animSt
  val blueMarkSt = markStCr.buildStyle()

  // changing marker style using setStyle
  redMarker.setStyle(blueMarkSt)
}
```

## حذف نشانگر

همچنین با استفاده از شی `marker` ساخته شده و متد `removeMarker` می توان نشانه رسم شده بر روی نقشه را بصورت زیر از روی نقشه حذف کرد:

- java
- kotlin

```java
map.removeMarker(marker);
```

```kotlin
map.removeMarker(marker)
```

## دسته بندی نشانگرها

گاهی لازم است تا مارکرها جهت مدیریت آسان تر دسته بندی شوند.

برای مثال نیاز به تعدادی مارکر داریم که روی نقشه نمایش داده شوند و در زمانی تعدادی از آنها حذف شوند و تعدادی باقی بمانند. حذف این مارکرها به صورت دستی کار دشواریست. بدین منظور میتوانید مارکرها را به صورت دسته بندی شده روی نقشه اضافه نمایید تا هنگامی که نیاز به حذف مارکرهای دلخواه داشتید توسط یک دستور این کار را انجام دهید.

توسط صدا زدن متد addMarker با پارامترهای زیر میتوانید مارکرها را دسته بندی کنید:

- java
- kotlin

```java
map.addMarker(marker(Marker), categoryId(String))
```

```kotlin
map.addMarker(marker(Marker), categoryId(String))
```

با استفاده از متد addMarker به صورت بالا، میتوان مارکرها را دسته بندی کرد. پارامتر اول آبجکت marker و پارامتر دوم آی دی مربوط به دسته بندی مورد نظرتان که از نوع String است میباشد.

برای مثال نمونه کد زیر 2 مارکر را که دسته بندی آنها **category1** است به نقشه اضافه میکند.

- java
- kotlin

```java
map.addMarker(marker1,"category1");
map.addMarker(marker2,"category1");
```

```kotlin
map.addMarker(marker1,"category1");
map.addMarker(marker2,"category1");
```

برای حذف مارکرهای دسته بندی شده میتوانید از متد **clearCategoryMarkers** به صورت زیر استفاده نمایید:

- java
- kotlin

```java
map.clearCategoryMarkers(categoryId(String));
```

```kotlin
map.clearCategoryMarkers(categoryId(String));
```

که در مثال بالا برای حذف مارکرهای با دسته بندی **category1** به جای پارامتر متد مقدار **"category1"** را ارسال میکنیم.

## Info window

گاهی پیش می اید که برای یک نقطه از نقشه که توسط مارکر (نشانگر) مشخص شده است لازم است تا اطلاعاتی نمایش داده شود. برای این منظور میتوانید از `info window` استفاده کنید.

جهت نمایش info window کافی است یک Title و Description به صورت زیر ماکر اضافه کنید سپس متد showInfoWindow را صدا بزنید

- java
- kotlin

```java
marker.setTitle("عنوان").setDescription("توضیحات").showInfoWindow();
```

```kotlin
marker.title = "تایتل"
marker.description = "توضیحات"
marker.showInfoWindow()
```

### شخصی سازی Info window

توسط یک شی از کلاس balloonPopupStyleBuilder میتوان استایل مربوط به info window را شخصی سازی کرد.

متدهای زیر روی شی balloonPopupStyleBuilder صدا زده میشود:

**setLeftColor:** متد setLeftColor برای تغییر رنگ نوار عمودی رنگی سمت چپ info window است.

**setCornerRadius:** متد setCorderRadius برای گرد کردن حاشیه infow window به کار میرود.

**setTriangleHeight:** متد setTriangleHeight برای تنظیم طول مثلث پایین info window کاربرد دارد.

**setTriangleWidth:** متد setTriangleWidth برای تنظیم عرض مثلث پایین info window کاربرد دارد.

**setVerticalOffset:** برخی اوقات نیاز است که info window به صورت عمودی یا افقی جابجا شود. برای جابجایی عمودی info window میتوان از متد etVerticalOffset و همچنین برای جابجایی افقی نیز میتوان از متد setHorzontalOffset استفاده کرد.

و در پایان پس از شخصی سازی توسط شی baaloonPopupStyleBuilder میتوان از طریق متد setInfoWindowStyle روی شی marker، استایل شخصی سازی شده را به مارکر به صورت زیر اختصاص داد:

- java
- kotlin

```java
marker.setInfoWindowStyle(balloonPopupStyleBuilder.buildStyle());
```

```kotlin
marker.infoWindowStyle = balloonPopupStyleBuilder.buildStyle()
```

## افزودن چندین نشانگر به صورت یکجا

توسط متد **addMarkers** که لیستی از نشانگرها را دریافت میکند میتوان تعداد زیادی از نشانگرها را به صورت یکجا به نقشه اضافه کرد.

- java
- kotlin

```java
List<Marker> markers = new ArrayList<>();
Marker marker1 = new Marker(latLng,markSt);
Marker marker2 = new Marker(latLng1,markSt);
Marker marker3 = new Marker(latLng2,markSt);
Marker marker4 = new Marker(latLng3,markSt);

markers.add(marker1);
markers.add(marker2);
markers.add(marker3);
markers.add(marker4);

mapView.addMarkers(markers);
```

```kotlin
val markers: MutableList<Marker> = ArrayList()
val marker1 = Marker(latLng1, markStyle1)
val marker2 = Marker(latLng2, markStyle2)
val marker3 = Marker(latLng3, markStyle3)
val marker4 = Marker(latLng4, markStyle4)

markers.add(marker1)
markers.add(marker2)
markers.add(marker3)
markers.add(marker4)

map.addMarkers(markers)
```

مثال بالا 4 مارکر **marker1** و **marker2** و **marker3** و **marker4** را توسط متد **addMarkers** به صورت یکجا به نقشه اضافه میکند.

## متد setAnchorPoint

گاهی عکس مارکری که میخواهید از آن استفاده نمایید به گونه ای است که نقطه ای که قرار است روی نقشه نشان دهد در یک سمت از عکس مارکر قرار دارد.

به عنوان مثال عکس زیر به نقطه ی زیر آن اشاره دارد:

!ic_marker_blue

در صورتی که عکس بالا برای مارکر انتخاب شود، به محض اضافه شدن در نقطه دلخواه روی نقشه، از قسمت تقریبی سمت راست و پایین عکس روی نقطه انتخابی شما روی نقشه اضافه میشود.

به عنوان مثال در صورتی که نقطه انتخابی شما روی نقشه نقطه ای با مختصات 35.70261,51.33571 باشد، پس از افزودن مارکر، عکس مارکر به صورت زیر روی نقشه اضافه میشود:

!selected_point

توسط متد **setAnchorPoint** که روی شی **markerStyleBuilder** صدا زده میشود، می‌توانید نقطه ای از عکس را که میخواهید دقیقا روی نقشه باشد را تنظیم نمایید.

پارامتر اول متد **setAnchorPoint** مقدار **X** و پارامتردوم مقدار **Y** است که از نوع **float** میباشد. با توجه به عکس مارکر خود میتوانید توسط پارامترها، مارکر را جابجا نموده تا در جای مناسب خود قرار بگیرد.

همچنین برای تنظیم طول یا عرض به صورت جداگانه نیز میتوانید از متدهای **setAnchorPointX** و **setAnchorPointY** استفاده نمایید.

## متد setOrientationMode

این متد روی شی **markerStyleBuilder** صدا زده میشود.

توسط این متد میتوان نوع نمایش مارکر نسبت به خم شدن و چرخیدن دوربین تعیین کرد.

مقادیر پارامترهای **setOrientationMode**:

- BillboardOrientation.BILLBOARD\_ORIENTATION\_GROUND
- BillboardOrientation.BILLBOARD\_ORIENTATION\_FACE\_CAMERA
- BillboardOrientation.BILLBOARD\_ORIENTATION\_FACE\_CAMERA\_GROUND

**BillboardOrientation.BILLBOARD\_ORIENTATION\_GROUND:**

در صورتی که این مقدار برای متد **setOrientationMode** ست شود، با تغییر زاویه (**Tilt**) و چرخاندن دوربین (**Bearing**)، مارکر ثابت مانده و تغییری در مدل نمایش آن دیده نمیشود.

**BillboardOrientation.BILLBOARD\_ORIENTATION\_FACE\_CAMERA:**

با ست کردن این مقدار برای متد **setOrientationMode** با چرخاندن(**Bearing**) و یا تغییر زاویه دوربین(**Tilt**)، مارکر همیشه رو به دوربین میباشد.

**BillboardOrientation.BILLBOARD\_ORIENTATION\_FACE\_CAMERA\_GROUND:**

با ست کردن این مقدار برای متد **setOrientationMode** مارکر با تغییر زاویه دوربین (**Tilt**) تغییری نمیکند و به صورت چسبیده به نقشه میماند ولی با چرخاندن دوربین(**Bearing**)، مارکر نیز همراه با دوربین میچرخد.

## نحوه چرخاندن مارکر

برای چرخاندن مارکر میتوانید از **Util** ی به نام **BitmapUtils** استفاده نمایید که از طریق آن میتوانید یک **Bitmap** را ویرایش کنید، از طریق متد **Rotate** به صورت زیر میتوانید عکس مربوط به مارکر را چرخانده و سپس عکس را دوباره به مارکر ست کنید:

- java
- kotlin

```java
MarkerStyleBuilder markerStyleBuilder = new MarkerStyleBuilder();
markerStyleBuilder.setBitmap(BitmapUtils.createBitmapFromandroidBitmap(BitmapUtils.rotate(BitmapFactory.decodeResource(getResources(), R.drawable.ic_marker),90)));
marker.setStyle(markerStyleBuilder.buildStyle());
```

```kotlin
val markerStyleBuilder = MarkerStyleBuilder()
markerStyleBuilder.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
    BitmapUtils.rotate(
        BitmapFactory.decodeResource(
            resources, org.neshan.kotlinsample.R.drawable.ic_marker
        ), 90.0
    )
)
marker.setStyle(markerStyleBuilder.buildStyle())
```

تکه کد بالا، عکس مارکر را **90** درجه چرخانده و روی شی **MarkerStyleBuilder** ست میکند و در نهایت استایل را از طریق متد **setStyle** روی مارکر ست میکند.

## حذف تمام مارکرها به صورت یکجا

برای حذف تمام مارکرهای اضافه شده به نقشه به صورت یکجا میتوانید از متد **clearMarkers** که روی شی نقشه صدا زده میشود استفاده نمایید.

- java
- kotlin

```java
map.clearMarkers();
```

```kotlin
map.clearMarkers()
```
