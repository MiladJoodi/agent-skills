---
source: https://platform.neshan.org/docs/sdk/web/mapboxgl/examples/neshan-mapbox-custom-marker/
title: مارکر سفارشی با Mapbox GL
---

# افزودن آیکون شخصی‌سازی شده به نقشه (Mapbox GL)

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در این راهنما، با استفاده از کتابخانه mapboxgl نشان، یک نقشه را پیاده‌سازی کرده و سپس نشانگرهای (مارکرهای) شخصی‌سازی شده با قابلیت افزودن تصویر دلخواه، افزودن PopUp و قابلیت جابجایی را به نقشه اضافه می‌کنیم.

## ۱- راه‌اندازی نقشه پایه

ابتدا یک فایل HTML ایجاد کرده و نقشه را در آن راه‌اندازی می‌کنیم. برای این کار، به یک `div` با `id` مشخص به عنوان محفظه نقشه نیاز داریم.

```html
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Mapbox Neshan Map</title>
    <link rel="stylesheet" href="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.css" />
    <script src="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.js"></script>
    <style>
        body { margin: 0; width: 100vw; height: 100vh; }
        #map { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script type="text/javascript">
        const neshanMap = new nmp_mapboxgl.Map({
            mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
            container: "map",
            zoom: 11,
            pitch: 0,
            center: [51.389, 35.6892],
            minZoom: 2,
            maxZoom: 21,
            trackResize: true,
            mapKey: "YOUR_MAP_API_KEY", // کلید دسترسی خود را اینجا وارد کنید
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

> توجه داشته باشید که برای استفاده از آیکون‌های سفارشی، باید فایل‌های تصویری مورد نظر خود را در پروژه داشته باشید.

!custom marker

## ۲- افزودن مارکرهای شخصی‌سازی شده

در ادامه، چند نمونه مارکر شخصی‌سازی شده را به نقشه اضافه می‌کنیم.

### الف) مارکر با تغییر رنگ و قابلیت جابجایی

این مارکر رنگ بنفش دارد و ثابت است. مارکر دوم سبز رنگ، قابل جابجایی (`draggable: true`) و دارای یک PopUp است که با کلیک روی آن نمایش داده می‌شود.

```javascript
// مارکر ساده با رنگ سفارشی
var marker = new nmp_mapboxgl.Marker({ color: "purple" })
  .setLngLat([51.391173, 35.700954])
  .addTo(neshanMap);

// تعریف یک PopUp
var popup = new nmp_mapboxgl.Popup({ offset: 25 }).setText(
  'با نگه داشتن مارکر می‌توانید آن را روی نقشه جابه‌جا کنید'
);

// مارکر قابل جابجایی با PopUp
var marker_with_popup = new nmp_mapboxgl.Marker({ color: "#00F955", draggable: true })
  .setLngLat([51.4055941, 35.70019216])
  .setPopup(popup)
  .addTo(neshanMap)
  .togglePopup();
```

### مارکر با آیکون تصویری و اطلاعات از GeoJSON

در این روش، از یک آبجکت GeoJSON برای تعریف نقاط و اطلاعات آن‌ها استفاده می‌کنیم و سپس با یک حلقه، برای هر نقطه یک مارکر با آیکون تصویری سفارشی و PopUp اختصاصی ایجاد می‌کنیم.

**۱. افزودن استایل‌های CSS:**
ابتدا استایل‌های زیر را به تگ `<style>` در `<head>` صفحه خود اضافه کنید. کلاس `.marker` تصویر پس‌زمینه آیکون را مشخص می‌کند.

```css
.marker {
  background-image: url('custom_marker.png'); /* آدرس تصویر آیکون شما */
  background-size: cover;
  width: 32px;
  height: 40px;
  top: -20px;
  cursor: pointer;
}
.mapboxgl-popup {
  max-width: 200px;
}
.mapboxgl-popup-content {
  direction: rtl;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
}
```

**۲. تعریف GeoJSON و ایجاد مارکرها:**
کد زیر را به تگ `<script>` اضافه کنید.

```javascript
const geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [51.338057, 35.699736]
      },
      'properties': {
        'title': 'میدان آزادی',
        'description': 'نمایش مارکر با آیکون اختصاصی <br/> مختصات:<br/> [51.338057 , 35.699736]'
      }
    },
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [51.375265, 35.744720]
      },
      'properties': {
        'title': 'برج میلاد',
        'description': 'مختصات:<br/> [51.375265 , 35.744720]'
      }
    }
  ]
};

// افزودن مارکرها به نقشه با استفاده از حلقه
for (const feature of geojson.features) {
  // ایجاد یک عنصر div برای آیکون
  const el = document.createElement('div');
  el.className = 'marker';

  // ایجاد مارکر با عنصر سفارشی
  new nmp_mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new nmp_mapboxgl.Popup({ offset: 40 })
        .setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
    )
    .addTo(neshanMap)
    .togglePopup();
}
```

برای اطلاعات بیشتر می‌توانید به مستندات زیر مراجعه کنید:

- مستندات mapboxgl نشان
- [مستندات افزودن marker به mapboxgl](https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/)
