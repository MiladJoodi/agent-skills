---
source: https://platform.neshan.org/docs/sdk/web/leaflet/examples/leaflet-add-custom-marker/
title: ایجاد مارکر سفارشی
---

# ایجاد مارکر سفارشی | کیت توسعه leaflet نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در اینجا با استفاده از کتابخانه leaflet نشان یک نقشه را پیاده سازی می‌کنیم و سپس بر روی موقعیت جغرافیایی مشخص شده مارکر شخصی سازی شده با قابلیت افزودن تصویر دلخواه را به نقشه اضافه می‌کنیم و همین طور نشان می‌دهیم چگونه به مارکر خود قابلیت جابه‌جایی بر روی نقشه و اضافه کردن popUp به جهت افزودن توضیحات را اضافه کنید.

## 1- راه اندازی نقشه

ابتدا یک فایل HTML  با محتوای زیر ایجاد می‌کنیم. توجه داشته باشید برای نمایش نقشه ما نیازمند این هستیم که نقشه را با یک Id شناسایی کنیم.

```javascript
<!DOCTYPE html>
<html lang="fa">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Neshan Leaflet Map</title>

    <link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css" />
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
            key: "YOUR_WEB_API_KEY", // Get your own API Key on https://platform.neshan.org/panel
            maptype: "dreamy",
            center: [35.699756, 51.338076],
            zoom: 14,
        })

    </script>
</body>

</html>
```

## 2- افزودن آیکون های شخصی سازی شده

پس از ایجاد نقشه تکه کد های زیر را به نقشه اضافه می‌کنیم:

```javascript
// define Icons for Leaflet
var greenIcon = new L.Icon({
    iconUrl: 'marker-icon-2x-green.png',
    shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

var redIcon = new L.Icon({
    iconUrl: 'marker-icon-2x-red.png',
    shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
```

توجه داشته باشید در این مرحله نیازمند تصاویر شخصی سازی شده برای آیکون خود می‌باشید تا در هنگام تعریف آیکون از آن ها استفاده کنید.

به طور مثال ما تصاویر زیر را در پروژه اضافه کرده ایم و از آن ها استفاده می‌کنیم.

!

!مارکر نقشه نشان

!

## 3- افزودن مارکر شخصی سازی شده

حال با استفاده از آیکون های تعریف شده دو مارکر به نقشه اضافه می‌کنیم. همین طور برای یکی از این مارکر ها ویژگی popUp را نیز اضافه می‌کنیم، با انجام این کار بر روی آیکون باکسی قرار می‌گیرد که برای افزودن توضیحات و یا امکانات بیشتر به مارکر کاربرد دارد.

```javascript
// add custom marker
var redMarker = L.marker([35.699756, 51.338076], { icon: redIcon, title: "توضیحات مد نظر شما" }).addTo(neshanMap);

// create Pop up for marker
var popup = L.popup()
    .setContent('<p style="text-align:center;">سلام<br />با نگه داشتن موس می‌توانید من را جابه‌جا کنید</p>')

// add custom draggable marker
let greenMarker = L.marker([35.700357, 51.359829],
    { icon: greenIcon, draggable: true, title: "توضیحات مد نظر شما" , opacity:0.9})
    .bindPopup(popup)
    .addTo(neshanMap)
    .openPopup();
```

پس از افزودن تکه کد بالا محتویات کد به شکل زیر در می‌آید:

```markup
<!DOCTYPE html>
<html lang="fa">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Neshan Leaflet Map</title>

    <link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css" />
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
            key: "YOUR_WEB_API_KEY", // Get your own API Key on https://platform.neshan.org/panel
            maptype: "dreamy",
            center: [35.699756, 51.338076],
            zoom: 14,
        })

        // define Icons for Leaflet
        var greenIcon = new L.Icon({
            iconUrl: 'marker-icon-2x-green.png',
            shadowUrl: 'marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        var redIcon = new L.Icon({
            iconUrl: 'marker-icon-2x-red.png',
            shadowUrl: 'marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // add custom marker
        var redMarker = L.marker([35.699756, 51.338076], { icon: redIcon, title: "توضیحات مد نظر شما" }).addTo(neshanMap);

        // create Pop up for marker
        var popup = L.popup()
            .setContent('<p style="text-align:center;">سلام<br />با نگه داشتن موس می‌توانید من را جابه‌جا کنید</p>')

        // add custom draggable marker
        let greenMarker = L.marker([35.700357, 51.359829],
            { icon: greenIcon, draggable: true, title: "توضیحات مد نظر شما" , opacity:0.9})
            .bindPopup(popup)
            .addTo(neshanMap)
            .openPopup();

    </script>
</body>

</html>
```

مستندات SDK web نشان
[مطالعه مستندات مربوط به بخش marker کتابخانه Leaflet](https://leafletjs.com/reference.html#Marker)
