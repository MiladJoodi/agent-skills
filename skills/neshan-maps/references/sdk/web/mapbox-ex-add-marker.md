---
source: https://platform.neshan.org/docs/sdk/web/mapboxgl/examples/neshan-mapbox-add-marker/
title: افزودن مارکر با Mapbox GL
---

# افزودن مارکر با کتابخانه mapboxgl نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در این راهنما، با استفاده از کتابخانه mapboxgl نشان، یک نقشه را پیاده‌سازی کرده و سپس یک نشانگر (مارکر) را بر روی موقعیت جغرافیایی مشخص شده به نقشه اضافه می‌کنیم.

## مراحل پیاده‌سازی

### ۱- راه‌اندازی صفحه HTML

ابتدا یک فایل HTML با ساختار پایه زیر ایجاد می‌کنیم. برای نمایش نقشه، به یک عنصر `div` با `id` مشخص نیاز داریم تا به عنوان محفظه‌ی نقشه عمل کند.

```html
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>نقشه نشان با Mapbox</title>

    <link rel="stylesheet" href="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.css" />
    <script src="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.js"></script>

    <style>
        body {
            height: 100vh;
            width: 100vw;
            margin: 0;
        }
        #map {
            height: 100%;
            width: 100%;
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <script type="text/javascript">
        // کدهای جاوااسکریپت در اینجا قرار می‌گیرند
    </script>
</body>
</html>
```

### ۲- افزودن نقشه

حالا در تگ `<script>`، کد زیر را برای ایجاد و مقداردهی اولیه نقشه اضافه می‌کنیم.

```javascript
const neshanMap = new nmp_mapboxgl.Map({
    mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
    container: "map",
    zoom: 11,
    pitch: 0,
    center: [51.389, 35.6892],
    minZoom: 2,
    maxZoom: 21,
    trackResize: true,
    mapKey: "YOUR_WEB_API_KEY", // کلید دسترسی خود را اینجا وارد کنید
    poi: false,
    traffic: false,
    mapTypeControllerOptions: {
        show: true,
        position: 'bottom-left'
    }
});
```

نکته

برای ساخت کلید دسترسی مناسب برای این سرویس، باید در پنل کاربری خود گزینه **نقشه وب** را انتخاب کنید. برای امنیت بیشتر و جلوگیری از سوءاستفاده، می‌توانید دامنه سرور خود را نیز در فیلد "دامنه/IP های مجاز" وارد کنید.

با اجرای کد بالا، نقشه به شما نمایش داده می‌شود.

### ۳- افزودن مارکر

در نهایت، با افزودن تکه کد زیر، یک مارکر در محل مشخص شده بر روی نقشه قرار می‌گیرد:

```javascript
// افزودن مارکر به نقشه
var marker = new nmp_mapboxgl.Marker()
    .setLngLat([51.391173, 35.700954])
    .addTo(neshanMap);
```

## کد نهایی

پس از افزودن تمام بخش‌ها، محتویات کامل صفحه شما به شکل زیر خواهد بود:

```html
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>نقشه نشان با مارکر</title>

    <link rel="stylesheet" href="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.css" />
    <script src="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.js"></script>

    <style>
        body {
            height: 100vh;
            width: 100vw;
            margin: 0;
        }
        #map {
            height: 100%;
            width: 100%;
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <script type="text/javascript">
        const neshanMap = new nmp_mapboxgl.Map({
            mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
            container: "map",
            zoom: 14,
            pitch: 0,
            center: [51.391173, 35.700954],
            minZoom: 2,
            maxZoom: 21,
            trackResize: true,
            mapKey: "YOUR_WEB_API_KEY",
            poi: false,
            traffic: false,
            mapTypeControllerOptions: {
                show: true,
                position: 'bottom-left'
            }
        });

        var marker = new nmp_mapboxgl.Marker()
            .setLngLat([51.391173, 35.700954])
            .addTo(neshanMap);
    </script>
</body>
</html>
```

برای اطلاعات بیشتر می‌توانید به مستندات زیر مراجعه کنید:

- مستندات mapbox-gl نشان
- [مستندات کتابخانه mapboxgl](https://docs.mapbox.com/mapbox-gl-js/api/)
