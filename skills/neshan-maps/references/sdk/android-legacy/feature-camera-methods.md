---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/camera-methods/
title: متد های کار با دوربین (Camera Methods)
---

# متدهای کار با دوربین

در این آموزش هدف ما معرفی متدهای کار با دوربین است.

## متد moveToCameraBounds

به منظور نمایش محدوده ای دلخواه از نقشه استفاده میشود.

### **نحوه استفاده:**

- java
- kotlin

```java
LatLng northEast = new LatLng(maxLat, maxLng);
LatLng southWest = new LatLng(minLat, minLng);

mapView.moveToCameraBounds(new LatLngBounds(northEast, southWest),
new ScreenBounds(new ScreenPos(0, 0), new ScreenPos(mapView.getWidth(), mapView.getHeight())),
integerZoom, duration);
```

```kotlin
val northEast = LatLng(maxLat, maxLng)
val southWest = LatLng(minLat, minLng)

mapView.moveToCameraBounds(
    LatLngBounds(northEast, southWest),
    ScreenBounds(ScreenPos(0f, 0f), ScreenPos(mapView.getWidth(), mapView.getHeight())),
    integerZoom, duration
)
```

در نمونه کد بالا، متد **moveToCameraBounds** محدوده بین نقاط **northEast (شمال شرقی)** و **southWest (جنوب غربی)** را نمایش میدهد.

### **پارامترها:**

- **LatLngBounds:** این پارامتر محدوده نمایش نقشه را توسط مشخص کردن 2 نقطه شمال شرقی و جنوب غربی تعیین میکند.
- **ScreenBounds:** تعیین کننده قسمتی از صفحه است که قرار است محدوده روی آن نمایش داده شود.
- **IntegerZoom:** در صورت **true** بودن، نزدیک ترین زوم **integer** برای محدوده انتخاب میشود و در صورت **false** بودن زوم محدوده دقیقا روی نقاط انتخابی شمال شرقی و جنوب غربی قرار میگیرد.
- **Duration:** مدت زمان انیمیشن نمایش محدوده به ثانیه

## متد moveCamera

برای جابجا کردن دوربین استفاده میشود.

**نحوه استفاده:**

- java
- kotlin

```java
LatLng pos = new LatLng(latitude,longitude);
mapView.moveCamera(pos,durationInSeconds);
```

```kotlin
val pos = LatLng(latitude, longitude)
mapView.moveCamera(pos, durationInSeconds)
```

نمونه کد بالا دوربین را روی نقطه ای با مختصات **latitude** و **longitude** انتقال میدهد.

### **پارامترها:**

- **pos:** نقطه ای که دوربین رو آن قرار میگیرد.
- **durationInSeconds:** مدت زمان اجرای انیمیشن حرکت دوربین به ثانیه

## متد setOnCameraMoveListener

هنگامی که دوربین حرکت کند این متد صدا زده میشود.

### **نحوه استفاده:**

- java
- kotlin

```java
mapview.setOnCameraMoveListener(new MapView.OnCameraMoveListener() {
    @Override
    public void onCameraMove() {

    }
});
```

```kotlin
mapview.setOnCameraMoveListener(OnCameraMoveListener {

})
```

هنگامی که نقشه شروع به حرکت کند متد **onCameraMove** صدا زده میشود. این متد تا زمانی که نقشه در حال حرکت باشد صدا زده میشود.

## متد setOnCameraMoveStartListener

هنگامی که دوربین شروع به حرکت کند صدا زده میشود.

- java
- kotlin

```java
mapView.setOnCameraMoveStartListener(new MapView.OnCameraMoveStartListener() {
    @Override
    public void onCameraMoveStart(int i) {

    }
});
```

```kotlin
mapView.setOnCameraMoveStartListener(OnCameraMoveStartListener {

})
```

مقدار متغیر **i** بر اساس اینکه کاربر دوربین را حرکت داده است یا توسط متد **moveCamera** حرکت کرده است متفاوت است. مقدار i هنگامی که کاربر حرکت را خاتمه دهد برابر عدد **3** و هنگامی که توسط متد **moveCamera** یا متد **setCameraZoom** یا متد **setBearing** و یا متد **setTilt** حرکت کرده و خاتمه پیدا کند برابر عدد **1** خواهد بود.

## متد setOnCameraMoveFinishedListener

هنگامی که دوربین از حرکت بایستد صدا زده میشود.

- java
- kotlin

```java
mapView.setOnCameraMoveFinishedListener(new MapView.OnCameraMoveFinishedListener() {
    @Override
    public void onCameraMoveFinished(int i) {

     }
});
```

```kotlin
mapView.setOnCameraMoveFinishedListener(OnCameraMoveFinishedListener {

})
```

مقدار متغیر **i** بر اساس اینکه کاربر دوربین را حرکت داده است یا توسط متد **moveCamera** حرکت کرده است متفاوت است. مقدار i هنگامی که کاربر حرکت را خاتمه دهد برابر عدد **3** و هنگامی که توسط متد **moveCamera** یا متد **setCameraZoom** یا متد **setBearing** و یا متد **setTilt** حرکت کرده و خاتمه پیدا کند برابر عدد **1** خواهد بود.

## متد getCameraTargetPosition

مختصات وسط نقشه را در قالب یک آبجکت **LatLng** برمیگرداند.

- java
- kotlin

```java
mapView.getCameraTargetPosition();
```

```kotlin
map.cameraTargetPosition
```
