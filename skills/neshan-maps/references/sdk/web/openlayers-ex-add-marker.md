---
source: https://platform.neshan.org/docs/sdk/web/openlayers/examples/openlayers-add-marker/
title: افزودن مارکر با OpenLayers
---

# افزودن مارکر با OpenLayers | آموزش Marker در نقشه نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در اینجا با استفاده از کتابخانه OpenLayers نشان یک نقشه را پیاده سازی می‌کنیم و سپس بر روی موقعیت جغرافیایی مشخص شده مارکر را به نقشه اضافه می‌کنیم.

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
    <title>OpenLayers Neshan Map</title>

   <link rel="stylesheet" href="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.css" />
  <script src="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.js"></script>

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

<script type="text/javascript">

</script>
</body>
</html>
```

## 2- افزودن نقشه

حال در تگ script برای ایجاد نقشه کد های زیر را اضافه می‌کنیم.

```javascript
var neshanMap = new ol.Map({
    target: 'map',
    key: '<YOUR_API_KEY>', // Get your own API Key on https://platform.neshan.org/panel
    maptype: 'dreamy',
    view: new ol.View({
        center: ol.proj.fromLonLat([51.338076, 35.699756]),
        zoom: 14
    })
});
```

با افزودن تکه کد های بالا صفحه ما به شکل زیر تکمیل می‌شود. در این مرحله با اجرای صفحه نقشه به شما نمایش داده می‌شود.

کلید دسترسی سرویس (api-key) برای ساخت کلید دسترسی (api-key) مناسب برای این سرویس شما باید در پنل ساخت کلید دسترسی گزینه نقشه وب را انتخاب کنید. این را هم در نظر داشته باشید برای امنیت بیشتر کلید دسترسی خود و جلو گیری از سواستفاده شدن از آن domain سرور خود را نیز میتوانید در فیلد دامنه/Ip های مجاز وارد کنید. ×

```markup
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>OpenLayers Neshan Map</title>

   <link rel="stylesheet" href="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.css" />
  <script src="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.js"></script>

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
<script type="text/javascript">

    var neshanMap = new ol.Map({
        target: 'map',
        key: 'YOUR_MAP_API_KEY', // Get your own API Key on https://platform.neshan.org/panel
        maptype: 'dreamy',
        view: new ol.View({
            center: ol.proj.fromLonLat([51.338076, 35.699756]),
            zoom: 14
        })
    });

</script>
</body>
</html>
```

خروجی کد بالا:

## 3- افزودن مارکر

با افزودن تکه کد های زیر مارکر در محل مشخص شده بر روی نقشه قرار می‌گیرد، برای نمایش مارکر ما از تصویر زیر استفاده کرده ایم:

!مارکر نقشه نشان

```javascript
// add Marker to the map
var marker = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([51.338076, 35.699756]))
});

marker.setStyle(new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 1],
    scale: 0.5,
    src: 'marker-icon-2x-red.png'
  })
}));

var vectorSource = new ol.source.Vector({
  features: [marker]
});

var vectorLayer = new ol.layer.Vector({
  source: vectorSource
});

neshanMap.addLayer(vectorLayer);
```

پس از افزودن تکه کد بالا محتویات صفحه به شکل زیر در می‌آید:

```markup
<!DOCTYPE html>
<html lang="fa">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>OpenLayers Neshan Map ( Marker example )</title>

 <link rel="stylesheet" href="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.css" />
  <script src="https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.js"></script>
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
  <script type="text/javascript">

    var neshanMap = new ol.Map({
      target: 'map',
      key: 'YOUR_MAP_API_KEY', // Get your own API Key on https://platform.neshan.org/panel
      maptype: 'dreamy',
      view: new ol.View({
        center: ol.proj.fromLonLat([51.338076, 35.699756]),
        zoom: 14
      })
    });

    // add Marker to the map
    var marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([51.338076, 35.699756]))
    });

    marker.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 0.5,
        src: 'marker-icon-2x-red.png'
      })
    }));

    var vectorSource = new ol.source.Vector({
      features: [marker]
    });

    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    neshanMap.addLayer(vectorLayer);

  </script>
</body>

</html>
```

مستندات SDK web نشان
[مطالعه مستندات کتابخانه OpenLayers](https://openlayers.org/en/v5.3.0/doc/)
