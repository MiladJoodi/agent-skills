---
source: https://platform.neshan.org/docs/sdk/android/features/android-sdk-change-map-style/
title: تغییر استایل نقشه
---

# تغییر استایل نقشه

نقشه نشان از استاندارد **Style JSON** مپ‌لیبر پیروی می‌کند. یعنی برای تغییر استایل نقشه فقط کافیست آدرس یک فایل استایل دیگر را به متد `setStyle` نقشه بدهید.

## استایل‌های آماده نشان

نشان چند استایل آماده برای نقشه فراهم کرده است که می‌توانید مستقیماً از آدرس آن‌ها استفاده کنید:

| استایل | آدرس |
| --- | --- |
| Light | `https://static.neshan.org/sdk/maplibre/styles/light.json` |
| Dark | `https://static.neshan.org/sdk/maplibre/styles/dark.json` |
| Monochrome Light | `https://static.neshan.org/sdk/maplibre/styles/monochrome_light.json` |
| Monochrome Dark | `https://static.neshan.org/sdk/maplibre/styles/monochrome_dark.json` |
| Pastel | `https://static.neshan.org/sdk/maplibre/styles/pastel.json` |

## اعمال استایل روی نقشه

برای اعمال یک استایل، کافیست از `Style.Builder().fromUri(url)` استفاده کرده و نتیجه را به متد `setStyle` نقشه بدهید:

- kotlin
- java

```kotlin
mapView.getMapAsync { map ->
    map.setStyle(Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/dark.json"))
}
```

```java
mapView.getMapAsync(map -> {
    map.setStyle(new Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/dark.json"));
});
```

### اطمینان از بارگذاری کامل استایل

در صورتی که بلافاصله بعد از تغییر استایل نیاز به افزودن مارکر، خط یا هر عنصر دیگری روی نقشه دارید، بهتر است از overload دومِ متد `setStyle` استفاده کنید که یک callback دریافت می‌کند. این callback تنها زمانی صدا زده می‌شود که استایل به طور کامل بارگذاری شده باشد:

- kotlin
- java

```kotlin
map.setStyle(Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/light.json")) { style ->
    // اکنون می‌توانید مارکر، خط یا لایه جدید اضافه کنید
}
```

```java
map.setStyle(new Style.Builder().fromUri("https://static.neshan.org/sdk/maplibre/styles/light.json"), style -> {
    // اکنون می‌توانید مارکر، خط یا لایه جدید اضافه کنید
});
```

## تعویض استایل با کلیک (مثال کاربردی)

مثال زیر با هر بار کلیک روی یک دکمه، استایل نقشه را به استایل بعدی در لیست استایل‌های آماده تغییر می‌دهد:

- kotlin
- java

```kotlin
private val styles = listOf(
    "https://static.neshan.org/sdk/maplibre/styles/light.json",
    "https://static.neshan.org/sdk/maplibre/styles/dark.json",
    "https://static.neshan.org/sdk/maplibre/styles/monochrome_light.json",
    "https://static.neshan.org/sdk/maplibre/styles/monochrome_dark.json",
    "https://static.neshan.org/sdk/maplibre/styles/pastel.json",
)
private var currentStyleIndex = 0

private fun switchToNextStyle(map: MapLibreMap) {
    currentStyleIndex = (currentStyleIndex + 1) % styles.size
    map.setStyle(Style.Builder().fromUri(styles[currentStyleIndex]))
}
```

```java
private final List<String> styles = Arrays.asList(
    "https://static.neshan.org/sdk/maplibre/styles/light.json",
    "https://static.neshan.org/sdk/maplibre/styles/dark.json",
    "https://static.neshan.org/sdk/maplibre/styles/monochrome_light.json",
    "https://static.neshan.org/sdk/maplibre/styles/monochrome_dark.json",
    "https://static.neshan.org/sdk/maplibre/styles/pastel.json"
);
private int currentStyleIndex = 0;

private void switchToNextStyle(MapLibreMap map) {
    currentStyleIndex = (currentStyleIndex + 1) % styles.size();
    map.setStyle(new Style.Builder().fromUri(styles.get(currentStyleIndex)));
}
```

## استفاده از استایل شخصی‌سازی شده

در صورتی که استایل اختصاصی خودتان را از طریق ویرایشگر استایل نقشه نشان دریافت کرده‌اید، به همان شکل کافیست آدرس فایل JSON آن استایل را به `fromUri` بدهید. همچنین در صورتی که فایل استایل را به صورت رشته JSON در اختیار دارید (مثلاً از حافظه داخلی دستگاه)، می‌توانید از متد `Style.Builder().fromJson(styleJson)` استفاده کنید.
