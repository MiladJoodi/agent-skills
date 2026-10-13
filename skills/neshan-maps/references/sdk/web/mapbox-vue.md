---
source: https://platform.neshan.org/docs/sdk/web/mapboxgl/vue-mapbox/
title: Vue Mapbox GL نشان
---

# کامپوننت Mapbox gl VueJS

هشدار

این نسخه منقضی شده و پشتیبانی از آن صورت نمی‌گیرد. برای استفاده از نسخه جدید بر پایه MapLibre به اینجا مراجعه کنید.

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

کامپوننت [Vue.js](https://vuejs.org/) نقشه پلتفرم نشان، برای راحتی بیشتر توسعه‌دهنده‌های وب ایجاد گشته و با Api ساده،قابلیت‌های نقشه و سرویس‌های نشان را در اختیار توسعه دهندگان قرار می‌دهد.

این کامپوننت از نقشه‌ی mapbox-gl v1.13.2 استفاده می‌نماید. برای شخصی‌سازی کردن بیشتر نقشه، می‌توانید از داکیومنت‌های رسمی [mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/) نیز استفاده نمایید.

پکیج mapbox-gl-vue یک wrapper برای پکیج `@neshan-maps-platform/mapbox-gl` جهت استفاده در پروژه‌های ساخته شده با VueJS با قابلیت پشتیبانی از TypeScript است. به کمک این پکیج، شما به راحتی می‌توانید درون پروژه‌ی VueJS خود، از mapboxgl با استایل‌های نقشه‌ی نشان، به همراه قابلیت نمایش ترافیک و POIها، استفاده کنید.

مراجعه به مستندات کتابخانه mapbox-gl نشان

## وابستگی ها (Dependencies):

- `@neshan-maps-platform/mapbox-gl`: ورژن `1.0.10` یا بالاتر
- `@types/mapbox-gl`: ورژن `2.7.17` یا بالاتر
- `vue`: ورژن `3.3.4` یا بالاتر

## شیوه نصب (Installation guide):

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
npm install @neshan-maps-platform/mapbox-gl-vue
```

```bash
yarn add @neshan-maps-platform/mapbox-gl-vue
```

## نحوه استفاده و راه اندازی نقشه

بعد از نصب کردن پکیج در پروژه‌ی خود، می‌توانید با استفاده از کامپوننت `MapComponent`، از نقشه استفاده کنید.

```javascript
<script setup>
  //...
  import {MapComponent, MapTypes} from "@neshan-maps-platform/mapbox-gl-vue";
  import "@neshan-maps-platform/mapbox-gl-vue/dist/style.css";
  //...
</script>

<template>
  <!--  Your component structure-->
  <MapComponent :options="{mapKey:'<YOUR_API_KEY>',mapType:MapTypes.neshanVectorNight}"/>
  <!--  Your component structure-->
</template>

<style>
//  Your styles
</style>
```

[دریافت پروژه نمونه VUE MapboxGL نشان](https://platform.neshan.org/samples/vue-mapbox.zip)

#### پارامترهای ورودی کامپوننت

##### `v-bind:options`: `MapboxComponentInputOptions` *(object)*

یک شیء شامل مقادیر ورودی مورد نیاز برای `mapbox-gl` است. تمام `property`‌ها اختیاری هستند، به‌جز `mapKey` که برای کار کردن کامپوننت **اجباری** است.

| پارامتر | نوع داده | توضیحات | مقدار پیش‌فرض | اجباری |
| --- | --- | --- | --- | --- |
| `mapKey` | `string` | کلید دسترسی (API Key) که از وب‌سایت پلتفرم نشان دریافت می‌شود. اگر مقدار اشتباه باشد، نقشه نمایش داده نمی‌شود و خطایی در Console نشان داده می‌شود. | — | بله |
| `mapType` | `string` | نوع استایل نقشه را مشخص می‌کند. مقادیر مجاز: `neshanVector` \| `neshanVectorNight` \| `neshanRaster` \| `neshanRasterNight` برای مقداردهی می‌توانید از `MapTypes` (enum) استفاده کنید. | `neshanVector` | خیر |
| `poi` | `boolean` | تعیین می‌کند که پس از بارگذاری نقشه، نقاط مهم (POI) نمایش داده شوند یا نه. | `false` | خیر |
| `traffic` | `boolean` | تعیین می‌کند که لایه‌ی ترافیک هنگام بارگذاری فعال باشد یا خیر. | `false` | خیر |
| `isTouchPlatform` | `boolean` | نوع دستگاه را مشخص می‌کند (موبایل/تاچ یا دسکتاپ). | `false` | خیر |
| `mapTypeControllerStatus` | `object` | وضعیت نمایش کنترل انتخاب نوع نقشه (Map Type Controller) و موقعیت آن را تعیین می‌کند. | — | خیر |

```javascript
interface mapTypeControllerStatus {
    show: boolean,
        position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}
```

مقدار پیش‌فرض `show` برابر `true` و مقدار پیش‌فرض `position` برابر `bottom-left` است. می‌توان هر یک از این دو `property` را overwrite کرد.

دیگر propertyهای موجود در options، مربوط به خود mapbox-gl هستند. برای دیدن آنها به مستندات خود کتابخانه‌ی [mapbox-gl](https://docs.mapbox.com/mapbox-gl-js/guides/) مراجعه کنید.

نکته شما نمی‌توانید مقداری برای property تعیین کننده‌ی container پاس دهید.

#### `v-bind:map-setter : (map: SDKMap) => void (optional)`

از نوع تابع است و صرفا یک ورودی می‌گیرد. پاس دادن آن، اختیاری است. این تابع برای دسترسی شما به instance ایجاد شده از کلاس Map است. بعد از ایجاد شدن Map، مقدار آن به عنوان ورودی به این تابع، پاس داده می‌شود.

`containerElementSetter: (el: HTMLDivElement) => void (optional)`

از نوع تابع است و صرفا یک ورودی می‌گیرد. پاس دادن آن، اختیاری است. این تابع برای دسترسی شما به elementای که Map در آن رندر می‌شود، است. بعد از ایجاد شدن Map و رندر شدن آن، خود containerElement به عنوان ورودی به این تابع، پاس داده می‌شود.

توجه مواردی که ذکر شد، prop هایی بودند که مستقیما در عملکرد نقشه نقش داشتند و یا با نقشه سروکار دارند. اما این کامپوننت، propهای دیگری نیز می‌پذیرد. شما می‌توانید همه‌ی propهایی که یک HTMLDivElement قبول می‌کند را به کامپوننت پاس بدهید. همه‌ی این propها، به container نقشه پاس داده خواهند شد.

#### استفاده از کلاس‌های MapboxGL

همانطور که در بخش وابستگی‌ها مشاهده می‌شود، این کتابخانه از پکیج `@neshan-maps-platform/mapbox-gl` استفاده می‌کند. برای استفاده از دیگر کلاس‌ها و `property`های MapboxGL، مانند `Marker` و …، باید آنها را از مسیر `@neshan-maps-platform/mapbox-gl`، در جایی که می‌خواهید، `import` کنید. مانند مثال زیر:

```javascript
<script setup>
  //...
  import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
  const marker = new nmp_mapboxgl.Marker(...);
  //...
</script>

<template>
  <!--  Your component structure-->
</template>

<style>
  //  Your styles
</style>
```

[دریافت پروژه نمونه VUE MapboxGL نشان](https://platform.neshan.org/samples/vue-mapbox.zip)
مراجعه به مستندات کتابخانه mapbox-gl نشان
