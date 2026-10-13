---
source: https://platform.neshan.org/docs/sdk/web/mapboxgl/examples/neshan-mapbox-get-coord/
title: دریافت مختصات با کلیک بر روی نقشه
---

# دریافت مختصات با کلیک بر روی نقشه

در این راهنما یاد می‌گیریم که چگونه با کلیک کاربر روی هر نقطه از نقشه، علاوه بر استخراج مختصات جغرافیایی، یک **مارکر (Marker)** را به آن نقطه منتقل کنیم. این کار به کاربر کمک می‌کند تا به صورت بصری متوجه شود دقیقاً کدام نقطه را انتخاب کرده است.

## ۱- کد کامل (HTML و جاوااسکریپت)

در این کد، ما ابتدا یک مارکر را ایجاد می‌کنیم اما آن را به نقشه اضافه نمی‌کنیم، یا در اولین کلیک آن را ظاهر می‌کنیم. در کلیک‌های بعدی، مارکر قبلی به موقعیت جدید پرش می‌کند.

```html
<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8" />
    <title>دریافت مختصات و جابجایی مارکر</title>
    <link rel="stylesheet" href="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.css" />
    <script src="https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.1/index.js"></script>
    <style>
        body { margin: 0; padding: 0; font-family: Tahoma, sans-serif; }
        #map { width: 100%; height: 90vh; }
        #info-box {
            height: 10vh;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-top: 3px solid #250ECD;
            font-size: 1rem;
            direction: ltr;
        }
        b { color: #250ECD; }
    </style>
</head>
<body>

    <div id="map"></div>
    <div id="info-box">برای انتخاب موقعیت و مشاهده مختصات، روی نقشه کلیک کنید</div>

    <script>
        // ۱. مقداردهی اولیه نقشه
        const neshanMap = new nmp_mapboxgl.Map({
            mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
            container: "map",
            zoom: 14,
            center: [51.3890, 35.6892],
            mapKey: "YOUR_WEB_API_KEY"
        });

        // ۲. تعریف متغیر مارکر (بدون مقدار اولیه)
        let marker;

        // ۳. گوش دادن به رویداد کلیک
        neshanMap.on('click', (e) => {
            const { lng, lat } = e.lngLat;
            const infoBox = document.getElementById('info-box');
            infoBox.innerHTML = `
                <div>Latitude: <b>${lat.toFixed(6)}</b></div>
                <div>Longitude: <b>${lng.toFixed(6)}</b></div>
            `;

            // ۴. مدیریت مارکر روی نقشه
            if (!marker) {
                // اگر مارکر هنوز ساخته نشده، آن را ایجاد و به نقشه اضافه کن
                marker = new nmp_mapboxgl.Marker({
                    color: "#1b80e4",
                    draggable: false
                })
                .setLngLat([lng, lat])
                .addTo(neshanMap);
            } else {
                // اگر مارکر از قبل وجود دارد، فقط موقعیت آن را تغییر بده
                marker.setLngLat([lng, lat]);
            }
        });
    </script>
</body>
</html>
```

## ۲- نحوه عملکرد

این پیاده‌سازی شامل چند بخش کلیدی است:

- **دریافت مختصات از طریق رویداد:** با کلیک بر روی نقشه و فراخوانی رویداد مختصات محل کلیک توسط کابر گرفته می‌شود تا برای رسم مارکر استفاده شود.
- **تعریف متغیر `marker`:** ما مارکر را در فضای بیرونی (Global) تعریف می‌کنیم تا در هر بار کلیک به آن دسترسی داشته باشیم.
- **شرط `if (!marker)`:** در اولین کلیک، شیء مارکر ساخته شده و با متد `.addTo(neshanMap)` روی نقشه ظاهر می‌شود.
- **متد `.setLngLat([lng, lat])`:** در کلیک‌های دوم به بعد، به جای ساختن مارکر جدید، از این متد استفاده می‌کنیم تا مارکر فعلی به مختصات جدید منتقل شود. این کار باعث می‌شود همیشه **فقط یک مارکر** روی نقشه داشته باشیم.

اطلاع

استفاده از متد `setLngLat` به جای حذف و اضافه کردن مجدد مارکر، از نظر مصرف حافظه (Memory) بسیار بهینه‌تر است و از پرپر زدن (Flickering) مارکر جلوگیری می‌کند.

## ۳- شخصی‌سازی بیشتر

شما می‌توانید ظاهر مارکر را با پاس دادن تنظیمات به `new nmp_mapboxgl.Marker()` تغییر دهید. مثلاً برای تغییر رنگ یا استفاده از یک المان HTML سفارشی به عنوان مارکر:

```javascript
// مثال مارکر با رنگ قرمز
marker = new nmp_mapboxgl.Marker({ color: 'red' });
```

---

- [مستندات کامل مارکرها در Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/markers/)
- آموزش Reverse Geocoding (تبدیل مختصات به آدرس)

این کد به خوبی نیاز شما را برای انتخاب یک نقطه واحد روی نقشه برطرف می‌کند. سوال دیگری در مورد شخصی‌سازی مارکرها دارید؟
