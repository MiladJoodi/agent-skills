---
source: https://platform.neshan.org/docs/sdk/web/mapboxgl/neshan-mapbox-gl-js/
title: Mapbox SDK
---

# کتابخانه Mapbox-gl-js نقشه پلتفرم نشان

هشدار

این نسخه منقضی شده و پشتیبانی از آن صورت نمی‌گیرد. برای استفاده از نسخه جدید بر پایه MapLibre به اینجا مراجعه کنید.

نکته

در پلتفرم نشان امکان دسترسی به **سرویس تایل رستر مستقیم** (مشابه سرویس OSM) برای استفاده تجاری اشخاص حقوقی، شرکت ها و سازمان ها فراهم شده است. برای دسترسی به این سرویس لطفا از طریق پشتیبانی درخواست خود را پس از انجام احراز هویت حساب کاربری به صورت شخص حقوقی مطرح نمائید تا راهنمایی های لازم به جهت فعال سازی سرویس برای شما ارسال شود.

- [تماس با پشتیبانی](https://platform.neshan.org/panel/support/ticketing)

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

این کتابخانه برای راحتی بیشتر توسعه‌دهندگان وب ایجاد شده و قابلیت‌های زیر را دارا می‌باشد:

- تغییر استایل نقشه
- نمایش لایه شبکه راه‌ها (Network)، بروز و همگام با مسیریاب نشان
- نمایش لایه مکان‌ها (POIs)، بروز و همگام با مسیریاب نشان
- نمایش لایه رنگ‌بندی ترافیک مسیرها، بروز و همگام با مسیریاب نشان

علاوه بر این، شما می‌توانید از کلیه امکاناتی که کتابخانه Mapbox در اختیار شما قرار می‌دهد نیز استفاده بفرمایید. بر خلاف اینکه این کامپوننت بر پایه‌ی کتابخانه Mapbox-gl-js بنا شده، برای استفاده با تنظیمات پیش‌فرض نیازی به داشتن دانش عمیق از این کتابخانه ندارید. ولی برای شخصی‌سازی‌های بیشتر، می‌توانید از امکانات کامل این کتابخانه استفاده نمایید.

برای دسترسی به توابع کتابخانه Mapbox GL، کافیست به جای استفاده از کلاس `mapboxgl` از کلاس نشان (`nmp_mapboxgl`) استفاده کنید. به طور مثال، برای ایجاد یک نشانگر (Marker) بر روی نقشه:

**کد Mapbox استاندارد:**

```javascript
new mapboxgl.Marker().setLngLat([51.3890, 35.6892]).addTo(map);
```

**کد معادل با کتابخانه نشان:**

```javascript
new nmp_mapboxgl.Marker().setLngLat([51.3890, 35.6892]).addTo(map);
```

### دمو و کامپوننت‌های مرتبط

- **کامپوننت React:** مستندات کامپوننت React نقشه نشان
- **کامپوننت Vue:** مستندات کامپوننت Vue.js نقشه نشان

## راه‌اندازی نقشه

این کتابخانه به دو روش **CDN** و **NPM** قابل راه‌اندازی است.

### روش اول: استفاده از CDN

کافیست فایل‌های CSS و JavaScript زیر را به صفحه HTML خود اضافه کنید:

```html
<link rel="stylesheet" href="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.5/index.css" />
<script src="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.5/index.js"></script>
```

سپس می‌توانید نقشه را با کد جاوااسکریپت زیر راه‌اندازی کنید:

```javascript
const map = new nmp_mapboxgl.Map({
    mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
    container: "map", // ID تگ HTML که نقشه در آن نمایش داده می‌شود
    zoom: 11,
    pitch: 0,
    center: [51.389, 35.6892],
    minZoom: 2,
    maxZoom: 21,
    trackResize: true,
    mapKey: "YOUR-MAP-API-KEY",
    poi: true,
    traffic: true,
    mapTypeControllerOptions: {
        show: true,
        position: 'bottom-left'
    }
});
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
- pnpm

```bash
npm install @neshan-maps-platform/mapbox-gl --save
```

```bash
yarn add @neshan-maps-platform/mapbox-gl
```

```bash
pnpm add @neshan-maps-platform/mapbox-gl
```

سپس فایل CSS و ماژول را در پروژه خود import کرده و نقشه را راه‌اندازی کنید:

```javascript
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';
import nmp_mapboxgl from '@neshan-maps-platform/mapbox-gl';

const map = new nmp_mapboxgl.Map({
    mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
    container: "map",
    zoom: 11,
    pitch: 0,
    center: [51.389, 35.6892],
    minZoom: 2,
    maxZoom: 21,
    trackResize: true,
    mapKey: "YOUR-MAP-API-KEY",
    poi: true,
    traffic: true,
    isTouchPlatform: false,
    mapTypeControllerOptions: {
        show: true,
        position: 'bottom-left'
    }
});
```

## پارامترهای ورودی (Props)

| پارامتر | توضیحات | نوع | الزامی |
| --- | --- | --- | --- |
| `mapKey` | کلید نقشه که از پنل کاربری نشان دریافت کرده‌اید. | `String` | **بله** |
| `container` | `id` تگ HTML که نقشه در آن نمایش داده می‌شود. | `String` | **بله** |
| `center` | مختصات مرکز اولیه نقشه به صورت `[lng, lat]`. | `Array` | **بله** |
| `zoom` | سطح بزرگنمایی اولیه نقشه. | `Number` | **بله** |
| `pitch` | زاویه دوربین نسبت به سطح زمین (بین 0 تا 85). | `Number` | خیر |
| `poi` | نمایش یا عدم نمایش لایه مکان‌ها (POIs) روی نقشه. | `Boolean` | **بله** |
| `traffic` | نمایش یا عدم نمایش لایه خطوط ترافیک. | `Boolean` | **بله** |
| `mapType` | استایل نقشه. مقادیر مجاز: `neshanVector`, `neshanVectorNight`, `neshanRaster`, `neshanRasterNight`. (پیش‌فرض: `neshanVector`) | `Object` | **بله** |
| `mapTypeControllerOptions` | تنظیمات کنترلر تغییر استایل نقشه. `show` برای فعال‌سازی و `position` برای تعیین محل قرارگیری (`top-left`, `top-right`, `bottom-left`, `bottom-right`). | `Object` | خیر |
| `isTouchPlatform` | اگر می‌خواهید کنترلرهای نقشه فقط به حالت موبایل یا دسکتاپ نمایش داده شوند. | `Boolean` | خیر |
| `trackResize` | امکان تغییر اندازه نقشه در صورت تغییر اندازه پنجره مرورگر. | `Boolean` | خیر |

[دریافت پروژه نمونه Mapboxgl نشان](https://platform.neshan.org/samples/vanilla-js-mapbox.zip)

نکته

کتابخانه نشان از نسخه ۱ کتابخانه Mapbox GL استفاده می‌کند. شما می‌توانید از تمامی امکانات این نسخه در پروژه‌های خود استفاده کنید. برای مطالعه مستندات رسمی به لینک زیر مراجعه کنید:
[مستندات Mapbox GL JS v1](https://docs.mapbox.com/mapbox-gl-js/v1.13.2/api/)

## مثال‌ها

![Marker](https://platform.neshan.org/img/docs/web-sdk/example-mapbox-gl-marker.webp)افزودن نشانگر (Marker) به نقشه

![Custom Marker](https://platform.neshan.org/img/docs/web-sdk/example-mapbox-custom-marker.webp)افزودن آیکون شخصی‌سازی‌شده به نقشه

![Draw Route](https://platform.neshan.org/img/docs/web-sdk/example-mapbox-direction.webp)رسم مسیر بر روی نقشه

!Limit Boundsمحدود کردن ناحیه نمایش نقشه

!get coordدریافت مختصات با کلیک بر روی نقشه
