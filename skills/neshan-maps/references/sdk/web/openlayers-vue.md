---
source: https://platform.neshan.org/docs/sdk/web/openlayers/vue-openLayers/
title: Vue OpenLayers نشان
---

# کیت توسعه vue openLayers نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

## پـیش نیازها

 در این کامپوننت قابلیت های زیر به صورت پیش فرض پیاده سازی شده است.

- نمایش لایه نتورک بروز و همگام با نقشه مسیریاب نشان
- نمایش لایه مکان‌ها روی نقشه
- نمایش لایه رنگ بندی ترافیک زنده مسیرها
- پیاده سازی سرویس تبدیل نقطه جغرافیایی به آدرس
- پیاده سازی سرویس جستجو

این کامپوننت از نقشه‌ی [openlayers v8.1.0](https://openlayers.org/en/v8.1.0/apidoc/) استفاده می‌نماید. برای شخصی‌سازی کردن بیشتر نقشه، می‌توانید از داکیومنت‌های رسمی [openlayers](https://openlayers.org/en/v8.1.0/apidoc/) نیز استفاده نمایید.

نکته

جهت مشاهده نمونه پروژه vuejs می توانید به github پلتفرم نشام نشان به آدرس زیر مراجعه بفرمایید.

<https://github.com/NeshanMaps/Vue3-Neshan-Maps-Openlayers-Sample-Code>

## راه اندازی نقشه

### نحوه نصب

مطمئن شوید که ورژن بروز [Node.js](https://nodejs.org/) را نصب دارید. سپس از یکی از راه های زیر برای نصب پکیج از npm اقدام کنید.
این دستور تمام چیز هایی که برای اجرای پروژه به آن نیاز دارید را بر روی دستگاه شما نصب می‌کند.

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
npm install @neshan-maps-platform/vue3-openlayers
npm install @neshan-maps-platform/ol
```

```bash
yarn add @neshan-maps-platform/vue3-openlayers
yarn add @neshan-maps-platform/ol
```

### نحوه استفاده

```git
<template>
    <div class="page">
        <NeshanMap
            defaultType="dreamy"
            mapKey="YOUR_MAP_KEY"
            serviceKey="YOUR_SERVICE_KEY"
            :center="{latitude: 36.311559, longitude: 59.5870851}"
            :zoom="14"
            :poi="true"
            @on-init="onInit"
        />
    </div>
</template>
<style>
    @import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
    html, body, .page, #app {
        width: 100%;
        height: 100%;
        display: block;
        padding: 0;
        margin: 0;
    }
</style>
```

```javascript
<script setup lang="ts">
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import { Map } from "@neshan-maps-platform/ol"
import {fromLonLat} from '@neshan-maps-platform/ol/proj'

function onInit(map:Map) {
    const view = map?.getView()
    view?.animate({
        center: olProj.fromLonLat([59.5870851, 36.311559]),
        zoom: 11,
        duration: 1000,
    })
}
</script>
```

پس از نصب در پروژه‌تان، می‌توانید هر تعداد نقشه که میخواهید را در هر صفحه‌ی دارای دسترسی به vuejs 3 استفاده کنید. به خاطر داشته باشید، هر نقشه برای راه اندازی اولیه و نمایش حداقل امکانات، به یک کلید نقشه نیاز دارد.

[مثال راه اندازی را ببینید](#%D8%B4%D8%B1%D9%88%D8%B9-%D9%86%D9%82%D8%B4%D9%87).

### API: Openlayers

این کامپوننت از نسخه یکپارچه شده‌ی نقشه‌ی openlayers v8.1.0 استفاده می‌کند. برای شخصی‌سازی کردن بیشتر نقشه، می‌توانید از داکیومنت‌های رسمی openlayers نیز استفاده بکنید.

[مستندات openlayers](https://openlayers.org/en/v8.1.0/apidoc/)

### Component Props

##### Global

**#mapKey\***

کلید نقشه که در پروفایل خود در قسمت کلید های دسترسی دریافت نمایید.

```javascript
type: String,
required: true,
```

**#serviceKey\***

 کلید سرویس‌ها برای تبدیل نقطه به آدرس (Reverse) و جستجو (Search). برای مخفی ماندن کلید سرویس‌ها، می‌‎توانید به جای دادن این پارامتر، از دو پارامتر searchUrl و reverseUrl استفاده کنید و پاسخ وب سرویس ها را همانند انتظار، از طریق api خودتان باز گردانید.

```javascript
type: String,
default: "",
```

**#searchUrl\***

مسیر وب سرویسی که می‌خواهید برای مخفی ماندن کلید سرویس، به هنگام جستجوی search صدا زده شود.  
[مثال  را ببینید](#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1-%D9%85%D8%B3%DB%8C%D8%B1-%D9%88%D8%A8-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-search).

```javascript
type: String
```

مسیری که پس از دادن این url به کامپوننت، توسط کامپوننت صدا زده می‌شود، به صورت زیر است.

```javascript
const params = `?term=${term}&lat=${lat}&lng=${lng}`
const url = searchUrl + params
```

نکته

همچنین دقت شود که خروجی مسیری که به این پارامتر می‌دهید، باید از نوع SearchResult باشد. (دقیقا پاسخی که وب سرویس نشان به شما می‌دهد)

```javascript
interface SearchResult {
  	count: number
  	items: PrimarySearchItem[]
}
interface PrimarySearchItem {
  		category: string
  		location: {
    			x: number
    			y: number
  		}
  		neighbourhood: string
  		region: string
  		title: string
  		type: string
  		address: string
}
```

**#reverseUrl\***

مسیر وب سرویسی که می‌خواهید برای مخفی ماندن کلید سرویس، به هنگام جستجوی reverse صدا زده شود.

```javascript
type: String
```

مسیری که پس از دادن این url به کامپوننت، توسط کامپوننت صدا زده می‌شود، به صورت زیر است.

```javascript
const params = `?lat=${lat}&lng=${lng}`
const url = reverseUrl + params
```

نکته

همچنین دقت شود که خروجی مسیری که به این پارامتر می‌دهید، باید از نوع PrimaryReverseResult باشد. (دقیقا پاسخی که وب سرویس نشان به شما می‌دهد)

```javascript
interface PrimaryReverseResult {
  		city: NuString
  		district: NuString
  		formatted_address: NuString
  		in_odd_even_zone: boolean
  		in_traffic_zone: boolean
  		municipality_zone: NuString
  		neighbourhood: NuString
  		place: NuString
  		route_name: NuString
  		route_type: null | RouteTypes
  		state: NuString
  		status: NuString
  		village: NuString
}

type NuString = null | string
```

**#center**

مرکز نقشه در هنگام شروع.  
در صورتی که تعیین نشود، نقشه از کاربر اجازه دسترسی به موقعیت گرفته و آن را مرکز نقشه قرار می‌دهد.  
[مثال را ببینید.](#%D9%85%D8%B1%DA%A9%D8%B2-%D9%86%D9%82%D8%B4%D9%87-%D9%88-%D8%B2%D9%88%D9%85)

```javascript
type: Object as PropType<CoordsObj
default: null,

interface CoordsObj {
  		latitude: number
  		longitude: number
}
```

**#reverseOnClick**

انجام یا عدم انجام reverse geocoding در هنگام کلیک روی نقشه (در صورت true بودن، کلید سرویس باید موجود باشد)

```javascript
type: Boolean,
default: true,
```

**#scale**

میزان ریزی یا درشتی ابعاد اجزای نقشه متناسب با یکدیگر – [مثال را ببینید.](#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1-scale)

```javascript
type: Number,
    default: 1,
```

**#viewType**

نوع نمایش نقشه که در حالت عادی به طور خودکار برای پلتفرم های دسکتاپ و موبایل متغیر است.

```javascript
type: String as PropType<ViewType>
type ViewType = undefined | 'desktop' | 'mobile'
```

#### بخش تنظیمات لایه ها (Layers Section)

**#hideLayers**

عدم نمایش بخش لایه‌ها – [مثال را ببینید.](#%D8%B9%D8%AF%D9%85-%D9%86%D9%85%D8%A7%DB%8C%D8%B4-%D8%A8%D8%AE%D8%B4-%D9%84%D8%A7%DB%8C%D9%87%E2%80%8C%D9%87%D8%A7)

```javascript
type: Boolean
```

**#zoom**

 میزان زوم نقشه در هنگام شروع

```javascript
type: Number,
default: 12,
```

**#poi**

 نمایش یا عدم نمایش مکانها روی نقشه – [مثال را ببینید.](#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1-%D9%84%D8%A7%DB%8C%D9%87%E2%80%8C%DB%8C-%D9%87%D8%A7%DB%8C-poi-traffic-%D9%88-%D8%A7%D8%B3%D8%AA%D8%A7%DB%8C%D9%84-%D9%BE%DB%8C%D8%B4%D9%81%D8%B1%D8%B6-%D9%86%D9%82%D8%B4%D9%87)

```javascript
type: Boolean,
default: true,
```

**#defaultType**

استایل نقشه در هنگام شروع

```javascript
type: String as PropType,
default: "dreamy",

type MapType =
    |"dreamy"
    |"standard-night"
```

**#mapTypes**

 آرایه‌ای از استایل های نقشه هایی که می‌خواهید در لایه‌ها نمایش داده شوند. – [مثال را ببینید.](#%D9%85%D8%AD%D8%AF%D9%88%D8%AF-%DA%A9%D8%B1%D8%AF%D9%86-%D8%A7%D8%B3%D8%AA%D8%A7%DB%8C%D9%84-%D9%87%D8%A7%DB%8C-%D9%85%D9%88%D8%B1%D8%AF-%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87-%D8%AF%D8%B1-%D9%86%D9%85%D8%A7%DB%8C%D8%B4-%D9%86%D9%82%D8%B4%D9%87)

```javascript
type: Array as PropType<MapType[]>,
default: ["dreamy", "standard-night"]
```

**#desktopLayersClass**

 تغییر کلاس بخش لایه‌ها برای حالت دسکتاپ – [مثال را ببینید.](#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1-%DA%A9%D9%84%D8%A7%D8%B3-%D8%A8%D8%AE%D8%B4-%D9%84%D8%A7%DB%8C%D9%87%E2%80%8C%D9%87%D8%A7)

```javascript
type: [String, Array, Object]
```

**#mobileLayersClass**

 تغییر کلاس بخش لایه‌ها برای حالت موبایل

```javascript
type: [String, Array, Object]
```

**#desktopLayersStyle**

تغییر استایل بخش  لایه‌ها برای حالت دسکتاپ

```javascript
type: Object
```

**#mobileLayersStyle**

تغییر استایل بخش  لایه‌ها برای حالت موبایل

```javascript
type: Object
```

###### Markers and Results

**#persistantPopupContainerClass**

تغییر کلاس پاپ آپ دائم (هنگامی که کاربر کلیک می‌کند)

```javascript
type: [String, Array, Object]
```

**#temporaryPopupContainerClass**

تغییر کلاس پاپ آپ موقت (هنگامی که کاربر با موس هاور می‌کند)

```javascript
type: [String, Array, Object]
```

**#temporaryPopupContainerStyle**

تغییر استایل پاپ آپ موقت

```javascript
type: Object
```

**#persistantPopupContainerStyle**

تغییر استایل پاپ آپ دائم

```javascript
type: Object
```

**#hideLayers**

عدم نمایش لایه‌ها – [مثال را ببینید.](#%D8%B9%D8%AF%D9%85-%D9%86%D9%85%D8%A7%DB%8C%D8%B4-%D8%A8%D8%AE%D8%B4-%D8%B3%D8%B1%DA%86-%D9%88-%D9%86%D8%AA%D8%A7%DB%8C%D8%AC-%D9%88-%D9%84%D8%A7%DB%8C%D9%87%E2%80%8C%D9%87%D8%A7)

```javascript
type: Boolean
```

**#hideSearchContainer**

عدم نمایش بخش سرچ و نتایج – [مثال را ببینید.](#%D8%B9%D8%AF%D9%85-%D9%86%D9%85%D8%A7%DB%8C%D8%B4-%D8%A8%D8%AE%D8%B4-%D8%B3%D8%B1%DA%86-%D9%88-%D9%86%D8%AA%D8%A7%DB%8C%D8%AC-%D9%88-%D9%84%D8%A7%DB%8C%D9%87%E2%80%8C%D9%87%D8%A7)

```javascript
type: Boolean
```

**#markersIconCallback**

تابعی که با آن می‌توانید آیکن هر آیتم نتیجه را تغییر دهید. این تابع در ورودی خود، ویژگی های هر نقطه پیش از ایجاد شدن را گرفته و سه ویژگی iconScale, src, anchor برای شکل، اندازه و محل آیکن را باید تحویل دهد. در صورت خالی بودن، آیکن های پیشفرض قرارداده می‌شوند.

**ورودی تابع: آبجکتی شامل**

- **iconUrl**: مسیر url پیشفرض تصویر مارکر را نشان می‌دهد.
- **iconScale**: نسبت پیشفرض اندازه نمایش داده شده آیکن به اندازه فایل اصلی آیکن.
- **text**:متن پاپ آپ آیکن (برای مارکر های سرچ)
- **coords**: موقعیت مکانی آیکن
- **isReverseMarker**: اینکه آیا مارکر، مارکر ریورس است یا خیر

**پاسخی که این تابع با این ورودی می‌‍دهد، باید یک آبجکت، شامل سه متغیر زیر باشد:**

- **iconScale**: نسبت پیشفرض اندازه نمایش داده شده آیکن به اندازه فایل اصلی آیکن
- **src**: مسیر جدیدی که فایل آیکن دلخواهتان در آن قرار دارد.
- **anchor**: محل قرار گیری آیکن نسبت به نقطه مختصات. مقدار پیشفرض: [0.5, 0.5]

[مثال را ببینید](#%D8%AA%D8%BA%DB%8C%DB%8C%D8%B1-%D9%85%D8%A7%D8%B1%DA%A9%D8%B1-%D9%87%D8%A7%DB%8C-%D8%B1%D9%88%DB%8C-%D9%86%D9%82%D8%B4%D9%87)

```javascript
type: Function as PropType<MarkersIconCallback>

type MarkersIconCallback = (
  	point: CreateMarkersPointsItem
) => CreateIconProps

interface CreateMarkersPointsItem {
  	iconUrl?: string
  	iconScale?: number
  	text?: string
  	coords: Ol.Coordinate
	isReverseMarker?: boolean
}

interface CreateIconProps {
  	iconScale?: number
  	src?: string
  	anchor?: [number, number]
}
```

**#markerHoverCallback**

تابعی که پس از هاور شدن موس روی مارکر ها اجرا می‌شود.

```javascript
type: Function as PropType<MarkerHoverCallback>
```

**#popupOnMarkerHover**

نمایش یا عدم نمایش پاپ آپ در هنگام هاور شدن موس روی مارکر

```javascript
type: Boolean,
default: true,
```

**#popupOnResultHover**

نمایش یا عدم نمایش پاپ آپ در هنگام هاور شدن موس روی نتایج لیست

```javascript
type: Boolean,
default: true,
```

**#zoomOnMarkerClick**

زوم یا عدم زوم  روی نقشه در هنگام کلیک روی مارکر

```javascript
type: Boolean,
default: true,
```

**#zoomOnResultClick**

زوم یا عدم زوم روی نقشه در هنگام کلیک روی نتایج لیست

```javascript
type: Boolean,
default: true,
```

**#cluster**

کلاستر کردن یا نکردن مارکر ها بعد از میزان مشخصی کم شدن زوم نقشه

[مثال را ببینید.](#%DA%A9%D9%84%D8%A7%D8%B3%D8%AA%D8%B1-%D9%87%D8%A7)

```javascript
type: Boolean,
default: true,
```

**#clusterThreshold**

میزان زومی که با گذر از آن، در صورت “cluster=”true، مارکر های نزدیک، کلاستر می‌شوند.

```javascript
type: Boolean,
default: true,
```

### رویدادها (Events)

**# @on-click**

هنگام کلیک روی نقشه، از کامپوننت نقشه emit می‌شود. آبجکتی از پارامتر های زیر را به callback ای که شما به آن می‌توانید بدهید، پاس می‌دهد.

**Emits:**

- **event**: ایونتی که توسط خود emit ، openlayers می شود.
- **marker**: در صورت ایجاد مارکر بر روی نقشه، مقدار جدید آن برگردانده می‌شود.
- **point**:نقطه‌ای که روی آن کلیک شده.
- **apiData**: جوابی که از وب سرویس reverse در صورت صدا شده شدن گرفته شده.
- **map**:نقشه‌ای که روی آن کلیک شده، در صورت وجود.
- **selectedFeature**: مارکری که روی آن کلیک شده، در صورت وجود.

```javascript
"on-click": {
    event?: ol.MapBrowserEvent
    marker?: ol.layer.Vector
    point?: ol.Coordinate
    apiData?: PrimaryReverseResult
    map: OlMap | null
    selectedFeature?: ol.Feature
}

interface OlMap extends ol.Map {
    setMapType(value: MapType): void
    switchPoiLayer(value: boolean): void
}
```

**# @on-zoom**

هنگام زوم روی نقشه، مقدار جدید زوم را emit میکند.

**Emits: مقدار زوم جدید:**

```javascript
"on-zoom": number
```

**# @on-result-hover**

ایونتی که پس از هاور شدن موس روی نتایج (در لیست) اجرا میشود. آبجکتی از پارامتر های زیر را به callback ای که شما به آن می‌توانید بدهید، پاس می‌دهد.

**Emits:**

- **item**: آیتمی که روی آن هاور شده است.
- **cluster**: کلاستری که مربوط به این آیتم هست. در صورت وجود.
- **marker**:مارکری که مربوط به این آیتم هست.

```javascript
"on-result-hover": {
    item: SearchItem
    cluster: Ol.Feature
    marker: Ol.Feature
}

interface SearchItem extends PrimarySearchItem {
    mapCoords: Ol.Coordinate
    iconUrl: string
}
```

**# @on-result-click**

ایونتی که پس از کلیک روی نتایج (در لیست) اجرا میشود.

**Emits:** آیتمی که روی آن کلیک شده

```javascript
"on-result-click": SearchItem
```

### Methods

توابع و متغیر هایی که می‌توانید خارج از کامپوننت به آن ها دسترسی داشته باشید را در اختیارتان قرار می‌دهد.

**#search**

تابعی است که آبجکتی از دو متغیر term و coords میگیرد و عمل سرچ نقشه را انجام می‌دهد.

```javascript
const search: ({ term, coords }: SearchProps, options?: SearchOptions) =>
Promise<{
   	markers: layer.Vector;
   	data: SearchResult;
} | undefined>

interface SearchProps {
  		term: string
  		coords?: ol.Coordinate
}

type ol.Coordinate = [number, number]

interface SearchResult {
  	count: number
  	items: PrimarySearchItem[]
}
```

- **term**: متنی که می‌خواهید حول آن جستجو انجام شود.
- **coords**: مختصاتی که می‌خواهید حول آن جستجو انجام شود. در صورتی که این مختصات مشخص نشود، مختصات حول مارکر ریورس و در صورت وجود نداشتن این مارکر، حول مرکزی که به نقشه داده شده است انجام می‌شود.

[مثال را ببینید.](#%D8%A7%D8%B3%D8%AA%D9%81%D8%A7%D8%AF%D9%87-%D8%A7%D8%B2-%D9%85%D8%AA%D8%AF-search-%DA%A9%D8%A7%D9%85%D9%BE%D9%88%D9%86%D9%86%D8%AA)

**#reverse**

تابعی‌است که مختصات نقطه و آبجکتی از چند آپشن را از کاربر می‌گیرد و عمل reverse نقشه را انجام می‌دهد.

```javascript
const	reverseOnPoint: (coords: Coordinate, { useMarker, usePopup,
customText }?: ReverseOnPointOptions) => Promise<{
		marker: ol.layer.Vector | null;
 	coords: ol.Coordinate;
  	data: PrimaryReverseResult;
}

interface ReverseOnPointOptions {
  	useMarker?: boolean
 	usePopup?: boolean
  	customText?: string
}
```

- **coords**: مختصاتی که می‌خواهید با وب سرویس reverse ، اطلاعات خیابان آن را نمایش دهید.
- **useMarker**: مختصاتی که می‌خواهید با وب سرویس reverse ، اطلاعات خیابان آن را نمایش دهید.
- **usePopup**: اینکه آیا میخواهید از پاپ آپ استفاده کنید یا از استایل متن پیشفرض openlayers
- **customText**: اگر نمی‌خواهید از متنی که وب سرویس ریورس ، بازگردانده در بالای مارکر استفاده کنید و متن جایگزین دیگری دارید.

**#mapRef.mapContainer**

المان html ای که نقشه در آن قرار دارد.

**#state**

آبجکتی‌است از متغیر های مهم نقشه که می‌توانید آن ها را خوانده یا تغییر دهید.

| توضیحات | نوع | نام متغیر |
| --- | --- | --- |
| مارکری که برای نمایش اطلاعات، روی آن کلیک و انتخاب شده | SelectedMarker | selectedMarker |
| مارکر اصلی reverse | Ol.layer.Vector \| null | mainMarker |
| مختصات مارکر اصلی reverse | Ol.Coordinate \| null | mainMarkerCoords |
| نتیجه آخرین وب سرویس reverse توسط نقشه | ReverseResult \| null | reverseResult |
| مارکر های search | Ol.layer.Vector \| null | searchMarkers |
| نتیجه آخرین وب سرویس search توسط نقشه | SearchItem[] | searchResults |
| آبجکت overlay برای پاپ آپ موقت. هنگام هاور شدن موس | Ol.Overlay \| null | overlay |
| آبجکت overlay برای پاپ آپ دائم. هنگام کلیک موس | Ol.Overlay \| null | persistentOverlay |
| المنت پاپ آپ موقت در dom | HTMLDivElement \| null | popupContainer |
| المنت پاپ آپ دائم در dom | HTMLDivElement \| null | persistentContainer |
| فعال و باز شدن بخش search | boolean | drawerActivation |
| نمایان شدن بخش جزئیات در حالت desktop | boolean | drawerShowDetails |
| نمایان شدن بخش جزئیات در حالت mobile | boolean | mobileDrawerShowDetails |
| آبجکت api برای ارسال وب سرویس های search و reverse | Api \| null | api |
| خط لودینگ به هنگام استفاده از وب سرویس search | boolean | searchLoading |
| خط لودینگ به هنگام استفاده از وب سرویس reverse | boolean | reverseLoading |
| المنت نقشه در dom | HTMLDivElement \| null | mapContainer |
| نقشه‌ی مورد استفاده کامپوننت و ساخته شده توسط openlayers | OlMap \| null | map |
| استایل فعال فعلی نقشه | MapType | mapType |
| میزان زوم فعلی نقشه | number | zoom |
| فعال یا غیر فعال بودن لایه poi | boolean | poiLayer |
| نوع نمایش حال حاضر نقشه بین حالات desktop و mobile | ViewType | viewType |
| میزان بزرگنمایی اجزای نقشه | number | scale |

```javascript
type SelectedMarker = ReverseResult | SearchItem | null

interface ReverseResult extends PrimaryReverseResult {
  		mapCoords: Ol.Coordinate
}

interface Api {
  		REVERSE: (lng: number, lat: number) => Promise<PrimaryReverseResult>
  		SEARCH: (term: string, coords: Ol.Coordinate) =>
			Promise<SearchResult>
}
```

### مثالها:

##### **شروع نقشه:**

```javascript
<template>
    <div class="page">
        <NeshanMap
            defaultType="dreamy"
            mapKey="YOUR_MAP_KEY"
            serviceKey="YOUR_SERVICE_KEY"
            :center="{latitude: 36.311559, longitude: 59.5870851}"
            :zoom="14"
            :poi="true"
            @on-init="onInit"
        />
    </div>
</template>
<style>
    @import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
    html, body, .page, #app {
        width: 100%;
        height: 100%;
        display: block;
        padding: 0;
        margin: 0;
    }
</style>

<script setup lang="ts">
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import { Map } from "@neshan-maps-platform/ol"
import {fromLonLat} from '@neshan-maps-platform/ol/proj'

function onInit(map:Map) {
    const view = map?.getView()
    view?.animate({
        center: olProj.fromLonLat([59.5870851, 36.311559]),
        zoom: 11,
        duration: 1000,
    })
}
</script>
```

#### **مرکز نقشه و زوم:**

```javascript
<NeshanMap
     :mapKey="process.env.MAP_KEY"
     :center="{ latitude: 35.70222201840939, longitude: 51.35178336960962 }"
     :zoom="15"
/>
```

#### **تغییر مسیر وب سرویس search:**

```javascript
<NeshanMap
     :mapKey="process.env.MAP_KEY"
     :center="{ latitude: 35.70222201840939, longitude: 51.35178336960962 }"
     :zoom="15"
/>
```

#### **تغییر scale:**

```javascript
<NeshanMap
      :mapKey="process.env.MAP_KEY"
:serviceKey="process.env.SERVICE_KEY"
      :scale="0.5"
 />
```

##### **عدم نمایش بخش لایه‌ها:**

```javascript
<NeshanMap
	:mapKey="process.env.MAP_KEY"
	hide-layers
/>
```

##### **تغییر لایه‌ی poi و استایل پیشفرض نقشه:**

```javascript
<NeshanMap
      :mapKey="process.env.MAP_KEY"
      :center="{ latitude: 35.69672648316882, longitude: 51.36281969540723 }"
      :zoom="19"
/>
```

```javascript
<NeshanMap
      :mapKey="process.env.MAP_KEY"
      :center="{ latitude: 35.69672648316882, longitude: 51.36281969540723 }"
      :poi="false"
      default-type="standard-night"
      :zoom="19"
/>
```

##### **محدود کردن استایل های مورد استفاده در نمایش نقشه:**

```javascript
<NeshanMap
      :mapKey="process.env.MAP_KEY"
      :center="{ latitude: 35.69672648316882, longitude: 51.36281969540723 }"
      :map-types="['dreamy', 'standard-night']"
/>
```

#### **تغییر کلاس بخش لایه‌ها:**

```javascript
<template>
    <NeshanMap
      :mapKey="process.env.MAP_KEY"
      desktop-layers-class="my-grey-theme"
    />
</template>

<style lang="scss">
    @import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");

.my-grey-theme {
  	background-color: grey !important;
  	color: white;
  	& div[selected="true"] {
    		color: burlywood !important;
    		img {
      			border-color: burlywood !important;
    		}
  	}
}
</style>
```

#### **عدم نمایش بخش سرچ و نتایج و لایه‌ها:**

```javascript
NeshanMap
      :mapKey="process.env.MAP_KEY"
      :center="{ latitude: 35.69672648316882, longitude: 51.36281969540723 }"
      :hide-search-container="true"
:hide-layers="true"
/>
```

#### **تغییر مارکر های روی نقشه:**

```javascript
<NeshanMap
      :mapKey="process.env.MAP_KEY"
      :serviceKey="process.env.SERVICE_KEY"
      :center="{ latitude: 35.69672648316882, longitude: 51.36281969540723 }"
      :markers-icon-callback="markersIconCallback"
/>

<script lang="ts">
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import { defineComponent } from "vue"

export default defineComponent({
  	components: {
    		NeshanMap,
  	},
	…
methods: {
    		markersIconCallback(point: CreateMarkersPointsItem) {
      			if (point.isReverseMarker) {
        			return {
          				src: "https://img.icons8.com/arcade/344/experim
					ental-marker-arcade.png"
        			}
      			} else {
        			return {
          				src: "https://img.icons8.com/fluency/344/find-cli
						nic.png",
          				iconScale: 0.05
        			}
      			}
    		}
  	},

})
</script>
<style lang="scss">
    @import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>
```

#### **کلاستر ها:**

```javascript
NeshanMap
      :mapKey="process.env.MAP_KEY"
      :serviceKey="process.env.SERVICE_KEY"
      :center="{ latitude: 35.69672648316882, longitude: 51.36281969540723 }"
      :cluster="true"
/>
```

```javascript
<NeshanMap
      :mapKey="process.env.MAP_KEY"
      :serviceKey="process.env.SERVICE_KEY"
      :center="{ latitude: 35.69672648316882, longitude: 51.36281969540723 }"
      :cluster="false"
/>
```

##### **استفاده از متد search کامپوننت:**

```javascript
<template>
    <NeshanMap
      ref="myMap"
      :mapKey="Process.env.MAP_KEY"
      :serviceKey="Process.env.SERVICE_KEY"
/>
</template>

<script lang="ts">
import NeshanMap from "@neshan-maps-platform/vue3-openlayers"
import { defineComponent } from "vue"

export default defineComponent({
  	components: {
    		NeshanMap,
  	},
	…
mounted () {
    		const myMap: InstanceType<typeof NeshanMap> = this.$refs.myMap as any
    		myMap.search({
      			term: "آتش نشانی"
    		})
  	}
})
</script>
<style lang="scss">
    @import url("@neshan-maps-platform/vue3-openlayers/dist/style.css");
</style>
```

