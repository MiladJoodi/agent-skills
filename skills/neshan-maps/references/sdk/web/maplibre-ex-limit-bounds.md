---
source: https://platform.neshan.org/docs/sdk/web/maplibre/examples/neshan-maplibre-limit-bounds/
title: محدود کردن ناحیه نمایش نقشه با MapLibre
---

# محدود کردن ناحیه نمایش نقشه در MapLibre نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

اگر سرویس شما فقط در یک شهر یا منطقه‌ مشخص فعال است، بهتر است کاربر نتواند نقشه را بیرون از آن محدوده ببرد. در این راهنما با پارامتر `maxBounds` جابه‌جایی نقشه را به محدوده‌ تهران محدود می‌کنیم و با `minZoom` و `maxZoom` بازه‌ بزرگ‌نمایی را هم می‌بندیم.

## مراحل پیاده‌سازی

### ۱- راه‌اندازی صفحه HTML

فایل CSS و JS کیت توسعه را از CDN لود می‌کنیم و یک `div` با شناسه‌ مشخص برای نمایش نقشه می‌سازیم:

```html
<!doctype html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.css" />
    <script src="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.umd.js"></script>
    <style>
        html, body { margin: 0; height: 100%; }
        #map { position: absolute; inset: 0; }
    </style>
</head>
<body>
<div id="map"></div>
<script>
    // کدهای جاوااسکریپت در اینجا قرار می‌گیرند
</script>
</body>
</html>
```

نکته

اگر با bundler (مثل Vite یا webpack) کار می‌کنید، به‌جای تگ script پکیج را نصب کنید و `import maplibregl from "@neshan-maps-platform/maplibre-sdk"` بزنید. جزئیات در صفحه‌ معرفی و راه‌اندازی آمده است.

### ۲- ساخت نقشه

```javascript
const maplibregl = window.maplibregl.default;

const map = new maplibregl.Map({
    container: "map",
    style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
    center: [51.389, 35.6892],
    zoom: 11,
    apiKey: "YOUR_WEB_API_KEY", // کلید دسترسی خود را اینجا وارد کنید
});

map.addControl(new maplibregl.NavigationControl());
```

نکته

برای ساخت کلید دسترسی مناسب این کیت توسعه، در پنل کاربری گزینه‌ **نقشه وب** را انتخاب کنید. برای امنیت بیشتر می‌توانید دامنه‌ سرور خود را در فیلد «دامنه/IP های مجاز» وارد کنید.

توجه

مقادیر `center` در MapLibre به‌صورت `[longitude, latitude]` هستند، یعنی **اول طول جغرافیایی و بعد عرض جغرافیایی** — برعکس ترتیبی که در وب‌سرویس‌های نشان استفاده می‌شود.

### ۳- تعریف محدوده و اعمال آن

محدوده با دو گوشه‌ جنوب‌غربی و شمال‌شرقی تعریف می‌شود و هر گوشه به‌صورت `[longitude, latitude]` است:

```javascript
// [[جنوب‌غربی], [شمال‌شرقی]]
const tehranBounds = [
    [51.20, 35.55],
    [51.60, 35.83],
];

const map = new maplibregl.Map({
    container: "map",
    style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
    center: [51.389, 35.6892],
    zoom: 11,
    minZoom: 10,
    maxZoom: 18,
    maxBounds: tehranBounds,
    apiKey: "YOUR_WEB_API_KEY",
});
```

نکته

`maxBounds` جابه‌جایی نقشه را محدود می‌کند ولی `minZoom` را خودش تنظیم نمی‌کند؛ اگر کاربر بتواند تا سطح کشور zoom out کند، محدوده معنای خود را از دست می‌دهد. پس این دو را با هم تنظیم کنید.

یادداشت

محدوده را می‌توانید در زمان اجرا هم عوض کنید: `map.setMaxBounds(bounds)` و برای برداشتن محدودیت `map.setMaxBounds(null)`.

## کد نهایی

پس از افزودن تمام بخش‌ها، محتویات کامل صفحه‌ شما به شکل زیر خواهد بود:

```html
<!doctype html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>نقشه نشان با MapLibre — محدود کردن ناحیه نمایش</title>
    <link
            rel="stylesheet"
            href="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.css"
    />
    <script
            src="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.umd.js">
    </script>
    <style>
        html, body { margin: 0; height: 100%; }
        #map { position: absolute; inset: 0; }
    </style>
</head>
<body>
<div id="map"></div>

<script>
    const maplibregl = window.maplibregl.default;

    // محدوده‌ مجاز جابه‌جایی نقشه: [[جنوب‌غربی], [شمال‌شرقی]]
    const tehranBounds = [
        [51.20, 35.55],
        [51.60, 35.83],
    ];

    const map = new maplibregl.Map({
        container: "map",
        style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
        center: [51.389, 35.6892],
        zoom: 11,
        minZoom: 10,
        maxZoom: 18,
        maxBounds: tehranBounds,
        apiKey: "YOUR_WEB_API_KEY",
    });

    map.addControl(new maplibregl.NavigationControl());

</script>
</body>
</html>
```

برای اطلاعات بیشتر می‌توانید به مستندات زیر مراجعه کنید:

- معرفی و راه‌اندازی کیت توسعه MapLibre نشان
- ویرایشگر استایل نقشه نشان
- [مستندات رسمی MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
