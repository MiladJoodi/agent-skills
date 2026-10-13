---
source: https://platform.neshan.org/docs/sdk/ios/neshan-ios-sdk-getting-started/
title: iOS SDK کیت توسعه نقشه نشان مبتنی بر MapLibre برای iOS
---

# کیت توسعه iOs نشان چیست؟

**کیت توسعه iOS نشان (iOS SDK)** نسخه‌ای از SDK نقشه‌ی نشان برای iOS است که مستقیماً بر پایه‌ی **[MapLibre Native](https://maplibre.org/)** ساخته شده — همان موتور متن‌باز نمایش نقشه‌ی وکتور که در Android SDK نشان نیز استفاده می‌شود.

## اصل ماجرا

این SDK دقیقاً یک نسخه‌ی استاندارد از `MLNMapView` (کلاس اصلی نقشه در MapLibre Native برای iOS) است — با همان کلاس‌ها، همان API و همان مستندات رسمی MapLibre — که تنها یک تنظیم اضافه (کلید API نشان در `Info.plist`) به آن افزوده شده است.

این یعنی:

- **همیشه به‌روز:** این SDK بر پایه‌ی **آخرین نسخه‌ی پایدار MapLibre Native** ساخته و منتشر می‌شود.
- **تمام قابلیت‌های MapLibre در دسترس است:** هیچ محدودیتی نسبت به نسخه‌ی اصلی MapLibre Native اعمال نشده است. هر آنچه در [مستندات رسمی MapLibre Native برای iOS](https://maplibre.org/maplibre-native/ios/api/) پیدا می‌کنید در این SDK هم در دسترس شماست:
  - نمایش نقشه‌ی وکتور با تمام انواع لایه‌ها (`fill`، `line`، `circle`، `symbol`، `raster`، `heatmap`، `hillshade` و ...)
  - افزودن منابع دلخواه (`GeoJSON`، `Vector`، `Raster`) و لایه‌های سفارشی از طریق `MLNStyle`
  - **Style Expressions** برای استایل‌دهی پویا و شرطی به لایه‌ها
  - انیمیشن و کنترل کامل دوربین (`centerCoordinate`، `zoomLevel`، `direction`، `camera`)
  - نمایش موقعیت مکانی کاربر (`showsUserLocation`)
  - annotation های استاندارد (`MLNPointAnnotation`، `MLNPolyline`، `MLNPolygon`) و سفارشی‌سازی نمایش آن‌ها از طریق `MLNMapViewDelegate`
- **مهاجرت آسان:** اگر پیش‌تر با MapLibre Native یا Mapbox Maps SDK (نسخه‌های قدیمی‌تر) روی iOS کار کرده باشید، همه‌ی دانش و کدهای شما مستقیماً قابل استفاده است.

این SDK به صورت یک بسته‌ی **Swift Package** (شامل `Package.swift` و `MapLibre.xcframework`) منتشر می‌شود؛ نیازی به CocoaPods یا هیچ ابزار مدیریت وابستگی دیگری نیست.

## قدم بعدی

برای شروع، صفحه‌ی راه‌اندازی کیت توسعه را مطالعه کنید. سپس می‌توانید از طریق منوی **امکانات کیت توسعه iOS** با نحوه‌ی تغییر استایل نقشه، افزودن نشانه‌گر و رسم خط آشنا شوید.
