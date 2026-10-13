---
source: https://platform.neshan.org/docs/sdk/web/mapboxgl/examples/neshan-mapbox-limit-bounds/
title: محدود کردن ناحیه نمایش در نقشه نشان با Mapbox GL
---

# محدود کردن ناحیه نمایش (Bounds) بر روی نقشه

اطلاع

برای استفاده از کیت‌های توسعه‌ی نشان، ابتدا بایستی از طریق ثبت نام رایگان در پنل توسعه‌دهندگان نشان، اقدام به دریافت **کلید دسترسی (API Key)** نمایید.

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)

در بسیاری از پروژه‌ها نیاز است که کاربر فقط در یک محدوده جغرافیایی خاص (مثلاً محدوده یک شهر یا یک محله خاص) اجازه جابجایی و اسکرول داشته باشد. در این راهنما، نحوه استفاده از ویژگی `maxBounds` را برای محدود کردن نقشه بررسی می‌کنیم.

## ۱- تعریف محدوده (Bounding Box)

محدوده مجاز جابجایی در Mapbox به صورت دو جفت مختصات تعریف می‌شود:

1. **گوشه جنوب غربی (Southwest):** کمترین طول و عرض جغرافیایی.
2. **گوشه شمال شرقی (Northeast):** بیشترین طول و عرض جغرافیایی.

```javascript
// مثال: تعیین محدوده تقریبی شهر تهران
const bounds = [
    [51.058, 35.542], // Southwest coordinates (Long, Lat)
    [51.621, 35.850]  // Northeast coordinates (Long, Lat)
];
```

## ۲- پیاده‌سازی در کد

شما می‌توانید این محدوده را در زمان مقداردهی اولیه نقشه و یا بعد از بارگذاری کامل نقشه اعمال کنید.

### روش اول: هنگام ساخت شیء نقشه

بهترین راه برای محدود کردن نقشه، پاس دادن متغیر `maxBounds` در تنظیمات اولیه است.

```html
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8" />
    <title>محدود کردن محدوده نقشه نشان</title>
    <link rel="stylesheet" href="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.css" />
    <script src="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.js"></script>
    <style>
        body { margin: 0; width: 100vw; height: 100vh; }
        #map { width: 100%; height: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        // ۱. تعریف محدوده مجاز (تهران)
        const bounds = [
            [51.0583, 35.5422], // جنوب غربی
            [51.6218, 35.8504]  // شمال شرقی
        ];

        const neshanMap = new nmp_mapboxgl.Map({
            mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
            container: "map",
            zoom: 11,
            center: [51.3890, 35.6892],
            mapKey: "YOUR_WEB_API_KEY",
            
            // ۲. اعمال محدودیت جابجایی
            maxBounds: bounds 
        });
    </script>
</body>
</html>
```

نکته

با تنظیم `maxBounds` و همچنین تعیین `minZoom` و `maxZoom` مناسب، می‌توانید کنترل کاملی بر روی تجربه کاربری و محدود ماندن او در ناحیه مورد نظرتان داشته باشید.

## ۳- تغییر محدوده به صورت داینامیک

اگر نیاز دارید بعد از لود شدن نقشه، محدودیت جدیدی اعمال کنید یا محدودیت را حذف کنید، از متد `setMaxBounds` استفاده کنید:

```javascript
// اعمال محدودیت جدید
neshanMap.setMaxBounds(bounds);

// برای حذف محدودیت و اجازه جابجایی در کل نقشه جهان
neshanMap.setMaxBounds(null);
```

---

## نکات کلیدی

- **فرمت مختصات:** توجه داشته باشید که در Mapbox GL، مختصات به صورت `[Longitude, Latitude]` (طول جغرافیایی، عرض جغرافیایی) وارد می‌شوند.
- **تجربه کاربری:** اگر کاربر سعی کند از محدوده تعیین شده خارج شود، نقشه با یک حالت بازگشتی (Elastic Effect) او را به داخل محدوده برمی‌گرداند.
- **تداخل با مرکز نقشه:** دقت کنید که نقطه `center` ابتدایی نقشه، حتماً باید داخل محدوده `maxBounds` باشد، در غیر این صورت نقشه در هنگام لود شدن دچار خطا یا پرش می‌شود.

---

- [مستندات پارامترهای Map Object](https://docs.mapbox.com/mapbox-gl-js/api/map/)
- نمونه‌های بیشتر Mapbox GL نشان
