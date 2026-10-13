---
source: https://platform.neshan.org/docs/sdk/android/features/android-sdk-add-marker/
title: افزودن نشانگر
---

# افزودن نشانگر

در این بخش، هدف افزودن یک نشانگر (Marker) به نقطه‌ای از نقشه است که کاربر روی آن لمس طولانی (long click) کرده است.

نکته

این API، همان annotation API استاندارد و درون‌ساخت مپ‌لیبر است — بدون نیاز به افزودن هیچ کتابخانه‌ی جانبی برای کارهای معمول (افزودن، حذف، تغییر آیکون) کاملاً کافی است. برای نیازهای پیشرفته‌تر مانند clustering، می‌توانید از [MapLibre Annotation Plugin](https://github.com/maplibre/maplibre-plugins-android) به عنوان کتابخانه‌ای مجزا استفاده کنید.

## ایجاد نشانگر با لمس طولانی روی نقشه

با استفاده از `addOnMapLongClickListener`، هر بار که کاربر روی نقطه‌ای از نقشه لمس طولانی انجام دهد، یک مارکر در همان نقطه ایجاد می‌شود:

- kotlin
- java

```kotlin
mapView.getMapAsync { map ->
    map.setStyle(Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/light.json"))

    map.addOnMapLongClickListener { latLng ->
        createMarker(map, latLng)
        true
    }
}

private fun createMarker(map: MapLibreMap, position: LatLng): Marker {
    val icon = IconFactory.getInstance(this).fromResource(R.drawable.ic_marker)
    val markerOptions = MarkerOptions()
        .position(position)
        .icon(icon)
    return map.addMarker(markerOptions)
}
```

```java
mapView.getMapAsync(map -> {
    map.setStyle(new Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/light.json"));

    map.addOnMapLongClickListener(latLng -> {
        createMarker(map, latLng);
        return true;
    });
});

private Marker createMarker(MapLibreMap map, LatLng position) {
    Icon icon = IconFactory.getInstance(this).fromResource(R.drawable.ic_marker);
    MarkerOptions markerOptions = new MarkerOptions()
        .position(position)
        .icon(icon);
    return map.addMarker(markerOptions);
}
```

آیکون پیش‌فرض مارکر (بدون فراخوانی `icon(...)`) نیز از طریق `IconFactory.getInstance(context).defaultMarker()` در دسترس است.

## عنوان و توضیحات (Info Window)

با تعیین `title` و `snippet` روی `MarkerOptions`، با کلیک روی مارکر یک info window شامل عنوان و توضیحات نمایش داده می‌شود:

- kotlin
- java

```kotlin
val markerOptions = MarkerOptions()
    .position(position)
    .title("دفتر مرکزی نشان")
    .snippet("تهران، ایران")

val marker = map.addMarker(markerOptions)
marker.showInfoWindow(map, mapView)
```

```java
MarkerOptions markerOptions = new MarkerOptions()
    .position(position)
    .title("دفتر مرکزی نشان")
    .snippet("تهران، ایران");

Marker marker = map.addMarker(markerOptions);
marker.showInfoWindow(map, mapView);
```

به طور پیش‌فرض، در صورتی که مارکری دارای `title` باشد، با کلیک کاربر روی آن مارکر، info window به صورت خودکار نمایش داده می‌شود. برای پنهان کردن آن نیز کافیست متد `marker.hideInfoWindow()` را صدا بزنید.

## واکنش به کلیک روی مارکر

با استفاده از `setOnMarkerClickListener` می‌توانید رویداد کلیک روی هر مارکر را دریافت کنید:

- kotlin
- java

```kotlin
map.setOnMarkerClickListener { clickedMarker ->
    clickedMarker.icon = IconFactory.getInstance(this).fromResource(R.drawable.ic_marker_selected)
    true
}
```

```java
map.setOnMarkerClickListener(clickedMarker -> {
    // مثلاً تغییر آیکون مارکر کلیک‌شده
    clickedMarker.setIcon(IconFactory.getInstance(this).fromResource(R.drawable.ic_marker_selected));
    return true;
});
```

## حذف نشانه‌گر

برای حذف یک مارکر مشخص از روی نقشه، از متد `removeMarker` استفاده کنید:

- kotlin
- java

```kotlin
map.removeMarker(marker)
```

```java
map.removeMarker(marker);
```

برای حذف تمام annotation های نقشه (مارکر، خط، چندضلعی) به صورت یکجا نیز می‌توانید از متد `map.clear()` استفاده کنید.

## افزودن چندین نشانه‌گر به صورت یکجا

در صورتی که چندین مارکر دارید، به جای فراخوانی مکرر `addMarker`، بهتر است از متد `addMarkers` که لیستی از `MarkerOptions` دریافت می‌کند استفاده کنید — این روش کارایی بهتری دارد:

- kotlin
- java

```kotlin
val options = listOf(
    MarkerOptions().position(LatLng(35.6892, 51.3890)),
    MarkerOptions().position(LatLng(35.7219, 51.3347)),
    MarkerOptions().position(LatLng(35.6961, 51.4231)),
)
val markers = map.addMarkers(options)
```

```java
List<MarkerOptions> options = Arrays.asList(
    new MarkerOptions().position(new LatLng(35.6892, 51.3890)),
    new MarkerOptions().position(new LatLng(35.7219, 51.3347)),
    new MarkerOptions().position(new LatLng(35.6961, 51.4231))
);
List<Marker> markers = map.addMarkers(options);
```
