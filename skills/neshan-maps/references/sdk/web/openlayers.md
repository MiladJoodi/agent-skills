---
source: https://platform.neshan.org/docs/sdk/web/openlayers/neshan-openlayers-sdk/
title: OpenLayers SDK
---

# کیت توسعه Openlayers نشان

نکته

در پلتفرم نشان امکان دسترسی به **سرویس تایل رستر مستقیم** (مشابه سرویس OSM) برای استفاده تجاری اشخاص حقوقی، شرکت ها و سازمان ها فراهم شده است. برای دسترسی به این سرویس لطفا از طریق پشتیبانی درخواست خود را پس از انجام احراز هویت حساب کاربری به صورت شخص حقوقی مطرح نمائید تا راهنمایی های لازم به جهت فعال سازی سرویس برای شما ارسال شود.

- [تماس با پشتیبانی](https://platform.neshan.org/panel/support/ticketing)

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

این کیت توسعه نرم‌افزار (SDK) که با زبان جاوااسکریپت نوشته شده است، به توسعه‌دهندگان وب امکان می‌دهد تا به سادگی نقشه‌های داینامیک را به پروژه‌های خود اضافه کنند. توسط متدهای استاندارد این کیت، می‌توانید آیتم‌های مختلفی مانند نشانگر (Marker)، خط، چندضلعی، دایره و... را به نقشه اضافه کنید.

این SDK بر پایه‌ی کتابخانه‌ **OpenLayers (نسخه‌ی 8.1.0)** پیاده‌سازی شده است، بنابراین آشنایی با مبانی اولیه این کتابخانه مفید خواهد بود. خوشبختانه OpenLayers مستندات و نمونه کدهای کاملی را ارائه می‌دهد.

برای اطلاعات بیشتر می‌توانید به منابع زیر مراجعه کنید:

- [مستندات OpenLayers v8.1.0](https://openlayers.org/en/v8.1.0/apidoc/)
- [مثال‌های OpenLayers v8.1.0](https://openlayers.org/en/v8.1.0/examples/)

نکته

در حال حاضر دو لایه **ترافیک آنلاین** و **لایه مکان‌ها (POIs)** در این کتابخانه بروزرسانی نمی‌شوند. در صورت تمایل برای استفاده از این دو لایه می‌توانید از **کیت توسعه Mapbox GL نشان** استفاده کنید.

## راه‌اندازی نقشه

این کتابخانه به دو روش **CDN** و نصب پکیج **NPM** قابل راه‌اندازی است.

### روش اول: استفاده از CDN

۱. ابتدا فایل‌های CSS و JavaScript مربوط به SDK را با افزودن لینک‌های زیر به صفحه HTML خود اضافه کنید:

```html
<link rel="stylesheet" href="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.css" />
<script src="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.js"></script>
```

۲. یک تگ `div` با `id` مشخص در صفحه قرار دهید و یک نمونه جدید از نقشه ایجاد کنید.

۳. **نمونه کد کامل:**

```html
<!doctype html>
<html lang='fa'>
<head>
    <meta charset="utf-8">
    <title>نقشه نشان با OpenLayers</title>
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
    <link rel="stylesheet" href="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.css" />
    <script src="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.js"></script>
</head>
<body>
    <div id='map' class='map'></div>
    <script type='text/javascript'>
        var map = new ol.Map({
            maptype: 'dreamy',
            target: 'map',
            key: 'YOUR_WEB_API_KEY',
            view: new ol.View({
                center: ol.proj.fromLonLat([51.389, 35.6892]),
                zoom: 14
            })
        });
    </script>
</body>
</html>
```

### روش دوم: نصب از طریق پکیج‌منیجرها

ابتدا پکیج را با استفاده از مدیر بسته دلخواه خود نصب کنید:

اطلاع‌رسانی

در صورت تمایل برای دریافت کتابخانه‌ها و پکیج‌ها می‌توانید از رجیستری نشان استفاده کنید، برای انجام این کار کافی‌است مراحل زیر را انجام دهید:

#### تنظیمات برای npm، pnpm و Yarn (نسخه ۱ - کلاسیک)

1. یک فایل با عنوان `.npmrc` در روت پروژه خود ایجاد کنید. (در صورت وجود فایل `.npmrc` در پروژه نیازی به ایجاد فایل جدید نیست و تنها مرحله ۲ را انجام دهید.)
2. فایل ایجاد شده را باز کرده و در آن عبارت زیر را وارد نمائید و سپس فایل را ذخیره کنید.

```bash
@neshan-maps-platform:registry=https://npm.neshan.org
```

با انجام مراحل بالا فایل `.npmrc` بایستی ایجاد شده باشد و در روت پروژه شما قرار گرفته باشد، از این پس برای نصب پکیج‌ها از رجیستری نشان استفاده خواهد شد.

#### تنظیمات برای Yarn (نسخه‌های ۲ و بالاتر - Berry)

در صورتی که از Yarn استفاده می‌کنید، فایل `.yarnrc.yml` را (در صورت عدم وجود) در روت پروژه خود ایجاد کرده و رجیستری را در این فایل به شکل زیر تعریف کنید:

```bash
npmScopes:
  neshan-maps-platform:
    npmRegistryServer: "https://npm.neshan.org"
```

پس از انجام این تنظیمات، پروژه شما آماده استفاده از پکیج‌های منتشر شده در رجیستری نشان خواهد بود.

- npm
- yarn

```bash
npm i @neshan-maps-platform/ol
```

```bash
yarn add @neshan-maps-platform/ol  
```

پس از نصب، می‌توانید نقشه را به طریق زیر در فایل جاوااسکریپت خود تعریف نمایید:

```javascript
import '@neshan-maps-platform/ol/ol.css';
import Map from '@neshan-maps-platform/ol/Map';
import View from '@neshan-maps-platform/ol/View';  
import { fromLonLat } from '@neshan-maps-platform/ol/proj';

const map = new Map({
    mapType: 'dreamy',
    target: 'map',
    key: 'YOUR-WEB-API-KEY',
    view: new View({
        center: fromLonLat([51.389, 35.6892]),
        zoom: 14
    })
});
```

[دریافت پروژه نمونه OpenLayer نشان](https://platform.neshan.org/samples/vanilla-js-openlayer.zip)

## تغییر استایل نقشه

شما می‌توانید به راحتی از طریق متد `setMapType` استایل نقشه را تغییر دهید. استایل‌های موجود عبارتند از:

- `dreamy`
- `standard-night`

همچنین امکان استفاده از سرور کاشی (Tile Server) دلخواه نیز وجود دارد.

**مثال تغییر استایل:**

```javascript
// تغییر به استایل Standard Night
myMap.setMapType("standard-night");

// استفاده از سرور کاشی دلخواه (مثلاً OpenStreetMap)
myMap.setMapType("https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png");
```

در ادامه یک مثال از چگونگی تغییر استایل نقشه را مشاهده می‌کنید:

[مشاهده دموی آنلاین تغییر استایل نقشه](https://platform.neshan.org/docs-samples/map-type/)

## مثال‌ها

![Marker](https://platform.neshan.org/img/docs/web-sdk/example-map-marker-image.webp)افزودن نشانگر (Marker) به نقشه

![Custom Marker](https://platform.neshan.org/img/docs/web-sdk/example-map-custom-marker-openlayers.webp)افزودن آیکون شخصی‌سازی‌شده به نقشه

![Draw Route](https://platform.neshan.org/img/docs/web-sdk/example-map-draw-route.webp)رسم مسیر بر روی نقشه
