---
source: https://platform.neshan.org/docs/sdk/web/maplibre/examples/neshan-maplibre-custom-marker/
title: مارکر سفارشی با MapLibre
---

# افزودن مارکر شخصی‌سازی‌شده با کیت توسعه MapLibre نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

مارکر پیش‌فرض MapLibre یک پین ساده است. در این راهنما با دادن یک المان HTML دلخواه به مارکر، ظاهر آن را کامل شخصی‌سازی می‌کنیم — از آیکون و رنگ تا اندازه و سایه.

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
    center: [51.391173, 35.700954],
    zoom: 15,
    apiKey: "YOUR_WEB_API_KEY", // کلید دسترسی خود را اینجا وارد کنید
});

map.addControl(new maplibregl.NavigationControl());
```

نکته

برای ساخت کلید دسترسی مناسب این کیت توسعه، در پنل کاربری گزینه‌ **نقشه وب** را انتخاب کنید. برای امنیت بیشتر می‌توانید دامنه‌ سرور خود را در فیلد «دامنه/IP های مجاز» وارد کنید.

توجه

مقادیر `center` در MapLibre به‌صورت `[longitude, latitude]` هستند، یعنی **اول طول جغرافیایی و بعد عرض جغرافیایی** — برعکس ترتیبی که در وب‌سرویس‌های نشان استفاده می‌شود.

### ۳- ساخت المان مارکر

ظاهر مارکر را با CSS می‌سازیم. اینجا یک دایره با یک آیکون درون آن ساخته‌ایم:

```html
<style>
    .custom-marker {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 3px solid #fff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        background: #003566 url("https://static.neshanmap.ir/poi/64/cafe.png") center/26px no-repeat;
        cursor: pointer;
    }
</style>
```

### ۴- افزودن مارکر با المان دلخواه

المان را می‌سازیم و آن را به پارامتر `element` می‌دهیم:

```javascript
const el = document.createElement("div");
el.className = "custom-marker";

new maplibregl.Marker({ element: el, anchor: "bottom" })
    .setLngLat([51.391173, 35.700954])
    .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML("<b>کافه نمونه</b><br/>تهران، خیابان کارگر شمالی"))
    .addTo(map);
```

نکته

پارامتر `anchor` مشخص می‌کند کدام نقطه‌ المان روی مختصات بنشیند. برای مارکرهای پین‌مانند مقدار `bottom` درست است تا نوک پین روی نقطه قرار بگیرد؛ برای مارکر دایره‌ای `center` طبیعی‌تر است.

## کد نهایی

پس از افزودن تمام بخش‌ها، محتویات کامل صفحه‌ شما به شکل زیر خواهد بود:

```html
<!doctype html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>نقشه نشان با MapLibre — مارکر سفارشی</title>
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
        .custom-marker {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: 3px solid #fff;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
            background: #003566 url("https://static.neshanmap.ir/poi/64/cafe.png") center/26px no-repeat;
            cursor: pointer;
        }
    </style>
</head>
<body>
<div id="map"></div>

<script>
    const maplibregl = window.maplibregl.default;

    const map = new maplibregl.Map({
        container: "map",
        style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
        center: [51.391173, 35.700954],
        zoom: 15,
        apiKey: "YOUR_WEB_API_KEY",
    });

    map.addControl(new maplibregl.NavigationControl());

    const el = document.createElement("div");
    el.className = "custom-marker";

    new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([51.391173, 35.700954])
        .setPopup(new maplibregl.Popup({ offset: 24 }).setHTML("<b>کافه نمونه</b><br/>تهران، خیابان کارگر شمالی"))
        .addTo(map);

</script>
</body>
</html>
```

برای اطلاعات بیشتر می‌توانید به مستندات زیر مراجعه کنید:

- معرفی و راه‌اندازی کیت توسعه MapLibre نشان
- ویرایشگر استایل نقشه نشان
- [مستندات رسمی MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
