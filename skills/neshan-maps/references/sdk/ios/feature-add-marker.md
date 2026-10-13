---
source: https://platform.neshan.org/docs/sdk/ios/features/ios-native-sdk-add-marker/
title: افزودن نشانگر
---

# افزودن نشانگر

در این بخش، هدف افزودن یک نشانگر (annotation) به نقطه‌ای از نقشه است که کاربر روی آن لمس طولانی (long press) کرده است.

## ایجاد نشانگر با لمس طولانی روی نقشه

برای دریافت رویداد لمس طولانی، یک `UILongPressGestureRecognizer` روی نقشه اضافه می‌کنیم. با فراخوانی شدن این حرکت، مختصات لمس‌شده به مختصات جغرافیایی تبدیل شده و یک annotation از نوع `MLNPointAnnotation` ساخته و با متد `addAnnotation` به نقشه اضافه می‌شود:

- swift

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    // ... ساخت mapView مطابق صفحه‌ی راه‌اندازی

    let longPress = UILongPressGestureRecognizer(target: self, action: #selector(handleLongPress))
    mapView.addGestureRecognizer(longPress)
}

@objc private func handleLongPress(_ gesture: UILongPressGestureRecognizer) {
    guard gesture.state == .began else { return }

    let point = gesture.location(in: mapView)
    let coordinate = mapView.convert(point, toCoordinateFrom: mapView)

    let marker = MLNPointAnnotation()
    marker.coordinate = coordinate
    mapView.addAnnotation(marker)
}
```

## عنوان و توضیحات

با تعیین `title` و `subtitle` روی `MLNPointAnnotation`، با کلیک روی مارکر یک callout (info window) شامل عنوان و توضیحات نمایش داده می‌شود:

- swift

```swift
let marker = MLNPointAnnotation()
marker.coordinate = coordinate
marker.title = "دفتر مرکزی نشان"
marker.subtitle = "تهران، ایران"
mapView.addAnnotation(marker)
```

نمایش callout به صورت پیش‌فرض فعال است. برای غیرفعال کردن آن روی یک annotation خاص، متد delegate زیر را پیاده‌سازی کنید:

- swift

```swift
extension MapViewController: MLNMapViewDelegate {
    func mapView(_ mapView: MLNMapView, annotationCanShowCallout annotation: MLNAnnotation) -> Bool {
        return true
    }
}
```

## آیکون سفارشی برای مارکر

برای استفاده از تصویر دلخواه به جای پین پیش‌فرض، متد delegate زیر را پیاده‌سازی کنید. این متد به ازای هر annotation یک بار فراخوانی می‌شود:

- swift

```swift
extension MapViewController: MLNMapViewDelegate {
    func mapView(_ mapView: MLNMapView, imageFor annotation: MLNAnnotation) -> MLNAnnotationImage? {
        let reuseIdentifier = "customMarker"
        if let existing = mapView.dequeueReusableAnnotationImage(withIdentifier: reuseIdentifier) {
            return existing
        }
        let image = UIImage(named: "ic_marker")!
        return MLNAnnotationImage(image: image, reuseIdentifier: reuseIdentifier)
    }
}
```

## واکنش به کلیک روی مارکر

با پیاده‌سازی متد delegate زیر می‌توانید رویداد انتخاب (کلیک) روی هر annotation را دریافت کنید:

- swift

```swift
extension MapViewController: MLNMapViewDelegate {
    func mapView(_ mapView: MLNMapView, didSelect annotation: MLNAnnotation) {
        print("annotation selected at \(annotation.coordinate)")
    }
}
```

## حذف نشانگر

برای حذف یک annotation مشخص از روی نقشه، از متد `removeAnnotation` استفاده کنید:

- swift

```swift
mapView.removeAnnotation(marker)
```

برای حذف تمام annotation های موجود روی نقشه نیز کافیست لیست `mapView.annotations` را به `removeAnnotations` بدهید:

- swift

```swift
if let all = mapView.annotations {
    mapView.removeAnnotations(all)
}
```

## افزودن چندین نشانگر به صورت یکجا

به جای فراخوانی مکرر `addAnnotation`، می‌توانید از متد `addAnnotations` که آرایه‌ای از annotation ها دریافت می‌کند استفاده کنید:

- swift

```swift
let first = MLNPointAnnotation()
first.coordinate = CLLocationCoordinate2D(latitude: 35.6892, longitude: 51.3890)

let second = MLNPointAnnotation()
second.coordinate = CLLocationCoordinate2D(latitude: 35.7219, longitude: 51.3347)

mapView.addAnnotations([first, second])
```

نکته

تمام متدهای `MLNMapViewDelegate` که در این صفحه استفاده شدند، دقیقاً همان متدهای استاندارد MapLibre Native برای iOS هستند — چیزی مختص این SDK نیست. برای نیازهای پیشرفته‌تر (مثلاً View سفارشی به جای تصویر ساده) می‌توانید از `MLNAnnotationView` و متد `mapView(_:viewFor:)` استفاده کنید.
