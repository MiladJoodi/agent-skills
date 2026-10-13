---
source: https://platform.neshan.org/docs/sdk/web/maplibre/neshan-maplibre-gl-js/
title: MapLibre SDK
---

# کتابخانه MapLibre GL JS نقشه پلتفرم نشان

**MapLibre SDK نشان** بر مبنای کتابخانه پایه و متن باز [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) می باشد.

اگر با MapLibre GL JS آشنا باشید، عملاً همین الان با این SDK هم آشنا هستید، همان کلاس‌ها، همان متدها و دقیقا با همان روش لود استایل نقشه، تنها با اضافه کردن کلید دسترسی نقشه خود می‌توانید نقشه را راه اندازی کرده و شروع به استفاده کنید.

در این کیت توسعه ویژگی نمایش صحیح حروف فارسی (RTL) به صورت پیش فرض فعال می باشد. همچنین علاوه بر این، شما می توانید از امکاناتی مانند:

- افزودن لایه با منابع Raster/vector/GeoJSON
- امکان پیاده سازی style Expressions
- کنترل کامل دوربین

و هر آنچه در مستندات رسمی [Maplibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) آمده است را پیاده سازی کنید.

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

## نصب به کمک پکیج منیجرها

- npm
- yarn
- pnpm

```bash
npm install @neshan-maps-platform/maplibre-sdk
```

```bash
yarn add @neshan-maps-platform/maplibre-sdk
```

```bash
pnpm add @neshan-maps-platform/maplibre-sdk
```

نکته

کتابخانه‌ی **`maplibre-gl`** در داخل پکیج نشان bundle شده است و نیازی به نصب جداگانه‌ی آن نیست.

## فراخوانی و راه اندازی در پروژه (با bundler: Vite، webpack و ...)

```js
import maplibregl from "@neshan-maps-platform/maplibre-sdk";
import "@neshan-maps-platform/maplibre-sdk/style.css";

const map = new maplibregl.Map({
  container: "map",
  style: 'https://static.neshan.org/sdk/maplibre/styles/light.json',
  center: [51.383743,35.701150],
  zoom: 12,
  minZoom: 2,
  maxZoom: 21,
  trackResize: true,
  apiKey: "YOUR_MAP_API_KEY",
});

map.addControl(new maplibregl.NavigationControl());
```

برای نمایش نقشه لازم است شما در هر کجای صفحه که می خواهید یک فضا برای نمایش نقشه تخصیص دهید که آی دی آن عینا با آیدی تعریف شده در هنگام تعریف نقشه (مقدار مربوط به پارامتر container) یکسان باشد.

```html
<div id="map"></div>
```

نکته

فراموش نکنید که فایل CSS را یک‌بار import کنید، در غیر این صورت کنترل‌ها و بوم (canvas) نقشه بدون استایل نمایش داده می‌شوند.

توجه

پارامتر `apiKey` الزامی است. در صورتی که هنگام ساخت نقشه مقداری برای آن تعریف نکنید، خطای (`Api key is not defined!`) را خواهید دید و نقشه ساخته نخواهد شد.

## استایل نقشه

همانند کتابخانه maplibre-gl شما می‌توانید url یا آبجکت json استایل رو استفاده کنید.
در پلتفرم نشان پنج استایل آماده برای شما میزبانی شده است:

| استایل | آدرس |
| --- | --- |
| Light | `https://static.neshan.org/sdk/maplibre/styles/light.json` |
| Dark | `https://static.neshan.org/sdk/maplibre/styles/dark.json` |
| Monochrome Light | `https://static.neshan.org/sdk/maplibre/styles/monochrome_light.json` |
| Monochrome Dark | `https://static.neshan.org/sdk/maplibre/styles/monochrome_dark.json` |
| Pastel | `https://static.neshan.org/sdk/maplibre/styles/pastel.json` |

## استفاده از استایل شخصی‌سازی شده

در صورتی که استایل اختصاصی خودتان را از طریق ویرایشگر استایل نقشه نشان دریافت کرده‌اید، کافی است از فایل JSON به‌صورت object در پارامتر style استفاده کنید.

```js
import customStyle from "./my-custom-style.json";

const map = new maplibregl.Map({
  /* ... */
  style: customStyle,
});
```

نکته

**متن راست چین**

این امکان در کیت توسعه نشان وجود دارد که امکان نمایش صحیح حروف زبان های فارسی RTL را از همان ابتدا غیر فعال کرد و یا امکان لود با تاخیر آن را تغییر داد، برای انجام این کار به طریق زیر اقدام کنید.

```js
new maplibregl.Map({ /* ... */, rtl: false });
new maplibregl.Map({ /* ... */, rtl: { lazy: false } });
new maplibregl.Map({ /* ... */, rtl: { url: "/rtl.js" } }); // میزبانی خودتان به‌جای فایل داخلی
```

مقدار پیش‌فرض `lazy: true` است که بارگذاری پلاگین RTL را تا ظاهر شدن اولین برچسب فارسی/عربی به تعویق می‌اندازد. برای نقشه‌ای که عمدتاً فارسی است، `lazy: false` از یک تاخیر کوتاه در اولین رندر جلوگیری می‌کند. ثبت این پلاگین سراسری و idempotent است، یعنی بین تمام نقشه‌های موجود در صفحه مشترک است.

## موقعیت لوگو و کپی‌رایت

لوگو و متن کپی‌رایت به‌صورت پیش‌فرض در پایین نقشه نمایش داده می‌شوند. کاربر می‌تواند موقعیت آن‌ها را تغییر دهد، اما اجازه حذف یا مخفی کردن آن‌ها را ندارد.

این موقعیت از طریق دو پارامتر `logoPosition` و `copyRightPosition` در `NeshanMapOptions` قابل تنظیم است. با وجود نام‌ها، `logoPosition` موقعیت کنترل **attribution** (متن کپی‌رایت) و `copyRightPosition` موقعیت **لوگوی برند نشان** را مشخص می‌کند:

```js
new maplibregl.Map({
  /* ... */
  logoPosition: "bottom-left",
  copyRightPosition: "bottom-right",
});
```

هر دو پارامتر مقادیر استاندارد `ControlPosition` کتابخانه MapLibre (`'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'`) را می‌پذیرند. مقدار پیش‌فرض `logoPosition` برابر `'bottom-left'` و مقدار پیش‌فرض `copyRightPosition` برابر `'bottom-right'` است.

## استفاده بدون bundler (تگ script / بارگذاری از CDN)

در صورتی که از bundler استفاده نمی‌کنید، فایل‌های js و CSS را مستقیماً از مسیر پکیج نصب‌شده لود کنید. دقت کنید حتما مقدار `YOUR_MAP_API_KEY` را با کلیدی که از طریق پنل دریافت کرده‌اید جایگزین کنید.

```html
<!doctype html>
<html lang="fa" dir="rtl">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet"  href="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.css" />
    <script src="https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.umd.js"></script>
    <style>
      html, body { margin: 0; height: 100%; }
      #map { position: absolute; inset: 0; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      const maplibregl = window.maplibregl.default;

      const map = new maplibregl.Map({
        container: "map",
        style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
        center: [59.6, 36.3],
        zoom: 12,
        apiKey: "YOUR_MAP_API_KEY",
      });
      map.addControl(new maplibregl.NavigationControl());
    </script>
  </body>
</html>
```

## مثال در فریمورک‌های مختلف

از آنجا که MapLibre برای اجرا به یک عنصر واقعی از DOM و برخی globalهای مرورگر، مانند **`window`** و **`DecompressionStream`**، نیاز دارد، ایجاد نقشه باید به زمان اجرای کد در سمت کلاینت موکول شود. به همین دلیل، در تمامی نمونه‌های زیر، نقشه داخل یکی از lifecycle hookهای سمت کلاینت (**`useEffect`**، **`onMounted`**، **`ngAfterViewInit`**، **`onMount`** و ...) ایجاد می‌شود و هنگام unmount شدن کامپوننت، با استفاده از **`remove`** پاک‌سازی می‌شود. بنابراین، نقشه هنگام بارگذاری ماژول یا در فرایند رندر سمت سرور (SSR) ایجاد نمی‌شود.

- React
- Next.js
- Vue 3
- Angular
- Svelte

```jsx
import { useEffect, useRef } from "react";
import maplibregl from "@neshan-maps-platform/maplibre-sdk";
import "@neshan-maps-platform/maplibre-sdk/style.css";

export function MapView({ apiKey, style }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style,
      center: [59.6, 36.3],
      zoom: 12,
      apiKey,
    });
    mapRef.current.addControl(new maplibregl.NavigationControl());

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [apiKey, style]);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
```

از آن‌جایی که MapLibre به محض ساخت شیء `Map` به `window` دسترسی پیدا می‌کند، کامپوننت باید فقط سمت کلاینت اجرا شود. آن را `"use client"` علامت‌گذاری کرده و از صفحه/layout والد با `ssr: false` لود کنید تا هرگز در رندر سمت سرور ارزیابی نشود:

```jsx
// components/MapView.jsx
"use client";

import { useEffect, useRef } from "react";
import maplibregl from "@neshan-maps-platform/maplibre-sdk";
import "@neshan-maps-platform/maplibre-sdk/style.css";

export default function MapView({ apiKey, style }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: containerRef.current,
      style,
      center: [51.383743,35.701150],
      zoom: 12,
      apiKey,
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [apiKey, style]);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
```

```jsx
// app/page.jsx
"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
});

export default function Page() {
  return (
    <MapView
      apiKey="YOUR_MAP_API_KEY"
      style="https://static.neshan.org/sdk/maplibre/styles/light.json"
    />
  );
}
```

```vue
<template>
  <div ref="containerRef" style="position: absolute; inset: 0" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import maplibregl from "@neshan-maps-platform/maplibre-sdk";
import "@neshan-maps-platform/maplibre-sdk/style.css";

const props = defineProps({ apiKey: String, style: String });
const containerRef = ref(null);
let map;

onMounted(() => {
  map = new maplibregl.Map({
    container: containerRef.value,
    style: props.style,
    center: [51.383743,35.701150],
    zoom: 12,
    apiKey: props.apiKey,
  });
  map.addControl(new maplibregl.NavigationControl());
});

onBeforeUnmount(() => {
  map?.remove();
});
</script>
```

```ts
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import maplibregl, { Map } from "@neshan-maps-platform/maplibre-sdk";
import "@neshan-maps-platform/maplibre-sdk/style.css";

@Component({
  selector: "app-map-view",
  standalone: true,
  template: `<div #container style="position:absolute;inset:0"></div>`,
})
export class MapViewComponent implements AfterViewInit, OnDestroy {
  @Input() apiKey!: string;
  @Input() style!: string;
  @ViewChild("container") containerRef!: ElementRef<HTMLDivElement>;

  private map?: Map;

  ngAfterViewInit(): void {
    this.map = new maplibregl.Map({
      container: this.containerRef.nativeElement,
      style: this.style,
      center: [51.383743,35.701150],
      zoom: 12,
      apiKey: this.apiKey,
    });
    this.map.addControl(new maplibregl.NavigationControl());
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
```

```svelte
<script>
  import { onMount, onDestroy } from "svelte";
  import maplibregl from "@neshan-maps-platform/maplibre-sdk";
  import "@neshan-maps-platform/maplibre-sdk/style.css";

  export let apiKey;
  export let style;

  let containerEl;
  let map;

  onMount(() => {
    map = new maplibregl.Map({
      container: containerEl,
      style,
      center: [51.383743,35.701150],
      zoom: 12,
      apiKey,
    });
    map.addControl(new maplibregl.NavigationControl());
  });

  onDestroy(() => map?.remove());
</script>

<div bind:this={containerEl} style="position:absolute;inset:0" />
```

نکته

در SvelteKit دقیقاً مثل Next.js عمل کنید — `onMount` تنها در مرورگر اجرا می‌شود، پس نیازی به تنظیم اضافه‌ی `ssr: false` نیست.

## مثال‌های عملی

در راهنماهای گام‌به‌گام زیر، هر مثال از ابتدا و مرحله به مرحله پیاده‌سازی می‌شود و در پایان، کد کامل به همراه یک دموی زنده در اختیار شما قرار می‌گیرد.

![Marker](https://platform.neshan.org/img/docs/web-sdk/example-maplibre-marker.webp)افزودن نشانگر (Marker) به نقشه

![Custom Marker](https://platform.neshan.org/img/docs/web-sdk/example-maplibre-custom-marker.webp)افزودن آیکون شخصی‌سازی‌شده به نقشه

!Get Coordinatesدریافت مختصات با کلیک بر روی نقشه

![Draw Route](https://platform.neshan.org/img/docs/web-sdk/example-maplibre-draw-route.webp)رسم مسیر بر روی نقشه

!Limit Boundsمحدود کردن ناحیه نمایش نقشه

![Clustering](https://platform.neshan.org/img/docs/web-sdk/example-maplibre-clustering.webp)خوشه‌بندی نقاط روی نقشه

علاوه بر این موارد، مستندات رسمی MapLibre GL JS مجموعه گسترده‌ای از مثال‌ها برای قابلیت‌هایی مانند کلاسترینگ، هیت‌مپ، انیمیشن، نمایش سه‌بعدی و موارد دیگر ارائه می‌کند. از آنجا که SDK نشان از همان API استفاده می‌کند، می‌توانید این مثال‌ها را مستقیماً در SDK نیز به کار ببرید؛ کافی است بخش مربوط به ایجاد نقشه را با استایل و کلید دسترسی نشان جایگزین کنید.

[مثال‌های رسمی کتابخانه MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/examples/)

## پشتیبانی مرورگرها

تایل‌های نشان در این کیت توسعه از API استاندارد [`DecompressionStream`](https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream) استفاده می‌کند، بنابراین حداقل نسخه مرورگر مورد نیاز Chrome 80+، Firefox 113+ یا Safari 16.4+ است (همان حداقلی که خود `maplibre-gl` نیز نیاز دارد). برای مرورگرهای قدیمی‌تر جایگزینی (fallback) وجود ندارد و درخواست‌های تایل با خطا مواجه می‌شوند.

## رفع اشکال (Troubleshooting)

در صورتی که نقشه ها برای شما لود نشد و یا در دریافت تایل ها با مشکل مواجه شدید، کنسول مرورگر و یا تب network مرورگر را بررسی کنید و مطابق خطا های مشاهده شده اقدام به عیب یابی نمائید. در جدول زیر لیست خطا های احتمالی مربوط به کلید های دسترسی را می توانید مشاهده کنید.

| HTTP Code | Status | Description |
| --- | --- | --- |
| 400 | INVALID\_ARGUMENT | خطا در پارامتر های ورودی |
| 470 | CoordinateParseError | چنانچه مختصات جغرافیایی ارسالی معتبر نباشد رخ خواهد داد. |
| 480 | KeyNotFound | در صورتی که در فراخوانی وب‌سرویس از یک Api Key نامعتبر استفاده کنید یا Api Key خود را در header ارسال نکنید رخ خواهد داد. |
| 481 | LimitExceeded | در صورتی که تعداد فراخوانی وب‌سرویس‌ها از میزان مجازی که برای شما تعیین شده‌است عبور کند رخ خواهد داد. |
| 482 | RateExceeded | چنانچه تعداد درخواست وب‌سرویس در دقیقه از حد مجاز عبور کند رخ خواهد داد. |
| 483 | ApiKeyTypeError | کلید دسترسی استفاده شده با سرویس فراخوانی شده همخوانی ندارد. بایستی از کلید دسترسی مرتبط با سرویس مورد نظر استفاده کنید. |
| 484 | ApiWhiteListError | با توجه به اسکوپ تعریف‌شده برای این کلید، شما مجاز به استفاده نیستید. |
| 485 | ApiServiceListError | سرویس فراخوانی شده با سرویس‌های تعریف‌شده برای این کلید دسترسی همخوانی ندارد. |
| 500 | GenericError | وقوع خطای ناشناخته |

چند مورد رایج دیگر که ممکن است در حین توسعه با آن مواجه شوید:

- **کنترل‌ها یا بوم (canvas) نقشه بدون استایل به نظر می‌رسند:** فایل CSS پکیج import نشده است. `import "@neshan-maps-platform/maplibre-sdk/style.css"` (در حالت bundler) یا تگ `<link>` مربوطه (در حالت UMD) را اضافه کنید.
- **`window.maplibregl is undefined` یا `Map is not a constructor`:** در نسخه UMD باید مقدار را از `window.maplibregl.default` بخوانید، نه مستقیماً از `window.maplibregl`.
- **دو نقشه در یک صفحه، کلید دسترسی اشتباه روی یکی از آن‌ها اعمال می‌شود:** در حال حاضر `apiKey` به ازای هر صفحه ذخیره می‌شود، نه به ازای هر نقشه؛ آخرین `apiKey` تنظیم‌شده برای تمام نقشه‌های آن صفحه اعمال می‌شود. در هر صفحه از یک کلید دسترسی واحد استفاده کنید.
