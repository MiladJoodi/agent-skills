---
source: https://platform.neshan.org/docs/sdk/web/leaflet/examples/leaflet-add-marker/
title: افزودن مارکر
---

# افزودن مارکر | کیت توسعه leaflet نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در اینجا با استفاده از کتابخانه leaflet نشان یک نقشه را پیاده سازی می‌کنیم و سپس بر روی موقعیت جغرافیایی مشخص شده مارکر را به نقشه اضافه می‌کنیم.

## 1- راه اندازی صفحه

ابتدا یک فایل HTML  با محتوای زیر ایجاد می‌کنیم. توجه داشته باشید برای نمایش نقشه ما نیازمند این هستیم که نقشه را با یک Id شناسایی کنیم. از این رو یک div با id مشخص ایجاد می‌کنیم تا محل قرار گیری نقشه ما باشد.

```markup
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Neshan Leaflet Map</title>

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

</script>
</body>
</html>
```

## 2- افزودن نقشه

حال در تگ script برای ایجاد نقشه کد های زیر را اضافه می‌کنیم.

```javascript
// Create a Leaflet map
const neshanMap = new L.Map("map", {
    key: "<YOUR_API_KEY>", // Get your own API Key on https://platform.neshan.org/panel
    maptype: "dreamy",
    center: [35.699756, 51.338076],
    zoom: 14,
})
```

با افزودن تکه کد های بالا صفحه ما به شکل زیر تکمیل می‌شود. در این مرحله با اجرای صفحه نقشه به شما نمایش داده می‌شود.

نکته

کلید دسترسی سرویس (api-key) برای ساخت کلید دسترسی (api-key) مناسب برای این سرویس شما باید در پنل ساخت کلید دسترسی گزینه نقشه وب را انتخاب کنید. این را هم در نظر داشته باشید برای امنیت بیشتر کلید دسترسی خود و جلو گیری از سواستفاده شدن از آن domain سرور خود را نیز میتوانید در فیلد دامنه/Ip های مجاز وارد کنید. ×

```markup
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Neshan Leaflet Map</title>

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

    // Create a Leaflet map
    const neshanMap = new L.Map("map", {
        key: "YOUR_MAP_API_KEY", // Get your own API Key on https://platform.neshan.org/panel
        maptype: "dreamy",
        center: [35.699756, 51.338076],
        zoom: 14,
    });

</script>
</body>
</html>
```

خروجی کد بالا:

## 3- افزودن مارکر

با افزودن تکه کد های زیر مارکر در محل مشخص شده بر روی نقشه قرار میگیرد:

```javascript
// add marker to map
let marker = L.marker([35.699756, 51.338076]).addTo(neshanMap);
```

پس از افزودن تکه کد بالا محتویات صفحه به شکل زیر در می‌آید:

```markup
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Neshan Leaflet Map</title>

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

    // Create a Leaflet map
    const neshanMap = new L.Map("map", {
        key: "YOUR_MAP_API_KEY", //// Get your own API Key on https://platform.neshan.org/panel
        maptype: "dreamy",
        center: [35.699756, 51.338076],
        zoom: 14,
    })

    // add marker to map
    let marker = L.marker([35.699756, 51.338076]).addTo(neshanMap);

</script>
</body>
</html>
```

مستندات SDK web نشان
[مطالعه مستندات کتابخانه Leaflet](https://leafletjs.com/reference.html#marker)
