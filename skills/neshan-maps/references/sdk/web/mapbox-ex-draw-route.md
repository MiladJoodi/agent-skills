---
source: https://platform.neshan.org/docs/sdk/web/mapboxgl/examples/neshan-mapbox-draw-route/
title: رسم مسیر روی نقشه نشان با Mapbox GL
---

# رسم مسیر بر روی نقشه با کتابخانه mapbox-gl نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در این راهنما، با استفاده از کتابخانه mapbox-gl نشان یک نقشه را پیاده‌سازی کرده و سپس بر اساس نمونه پاسخ بازگشتی از سرویس مسیریابی نشان، خطوط مسیر را روی نقشه رسم می‌کنیم.

## ۱- راه‌اندازی نقشه

ابتدا یک فایل HTML پایه ایجاد می‌کنیم. برای دیکد کردن مسیر انکود شده، علاوه بر کتابخانه نقشه نشان، به کتابخانه `mapbox-polyline` نیز نیاز داریم که از طریق CDN به صفحه اضافه می‌کنیم.

```html
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>رسم مسیر با نقشه نشان</title>

    {/* کتابخانه نقشه نشان */}
    <link rel="stylesheet" href="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.css" />
    <script src="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.js"></script>
    
    {/* کتابخانه کمکی برای دیکد کردن Polyline */}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mapbox-polyline/1.2.1/polyline.js"></script>

    <style>
        body { 'margin': 0; 'width': '100vw'; 'height': '100vh'; }
        #map { 'width': '100%'; 'height': '100%'; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script type="text/javascript">
        // مقداردهی اولیه نقشه
        const neshanMap = new nmp_mapboxgl.Map({
            mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
            container: "map",
            zoom: 15,
            pitch: 0,
            center: [51.391165, 35.700956],
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
    </script>
</body>
</html>
```

## ۲- افزودن نمونه پاسخ مسیریابی

برای رسم مسیر، به داده‌های مسیر نیاز داریم. در اینجا یک نمونه پاسخ از سرویس مسیریابی نشان را به صورت یک متغیر جاوااسکریپت به کد خود اضافه می‌کنیم.

```javascript
var exampleResponse = {
    "routes": [
        {
            "overview_polyline": { "points": "cy{xEa{sxHCyEr@}FIi@MWi@Um@L[l@A^{Jr@" },
            "legs": [
                {
                    "summary": "میدان انقلاب اسلامی - کارگر شمالی",
                    "distance": { "value": 555.0, "text": "۵۷۵ متر" },
                    "duration": { "value": 99.0, "text": "۲ دقیقه" },
                    "steps": [
                        { "polyline": "cy{xEa{sxHAkBAmBDa@BKHs@BWD]J{@", "start_location": [51.388811, 35.70082] },
                        { "polyline": "}w{xEohtxHDSBUCUESEKGKSOUEW@UJORKXAN?N", "start_location": [51.390956, 35.700632] },
                        { "polyline": "a|{xEuitxH_ADaBLO@{BRmAH", "start_location": [51.391154, 35.701293] },
                        { "polyline": "}g|xEahtxH", "start_location": [51.390885, 35.703188] }
                    ]
                }
            ]
        }
    ]
};
```

نکته

برای رسم مسیر، باید فیلد `polyline` را که به صورت انکود شده است، به لیستی از مختصات تبدیل کنیم. کتابخانه `mapbox-polyline` این کار را برای ما انجام می‌دهد.

[مستندات الگوریتم انکد مسیر گوگل](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)

## ۳- استخراج مختصات مسیر و نقاط

حالا با پیمایش پاسخ سرویس، مختصات مربوط به مسیر و نقاط شروع هر گام را استخراج کرده و آبجکت‌های GeoJSON لازم برای رسم را ایجاد می‌کنیم.

```javascript
var routes = [];
var points = [];

// پیمایش پاسخ و دیکد کردن پلی‌لاین‌ها
for (let routeData of exampleResponse.routes) {
    for (let leg of routeData.legs) {
        for (let step of leg.steps) {
            var decodedPath = polyline.decode(step.polyline, 5);
            decodedPath.forEach(item => item.reverse()); // جابجایی طول و عرض جغرافیایی
            routes.push(decodedPath);
            points.push(step.start_location);
        }
    }
}

// ایجاد آبجکت GeoJSON برای خطوط مسیر
var routeObj = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        geometry: {
            type: 'MultiLineString',
            coordinates: routes
        }
    }]
};

// ایجاد آبجکت GeoJSON برای نقاط شروع هر گام
var pointsObj = {
    type: 'FeatureCollection',
    features: [{
        type: "Feature",
        geometry: {
            type: "MultiPoint",
            coordinates: points
        }
    }]
};
```

## ۴- افزودن لایه‌های مسیر و نقاط به نقشه

پس از آماده شدن داده‌ها، منتظر می‌مانیم تا نقشه به طور کامل بارگذاری شود (`load` event) و سپس لایه‌های مسیر و نقاط را به آن اضافه می‌کنیم.

```javascript
neshanMap.on('load', function () {
    // افزودن سورس داده مسیر
    neshanMap.addSource('route', {
        type: 'geojson',
        data: routeObj
    });
    // افزودن سورس داده نقاط
    neshanMap.addSource('points1', {
        type: 'geojson',
        data: pointsObj
    });

    // افزودن لایه برای رسم خط مسیر
    neshanMap.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#250ECD',
            'line-width': 9
        }
    });

    // افزودن لایه برای نمایش نقاط شروع هر گام
    neshanMap.addLayer({
        id: 'points1',
        type: 'circle',
        source: 'points1',
        paint: {
            "circle-color": "#9fbef9",
            "circle-stroke-color": "#FFFFFF",
            "circle-stroke-width": 2,
            "circle-radius": 5
        }
    });
});
```

برای اطلاعات بیشتر می‌توانید به مستندات زیر مراجعه کنید:

- مستندات کتابخانه mapbox-gl نشان
- [مستندات کتابخانه mapboxgl](https://docs.mapbox.com/mapbox-gl-js/api/)
