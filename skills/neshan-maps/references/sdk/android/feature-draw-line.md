---
source: https://platform.neshan.org/docs/sdk/android/features/android-sdk-draw-line/
title: رسم خط
---

# رسم خط

در این بخش، هدف رسم یک خط (Polyline) بر روی نقشه با استفاده از مجموعه‌ای از نقاط جغرافیایی است.

## رسم خط ساده

برای رسم خط، ابتدا یک `PolylineOptions` ساخته و نقاط تشکیل‌دهنده‌ی خط را با متد `add` به آن اضافه می‌کنیم؛ سپس با فراخوانی `addPolyline` روی نقشه، خط رسم می‌شود:

- kotlin
- java

```kotlin
mapView.getMapAsync { map ->
    map.setStyle(Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/light.json"))
    drawLine(map)
}

private fun drawLine(map: MapLibreMap): Polyline {
    val options = PolylineOptions()
        .add(LatLng(35.769368, 51.327650))
        .add(LatLng(35.756670, 51.323889))
        .add(LatLng(35.746670, 51.383889))
        .color(Color.parseColor("#2277BD"))
        .width(4f)

    val polyline = map.addPolyline(options)

    // متمرکز کردن دوربین روی نقطه‌ی ابتدای خط
    map.cameraPosition = CameraPosition.Builder()
        .target(LatLng(35.769368, 51.327650))
        .zoom(14.0)
        .build()

    return polyline
}
```

```java
mapView.getMapAsync(map -> {
    map.setStyle(new Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/light.json"));
    drawLine(map);
});

private Polyline drawLine(MapLibreMap map) {
    PolylineOptions options = new PolylineOptions()
        .add(new LatLng(35.769368, 51.327650))
        .add(new LatLng(35.756670, 51.323889))
        .add(new LatLng(35.746670, 51.383889))
        .color(Color.parseColor("#2277BD"))
        .width(4f);

    Polyline polyline = map.addPolyline(options);

    // متمرکز کردن دوربین روی نقطه‌ی ابتدای خط
    map.setCameraPosition(new CameraPosition.Builder()
        .target(new LatLng(35.769368, 51.327650))
        .zoom(14.0)
        .build());

    return polyline;
}
```

نکته

متد add هم یک نقطه‌ی تکی (LatLng) و هم چندین نقطه به صورت آرایه (add(LatLng...)) می‌پذیرد، بنابراین می‌توانید به جای چندین بار فراخوانی add، همه‌ی نقاط را یکجا هم ارسال کنید.

## شفافیت خط

با متد `alpha` می‌توانید میزان شفافیت خط را بین `0` (کاملاً شفاف) تا `1` (کاملاً مات) تنظیم کنید:

- kotlin
- java

```kotlin
val options = PolylineOptions()
    .add(latLng1, latLng2, latLng3)
    .color(Color.parseColor("#2277BD"))
    .width(4f)
    .alpha(0.7f)
```

```java
PolylineOptions options = new PolylineOptions()
    .add(latLng1, latLng2, latLng3)
    .color(Color.parseColor("#2277BD"))
    .width(4f)
    .alpha(0.7f);
```

## حذف خط

با استفاده از شیء `Polyline` ساخته شده و متد `removePolyline`، خط رسم‌شده از روی نقشه حذف می‌شود:

- kotlin
- java

```kotlin
map.removePolyline(polyline)
```

```java
map.removePolyline(polyline);
```

## افزودن چندین خط به صورت یکجا

مشابه مارکرها، برای افزودن همزمان چند خط بهتر است از متد `addPolylines` استفاده کنید:

- kotlin
- java

```kotlin
val allOptions = listOf(
    PolylineOptions().add(latLng1, latLng2).color(Color.RED),
    PolylineOptions().add(latLng3, latLng4).color(Color.BLUE),
)
val polylines = map.addPolylines(allOptions)
```

```java
List<PolylineOptions> allOptions = Arrays.asList(
    new PolylineOptions().add(latLng1, latLng2).color(Color.RED),
    new PolylineOptions().add(latLng3, latLng4).color(Color.BLUE)
);
List<Polyline> polylines = map.addPolylines(allOptions);
```

## سایر کارهای معمول (Routine)

- **رسم چندضلعی (Polygon):** دقیقاً مشابه خط است، با استفاده از `PolygonOptions` (متدهای `add`، `fillColor`، `strokeColor`، `alpha`) و `map.addPolygon(...)` / `map.removePolygon(...)`.
- **جابه‌جایی و زوم دوربین:** با تنظیم `map.cameraPosition` (یا `map.setCameraPosition(...)` در جاوا) به یک `CameraPosition.Builder` جدید که `target`، `zoom`، `bearing` و `tilt` دلخواه را دارد.
- **دریافت موقعیت فعلی دوربین:** با متد `map.cameraPosition` (getter).
- **پاک کردن همه‌ی annotation ها:** با فراخوانی `map.clear()` تمام مارکرها، خطوط و چندضلعی‌های افزوده‌شده به نقشه حذف می‌شوند.

برای مطالعه‌ی نحوه‌ی افزودن مارکر، صفحه‌ی افزودن نشانه‌گر را ببینید.
