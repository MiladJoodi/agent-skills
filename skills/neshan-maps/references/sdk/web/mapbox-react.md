---
source: https://platform.neshan.org/docs/sdk/web/mapboxgl/react-mapbox/
title: React Mapbox GL نشان
---

# React Mapbox GL نشان | کامپوننت نقشه برای React

هشدار

این نسخه منقضی شده و پشتیبانی از آن صورت نمی‌گیرد. برای استفاده از نسخه جدید بر پایه MapLibre به اینجا مراجعه کنید.

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

## کامپوننت Mapbox gl React

کامپوننت [React](https://react.dev/) نقشه و مسیریاب نشان، برای راحتی بیشتر توسعه‌دهنده‌های وب ایجاد گشته و با Api ساده،قابلیت‌های نقشه و سرویس‌های نشان را در اختیار توسعه دهندگان React قرار می‌دهد.
این کامپوننت از نقشه‌ی mapbox-gl v1.13.2 استفاده می‌نماید. برای شخصی‌سازی کردن بیشتر نقشه، می‌توانید از داکیومنت‌های رسمی [mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/) نیز استفاده نمایید.
پکیج mapbox-gl-react یک wrapper برای پکیج `@neshan-maps-platform/mapbox-gl` جهت استفاده در پروژه‌های ساخته شده با   ReactJS با قابلیت پشتیبانی از TypeScript است. به کمک این پکیج، شما به راحتی می‌توانید درون پروژه‌ی ReactJS خود، از mapboxgl با استایل‌های نقشه‌ی نشان، به همراه قابلیت نمایش ترافیک و POIها، استفاده کنید.

مراجعه به مستندات کتابخانه mapbox-gl نشان

## وابستگی ها (Dependencies):

- `@neshan-maps-platform/mapbox-gl`: ورژن `1.0.10` یا بالاتر
- `@types/mapbox-gl`: ورژن `2.7.15` یا بالاتر
- `react`: ورژن `18.2.0` یا بالاتر
- `react-dom`: ورژن `18.2.0` یا بالاتر

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
npm install @neshan-maps-platform/mapbox-gl-react
```

```bash
yarn add @neshan-maps-platform/mapbox-gl-react
```

## نحوه استفاده و راه اندازی نقشه

بعد از نصب کردن پکیج در پروژه‌ی خود، می‌توانید با استفاده از کامپوننت `MapComponent`، از نقشه استفاده کنید.

```javascript
// Your imports
import {MapComponent, MapTypes} from "@neshan-maps-platform/mapbox-gl-react";
import '@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css';

function App() {
    // Your Code
    return (
        {/*Your Component Structure*/}
        <MapComponent options={{mapKey: "<YOUR_API_KEY>", mapType: MapTypes.neshanRasterNight}}/>
        {/*Your Component Structure*/}
    );
}

export default App;
```

[پروژه نمونه React MapboxGL نشان](https://platform.neshan.org/samples/react-mapbox.zip)

#### پارامترهای ورودی کامپوننت:

##### options: MapboxComponentInputOptions (object)

یک شیء که شامل مقادیر ورودی مورد نیاز برای `mapbox-gl` است. تمامی `property`های زیر، اختیاری هستند و مقدار پیش‌فرض آنها نیز ذکر شده.

| پارامتر | نوع داده | توضیحات | مقدار پیش‌فرض | اجباری |
| --- | --- | --- | --- | --- |
| `mapKey` | `string` | کلید دسترسی (API Key) که از وب‌سایت پلتفرم نشان دریافت می‌شود. اگر مقدار اشتباه باشد، نقشه نمایش داده نمی‌شود و خطا در Console ظاهر می‌شود. | — | بله |
| `mapType` | `string` | نوع استایل نقشه را مشخص می‌کند. مقادیر مجاز: `neshanVector` \| `neshanVectorNight` \| `neshanRaster` \| `neshanRasterNight` برای مقداردهی می‌توانید از `MapTypes` (enum) استفاده کنید. | `neshanVector` | خیر |
| `poi` | `boolean` | مشخص می‌کند که پس از لود شدن نقشه، نقاط مهم (POI) نمایش داده شوند یا نه. | `false` | خیر |
| `traffic` | `boolean` | تعیین می‌کند که لایه‌ی ترافیک از ابتدا فعال باشد یا خیر. | `false` | خیر |
| `isTouchPlatform` | `boolean` | تعیین می‌کند که پلتفرم کاربر تاچ (موبایل) است یا دسکتاپ. | `false` | خیر |
| `mapTypeControllerStatus` | `object` | مشخص می‌کند کنترل انتخاب نوع نقشه (Map Type Controller) نمایش داده شود یا خیر و موقعیت آن کجاست. | — | خیر |

```javascript
interface mapTypeControllerStatus {
    show: boolean,
        position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}
```

نکته

مقدار پیش‌فرض `show` برابر `true` و مقدار پیش‌فرض `position` برابر `bottom-left` است. می‌توان هر یک از این دو `property` را overwrite کرد.

نکته

دیگر propertyهای موجود در options، مربوط به خود mapbox-gl هستند. برای دیدن آنها به مستندات خود کتابخانه‌ی [mapbox-gl](https://docs.mapbox.com/mapbox-gl-js/guides/) مراجعه کنید.

نکته

نکته شما نمی‌توانید مقداری برای property تعیین کننده‌ی container پاس دهید.

نکته

[`mapSetter: (map: SDKMap) => void (optional)`](https://www.npmjs.com/package/@neshan-maps-platform/mapbox-gl-react?activeTab=readme#mapsetter-map-sdkmap--void-optional)
از نوع تابع است و صرفا یک ورودی می‌گیرد. پاس دادن آن، اختیاری است. این تابع برای دسترسی شما به instance ایجاد شده از کلاس Map است. بعد از ایجاد شدن Map، مقدار آن به عنوان ورودی به این تابع، پاس داده می‌شود.

نکته

[`containerElementSetter: (el: HTMLDivElement) => void (optional)`](https://www.npmjs.com/package/@neshan-maps-platform/mapbox-gl-react?activeTab=readme#containerelementsetter-el-htmldivelement--void-optional)

از نوع تابع است و صرفا یک ورودی می‌گیرد. پاس دادن آن، اختیاری است. این تابع برای دسترسی شما به elementای که Map در آن رندر می‌شود، است. بعد از ایجاد شدن Map و رندر شدن آن، خود containerElement به عنوان ورودی به این تابع، پاس داده می‌شود.

اطلاع

مواردی که ذکر شد، prop هایی بودند که مستقیما در عملکرد نقشه نقش داشتند و یا با نقشه سروکار دارند. اما این کامپوننت، propهای دیگری نیز می‌پذیرد. شما می‌توانید همه‌ی propهایی که یک HTMLDivElement قبول می‌کند را به کامپوننت پاس بدهید. همه‌ی این propها، به container نقشه پاس داده خواهند شد.

هشدار

در حال حاضر کامپوننت ری‌اکت نشان از قابلیت SSR و SSG پشتیبانی نمی‌کند.

#### استفاده از کلاس‌های MapboxGL

همانطور که در بخش وابستگی‌ها مشاهده می‌شود، این کتابخانه از پکیج `@neshan-maps-platform/mapbox-gl` استفاده می‌کند. برای استفاده از دیگر کلاس‌ها و `property`های MapboxGL، مانند `Marker` و …، باید آنها را از مسیر `@neshan-maps-platform/mapbox-gl`، در جایی که می‌خواهید، `import` کنید. مانند مثال زیر:

```javascript
//...
import nmp_mapboxgl from '@neshan-maps-platform/mapbox-gl';

function MyComponent(...){
  //Your code here
  const marker = new nmp_mapboxgl.Marker(...);
  return (...);
}

export default MyComponent
```

[پروژه نمونه React MapboxGL نشان](https://platform.neshan.org/samples/react-mapbox.zip)
مراجعه به مستندات کتابخانه mapbox-gl نشان
