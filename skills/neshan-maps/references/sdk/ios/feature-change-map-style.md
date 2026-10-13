---
source: https://platform.neshan.org/docs/sdk/ios/features/ios-native-sdk-change-map-style/
title: تغییر استایل نقشه
---

# تغییر استایل نقشه

نقشه نشان از استاندارد **Style JSON** مپ‌لیبر پیروی می‌کند. یعنی برای تغییر استایل نقشه فقط کافیست آدرس یک فایل استایل دیگر را در property مربوط به استایل نقشه قرار دهید.

## استایل‌های آماده نشان

نشان چند استایل آماده برای نقشه فراهم کرده است که می‌توانید مستقیماً از آدرس آن‌ها استفاده کنید:

| استایل | آدرس |
| --- | --- |
| Light | `https://static.neshan.org/sdk/maplibre/styles/light.json` |
| Dark | `https://static.neshan.org/sdk/maplibre/styles/dark.json` |
| Monochrome Light | `https://static.neshan.org/sdk/maplibre/styles/monochrome_light.json` |
| Monochrome Dark | `https://static.neshan.org/sdk/maplibre/styles/monochrome_dark.json` |
| Pastel | `https://static.neshan.org/sdk/maplibre/styles/pastel.json` |

## اعمال استایل روی نقشه

برای اعمال یک استایل، کافیست property با نام `styleURL` روی شیء `MLNMapView` تنظیم شود:

- swift

```swift
mapView.styleURL = URL(string: "https://static.neshan.org/sdk/maplibre/styles/dark.json")
```

### اطمینان از بارگذاری کامل استایل

در صورتی که بلافاصله بعد از تغییر استایل نیاز به افزودن مارکر، خط یا هر عنصر دیگری روی نقشه دارید، بهتر است متد delegate مربوط به پایان بارگذاری استایل را پیاده‌سازی کنید. این متد تنها زمانی صدا زده می‌شود که استایل به طور کامل بارگذاری شده باشد:

- swift

```swift
extension MapViewController: MLNMapViewDelegate {
    func mapView(_ mapView: MLNMapView, didFinishLoading style: MLNStyle) {
        // اکنون می‌توانید مارکر، خط یا لایه جدید اضافه کنید
    }
}
```

و در `viewDidLoad`، پیش از تنظیم `styleURL`:

```swift
mapView.delegate = self
```

## تعویض استایل با کلیک (مثال کاربردی)

مثال زیر با هر بار فراخوانی، استایل نقشه را به استایل بعدی در لیست استایل‌های آماده تغییر می‌دهد:

- swift

```swift
private let styles = [
    "https://static.neshan.org/sdk/maplibre/styles/light.json",
    "https://static.neshan.org/sdk/maplibre/styles/dark.json",
    "https://static.neshan.org/sdk/maplibre/styles/monochrome_light.json",
    "https://static.neshan.org/sdk/maplibre/styles/monochrome_dark.json",
    "https://static.neshan.org/sdk/maplibre/styles/pastel.json",
]
private var currentStyleIndex = 0

@objc private func switchToNextStyle() {
    currentStyleIndex = (currentStyleIndex + 1) % styles.count
    mapView.styleURL = URL(string: styles[currentStyleIndex])
}
```

## استفاده از استایل شخصی‌سازی شده

در صورتی که استایل اختصاصی خودتان را از طریق ویرایشگر استایل نقشه نشان دریافت کرده‌اید، به همان شکل کافیست آدرس فایل JSON آن استایل را در `styleURL` قرار دهید.
