---
source: https://platform.neshan.org/docs/sdk/web/maplibre/examples/neshan-maplibre-get-coord/
title: دریافت مختصات با کلیک روی نقشه
---

# دریافت مختصات با کلیک روی نقشه در MapLibre نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در این راهنما به رویداد کلیک نقشه گوش می‌دهیم، مختصات نقطه‌ کلیک شده را می‌گیریم، مارکر را به آن نقطه منتقل می‌کنیم و مقدار طول و عرض جغرافیایی را نمایش می‌دهیم. این الگو پایه‌ هر فرم «انتخاب موقعیت روی نقشه» است.

## مراحل پیاده‌سازی

### ۱- راه‌اندازی صفحه HTML

فایل CSS و JS کیت توسعه را از CDN لود می‌کنیم و یک `div` با شناسه‌ مشخص به‌عنوان محفظه‌ نقشه می‌سازیم:

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
    zoom: 12,
    apiKey: "YOUR_WEB_API_KEY", // کلید دسترسی خود را اینجا وارد کنید
});

map.addControl(new maplibregl.NavigationControl());
```

نکته

برای ساخت کلید دسترسی مناسب این کیت توسعه، در پنل کاربری گزینه‌ **نقشه وب** را انتخاب کنید. برای امنیت بیشتر می‌توانید دامنه‌ سرور خود را در فیلد «دامنه/IP های مجاز» وارد کنید.

توجه

مقادیر `center` در MapLibre به‌صورت `[longitude, latitude]` هستند، یعنی **اول طول جغرافیایی و بعد عرض جغرافیایی** — برعکس ترتیبی که در وب‌سرویس‌های نشان استفاده می‌شود.

### ۳- افزودن کادر نمایش مختصات

یک `div` ساده روی نقشه می‌گذاریم تا مقدار مختصات را نشان دهد:

```html
<div id="coords">روی نقشه کلیک کنید</div>
```

```css
#coords {
    position: absolute;
    z-index: 1;
    top: 12px;
    right: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.92);
    font: 14px/1.7 Tahoma, sans-serif;
    direction: rtl;
}
```

### ۴- گوش دادن به رویداد کلیک

مختصات نقطه‌ کلیک‌شده در `e.lngLat` قرار دارد:

```javascript
let marker = null;
const box = document.getElementById("coords");

map.on("click", (e) => {
    const { lng, lat } = e.lngLat;

    if (marker) {
        marker.setLngLat([lng, lat]);
    } else {
        marker = new maplibregl.Marker().setLngLat([lng, lat]).addTo(map);
    }

    box.textContent = `عرض: ${lat.toFixed(6)} — طول: ${lng.toFixed(6)}`;
});
```

نکته

همین مختصات را می‌توانید به سرویس تبدیل موقعیت به آدرس بدهید تا آدرس متنی همان نقطه را به کاربر نشان دهید.

## کد نهایی

پس از افزودن تمام بخش‌ها، محتویات کامل صفحه‌ شما به شکل زیر خواهد بود:

```html
<!doctype html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>نقشه نشان با MapLibre — دریافت مختصات با کلیک</title>
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
        #coords {
            position: absolute;
            z-index: 1;
            top: 12px;
            right: 12px;
            padding: 8px 12px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.92);
            font: 14px/1.7 Tahoma, sans-serif;
            direction: rtl;
        }
    </style>
</head>
<body>
<div id="map"></div>
<div id="coords">روی نقشه کلیک کنید</div>
<script>
    const maplibregl = window.maplibregl.default;

    const map = new maplibregl.Map({
        container: "map",
        style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
        center: [51.389, 35.6892],
        zoom: 12,
        apiKey: "YOUR_WEB_API_KEY",
    });

    map.addControl(new maplibregl.NavigationControl());

    let marker = null;
    const box = document.getElementById("coords");

    map.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        if (marker) {
            marker.setLngLat([lng, lat]);
        } else {
            marker = new maplibregl.Marker().setLngLat([lng, lat]).addTo(map);
        }

        box.textContent = `عرض: ${lat.toFixed(6)} — طول: ${lng.toFixed(6)}`;
    });

</script>
</body>
</html>
```

برای اطلاعات بیشتر می‌توانید به مستندات زیر مراجعه کنید:

- معرفی و راه‌اندازی کیت توسعه MapLibre نشان
- ویرایشگر استایل نقشه نشان
- [مستندات رسمی MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
