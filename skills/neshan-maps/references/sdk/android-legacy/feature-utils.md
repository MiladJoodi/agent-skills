---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/android-utisl/
title: توابع کاربردی (Utils functions)
---

# ابزار های کاربردی

در اینجا چند مورد از متد ها و ابزار های کاربردی را مرور می‌کنیم

## ابزار GeometricUtils

ابزار **GeometricUtils** چند متد برای کار با محدوده های هندسی ارائه می‌کند که در ادامه به معرفی آنها می‌پردازیم.

### متد calculateArea

این متد برای محاسبه مساحت محدوده انتخاب شده است. به این صورت که نقاط حول یک محدوده را به عنوان پارامتر ورودی دریافت می‌کند و مساحت محدوده انتخاب شده را بر حسب متر برمی‌گرداند.

```java
calculateArea(List<LatLng> polygonPoints)
```

### متد pointInPolygon

این تابع برای محاسبه وجود 1 نقطه در یک محدوده به کار می‌رود.
پارامتر اول متد لیستی از نقاط دور محدوده است و پارامتر دوم نقطه ای که می‌خواهیم بررسی کنیم که در محدوده **polygon** وجود دارد یا خیر.
در صورتی که نقطه در محدوده باشد مقدار **true** و در غیر اینصورت مقدار **false** بازگردانده می‌شود.

در صورتی که نقطه روی خط مرزی محدوده باشد، تابع مقدار **false** را برمی‌گرداند.

```java
pointInPolygon(ArrayList<LatLng> polygonPoints, LatLng point)
```

## ابزار LatLngUtils

ابزار **LatLngUtils** چند متد برای کار با نقاط **LatLng** ارائه می‌کند که در ادامه به معرفی آنها می‌پردازیم.

### متد getDestinationPoint

متد **getDestinationPoint** یک نقطه جغرافیایی، میزان چرخش و فاصله را به عنوان پارامتر از ورودی دریافت می‌کند و مختصات نقطه ای که در این موقعیت قرار دارد را به عنوان خروجی در قالب یک متغیر **LatLng** برمی‌گرداند.

```java
getDestinationPoint(LatLng pointStart, double bearing, double distance)
```

### متد getDistance

این تابع برای محاسبه فاصله هوایی میان 2 نقطه جغرافیایی است.

```java
getDistance(LatLng point1, LatLng point2)
```

### متد getRoadDistance

این متد جهت بدست آوردن فاصله جاده ای میان 2 نقطه استفاده می‌شود.

```java
getRoadDistance(String apiKey, LatLng point1, LatLng point2, OnRoadDistanceCalculated onRoadDistanceCalculated)
```

این تابع از طریق سرویس مسیریابی فاصله جاده ای را بدست آورده و از طریق کال بک **OnRoadDistanceCalculated** میزان فاصله را برمی‌گرداند.
