---
source: https://platform.neshan.org/docs/sdk/web/openlayers/examples/openlayers-add-custom-marker/
title: مارکر سفارشی با OpenLayers
---

# مارکر سفارشی با OpenLayers | آموزش Custom Marker

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در اینجا با استفاده از کتابخانه OpenLayers نشان یک نقشه را پیاده سازی می‌کنیم و سپس بر روی موقعیت جغرافیایی مشخص شده مارکر شخصی سازی شده با قابلیت افزودن اشکال دلخواه را به نقشه اضافه می‌کنیم.

## 1- راه اندازی نقشه

ابتدا یک فایل HTML  با محتوای زیر ایجاد می‌کنیم. توجه داشته باشید برای نمایش نقشه ما نیازمند این هستیم که نقشه را با یک Id شناسایی کنیم.

```javascript
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
        key: 'YOUR_WEB_API_KEY', // Get your own API Key on https://platform.neshan.org/panel
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

## 2- افزودن آیکون های شخصی سازی شده

پس از ایجاد نقشه با افزودن کد های زیر به نقشه مارکر های شخصی سازی شده به نقشه اضافه می‌شود:

```javascript
// define custom styles for markers
const stroke = new ol.style.Stroke({ color: 'black', width: 2 });
const fill = new ol.style.Fill({ color: 'green' });

// add custom marker
var marker = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([51.338076, 35.699756])),
  name: 'میدان آزادی',
});

marker.setStyle(new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 1],
    scale: 0.5,
    src: 'marker-icon-2x-red.png'
  })
}));

// add custom marker
var marker2 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([51.336247, 35.712362]))
});

marker2.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    fill: new ol.style.Fill({
      color: '#0077FF'
    }),
    stroke: new ol.style.Stroke({
      color: '#FF0000',
      width: 2
    }),
    radius: 12,
  }),
}));

// add custom marker
var marker3 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([51.352533, 35.714383]))
});

marker3.setStyle(new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: fill,
    stroke: stroke,
    points: 4,
    radius: 10,
    angle: Math.PI / 4,
  }),
}));

// add custom marker
var marker4 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([51.359850, 35.700305]))
});

marker4.setStyle(new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: fill,
    stroke: stroke,
    points: 4,
    radius: 10,
    radius2: 0,
    angle: Math.PI / 4,
  }),
}));

// add custom marker
var marker5 = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.fromLonLat([51.347812, 35.706752]))
});

marker5.setStyle(new ol.style.Style({
  image: new ol.style.RegularShape({
    fill: fill,
    stroke: stroke,
    points: 5,
    radius: 10,
    radius2: 4,
    angle: 0,
  }),
}));

var vectorSource = new ol.source.Vector({
  features: [marker, marker2, marker3, marker4, marker5]
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
  <title>OpenLayers Neshan Map ( Custom marker Example )</title>

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
      key: 'YOUR_WEB_API_KEY', // Get your own API Key on https://platform.neshan.org/panel
      maptype: 'dreamy',
      view: new ol.View({
        center: ol.proj.fromLonLat([51.346793, 35.706621]),
        zoom: 14
      })
    });

    // define custom styles for markers
    const stroke = new ol.style.Stroke({ color: 'black', width: 2 });
    const fill = new ol.style.Fill({ color: 'green' });

    // add custom marker
    var marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([51.338076, 35.699756])),
      name: 'میدان آزادی',
    });

    marker.setStyle(new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        scale: 0.5,
        src: 'marker-icon-2x-red.png'
      })
    }));

    // add custom marker
    var marker2 = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([51.336247, 35.712362]))
    });

    marker2.setStyle(new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: '#0077FF'
        }),
        stroke: new ol.style.Stroke({
          color: '#FF0000',
          width: 2
        }),
        radius: 12,
      }),
    }));

    // add custom marker
    var marker3 = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([51.352533, 35.714383]))
    });

    marker3.setStyle(new ol.style.Style({
      image: new ol.style.RegularShape({
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: 10,
        angle: Math.PI / 4,
      }),
    }));

    // add custom marker
    var marker4 = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([51.359850, 35.700305]))
    });

    marker4.setStyle(new ol.style.Style({
      image: new ol.style.RegularShape({
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: 10,
        radius2: 0,
        angle: Math.PI / 4,
      }),
    }));

    // add custom marker
    var marker5 = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([51.347812, 35.706752]))
    });

    marker5.setStyle(new ol.style.Style({
      image: new ol.style.RegularShape({
        fill: fill,
        stroke: stroke,
        points: 5,
        radius: 10,
        radius2: 4,
        angle: 0,
      }),
    }));

    var vectorSource = new ol.source.Vector({
      features: [marker, marker2, marker3, marker4, marker5]
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
