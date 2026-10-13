---
source: https://platform.neshan.org/docs/sdk/ios/legacy/
title: iOS SDK
---

هشدار

این نسخه منقضی شده و پشتیبانی از آن صورت نمی‌گیرد. برای استفاده از نسخه جدید به اینجا مراجعه کنید.

# کیت توسعه iOS نشان (Getting Started)

این راهنما شما را در فرآیند راه‌اندازی و استفاده از کیت توسعه نرم‌افزار (SDK) نقشه نشان برای پلتفرم iOS یاری می‌کند.

## پیش‌نیازها

برای استفاده از کیت توسعه iOS، ابتدا بایستی از طریق ثبت‌نام **رایگان** در پنل توسعه‌دهندگان نشان، اقدام به دریافت فایل لایسنس (`neshan.license`) برای اپلیکیشن خود نمایید.

جهت ایجاد فایل لایسنس، بایستی **Bundle Identifier** اپلیکیشن خود را در قسمت مربوطه در پنل کاربری وارد کرده و سپس فایل `neshan.license` را دانلود کنید.

در اولین قدم، لازم است از طریق ترمینال سیستم‌عامل خود، مدیریت وابستگی **CocoaPods** را با دستور زیر نصب نمایید:

```bash
sudo gem install cocoapods
```

- [ثبت نام و دریافت کلید دسترسی](https://platform.neshan.org/panel/signup)
- [قوانین و شرایط استفاده](https://platform.neshan.org/faq/)

## راه‌اندازی اپلیکیشن

مراحل زیر را برای افزودن SDK به پروژه Xcode خود دنبال کنید.

**۱. افزودن وابستگی (Dependency)**
وابستگی SDK نشان را به فایل `Podfile` پروژه خود اضافه کنید:

```ruby
# Podfile
pod 'NeshanMobileSDK', '~> 0.9.5'
```

**۲. نصب Pods**
از طریق ترمینال وارد مسیر ریشه پروژه خود شوید و دستور زیر را اجرا کنید. این دستور SDK نشان و سایر وابستگی‌ها را نصب می‌کند.

```bash
pod install
```

**۳. باز کردن پروژه**
پس از نصب، پروژه خود را با اجرای فایل `ProjectName.xcworkspace` در نرم‌افزار Xcode باز کنید.

**۴. افزودن فایل لایسنس**
فایل `neshan.license` را که از پنل کاربری دریافت کرده‌اید، به پروژه خود اضافه کنید.

**۵. ایجاد Bridging Header**
یک فایل از نوع `Header File` در پروژه خود ایجاد کنید (مثلاً با نام `Neshan-Bridge.h`). سپس کد زیر را در آن قرار دهید:

```objectivec
#import <NeshanMobileSDK/NeshanMobileSDK.h>
```

**۶. تنظیم مسیر Bridging Header**
به بخش `Build Settings` پروژه بروید و در قسمت `Objective-C Bridging Header`، مسیر فایل هدر ایجاد شده را وارد کنید.
برای مثال:
`$(SRCROOT)/YourProjectName/Neshan-Bridge.h`

**۷. افزودن Map View**
در فایل `Main.storyboard` یک `UIView` جدید به `ViewController` خود اضافه کنید.

**۸. مقداردهی نقشه در کد**
در فایل `ViewController.swift`، یک شئ از نوع `NTMapView` بسازید و آن را به `view` اصلی کنترلر خود اختصاص دهید.

### نمونه کد Swift

```swift
import UIKit

class ViewController: UIViewController {
    var mapview: NTMapView?

    override func viewDidLoad() {
        super.viewDidLoad()

        // 1. Initializing MapView
        mapview = NTMapView();
        
        // 2. Adding base map layer
        let baseMap = NTNeshanServices.createBaseMap(NTNeshanMapStyle.NESHAN)
        mapview?.getLayers().add(baseMap)

        // 3. (Optional) Adding traffic layer
        let trafficLayer = NTNeshanServices.createTrafficLayer()
        mapview?.getLayers().add(trafficLayer)

        // 4. (Optional) Adding POI layer
        let poiLayer = NTNeshanServices.createPOILayer(false)
        mapview?.getLayers().add(poiLayer)

        // 5. Setting map focal point and zoom
        mapview?.setFocalPointPosition(NTLngLat(x: 51.389, y: 35.6892), durationSeconds: 0.4)
        mapview?.setZoom(14, durationSeconds: 0.4)
        
        // 6. Setting the view
        self.view = mapview
    }
}
```

### نمونه کد Objective-C

```objectivec
#import "AddMarkerController.h"
#import <NeshanMobileSDK/NeshanMobileSDK.h>

@implementation AddMarkerController {
    int BASE_MAP_INDEX;
    NTMapView *map;
}

- (void)viewDidLoad {
    [super viewDidLoad];

    BASE_MAP_INDEX = 0;
    map = [NTMapView new];

    [[map getOptions] setZoomRange:[[NTRange alloc] initWithMin:4.5 max:18]];
    NTLayer *baseMap = [NTNeshanServices createBaseMap:NT_STANDARD_DAY];
    [[map getLayers] insert:BASE_MAP_INDEX layer:baseMap];

    [map setFocalPointPosition: [[NTLngLat alloc] initWithX:51.330743 y:35.767234] durationSeconds: 0];
    [map setZoom:14 durationSeconds:0];

    self.view = map;
}
@end
```

**۹. تبریک!**
حالا می‌توانید اپلیکیشن iOS خود را اجرا کرده و نقشه را مشاهده کنید.

## راهنمای قابلیت‌ها و مثال‌ها

- راهنمای کامل استفاده از قابلیت‌های مختلف این SDK در بخش [ویکی مخزن گیت‌هاب پروژه استارتر نشان](https://github.com/NeshanMaps/ios-neshan-maps-starter/wiki) قابل دسترس است.

## اپلیکیشن Starter

اپلیکیشن استارتر نقشه نشان یک پروژه آموزشی برای آشنایی توسعه‌دهندگان با قابلیت‌های مختلف SDK نقشه نشان است. در این پروژه، نحوه استفاده از کلاس‌های مختلف موجود در پلتفرم نقشه نشان آموزش داده شده است. با استفاده از ویکی کامل و توضیحات موجود در سورس کد، به راحتی می‌توانید از قابلیت‌های مختلف این پلتفرم در اپلیکیشن خود استفاده کنید.

- **ویکی پروژه:** [در این صفحه قابل دسترس می‌باشد.](https://github.com/NeshanMaps/ios-neshan-maps-starter/wiki)
- **سورس کد:** [برای دریافت سورس کد پروژه به این صفحه در گیت‌هاب مراجعه کنید.](https://github.com/NeshanMaps/ios-neshan-maps-starter)
- **فایل `ipa`:** [اپلیکیشن استارتر را از طریق این لینک دریافت کنید.](https://developers.neshan.org/ios-sdk/examples/downloads/ios-neshan-maps-starter.ipa)

## نمونه کد Swift

سورس‌کد اپلیکیشن نمونه که با زبان Swift نوشته شده، در گیت‌هاب منتشر شده است.

- **اطلاعات بیشتر و سورس کد:** [با مراجعه به این صفحه در گیت‌هاب اطلاعات بیشتری کسب کنید.](https://github.com/NeshanMaps/ios-neshan-maps-sample)
- **فایل `ipa`:** [اپلیکیشن نمونه را از طریق این لینک دریافت کنید.](https://developers.neshan.org/ios-sdk/examples/downloads/ios-neshan-maps-sample.ipa)
