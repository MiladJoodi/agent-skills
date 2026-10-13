---
source: https://platform.neshan.org/docs/sdk/web/maplibre/examples/neshan-maplibre-clustering/
title: خوشه‌بندی نقاط روی نقشه با MapLibre
---

# خوشه‌بندی نقاط روی نقشه در MapLibre نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

وقتی می‌خواهید صدها یا هزاران نقطه (شعبه، سفارش، راننده، فروشگاه) را روی نقشه نشان دهید، گذاشتن یک مارکر برای هر نقطه هم نقشه را ناخوانا می‌کند و هم کارایی را پایین می‌آورد. راه‌حل، **خوشه‌بندی (Clustering)** است: نقاط نزدیک به هم در یک دایره‌ واحد با تعداد آن‌ها جمع می‌شوند و با بزرگ‌نمایی (zoom) کم‌کم باز می‌شوند.

در این راهنما ۴۲۰ نقطه‌ نمونه در تهران می‌سازیم، خوشه‌بندی را روی منبع داده فعال می‌کنیم و رنگ و اندازه‌ خوشه‌ها را بر اساس تعداد نقاطشان شخصی‌سازی می‌کنیم.

نکته

در این مثال از استایل **Monochrome Light** استفاده شده است. استایل‌های مونوکروم عمداً کم‌رنگ و بی‌جزئیات‌اند تا داده‌های خودتان روی نقشه دیده شوند؛ برای داشبورد و نمایش داده گزینه‌ بهتری از استایل‌های معمولی هستند.

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
</script>
</body>
</html>
```

### ۲- ساخت نقشه با استایل مونوکروم

```javascript
const maplibregl = window.maplibregl.default;
const SOURCE_ID = "branches";

const map = new maplibregl.Map({
    container: "map",
    style: "https://static.neshan.org/sdk/maplibre/styles/monochrome_light.json",
    center: [51.3890, 35.6892],
    zoom: 10.5,
    apiKey: "YOUR_WEB_API_KEY", // کلید دسترسی خود را اینجا وارد کنید
});

map.addControl(new maplibregl.NavigationControl());
```

توجه

مقادیر `center` در MapLibre به‌صورت `[longitude, latitude]` هستند، یعنی **اول طول جغرافیایی و بعد عرض جغرافیایی** — برعکس ترتیبی که در وب‌سرویس‌های نشان استفاده می‌شود.

### ۳- آماده کردن داده‌ها

داده‌ها باید در قالب یک `FeatureCollection` از نوع GeoJSON باشند. در پروژه‌ واقعی این داده از وب‌سرویس خودتان می‌آید، ولی برای این مثال چند صد نقطه‌ تصادفی حول چند کانون در تهران می‌سازیم:

```javascript
function seededRandom(seed) {
    return function () {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function makeRandomPoints(count) {
    const random = seededRandom(1373);

    const hotspots = [
        [51.3890, 35.6892],
        [51.4230, 35.7580],
        [51.3350, 35.7700],
        [51.4700, 35.6900],
        [51.2900, 35.6600],
        [51.4100, 35.6100],
    ];

    const features = [];
    for (let i = 0; i < count; i++) {
        const [lng, lat] = hotspots[i % hotspots.length];
        const spread = 0.012 + random() * 0.03;
        features.push({
            type: "Feature",
            properties: { title: `شعبه شماره ${i + 1}` },
            geometry: {
                type: "Point",
                coordinates: [
                    lng + (random() - 0.5) * spread * 2.4,
                    lat + (random() - 0.5) * spread * 2,
                ],
            },
        });
    }
    return { type: "FeatureCollection", features };
}
```

یادداشت

هر ویژگی (Feature) می‌تواند هر تعداد فیلد در `properties` داشته باشد؛ اینجا فقط `title` گذاشته‌ایم تا در پاپ‌آپ نمایش داده شود. این فیلدها بعداً در عبارت‌های استایل و رویدادها هم قابل استفاده‌اند.

### ۴- فعال کردن خوشه‌بندی روی منبع داده

خوشه‌بندی یک قابلیت خودِ منبع GeoJSON است؛ کافی است `cluster: true` بدهید. تمام محاسبه در سمت مرورگر انجام می‌شود:

```javascript
map.on("load", () => {
    map.addSource(SOURCE_ID, {
        type: "geojson",
        data: makeRandomPoints(420),
        cluster: true,
        clusterRadius: 60,
        clusterMaxZoom: 15,
    });
});
```

| پارامتر | توضیحات |
| --- | --- |
| `cluster` | خوشه‌بندی را فعال می‌کند. |
| `clusterRadius` | شعاع خوشه‌بندی بر حسب **پیکسل**. مقدار بزرگ‌تر، خوشه‌های کمتر و درشت‌تر می‌سازد (پیش‌فرض: `50`). |
| `clusterMaxZoom` | بیشترین سطح بزرگ‌نمایی که خوشه‌بندی در آن انجام می‌شود؛ بالاتر از آن همه‌ نقاط جدا نمایش داده می‌شوند. |
| `clusterProperties` | برای تجمیع دلخواه روی خوشه‌ها، مثلاً جمع فروش یا تعداد سفارش هر خوشه. |

یادداشت

با فعال شدن خوشه‌بندی، MapLibre خودش سه فیلد به ویژگی‌های خوشه اضافه می‌کند: `point_count` (تعداد نقاط)، `point_count_abbreviated` (نمایش خلاصه مثل `1.2k`) و `cluster_id` (شناسه‌ خوشه). در ادامه از هر سه استفاده می‌کنیم.

### ۵- لایه‌ خوشه‌ها با استایل شخصی‌سازی‌شده

اینجا نکته‌ اصلی شخصی‌سازی است: با عبارت `step` می‌توانید رنگ و اندازه را بر اساس `point_count` پله‌پله تغییر دهید تا کاربر از روی ظاهر خوشه، حجم داده را حدس بزند:

```javascript
map.addLayer({
    id: "clusters",
    type: "circle",
    source: SOURCE_ID,
    filter: ["has", "point_count"],
    paint: {
        "circle-color": [
            "step", ["get", "point_count"],
            "#76b3ef", 20,
            "#1b80e4", 50,
            "#005299",
        ],
        "circle-radius": [
            "step", ["get", "point_count"],
            16, 20,
            22, 50,
            30,
        ],
        "circle-stroke-width": 3,
        "circle-stroke-color": "#ffffff",
        "circle-opacity": 0.92,
    },
});
```

نکته

ساختار عبارت `step` این‌گونه خوانده می‌شود: `["step", ورودی, مقدار پیش‌فرض, آستانه۱, مقدار۱, آستانه۲, مقدار۲, ...]`. یعنی مقدار اول پیش از رسیدن به اولین آستانه به کار می‌رود. اگر می‌خواهید تغییر رنگ یا اندازه **پیوسته** باشد نه پله‌ای، به‌جای `step` از `interpolate` استفاده کنید.

### ۶- نمایش تعداد روی خوشه

یک لایه‌ `symbol` روی خوشه‌ها می‌گذاریم که عدد `point_count_abbreviated` را نشان دهد. رنگ متن هم با `step` عوض می‌شود تا روی خوشه‌های تیره خوانا بماند:

```javascript
map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: SOURCE_ID,
    filter: ["has", "point_count"],
    layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["Vazir FD Regular"],
        "text-size": 13,
    },
    paint: {
        "text-color": [
            "step", ["get", "point_count"],
            "#003566", 20,
            "#ffffff",
        ],
    },
});
```

توجه

مقدار `text-font` باید فونتی باشد که در استایل نقشه موجود است. در استایل‌های نشان از `Vazir FD Regular` استفاده کنید؛ نام فونت دلخواه (مثل `Open Sans Regular` در مثال‌های سایت MapLibre) باعث می‌شود متن روی نقشه دیده نشود.

### ۷- لایه‌ نقاط تنها

نقاطی که در هیچ خوشه‌ای نیستند فیلد `point_count` ندارند، پس با فیلتر معکوس جدا می‌شوند:

```javascript
map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: SOURCE_ID,
    filter: ["!", ["has", "point_count"]],
    paint: {
        "circle-color": "#1b80e4",
        "circle-radius": 6,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
    },
});
```

### ۸- کلیک روی خوشه و باز شدن آن

با کلیک روی خوشه، از سرویس منبع می‌پرسیم که این خوشه در چه سطح بزرگ‌نمایی باز می‌شود و نقشه را نرم به آن سطح می‌بریم:

```javascript
map.on("click", "clusters", async (e) => {
    const feature = map.queryRenderedFeatures(e.point, { layers: ["clusters"] })[0];
    const clusterId = feature.properties.cluster_id;
    const zoom = await map.getSource(SOURCE_ID).getClusterExpansionZoom(clusterId);
    map.easeTo({ center: feature.geometry.coordinates, zoom });
});

map.on("click", "unclustered-point", (e) => {
    const feature = e.features[0];
    new maplibregl.Popup({ offset: 12 })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.title)
        .addTo(map);
});
```

یادداشت

در MapLibre نسخه‌ ۴ و بالاتر (کیت توسعه نشان بر پایه‌ نسخه‌ ۵ است) متد `getClusterExpansionZoom` یک `Promise` برمی‌گرداند و باید با `await` یا `.then()` استفاده شود. در نمونه‌کدهای قدیمی این متد با callback فراخوانی می‌شد.

نکته

برای دیدن فهرست نقاط داخل یک خوشه — مثلاً برای نمایش در یک پنل کنار نقشه — از `getClusterLeaves(clusterId, limit, offset)` استفاده کنید. این متد هم `Promise` برمی‌گرداند.

## کد نهایی

پس از افزودن تمام بخش‌ها، محتویات کامل صفحه‌ شما به شکل زیر خواهد بود:

```html
<!doctype html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>نقشه نشان با MapLibre — خوشه‌بندی نقاط</title>
    <link
            rel="stylesheet"
            href="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.css"
    />
    <script
            src="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.umd.js">
    </script>
    <style>
        html, body { margin: 0; height: 100%; font-family: Tahoma, sans-serif; }
        #map { position: absolute; inset: 0; }

        #legend {
            position: absolute;
            inset-block-start: 12px;
            inset-inline-start: 12px;
            z-index: 1;
            background: rgba(255, 255, 255, 0.92);
            border-radius: 10px;
            padding: 10px 12px;
            font-size: 12px;
            line-height: 1.9;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        }
        #legend b { font-size: 12px; }
        #legend .row { display: flex; align-items: center; gap: 6px; }
        #legend .dot {
            display: inline-block;
            border-radius: 50%;
            border: 2px solid #fff;
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.12);
        }
    </style>
</head>
<body>
<div id="map"></div>

<div id="legend">
    <b>تعداد نقاط هر خوشه</b>
    <div class="row"><span class="dot" style="width:12px;height:12px;background:#76b3ef"></span> کمتر از ۲۰</div>
    <div class="row"><span class="dot" style="width:16px;height:16px;background:#1b80e4"></span> ۲۰ تا ۵۰</div>
    <div class="row"><span class="dot" style="width:20px;height:20px;background:#005299"></span> بیشتر از ۵۰</div>
</div>

<script>
    const maplibregl = window.maplibregl.default;
    const SOURCE_ID = "branches";

    function seededRandom(seed) {
        return function () {
            seed = (seed + 0x6d2b79f5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function makeRandomPoints(count) {
        const random = seededRandom(1373);

        const hotspots = [
            [51.3890, 35.6892],
            [51.4230, 35.7580],
            [51.3350, 35.7700],
            [51.4700, 35.6900],
            [51.2900, 35.6600],
            [51.4100, 35.6100],
        ];

        const features = [];
        for (let i = 0; i < count; i++) {
            const [lng, lat] = hotspots[i % hotspots.length];
            const spread = 0.012 + random() * 0.03;
            features.push({
                type: "Feature",
                properties: { title: `شعبه شماره ${i + 1}` },
                geometry: {
                    type: "Point",
                    coordinates: [
                        lng + (random() - 0.5) * spread * 2.4,
                        lat + (random() - 0.5) * spread * 2,
                    ],
                },
            });
        }
        return { type: "FeatureCollection", features };
    }

    const map = new maplibregl.Map({
        container: "map",
        style: "https://static.neshan.org/sdk/maplibre/styles/monochrome_light.json",
        center: [51.3890, 35.6892],
        zoom: 10.5,
        apiKey: "YOUR_WEB_API_KEY",
    });

    map.addControl(new maplibregl.NavigationControl());

    map.on("load", () => {
        map.addSource(SOURCE_ID, {
            type: "geojson",
            data: makeRandomPoints(420),
            cluster: true,
            clusterRadius: 60,
            clusterMaxZoom: 15,
        });

        map.addLayer({
            id: "clusters",
            type: "circle",
            source: SOURCE_ID,
            filter: ["has", "point_count"],
            paint: {
                "circle-color": [
                    "step", ["get", "point_count"],
                    "#76b3ef", 20,
                    "#1b80e4", 50,
                    "#005299",
                ],
                "circle-radius": [
                    "step", ["get", "point_count"],
                    16, 20,
                    22, 50,
                    30,
                ],
                "circle-stroke-width": 3,
                "circle-stroke-color": "#ffffff",
                "circle-opacity": 0.92,
            },
        });

        map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: SOURCE_ID,
            filter: ["has", "point_count"],
            layout: {
                "text-field": ["get", "point_count_abbreviated"],
                "text-font": ["Vazir FD Regular"],
                "text-size": 13,
            },
            paint: {
                "text-color": [
                    "step", ["get", "point_count"],
                    "#003566", 20,
                    "#ffffff",
                ],
            },
        });

        map.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: SOURCE_ID,
            filter: ["!", ["has", "point_count"]],
            paint: {
                "circle-color": "#1b80e4",
                "circle-radius": 6,
                "circle-stroke-width": 2,
                "circle-stroke-color": "#ffffff",
            },
        });

        map.on("click", "clusters", async (e) => {
            const feature = map.queryRenderedFeatures(e.point, { layers: ["clusters"] })[0];
            const clusterId = feature.properties.cluster_id;
            const zoom = await map.getSource(SOURCE_ID).getClusterExpansionZoom(clusterId);
            map.easeTo({ center: feature.geometry.coordinates, zoom });
        });

        map.on("click", "unclustered-point", (e) => {
            const feature = e.features[0];
            new maplibregl.Popup({ offset: 12 })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(`<div style="font-family:Tahoma,sans-serif">${feature.properties.title}</div>`)
                .addTo(map);
        });

        for (const layer of ["clusters", "unclustered-point"]) {
            map.on("mouseenter", layer, () => {
                map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", layer, () => {
                map.getCanvas().style.cursor = "";
            });
        }
    });
</script>
</body>
</html>
```

## نکات کارایی

- خوشه‌بندی GeoJSON تا حدود چند ده هزار نقطه در مرورگر روان کار می‌کند. برای حجم‌های بزرگ‌تر، داده را به‌صورت **Vector Tile** سرو کنید.
- اگر داده‌ها با تغییر zoom یا حرکت نقشه از سرور می‌آیند، به‌جای ساختن منبع جدید، داده‌ منبع موجود را با `map.getSource(SOURCE_ID).setData(newGeoJson)` به‌روزرسانی کنید.
- خوشه‌بندی فقط روی منبع از نوع `geojson` کار می‌کند؛ روی منابع Vector Tile در دسترس نیست.

برای اطلاعات بیشتر می‌توانید به مستندات زیر مراجعه کنید:

- معرفی و راه‌اندازی کیت توسعه MapLibre نشان
- ویرایشگر استایل نقشه نشان
- [مستندات رسمی MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)
