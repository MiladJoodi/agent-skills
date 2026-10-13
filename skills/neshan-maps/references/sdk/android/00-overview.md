---
source: https://platform.neshan.org/docs/sdk/android/neshan-android-sdk-getting-started/
title: Android SDK کیت توسعه نقشه نشان مبتنی بر MapLibre برای اندروید
---

# کیت توسعه اندروید نشان چیست؟

**کیت توسعه اندروید نشان (Native Android SDK)** نسخه‌ی جدیدی از SDK نقشه‌ی نشان برای اندروید است که مستقیماً بر پایه‌ی **[MapLibre Native](https://maplibre.org/)** — یکی از قدرتمندترین و پرکاربردترین موتورهای متن‌باز نمایش نقشه‌ی وکتور — ساخته شده است.

## بر پایه‌ی MapLibre Native

کیت توسعه یک نسخه‌ی استاندارد از MapLibre Native که تنها نیاز به تنظیم یک کلید دارد. تمام کلاس‌ها، APIها و رفتار کتابخانه مطابق با نسخه‌ی رسمی MapLibre Native است.

این یعنی:

- **همیشه به‌روز:** این SDK بر پایه‌ی **آخرین نسخه‌ی پایدار MapLibre Native** ساخته و منتشر می‌شود.
- **تمام قابلیت‌های MapLibre در دسترس است:** هیچ محدودیتی نسبت به نسخه‌ی اصلی MapLibre Native اعمال نشده است. هر آنچه در [مستندات رسمی MapLibre Native برای اندروید](https://maplibre.org/maplibre-native/android/api/) پیدا می‌کنید — از جمله موارد زیر — در این SDK هم به همان شکل در دسترس شماست:
  - نمایش نقشه‌ی وکتور با تمام انواع لایه‌ها (`fill`، `line`، `circle`، `symbol`، `raster`، `heatmap`، `hillshade` و ...)
  - افزودن منابع دلخواه (`GeoJSON`، `Vector`، `Raster`) و لایه‌های سفارشی
  - **Style Expressions** برای استایل‌دهی پویا و شرطی به لایه‌ها
  - انیمیشن و کنترل کامل دوربین (`target`، `zoom`، `bearing`، `tilt`)
  - نمایش موقعیت مکانی کاربر (`Location Component`)
  - پشتیبانی از annotation های استاندارد (مارکر، خط، چندضلعی) و امکان استفاده از [MapLibre Annotation Plugin](https://github.com/maplibre/maplibre-plugins-android) برای نیازهای پیشرفته‌تر مانند clustering
- **مهاجرت آسان:** اگر با MapLibre Native یا Mapbox GL (نسخه‌های قدیمی‌تر) کار کرده باشید، همه‌ی دانش و کدهای شما مستقیماً قابل استفاده است.

## قدم بعدی

برای شروع، صفحه‌ی راه‌اندازی کیت توسعه را مطالعه کنید. سپس می‌توانید از طریق منوی **امکانات کیت توسعه اندروید** با نحوه‌ی تغییر استایل نقشه، افزودن نشانه‌گر و رسم خط آشنا شوید.
