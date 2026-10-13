---
source: https://platform.neshan.org/docs/sdk/web/openlayers/react-openlayers/
title: React OpenLayers نشان
---

آخرین نسخهنسخه 3.0.1

# کیت توسعه react openlayers نشان

اطلاع

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات آخرین نسخه کیت توسعه react openlayers می‌باشد.
مستندات مرتبط با نسخه قدیمی این سرویس را در این صفحه می‌توانید مشاهده کنید.

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

با وجود اینکه این کامپوننت بر پایه‌ی کتابخانه Openlayers بنا شده، برای استفاده با تنظیمات پیش فرض نقشه یا حتی کمی فراتر، نیاز به داشتن دانشی از این کتابخانه ندارید. ولی برای استفاده‌های شخصی سازی شده تر، می‌توانید از امکانات این کتابخانه با استفاده از متغیر نقشه که در دسترس توسعه دهنده قرار داده می‌شود استفاده نمایید.
کامپوننت [React](https://react.dev/) نقشه و مسیریاب نشان، برای راحتی بیشتر توسعه‌دهنده‌های وب ایجاد گشته و با Api ساده،قابلیت‌های نقشه و سرویس‌های نشان را در اختیار توسعه دهندگان React قرار می‌دهد.  
این کامپوننت از نقشه‌ی openlayers v8.1.0 استفاده می‌نماید. برای شخصی‌سازی کردن بیشتر نقشه، می‌توانید از داکیومنت‌های رسمی openlayers نیز استفاده نمایید.

[https://openlayers.org/en/v8.1.0/doc](https://openlayers.org/en/v8.1.0/apidoc/)

[دریافت پروژه نمونه React OpenLayers نشان](https://platform.neshan.org/samples/React-Neshan-Maps-Openlayers-Sample-Code.zip)

## راه اندازی نقشه

### نحوه نصب

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

مطمئن شوید که ورژن بروز [Node.js](https://nodejs.org/) را نصب دارید. سپس از یکی از راه های زیر برای نصب پکیج از npm اقدام کنید.

```javascript
npm install @neshan-maps-platform/react-openlayers
npm install @neshan-maps-platform/ol
```

```javascript
yarn add @neshan-maps-platform/react-openlayers
yarn add @neshan-maps-platform/ol
```

#### TypeScript

اگر پروژه‌یتان از ‌TypeScript پشتیبانی می‌کند @neshan-maps-platform/react-openlayers بر روی TypeScript نوشته شده و به طور کامل Type های کامپوننت را تعریف و ارائه می‌کند. برای اینکه از تایپ‌های نقشه openlayers که در کامپوننت استفاده می‌شود هم استفاده کنید، از دستور زیر، Type های openlayers را نصب کنید.

```javascript
npm install –save-dev @types/ol@5
```

```javascript
yarn add -D @types/ol@5
```

### نحوه استفاده

پس از نصب در پروژه‌تان، می‌توانید هر تعداد نقشه که می‌خواهید را در هر پروژه‌ی ری‌اکت با ورژن 19.2.1 و بالاتر استفاده کنید. به خاطر داشته باشید، هر نقشه برای راه اندازی اولیه و نمایش حداقل امکانات، به یک کلید نقشه نیاز دارد.

[مثال راه اندازی را ببینید](#%D8%B4%D8%B1%D9%88%D8%B9-%D9%86%D9%82%D8%B4%D9%87).

```javascript
import {useEffect, useRef} from "react"
import {Map} from "@neshan-maps-platform/ol"
import NeshanMap, {NeshanMapRef} from "@neshan-maps-platform/react-openlayers"

function App() {
 return <NeshanMap
       mapKey="YOUR_MAP_KEY"
></NeshanMap>
}

export default App
```

### API: Openlayers

این کامپوننت از نسخه یکپارچه شده‌ی نقشه‌ی openlayers v8.1.0 استفاده می‌کند. برای شخصی‌سازی کردن بیشتر نقشه، می‌توانید از داکیومنت‌های رسمی openlayers نیز استفاده بکنید.

[مستندات openlayers](https://openlayers.org/en/v8.1.0/apidoc/)

#### [مطالعه مستندات OpenLayers](https://openlayers.org/en/v8.1.0/apidoc/)

### Component Props

###### Global

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
onInit?: (map: OlMap) => void
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

###### Methods

توابع و متغیر هایی که می‌توانید خارج از کامپوننت به آن ها دسترسی داشته باشید را در اختیارتان قرار می‌دهد.  
 [مثال را ببینید.](#%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87-%D8%A7%D8%B2-%D9%86%D9%82%D8%B4%D9%87-%D9%88-%D9%85%D8%AA%D8%AF-%D9%87%D8%A7%DB%8C-%D9%86%D9%82%D8%B4%D9%87)

**#mapRef.mapContainer**

المان html ای که نقشه در آن قرار دارد.

```javascript
mapContainer :  HTMLDivElement
```

**#mapRef.ol**

آبجکت OpenLayer

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

##### متدهای نقشه (olMap)

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

##### **شروع نقشه:**

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
import {useEffect, useRef} from "react"
import {Map} from "@neshan-maps-platform/ol"
import NeshanMap, {NeshanMapRef} from "@neshan-maps-platform/react-openlayers"

function App() {
 return <NeshanMap
       	mapKey="YOUR_MAP_KEY"
      center={{ latitude: 35.7665394, longitude: 51.4749824 }}
        	zoom={14}
></NeshanMap>
}

export default App
```

##### **استفاده از نقشه و متد های نقشه:**

```javascript
import {useEffect, useRef} from "react"
import {Map} from "@neshan-maps-platform/ol"
import NeshanMap, {NeshanMapRef} from "@neshan-maps-platform/react-openlayers"

function App() {
    const mapRef = useRef<NeshanMapRef | null>(null)

    const onInit = (map: Map) => {
        map.setMapType("dreamy")
    }

    useEffect(() => {
        if (mapRef.current?.map) {
            mapRef.current?.map.setMapType("dreamy")
        }
    }, [])

    return (
        <div style={{ width: "100vh"}}>
            <NeshanMap
                mapKey="Your_Map_Key"
                defaultType="dreamy"
                center={{latitude: 35.7665394, longitude: 51.4749824}}
                style={{height: "48vh", width: "100%"}}
                onInit={onInit}
                zoom={13}
                poi={false}
            ></NeshanMap>
            <hr/>
            <NeshanMap
                ref={mapRef}
                mapKey="Your_Map_Key"
                defaultType="dreamy"
                style={{height: "48vh", width: "100%"}}
                poi={false}
            ></NeshanMap>
        </div>
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

