---
source: https://platform.neshan.org/docs/sdk/web/leaflet/neshan-leaflet-sdk/
title: Leaflet SDK
---

# کیت توسعه Leaflet نشان

نکته

در پلتفرم نشان امکان دسترسی به **سرویس تایل رستر مستقیم** (مشابه سرویس OSM) برای استفاده تجاری اشخاص حقوقی، شرکت ها و سازمان ها فراهم شده است. برای دسترسی به این سرویس لطفا از طریق پشتیبانی درخواست خود را پس از انجام احراز هویت حساب کاربری به صورت شخص حقوقی مطرح نمائید تا راهنمایی های لازم به جهت فعال سازی سرویس برای شما ارسال شود.

- [تماس با پشتیبانی](https://platform.neshan.org/panel/support/ticketing)

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

برای نمایش یک نقشه داینامیک در وب‌سایت یا اپلیکیشن تحت وب به یک کیت توسعه‌ی نرم‌افزار `SDK` نیاز است. این کیت توسعه که با زبان جاوااسکریپت نوشته شده است این امکان را به توسعه‌دهندگان می‌دهد تا به سادگی و بتوانند نقشه ها را به پروژه های خود اضافه کنند.هم چنین توسط متدهای مشخص و استانداردی که در این کیت توسعه در نظر گرفته شده‌اند می‌توان آیتم‌های متفاوتی مانند مارکر، خط، چندضلعی، دایره و … را به نقشه اضافه نمود. کافیست یک `instance` از نقشه ایجاد کنید و توسط متدهایی که در کلاس `Map` تعریف شده‌اند با نقشه و قابلیت‌های آن کار کنید.
با توجه به اینکه `SDK` نقشه وب نشان در نسخه‌ی جاری بر پایه‌ی کتابخانه‌ `Leaflet` (نسخه‌ی 1.9.4) پیاده‌سازی شده است، لازم است تا مبانی اولیه‌ی کار با این کتابخانه‌ها را بدانید. چنانچه با این کتابخانه‌ها آشنایی ندارید نگران نباشید! خوشبختانه این کتابخانه‌ها مجموعه‌ی کاملی از مستندات و نمونه کدهای آماده در اختیار شما قرار می‌دهند که از طرق آنها به راحتی می‌توان از قابلیت‌های متنوع نقشه استفاده کرد.
برای اطلاعات بیشتر در مورد کتابخانه Leaflet می‌توانید به منابع زیر مراجعه کنید:

- [مستندات مرجع Leaflet v1.9.4](https://leafletjs.com/reference.html)
- [آموزش‌های Leaflet](https://leafletjs.com/examples.html)

نکته

در حال حاضر دو لایه **ترافیک آنلاین** و **لایه مکان‌ها (POIs)** در این کتابخانه بروزرسانی نمی‌شوند. در صورت تمایل برای استفاده از این دو لایه می‌توانید از **کیت توسعه Mapbox GL نشان** استفاده کنید.

## راه‌اندازی نقشه

این کتابخانه به دو روش **CDN** و نصب پکیج **NPM** قابل راه‌اندازی است.

### روش اول: استفاده از CDN

۱. ابتدا فایل‌های CSS و JavaScript مربوط به SDK را با افزودن لینک‌های زیر به صفحه HTML خود اضافه کنید:

```html
<link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css"/>
<script src="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js"></script>
```

۲. یک تگ `div` با `id` مشخص در صفحه قرار دهید و یک نمونه جدید از نقشه ایجاد کنید.

```html
<div id="map"></div>
```

۳. **نمونه کد کامل:**

```html
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>نقشه نشان با Leaflet</title>
    <link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css"/>
    <script src="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js"></script>
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
    <script>
        const myMap = new L.Map("map", {
            key: "<YOUR_API_KEY>",
            maptype: "dreamy",
            center: [35.699756, 51.338076],
            zoom: 14,
        });
    </script>
</body>
</html>
```

### روش دوم: نصب از طریق پکیج‌منیجر‌ها

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
npm i @neshan-maps-platform/leaflet
```

```bash
yarn add @neshan-maps-platform/leaflet
```

پس از نصب، می‌توانید نقشه را به طریق زیر در فایل جاوااسکریپت خود تعریف نمایید:

```javascript
import L from '@neshan-maps-platform/leaflet';
import '@neshan-maps-platform/leaflet/dist/leaflet.css';

document.addEventListener('DOMContentLoaded', () => {
    const map = new L.Map("map", {
        key: "<YOUR_API_KEY>",
        maptype: "dreamy",
        center: [35.699756, 51.338076],
        zoom: 14,
    });
});
```

[دریافت پروژه نمونه Leaflet نشان](https://platform.neshan.org/samples/vanilla-js-leaflet.zip)

## تغییر استایل نقشه

کیت توسعه Leaflet نشان از شش استایل نقشه پیش‌فرض پشتیبانی می‌کند. شما می‌توانید به راحتی از طریق متد `setMapType` استایل نقشه را تغییر دهید.

- `dreamy`
- `standard-night`

همچنین می‌توانید از سرور کاشی (Tile Server) دلخواه خود استفاده کنید.

**مثال تغییر استایل:**

```javascript
// تغییر به استایل Dreamy
myMap.setMapType("dreamy");

// تغییر به استایل Standard Night
myMap.setMapType("standard-night");

// استفاده از سرور کاشی دلخواه (مثلاً OpenStreetMap)
myMap.setMapType("https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png");
```

در ادامه یک مثال از چگونگی تغییر استایل نقشه را مشاهده می‌کنید:

[مشاهده دموی آنلاین تغییر استایل نقشه](https://platform.neshan.org/docs-samples/map-type/)

## مثال‌ها

![Marker](https://platform.neshan.org/img/docs/web-sdk/example-map-marker-image.webp)افزودن نشانگر (Marker) به نقشه

![Custom Marker](https://platform.neshan.org/img/docs/web-sdk/example-map-custom-marker.webp)افزودن آیکون شخصی‌سازی‌شده به نقشه

![Draw Route](https://platform.neshan.org/img/docs/web-sdk/example-map-draw-route.webp)رسم مسیر بر روی نقشه
