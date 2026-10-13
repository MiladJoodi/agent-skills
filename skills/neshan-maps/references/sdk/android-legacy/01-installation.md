---
source: https://platform.neshan.org/docs/sdk/android/legacy/installation/
title: نصب Android SDK راهنمای نصب و راه‌اندازی
---

# مستندات کیت توسعه اندروید (android SDK) نشان

## پـیش نیازها

برای استفاده از `SDK` نقشه نشان در اندروید ابتدا بایستی یک فایل لایسنس ایجاد کنید. جهت ایجاد این فایل لایسنس به چند چیز احتیاج دارید:

- **Package Name**: نام پکیج اپلیکیشنی که قصد دارید در آن از `SDK` نقشه‌ی نشان استفاده کنید. به عنوان مثال: `org.neshan.sample`
- **SHA1 Fingerprint**: فینگرپرینت `SHA1` از کلیدهای مورد نیازتان که برای امضای `APK` یا bundle اپلیکیشن خود استفاده می‌کنید. (کلید انتشار، دیباگ و سایر کلیدهایی که ممکن است در فرایند توسعه اپلیکیشن مورد نیاز شما باشد)

برای تولید فینگرپرینت از کلید‌های مورد نظرتان می‌توانید از دستورات زیر در ترمینال استفاده کنید:

### Release SHA1

```bash
keytool -list -v -keystore '/PATH/TO/KEY' -alias aliasKeyName
```

برای ایجاد کلید Release باید از داخل نرم افزار android Studio و از طریق منوی Build و با انتخاب گزینه Generate Signed Bundle / APK اقدام کنید. همچنین در دستورات فوق به جای عبارت ‘PATH/TO/KEY/’ آدرس کلید ایجاد شده را قرار دهید.

نکته

جهت استفاده از دستور فوق در سیستم عامل Windows باید ابتدا از طریق cmd در پوشه bin در محل نصب Java در سیستم خود قرار بگیرید. یا آدرس پوشه bin در محل نصب Java را به System variables اضافه کنید تا دستور keytool در همه جا قابل دسترس باشد.

ویدئوی زیر با این پیش فرض که آدرس پوشه bin در System variables قرار گرفته است، فینگرپرینت مربوط به نسخه ریلیز را استخراج کرده و فرایند ساخت لایسنس ریلیز را نشان میدهد:

### Debug SHA1

```bash
keytool -list -v -keystore '~\.android\debug.keystore' -alias androiddebugkey -storepass android -keypass android
```

نکته

آدرس `~\.android\debug.keystore` به آدرس keystore پیش فرض اندروید استودیو که برای دیباگ پروژه ها مورد استفاده قرار میگیرد اشاره دارد. این آدرس بر اساس سیستم عامل شما و محل نصب آن ممکن است متفاوت باشد اما معمولا مشابه با `C:\Users\YOUR_USER\.android\debug.keystore` است.

یک روش دیگر برای به دست آوردن SHA1 Fingerprint مربوط به Debug تب Gradle tool window میباشد.

1. از منوی View گزینه Tool windows و در منوی باز شونده گزینه Gradle را کلیک کنید
2. در پنجره Gradle که در سمت راست و بالای پنجره اندروید استدیو قرار دارد، به قسمت Tasks > android رفته و روی گزینه signingReport دابل کلید کنید.

   نکته

   در صورتی که گزینه Tasks در پنجره Gradle وجود نداشت، از منوی File گزینه Settings را انتخاب کنید و روی گزینه Experimental از منوی سمت چپ پنجره Settings کلیک کنید. در موارد مربوط به Experimental در بخش Gradle ، تیک گزینه Do not build Gradle task list during Gradle sync را بردارید. سپس gradle را sync کنید.

3. در پنجره Run که پس از دابل کلیک روی گزینه signingReport باز میشود، در قسمت Task:app:signingReport مورد SHA1 فینگرپرینت مربوط به نسخه دیباگ است

ویدئوی زیر نحوه ایجاد فینگرپرینت نسخه دیباگ و ایجاد لایسنس و جایگذاری لایسنس در پروژه را نمایش میدهد:

**نکته:** در این ویدئو آدرس پوشه bin در System variables قرار گرفته است

اطلاع

با داشتن Package Name و ایجاد SHA1 Fingerprint های مورد نیازتان کافی است از طریق لینک زیر در پنل توسعه‌دهندگان نشان به صورت **کاملاً رایگان** ثبت‌نام کنید و پس از ورود به پنل با انتخاب گزینه ایجاد کلید دسترسی، در پنجره ایجاد کلید دسترسی ابتدا یک نام برای کلید خود در نظر بگیرید، نوع کلید را **اپلیکیشن موبایل - android** انتخاب کنید و در فیلد نام باندل، Package Name اپلیکیشن‌تان و در فیلد کلید امضاء هم SHA1 Fingerprint هایی که ساختید را وارد کنید. اگر بیش از یک فینگرپرینت دارید کافیست آن‌ها با با کاما از هم جدا کنید.

- [ثبت نام و کلید دسترسی](https://platform.neshan.org/panel)
- [قوانین و شرایط استفاده](https://platform.neshan.org/tos/)

## انتشار اپلیکیشن در Google Play Store

در صورتی که قصد انتشار اپلیکیشن خود در Google play store را دارید، باید برای ایجاد کلید دسترسی نشان، fingerprint مربوط به Play App Signing گوگل را نیز در فیلد کلید امضا اضافه کنید.

برای به دست آوردن fingerprint مربوط به Play App Signing در پنل Google play console به قسمت Setup > App integrity مراجعه کنید

و در قسمت App signing key certificate مورد SHA-1 certificate fingerprint را کپی کرده و در فیلد کلید امضا در پنل نشان اضافه کنید.

سپس کلید دسترسی را در پروژه خود قرار داده و اقدام به گرفتن خروجی باندل کنید.

با ذخیره این فرم یک فایل لایسنس (neshan.license) برای اپلیکیشن شما ایجاد می‌شود. این فایل را بر روی کامپیوتر خود دانلود کنید.

نکته

برای نمایش نقشه هم در حالت دیباگ هم در حالت ریلیز، هنگام ایجاد لایسنس در فیلد کلید امضا، هر دو فینگرپرینت را اضافه کرده و با **کاما (,)** از یکدیگر جدا کنید

## راه‌اندازی اپلیکیشن

### ۱- نصب `SDK` از طریق افزودن مخزن `maven` نشان

در `build.gradle` پروژه (project level):

```bash
allprojects {
    repositories {
        //Add Neshan maven repo here
        maven { url "https://maven.neshan.org/artifactory/public-maven" }
    }
}
```

در صورتی که پروژه خود را با اندروید استدیو ورژن Arctic fox به بعد ایجاد کرده اید، لازم است تا مخزن maven نشان را در فایل settings.gradle اضافه کنید:

```bash
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        jcenter() // Warning: this repository is going to shut down soon
        //Add Neshan maven repo here
        maven { url "https://maven.neshan.org/artifactory/public-maven" }
    }
}
```

و افزودن `dependency` نشان در `build.gradle` ماژول (app module):

```bash
dependencies {
    //Neshan sdk library
    implementation 'neshan-android-sdk:mobile-sdk:1.0.3'
    implementation 'neshan-android-sdk:services-sdk:1.0.0'
    implementation 'neshan-android-sdk:common-sdk:0.0.3'
    
    //Play Services
    implementation 'com.google.android.gms:play-services-gcm:17.0.0'
    implementation 'com.google.android.gms:play-services-location:21.0.1'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
}
```

## کاهش حجم اپلیکیشن

برای کاهش حجم اپلیکیشن خود میتوانید تنظیمات `splits` را در بخش `android` در فایل `build.gradle` ماژول خود قرار دهید:

```bash
splits {
    abi {
        enable true
        reset()
        include 'armeabi-v7a'
        universalApk false
    }
}
```

این خط کد باعث میشود apk خروجی شما تنها از معماری های ذکر شده پشتیبانی کند. برای اطلاع از معماری های مختلف موجود در اندروید و همچنین موارد بیشتر راجع به abi filter به لینک [ABI Managment](https://developer.android.com/ndk/guides/abis) مراجعه بفرمایید.

نکته

**نکته**: برخی از دستگاه های جدید مانند گوشی های Pixel تنها از معماری 64 بیتی پشتیبانی میکنند. لذا برای کاهش حجم اپلیکیشن این را در نظر داشته باشید که در صورتی که میخواهید اپلیکیشنتان گوشی های با معماری 64 بیتی را نیز پشتیبانی کند، موارد زیر را نیز میتوانید با کاما (,) به قسمت include اضافه نمایید.

```bash
'arm64-v8a', 'x86_64'
```

نکته

چنانچه برای پروژه خود از proguard استفاده می‌کنید **حتماً باید** پکیج org.neshan را در تنظیمات پروگارد خود مستثنی کنید. برای این منظور کافیست یک rule به صورت زیر در فایل `proguard-rules.pro` ماژول قرار دهید:

```html
-keep class org.neshan.** {*;}
```

### ۲- تـعریف دسترسی `INTERNET` برای اپلیکیشن

در فایل `androidManifest.xml` پروژه:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

### ۳- قرار دادن فایل `neshan.license` در فولدر `raw`

در `resources` اندروید (در صورتی که این فولدر وجود ندارد آن را ایجاد کنید)

!تصویر فولدر raw

### ۴- تعریف `layout` اصلی نقشه

در `res/layout/activity_main.xml` و استفاده از المنت `org.neshan.mapsdk.MapView`

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

<org.neshan.mapsdk.MapView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:id="@+id/map"/>

</android.support.constraint.ConstraintLayout>
```

### ۵- تبــریک!

حالا می‌تـوانید از طریق تابع `findViewById(R.id.map)` به آبجکت `MapView` متصل شده و با نقشه کار کنید.

### ۶- اپلیکیشن‌های نمونه

برای مشاهده **اپلیکیشن‌های نمونه** و **سورس کدهای اندروید** می‌توانید به صفحه اپلیکیشن‌های نمونه مراجعه و با کمک راهنمای موجود قابلیت‌های جدید به اپلیکیشن خود اضافه کنید.

## راهنمای قابلیت‌ها

شما میتوانید جهت دسترسی به راهنمای استفاده از قابلیت‌های مختلف این `SDK` به تفکیک و همراه با نمونه کد به **منوی مستندات جامع اندروید** در **سمت راست صفحه** مراجعه نمایید. همچنین صفحه سوالات متداول اس دی کی اندروید که شامل سوالات پر تکرار کاربران اس دی کی اندرویدیست پاسخگوی سوالات متداول شماست.

اپلیکشن های نمونه
