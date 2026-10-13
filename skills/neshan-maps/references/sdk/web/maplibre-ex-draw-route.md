---
source: https://platform.neshan.org/docs/sdk/web/maplibre/examples/neshan-maplibre-draw-route/
title: رسم مسیر روی نقشه با MapLibre
---

# رسم مسیر روی نقشه با کیت توسعه MapLibre نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در این راهنما خروجی سرویس مسیریابی نشان را می‌گیریم، رشته‌ polyline آن را decode می‌کنیم و مسیر را به‌صورت یک لایه‌ خط روی نقشه می‌کشیم. نقاط شروع هر گام مسیر را هم به‌شکل دایره نمایش می‌دهیم.

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
    center: [51.389855, 35.701],
    zoom: 15,
    apiKey: "YOUR_WEB_API_KEY", // کلید دسترسی خود را اینجا وارد کنید
});

map.addControl(new maplibregl.NavigationControl());
```

نکته

برای ساخت کلید دسترسی مناسب این کیت توسعه، در پنل کاربری گزینه‌ **نقشه وب** را انتخاب کنید. برای امنیت بیشتر می‌توانید دامنه‌ سرور خود را در فیلد «دامنه/IP های مجاز» وارد کنید.

توجه

مقادیر `center` در MapLibre به‌صورت `[longitude, latitude]` هستند، یعنی **اول طول جغرافیایی و بعد عرض جغرافیایی** — برعکس ترتیبی که در وب‌سرویس‌های نشان استفاده می‌شود.

### ۳- افزودن کتابخانه decode کردن polyline

سرویس مسیریابی نشان هندسه‌ مسیر را به‌صورت رشته‌ **Encoded Polyline** برمی‌گرداند. برای تبدیل آن به آرایه‌ مختصات از یک کتابخانه‌ کوچک استفاده می‌کنیم:

```html
<script src="https://cdn.jsdelivr.net/npm/@mapbox/polyline@1.2.1/src/polyline.js"></script>
```

### ۴- آماده‌سازی داده‌ مسیر

پاسخ سرویس مسیریابی را می‌گیریم و هندسه‌ هر گام را decode می‌کنیم:

```javascript
const lines = [];
const points = [];

directionResponse.routes[0].legs[0].steps.forEach((step) => {
    // خروجی decode به شکل [lat, lng] است و MapLibre مختصات را [lng, lat] می‌خواهد
    lines.push(polyline.decode(step.polyline, 5).map(([lat, lng]) => [lng, lat]));
    points.push(step.start_location);
});
```

توجه

این جابه‌جایی مهم است: `polyline.decode` مختصات را `[latitude, longitude]` می‌دهد، ولی MapLibre و GeoJSON ترتیب `[longitude, latitude]` می‌خواهند. اگر این تبدیل را انجام ندهید، مسیر شما به‌جای تهران جایی در عربستان کشیده می‌شود.

### ۵- افزودن لایه‌ مسیر به نقشه

منابع و لایه‌ها باید بعد از رویداد `load` نقشه اضافه شوند:

```javascript
map.on("load", () => {
    map.addSource("route", {
        type: "geojson",
        data: {
            type: "Feature",
            geometry: { type: "MultiLineString", coordinates: lines },
        },
    });

    map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#250ECD", "line-width": 8 },
    });
});
```

نکته

در نمونه‌ این صفحه، پاسخ سرویس مسیریابی به‌صورت ثابت در کد آمده تا مثال بدون کلید دسترسی هم قابل اجرا باشد. در برنامه‌ واقعی این پاسخ را با `fetch` از سرویس مسیریابی بگیرید.

## کد نهایی

پس از افزودن تمام بخش‌ها، محتویات کامل صفحه‌ شما به شکل زیر خواهد بود:

```html
<!doctype html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>نقشه نشان با MapLibre — رسم مسیر</title>
    <link
            rel="stylesheet"
            href="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.css"
    />
    <script
            src="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.umd.js">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@mapbox/polyline@1.2.1/src/polyline.js"></script>
    <style>
        html, body { margin: 0; height: 100%; }
        #map { position: absolute; inset: 0; }
    </style>
</head>
<body>
<div id="map"></div>

<script>
    const maplibregl = window.maplibregl.default;

    // نمونه‌ پاسخ سرویس مسیریابی نشان (v4/direction)
    // https://api.neshan.org/v4/direction?type=car&origin=35.700785,51.388811&destination=35.703189,51.390898
    const directionResponse = {
        routes: [
            {
                overview_polyline: { points: "cy{xEa{sxHCyEr@}FIi@MWi@Um@L[l@A^{Jr@" },
                legs: [
                    {
                        steps: [
                            { polyline: "cy{xEa{sxHAkBAmBDa@BKHs@BWD]J{@", start_location: [51.388811, 35.70082] },
                            { polyline: "}w{xEohtxHDSBUCUESEKGKSOUEW@UJORKXAN?N", start_location: [51.390956, 35.700632] },
                            { polyline: "a|{xEuitxH_ADaBLO@{BRmAH", start_location: [51.391154, 35.701293] },
                        ],
                    },
                ],
            },
        ],
    };

    const map = new maplibregl.Map({
        container: "map",
        style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
        center: [51.389855, 35.701],
        zoom: 15,
        apiKey: "YOUR_WEB_API_KEY",
    });

    map.addControl(new maplibregl.NavigationControl());

    const lines = [];
    const points = [];

    directionResponse.routes[0].legs[0].steps.forEach((step) => {
        // خروجی decode به شکل [lat, lng] است و MapLibre مختصات را [lng, lat] می‌خواهد
        lines.push(polyline.decode(step.polyline, 5).map(([lat, lng]) => [lng, lat]));
        points.push(step.start_location);
    });

    map.on("load", () => {
        map.addSource("route", {
            type: "geojson",
            data: {
                type: "Feature",
                geometry: { type: "MultiLineString", coordinates: lines },
            },
        });

        map.addSource("route-points", {
            type: "geojson",
            data: {
                type: "Feature",
                geometry: { type: "MultiPoint", coordinates: points },
            },
        });

        map.addLayer({
            id: "route-line",
            type: "line",
            source: "route",
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#250ECD", "line-width": 8 },
        });

        map.addLayer({
            id: "route-points",
            type: "circle",
            source: "route-points",
            paint: {
                "circle-color": "#9fbef9",
                "circle-stroke-color": "#ffffff",
                "circle-stroke-width": 2,
                "circle-radius": 5,
            },
        });
    });

</script>
</body>
</html>
```

برای اطلاعات بیشتر می‌توانید به مستندات زیر مراجعه کنید:

- معرفی و راه‌اندازی کیت توسعه MapLibre نشان
- ویرایشگر استایل نقشه نشان
- [مستندات رسمی MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
