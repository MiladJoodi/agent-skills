---
source: https://platform.neshan.org/docs/sdk/ios/features/ios-native-sdk-draw-line/
title: رسم خط
---

# رسم خط

در این بخش، هدف رسم یک خط (`MLNPolyline`) بر روی نقشه با استفاده از مجموعه‌ای از نقاط جغرافیایی است.

اطلاع

بر خلاف مارکرها که استایل آن‌ها (آیکون، رنگ) مستقیماً روی خود annotation تنظیم می‌شود، رنگ و ضخامت خط و چندضلعی در MapLibre Native برای iOS از طریق متدهای **delegate** مشخص می‌شود — این متدها هنگام رندر هر annotation، به صورت جداگانه فراخوانی می‌شوند.

## رسم خط ساده

برای رسم خط، ابتدا آرایه‌ای از `CLLocationCoordinate2D` ساخته و با متد `polyline(coordinates:count:)` یک شیء `MLNPolyline` می‌سازیم؛ سپس با فراخوانی `addAnnotation` روی نقشه، خط رسم می‌شود:

- swift

```swift
private func drawLine() {
    var coordinates = [
        CLLocationCoordinate2D(latitude: 35.769368, longitude: 51.327650),
        CLLocationCoordinate2D(latitude: 35.756670, longitude: 51.323889),
        CLLocationCoordinate2D(latitude: 35.746670, longitude: 51.383889),
    ]
    let polyline = MLNPolyline(coordinates: &coordinates, count: UInt(coordinates.count))
    mapView.addAnnotation(polyline)

    // متمرکز کردن دوربین روی نقطه‌ی ابتدای خط
    mapView.setCenter(coordinates[0], zoomLevel: 14, animated: true)
}
```

## رنگ و ضخامت خط

برای تعیین رنگ، ضخامت و شفافیت خط، متدهای زیر را روی `MLNMapViewDelegate` پیاده‌سازی کنید. این متدها به ازای هر annotation از نوع `MLNPolyline` فراخوانی می‌شوند:

- swift

```swift
extension MapViewController: MLNMapViewDelegate {
    func mapView(_ mapView: MLNMapView, strokeColorForShapeAnnotation annotation: MLNShape) -> UIColor {
        return UIColor(red: 2/255, green: 119/255, blue: 189/255, alpha: 1)
    }

    func mapView(_ mapView: MLNMapView, lineWidthForPolylineAnnotation annotation: MLNPolyline) -> CGFloat {
        return 4
    }

    func mapView(_ mapView: MLNMapView, alphaForShapeAnnotation annotation: MLNShape) -> CGFloat {
        return 0.9
    }
}
```

نکته

در صورتی که چندین خط یا چندضلعی با رنگ‌های متفاوت دارید، می‌توانید در این متدها با بررسی annotation ورودی (مثلاً از طریق `title` یا مقایسه‌ی reference) رنگ متفاوتی برای هر annotation بازگردانید.

## حذف خط

با استفاده از شیء `MLNPolyline` ساخته شده و متد `removeAnnotation`، خط رسم‌شده از روی نقشه حذف می‌شود:

- swift

```swift
mapView.removeAnnotation(polyline)
```

## سایر کارهای معمول

- **رسم چندضلعی (Polygon):** دقیقاً مشابه خط است، با استفاده از `MLNPolygon(coordinates:count:)` و متدهای delegate مربوط به `fillColorForPolygonAnnotation` و `strokeColorForShapeAnnotation`.
- **جابه‌جایی و زوم دوربین:** با متد `setCenter(_:zoomLevel:animated:)` یا با تنظیم مستقیم property های `centerCoordinate` و `zoomLevel` روی `mapView`. برای کنترل کامل‌تر (از جمله زاویه‌ی دوربین و Tilt) می‌توانید از `MLNMapCamera` و متد `setCamera(_:animated:)` استفاده کنید.
- **پاک کردن همه‌ی annotation ها:** با فراخوانی `mapView.removeAnnotations(mapView.annotations ?? [])` تمام annotation های افزوده‌شده به نقشه حذف می‌شوند.
