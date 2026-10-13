---
source: https://platform.neshan.org/docs/sdk/web/leaflet/examples/leaflet-add-route-on-map/
title: رسم مسیر روی نقشه
---

# رسم مسیر روی نقشه | کیت توسعه leaflet نشان

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** برای وب‌سایت یا اپلیکیشن تحت وب خود نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

در اینجا با استفاده از کتابخانه leaflet نشان یک نقشه را پیاده سازی می‌کنیم و سپس بر روی نقشه بر اساس نمونه پاسخ بازگشتی از ارسال درخواست به سرویس مسیریابی نشان خطوط مسیر را رسم می‌کنیم.

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
            center: [35.700936, 51.391194],
            zoom: 16,
        })

    </script>
</body>

</html>
```

## 2- افزودن نمونه پاسخ بازگشتی

به منظور رسم مسیر نیاز داریم تا اطلاعات مسیر را داشته باشیم در این جا نمونه پاسخی از ارسال درخواست به سرویس مسیریابی نشان را به فایل خود اضافه می‌کنیم. در این پاسخ به منظور رسم مسیر فیلد polyline را از حالت انکد شده خارج کنیم.

```javascript
// example of response data from direction-API v4
// request URL : https://api.neshan.org/v4/direction?type=car&origin=35.700785062128666,51.38881156907395&destination=35.703189177622946,51.3908984545814&alternative=false

var exampleResponse = {
    "routes": [
        {
            "overview_polyline": {
                "points": "cy{xEa{sxHCyEr@}FIi@MWi@Um@L[l@A^{Jr@"
            },
            "legs": [
                {
                    "summary": "میدان انقلاب اسلامی - کارگر شمالی",
                    "distance": {
                        "value": 555.0,
                        "text": "۵۷۵ متر"
                    },
                    "duration": {
                        "value": 99.0,
                        "text": "۲ دقیقه"
                    },
                    "steps": [
                        {
                            "name": "آزادی",
                            "instruction": "در جهت شرق در آزادی قرار بگیرید",
                            "bearing_after": 88,
                            "type": "depart",
                            "distance": {
                                "value": 197.0,
                                "text": "۲۰۰ متر"
                            },
                            "duration": {
                                "value": 35.0,
                                "text": "۱ دقیقه"
                            },
                            "polyline": "cy{xEa{sxHAkBAmBDa@BKHs@BWD]J{@",
                            "start_location": [
                                51.388811,
                                35.70082
                            ]
                        },
                        {
                            "name": "کارگر شمالی",
                            "instruction": "در میدان انقلاب اسلامی، از خروجی سوم، خارج شوید",
                            "rotaryName": "میدان انقلاب اسلامی",
                            "bearing_after": 111,
                            "type": "rotary",
                            "modifier": "straight",
                            "exit": 3,
                            "distance": {
                                "value": 146.0,
                                "text": "۱۵۰ متر"
                            },
                            "duration": {
                                "value": 38.0,
                                "text": "۱ دقیقه"
                            },
                            "polyline": "}w{xEohtxHDSBUCUESEKGKSOUEW@UJORKXAN?N",
                            "start_location": [
                                51.390956,
                                35.700632
                            ]
                        },
                        {
                            "name": "",
                            "instruction": "به مسیر خود ادامه دهید",
                            "bearing_after": 354,
                            "type": "exit rotary",
                            "modifier": "right",
                            "exit": 3,
                            "distance": {
                                "value": 212.0,
                                "text": "۲۲۵ متر"
                            },
                            "duration": {
                                "value": 39.0,
                                "text": "۱ دقیقه"
                            },
                            "polyline": "a|{xEuitxH_ADaBLO@{BRmAH",
                            "start_location": [
                                51.391154,
                                35.701293
                            ]
                        },
                        {
                            "name": "کارگر شمالی",
                            "instruction": "در مقصد قرار دارید",
                            "bearing_after": 0,
                            "type": "arrive",
                            "distance": {
                                "value": 0.0,
                                "text": ""
                            },
                            "duration": {
                                "value": 0.0,
                                "text": ""
                            },
                            "polyline": "}g|xEahtxH",
                            "start_location": [
                                51.390885,
                                35.703188
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

به منظور decode کردن فیلد polyline در هر گام مسیر از این [کتابخانه](https://github.com/jieter/Leaflet.encoded) استفاده شده است و فایل جاوا اسکریپت این کتابخانه را در قسمت هدر اضافه می‌کنیم.

[مطالعه مستندات الگوریتم Encoded Polyline گوگل](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)

## 3- افزودن حلقه پیمایش در گام های مسیر و رسم خطوط مسیر

حال با پیمایش در پاسخ بازگشتی خطوط انکد شده را از حالت انکد خارج می‌کنیم و بر روی نقشه رسم می‌کنیم.
همچنین در پاسخ بازگشتی هر گام یک نقطه شروع نیز دارد که این نقطه شروع را نیز بر روی نقشه رسم می‌کنیم.

```javascript
// iterate through response steps
for (let k = 0; k < Object.keys(exampleResponse.routes).length; k++) {

    for (let j = 0; j < Object.keys(exampleResponse.routes[k].legs).length; j++) {

        for (let i = 0; i < Object.keys(exampleResponse.routes[k].legs[j].steps).length; i++) {
            var step = exampleResponse.routes[k].legs[j].steps[i];

            // decode Encoded polyline and draw on map
            L.Polyline.fromEncoded(step.polyline, {
                color: "#250ECD",
                weight: 12
            }).addTo(neshanMap);

            // add point in start of step
            L.circleMarker([step.start_location[1], step.start_location[0]], {
                weight: 1,
                color: "#FFFFFF",
                radius: 5,
                fill: true,
                fillColor: "#9fbef9",
                fillOpacity: 1.0
            }).addTo(neshanMap);
        }
    }
}
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
    <title>Neshan Leaflet Map</title>

    <link rel="stylesheet" href="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.css" />
    <script src="https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js"></script>
    <script src="./Polyline.encoded.js"></script>

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

        // example of response data from direction-API v4
        // request URL : https://api.neshan.org/v4/direction?type=car&origin=35.700785062128666,51.38881156907395&destination=35.703189177622946,51.3908984545814&alternative=false

        var exampleResponse = {
            "routes": [
                {
                    "overview_polyline": {
                        "points": "cy{xEa{sxHCyEr@}FIi@MWi@Um@L[l@A^{Jr@"
                    },
                    "legs": [
                        {
                            "summary": "میدان انقلاب اسلامی - کارگر شمالی",
                            "distance": {
                                "value": 555.0,
                                "text": "۵۷۵ متر"
                            },
                            "duration": {
                                "value": 99.0,
                                "text": "۲ دقیقه"
                            },
                            "steps": [
                                {
                                    "name": "آزادی",
                                    "instruction": "در جهت شرق در آزادی قرار بگیرید",
                                    "bearing_after": 88,
                                    "type": "depart",
                                    "distance": {
                                        "value": 197.0,
                                        "text": "۲۰۰ متر"
                                    },
                                    "duration": {
                                        "value": 35.0,
                                        "text": "۱ دقیقه"
                                    },
                                    "polyline": "cy{xEa{sxHAkBAmBDa@BKHs@BWD]J{@",
                                    "start_location": [
                                        51.388811,
                                        35.70082
                                    ]
                                },
                                {
                                    "name": "کارگر شمالی",
                                    "instruction": "در میدان انقلاب اسلامی، از خروجی سوم، خارج شوید",
                                    "rotaryName": "میدان انقلاب اسلامی",
                                    "bearing_after": 111,
                                    "type": "rotary",
                                    "modifier": "straight",
                                    "exit": 3,
                                    "distance": {
                                        "value": 146.0,
                                        "text": "۱۵۰ متر"
                                    },
                                    "duration": {
                                        "value": 38.0,
                                        "text": "۱ دقیقه"
                                    },
                                    "polyline": "}w{xEohtxHDSBUCUESEKGKSOUEW@UJORKXAN?N",
                                    "start_location": [
                                        51.390956,
                                        35.700632
                                    ]
                                },
                                {
                                    "name": "",
                                    "instruction": "به مسیر خود ادامه دهید",
                                    "bearing_after": 354,
                                    "type": "exit rotary",
                                    "modifier": "right",
                                    "exit": 3,
                                    "distance": {
                                        "value": 212.0,
                                        "text": "۲۲۵ متر"
                                    },
                                    "duration": {
                                        "value": 39.0,
                                        "text": "۱ دقیقه"
                                    },
                                    "polyline": "a|{xEuitxH_ADaBLO@{BRmAH",
                                    "start_location": [
                                        51.391154,
                                        35.701293
                                    ]
                                },
                                {
                                    "name": "کارگر شمالی",
                                    "instruction": "در مقصد قرار دارید",
                                    "bearing_after": 0,
                                    "type": "arrive",
                                    "distance": {
                                        "value": 0.0,
                                        "text": ""
                                    },
                                    "duration": {
                                        "value": 0.0,
                                        "text": ""
                                    },
                                    "polyline": "}g|xEahtxH",
                                    "start_location": [
                                        51.390885,
                                        35.703188
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        // Create a Leaflet map
        const neshanMap = new L.Map("map", {
            key: "YOUR_WEB_API_KEY", // Get your own API Key on https://platform.neshan.org/panel
            maptype: "dreamy",
            center: [35.700936, 51.391194],
            zoom: 16,
        })

        // iterate through response steps
        for (let k = 0; k < Object.keys(exampleResponse.routes).length; k++) {

            for (let j = 0; j < Object.keys(exampleResponse.routes[k].legs).length; j++) {

                for (let i = 0; i < Object.keys(exampleResponse.routes[k].legs[j].steps).length; i++) {
                    var step = exampleResponse.routes[k].legs[j].steps[i];

                    // decode Encoded polyline and draw on map
                    L.Polyline.fromEncoded(step.polyline, {
                        color: "#250ECD",
                        weight: 12
                    }).addTo(neshanMap);

                    // add point in start of step
                    L.circleMarker([step.start_location[1], step.start_location[0]], {
                        weight: 1,
                        color: "#FFFFFF",
                        radius: 5,
                        fill: true,
                        fillColor: "#9fbef9",
                        fillOpacity: 1.0
                    }).addTo(neshanMap);
                }
            }
        }

    </script>
</body>

</html>
```

مستندات SDK web نشان
[مطالعه مستندات کتابخانه Leaflet](https://leafletjs.com/reference.html)
