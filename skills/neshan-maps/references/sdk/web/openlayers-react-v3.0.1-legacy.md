---
source: https://platform.neshan.org/docs/sdk/web/openlayers/react-openlayers/3.0.1/
title: React OpenLayers  کامپوننت نقشه نشان
---

آخرین نسخهنسخه 3.0.1

# کیت توسعه react openlayers نشان

هشدار

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات نسخه قدیمی کیت توسعه react openlayers می‌باشد.
مستندات مرتبط با نسخه قدیمی این سرویس را در این صفحه می‌توانید مشاهده کنید.

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

کامپوننت [React](https://react.dev/) نقشه و مسیریاب نشان، برای راحتی بیشتر توسعه‌دهنده‌های وب ایجاد گشته و با Api ساده،قابلیت‌های نقشه و سرویس‌های نشان را در اختیار توسعه دهندگان React قرار می‌دهد.  
این کامپوننت از نقشه‌ی openlayers v5.3.0 استفاده می‌نماید. برای شخصی‌سازی کردن بیشتر نقشه، می‌توانید از داکیومنت‌های رسمی openlayers نیز استفاده نمایید.

<https://openlayers.org/en/v5.3.0/doc/>

نکته

جهت مشاهده نمونه پروژه react می توانید به github پلتفرم نشام نشان به آدرس زیر مراجعه بفرمایید.

<https://github.com/NeshanMaps/React-Neshan-Maps-Openlayers-Sample-Code>

## راه اندازی نقشه

### نحوه نصب

مطمئن شوید که ورژن بروز [Node.js](https://nodejs.org/) را نصب دارید. سپس از یکی از راه های زیر برای نصب پکیج از npm اقدام کنید.

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

```bash
npm install @neshan-maps-platform/react-openlayers@3.0.1 --save
```

```bash
yarn add @neshan-maps-platform/react-openlayers@3.0.1
```

#### TypeScript

اگر پروژه‌یتان از ‌TypeScript پشتیبانی می‌کند @neshan-maps-platform/react-openlayers بر روی TypeScript نوشته شده و به طور کامل Type های کامپوننت را تعریف و ارائه می‌کند. برای اینکه از تایپ‌های نقشه openlayers که در کامپوننت استفاده می‌شود هم استفاده کنید، از دستور زیر، Type های openlayers را نصب کنید.

```bash
npm install –save-dev @types/ol@5
```

```bash
yarn add -D @types/ol@5
```

### نحوه استفاده

پس از نصب در پروژه‌تان، می‌توانید هر تعداد نقشه که می‌خواهید را در هر پروژه‌ی React18 استفاده کنید. به خاطر داشته باشید، هر نقشه برای راه اندازی اولیه و نمایش حداقل امکانات، به یک کلید نقشه نیاز دارد.

[مثال راه اندازی را ببینید](#%D8%B4%D8%B1%D9%88%D8%B9-%D9%86%D9%82%D8%B4%D9%87).

```javascript
import NeshanMap from "@neshan-maps-platform/react-openlayers"
import "@neshan-maps-platform/react-openlayers/dist/style.css"

function App() {
 return <NeshanMap
       mapKey="YOUR_MAP_KEY"
></NeshanMap>
}

export default App
```

### API: Openlayers

این کامپوننت از نسخه یکپارچه شده‌ی نقشه‌ی openlayers v5.3.0 استفاده می‌کند. برای شخصی‌سازی کردن بیشتر نقشه، می‌توانید از داکیومنت‌های رسمی openlayers نیز استفاده بکنید.

[مستندات openlayers](https://openlayers.org/en/v5.3.0/doc/)

نکته

منظور از یکپارچه شده این است که برای مثال اگر در داکیومنت های openlayers، گفته شده که تابع fromLonLat را باید از پوشه‌ی proj پکیج import کنید:

```javascript
Import { fromLonLat } from “ol/proj”
```

به جای این طریق در ol یکپارچه شده، باید این تابع را به صورت

ol.proj.fromLonLat

فراخوانی کنید.

### Component Props

#### Global

**#mapKey\***

کلید نقشه که در پروفایل خود در قسمت کلید های دسترسی دریافت نمایید.

**#center**

مرکز نقشه در هنگام شروع.  
در صورتی که تعیین نشود، نقشه از کاربر اجازه دسترسی به موقعیت گرفته و آن را مرکز نقشه قرار می‌دهد.  
[مثال را ببینید.](#%D9%85%D8%B1%DA%A9%D8%B2-%D9%86%D9%82%D8%B4%D9%87-%D9%88-%D8%B2%D9%88%D9%85)

```javascript
center: CoordsObj
interface  CoordsObj
{
    latitude: number,
    longitude: number,
}
```

**#onInit**

تابعی که پس از ایجاد شدن نقشه فراخوانی می‌شود و شما می‌توانید اکشن‌های مورد نیاز خود را داخل آن انجام دهید. این تابع دو ورودی می‌گیرد که ورودی اول آن خود آبجکت نقشه و ورودی دوم آن کتابخانه‌ی یکپارچه شده‌ی openlayers است.  
[مثال را ببینید.](#oninit)

```javascript
onInit?: (ol: Ol,map: OlMap) => void
```

**#scale**

میزان ریزی یا درشتی ابعاد اجزای نقشه متناسب با یکدیگر

```javascript
scale?: number
```

###### بخش تنظیمات لایه ها

**#zoom**

 میزان زوم نقشه در هنگام شروع

```javascript
zoom?: number
```

**#poi**

 نمایش یا عدم نمایش مکانها روی نقشه

```javascript
poi?: boolean
```

**#defaultType**

استایل نقشه در هنگام شروع

[مثال را ببینید.](#%D8%A7%D8%B3%D8%AA%D8%A7%DB%8C%D9%84-%D9%86%D9%82%D8%B4%D9%87-%D8%AF%D8%B1-%D9%87%D9%86%DA%AF%D8%A7%D9%85-%D8%B4%D8%B1%D9%88%D8%B9)

```javascript
defaultType?: MapType

type MapType =
    |"dreamy"
    |"standard-night"
```

#### Methods

توابع و متغیر هایی که می‌توانید خارج از کامپوننت به آن ها دسترسی داشته باشید را در اختیارتان قرار می‌دهد.  
 [مثال را ببینید.](#%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87-%D8%A7%D8%B2-ol-%DB%8C%DA%A9%D9%BE%D8%A7%D8%B1%DA%86%D9%87-oninit-mapref-%D9%88-%D9%85%D8%AA%D8%AF-%D9%87%D8%A7%DB%8C-%D9%86%D9%82%D8%B4%D9%87)

**#mapRef.mapContainer**

المان html ای که نقشه در آن قرار دارد.

```javascript
mapContainer :  HTMLDivElement
```

**#mapRef.ol**

پکیج یکپارچه شده‌ی openlayers. منظور از یکپارچه شده این است که برای مثال اگر در [داکیومنت های openlayers](https://openlayers.org/en/v5.3.0/doc/)، گفته شده که تابع fromLonLat را باید از پوشه‌ی proj پکیج import کنید:

```javascript
Import { fromLonLat } from “ol/proj”
```

به جای این طریق در ol یکپارچه شده، باید این تابع را به صورت

ol.proj.fromLonLat

فراخوانی نمایید.

```javascript
ol?:  Ol
```

**#mapRef.map**

نقشه‌ی ایجاد شده روی openlayers.

```javascript
map?:  OlMap | null
```

**#mapRef.isInitiated**

وضعیت نقشه که آیا ایجاد شده‌است یا خیر.

```javascript
isInitiated:  boolean
```

#### متدهای نقشه (olMap)

نقشه‌ای که در اختیار توسعه‌دهنده قرار داده می‌شود، چند متد به شرح زیر بیشتر از نقشه‌ی پایه‌ی openlayers دارد.

**#olMap.setMapType**

پس از ایجاد شدن نقشه، می‌توانید نوع نقشه را با این تابع تغییر دهید.

```javascript
setMapType(value: MapType): void
```

**#olMap.switchPoiLayer**

پس از ایجاد شدن نقشه، می‌توانید نمایش نقاط نقشه را با این تابع خاموش و روشن کنید.

```javascript
switchPoiLayer(value: boolean): void
```

### مثالها:

#### **شروع نقشه:**

```javascript
import NeshanMap from "@neshan-maps-platform/react-openlayers"
import "@neshan-maps-platform/react-openlayers/dist/style.css"

function App() {
 return <NeshanMap
       mapKey="YOUR_MAP_KEY"
></NeshanMap>
}

export default App
```

##### **مرکز نقشه و زوم:**

```javascript
import  NeshanMap  from "@neshan-maps-platform/react-openlayers"
import "@neshan-maps-platform/react-openlayers/dist/style.css"

function App() {
 return <NeshanMap
       	mapKey="YOUR_MAP_KEY"
      center={{ latitude: 35.7665394, longitude: 51.4749824 }}
        	zoom={14}
></NeshanMap>
}

export default App
```

##### **استفاده از ol یکپارچه، onInit، mapRef و متد های نقشه:**

```javascript
import { useEffect, useRef, useState } from "react"
import NeshanMap from "@neshan-maps-platform/react-openlayers"
// If you want to use ol types like below, your project has to support typescript.
import type { NeshanMapRef, OlMap, Ol } from "@neshan-maps-platform/react-openlayers"

function App() {
 const mapRef = useRef<NeshanMapRef | null>(null)

 const [ol, setOl] = useState<Ol>()
 const [olMap, setOlMap] = useState<OlMap>()

 const onInit = (ol: Ol, map: OlMap) => {
   setOl(ol)
   setOlMap(map)

   setTimeout(() => {
     const view = map.getView()
     view.animate({
       center: ol.proj.fromLonLat([51.36281969540723, 35.69672648316882]),
       zoom: 12,
       duration: 1000,
     })
   }, 2000)
 }

 useEffect(() => {
   const interval = setInterval(() => {
     if (mapRef.current?.map) {
       mapRef.current?.map.setMapType("standard-night")
       clearInterval(interval)
     }
   }, 1000)
   return () => clearInterval(interval)
 }, [])

 return (
   <>
     <NeshanMap
       mapKey="YOUR_MAP_KEY"
       defaultType="dreamy"
       center={{ latitude: 35.7665394, longitude: 51.4749824 }}
       style={{ height: "48vh", width: "100%" }}
       onInit={onInit}
       zoom={13}
     ></NeshanMap>
     <hr />
     <NeshanMap
       ref={mapRef}
       mapKey="YOUR_MAP_KEY"
       defaultType="dreamy"
       style={{ height: "48vh", width: "100%" }}
     ></NeshanMap>
   </>
 )
}

export default App
```

پس از چند لحظه:

##### **استایل نقشه در هنگام شروع:**

```javascript
<NeshanMap
        	mapKey="YOUR_MAP_KEY"
      center={{ latitude: 35.69672648316882, longitude: 51.36281969540723 }}
        	defaultType="standard-night">
</NeshanMap>
```

