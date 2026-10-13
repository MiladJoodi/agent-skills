---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/add-Label/
title: افزودن برچسب (Add Label)
---

# نسخه 1.0.3

در این آموزش نحوه اضافه کردن یک برچسب با متن دلخواه به یک موقعیت جغرافیایی از نقشه توضیح داده خواهد شد.

## اعمال تغییرات در لی‌اوت `activity_add_label.xml`

فایل لی‌اوت این بخش صرفا شامل یک نقشه از کلاس `org.neshan.ui.MapView` است.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="activity.AddLabel">

    <org.neshan.mapsdk.MapView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"/>
</android.support.constraint.ConstraintLayout>
```

## افزودن برچسب

در فایل `AddLabel.java` و یا فایل `AddLabel.kt` مراحل زیر را انجام می‌دهیم.

به جز متد `addLabel` تمامی بخش‌های دیگر این کلاس مشابه با کلاس `addMarker` است و در صورت نیاز می‌توانید از این بخش اطلاعات مربوط به بقیه بخش‌های کد را مطالعه کنید.

اگر شی `label` دارای مقدار است، به این معنی می باشد که قبلا یک متن به نقشه اضافه شده. ابتدا با دستور `removeLabel` این برچسب را از روی نقشه حذف می کنیم.

یک شی از کلاس `TextStyleBuilder` ساخته شده و با استفاده از متدهای setter ویژگی‌های مختلفی از جمله اندازه فونت، رنگ پس‌زمینه و … بر روی آن تنظیم می‌شود و در نهایت با صدا زدن متد `buildStyle` بر روی آن، شی ای از کلاس `TextStyle` برگردانده می‌شود.

شی‌ای از کلاس `Label` ایجاد شده و به عنوان آرگومان‌های ورودی، به ترتیب، به آن موقعیت جغرافیایی‌ای که برچسب در آن‌جا نشان داده شود، استایل ساخته شده و متنی که باید بر روی برچسب نشان داده شود داده می‌شود.

با صدا زدن متد `addLabel` بر روی `map`، برچسب ساخته شده بر روی نقشه نشان داده می‌شود.

- java
- kotlin

```java
// This method gets a LngLat as input and adds a label on that position
private void addLabel(LatLng loc){
    if(label!=null){
        map.removeLabel(label);
    }
    // Creating text style. We should use an object of type TextStyleBuilder, set all features on it
    // and then call buildStyle method on it. This method returns an object of type TextStyle.
    TextStyleBuilder textStyleBuilder = new TextStyleBuilder();
    textStyleBuilder.setFontSize(15f);
    textStyleBuilder.setColor(new Color((short)255, (short)150, (short)150, (short)255));
    TextStyle textStyle = textStyleBuilder.buildStyle();

    // Creating label
    label = new Label(loc, textStyle, "مکان انتخاب شده");

    // Adding marker to labelLayer, or showing label on map!
    map.addLabel(label);
}
```

```kotlin
// This method gets a LatLng as input and adds a label on that position
private fun addLabel(loc: LatLng) {
    if (label != null) {
        map.removeLabel(label)
    }
    // Creating text style. We should use an object of type TextStyleBuilder, set all features on it
    // and then call buildStyle method on it. This method returns an object of type TextStyle.
    val textStyleBuilder = TextStyleBuilder()
    textStyleBuilder.fontSize = 25f
    textStyleBuilder.color = Color(-0x1)
    textStyleBuilder.strokeWidth = 0.5f
    textStyleBuilder.strokeColor = Color(-0x1)
    textStyleBuilder.textMargins = TextMargins(5, 2, 5, 2)
    textStyleBuilder.backgroundColor = Color(-0x10000)
    val textStyle = textStyleBuilder.buildStyle()

    // Creating label
    label = Label(loc, textStyle, "مکان انتخاب شده")

    // Adding marker to labelLayer, or showing label on map!
    map.addLabel(label)
}
```

نکته

اولویت نمایش نشانگر (مارکر) نسبت به برچسب بیشتر است. در صورتی که نشانگری وارد محدوده برچسب شود، برچسب نمایش داده نخواهد شد. در صورتی که میخواهید برچسب در هر صورتی نمایش داده شود میتوانید از متد زیر روی شی TextStyleBuilder استفاده کنید:

```java
textStyleBuilder.setHideIfOverlapped(false);
```
