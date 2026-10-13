---
source: https://platform.neshan.org/docs/sdk/ios/installation/
title: نصب iOS SDK راهنمای نصب و راه‌اندازی
---

# راه‌اندازی کیت توسعه iOS

این نسخه از کیت توسعه iOS نشان، بر پایه‌ی **MapLibre Native** ساخته شده است. یعنی دقیقاً مثل یک پروژه‌ی استاندارد MapLibre Native با آن کار می‌کنید — همان کلاس‌ها (`MLNMapView`)، همان متدها، همان style JSON — و تنها تفاوت، افزودن یک کلید API است.

## پـیش نیازها

برای استفاده از `SDK` نقشه نشان ابتدا بایستی یک کلید API دریافت کنید:

اطلاع

از طریق لینک زیر در پنل توسعه‌دهندگان نشان به صورت **کاملاً رایگان** ثبت‌نام کنید و کلید API خود را دریافت کنید.

- [ثبت نام و دریافت کلید API](https://platform.neshan.org/panel)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

## راه‌اندازی اپلیکیشن

### ۱- دانلود بسته‌ی SDK

بسته‌ی SDK (شامل `Package.swift` و `MapLibre.xcframework`) را از آدرس زیر دانلود کنید:

```text
https://static.neshan.org/sdk/maplibre/ios/MapLibre-6.28.0.zip
```

فایل دانلود شده را از حالت فشرده خارج کنید. پوشه‌ی استخراج‌شده باید شامل فایل `Package.swift` در ریشه و پوشه‌ی `MapLibre.xcframework` باشد.

### ۲- افزودن Package به پروژه Xcode

از آنجایی که این بسته به صورت یک **Swift Package محلی** (Local Package) توزیع می‌شود، نیازی به هیچ آدرس Git یا رجیستری خاصی نیست:

1. در Xcode از منوی **File** گزینه‌ی **Add Package Dependencies...** را انتخاب کنید.
2. در پایین صفحه‌ی باز شده روی دکمه‌ی **Add Local...** کلیک کنید.
3. پوشه‌ای که در مرحله‌ی قبل استخراج کردید (همان پوشه‌ای که `Package.swift` در ریشه‌ی آن قرار دارد) را انتخاب کنید.
4. در بخش **Choose Package Products**، محصول `MapLibre` را برای Target اصلی پروژه‌تان فعال کنید.

نکته

در صورتی که پروژه‌ی شما از چند Target تشکیل شده، فقط لازم است پکیج را به Target ای که قرار است نقشه در آن نمایش داده شود اضافه کنید.

### ۳- افزودن کلید API در `Info.plist`

تنها تنظیم اختصاصی این SDK، افزودن کلید API با نام `MLNApiKey` به فایل `Info.plist` است:

```xml
<key>MLNApiKey</key>
<string>YOUR_API_KEY</string>
```

یا از طریق ویرایشگر بصری `Info.plist` در Xcode، یک ردیف جدید با کلید `MLNApiKey` و مقدار کلید API خودتان اضافه کنید.

نکته

نیازی به فراخوانی هیچ متد مقداردهی اولیه (init) اضافه‌ای در کد نیست — به محض این که اولین شیء `MLNMapView` ساخته شود، کلید API از `Info.plist` به صورت خودکار خوانده می‌شود.

### ۴- ساخت نقشه

نقشه با ساخت یک شیء `MLNMapView` و افزودن آن به `view hierarchy` نمایش داده می‌شود. آدرس استایل نیز مستقیماً هنگام ساخت این شیء یا از طریق property مربوطه قابل تعیین است:

- swift

```swift
import UIKit
import MapLibre

final class MapViewController: UIViewController {

    private var mapView: MLNMapView!

    override func viewDidLoad() {
        super.viewDidLoad()

        let styleURL = URL(string: "https://static.neshan.org/sdk/maplibre/styles/light.json")
        mapView = MLNMapView(frame: view.bounds, styleURL: styleURL)
        mapView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        mapView.setCenter(
            CLLocationCoordinate2D(latitude: 35.6892, longitude: 51.3890), // تهران
            zoomLevel: 11,
            animated: false
        )
        view.addSubview(mapView)
    }
}
```

نکته

در صورتی که پروژه‌ی شما مبتنی بر **SwiftUI** است، کافیست `MLNMapView` را از طریق `UIViewRepresentable` به یک View بسته‌بندی کنید — این SDK همان کلاس‌های استاندارد MapLibre Native برای iOS را در اختیار شما می‌گذارد و هیچ تفاوتی با یکپارچه‌سازی معمول MapLibre Native ندارد.

### ۵- تبــریک!

نقشه شما آماده است. برای انتخاب استایل‌های مختلف نقشه، صفحه‌ی تغییر استایل نقشه و برای افزودن نشانگر یا رسم خط، صفحات افزودن نشانه‌گر و رسم خط را مطالعه کنید.
