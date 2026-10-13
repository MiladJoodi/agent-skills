---
source: https://platform.neshan.org/docs/api/routing-category/isochrone/
title: Isochrone API
---

آخرین نسخهنسخه 1.0.0

# سرویس محدوده در دسترس (Isochrone)

اطلاع

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات آخرین نسخه سرویس محدوده در دسترس می‌باشد.
مستندات مرتبط با نسخه قدیمی این سرویس را در صفحه نسخه 1.0.0 می‌توانید مشاهده کنید.

این سرویس محدوده‌ای را مشخص می‌کند که از یک نقطه مرکزی در زمان یا مسافت معین قابل دسترسی است.

با پارامتر `dataset` می‌توانید **نوع مسیریابی** را هم مشخص کنید: خودرو (با ترافیک زنده، بر اساس الگوی ترافیک یا بدون ترافیک)، موتورسیکلت، دوچرخه و عابر پیاده.

[هم‌اکنون این سرویس را امتحان کنید](https://platform.neshan.org/demo/IsoChroneDemo)

اطلاع

1. ۱

   اولین قدم [ثبت‌نام و دریافت API KEY](https://platform.neshan.org/panel) برای اپلیکیشنی است که قصد دارید در آن از Map Api نشان استفاده کنید. کافیست در لینک فوق فرم مربوطه را تکمیل کنید تا بلافاصله API KEY را دریافت نمایید.
2. ۲

   Api Key دریافتی از پنل توسعه‌دهندگان نشان را به صورتی که در ادامه مشاهده می‌کنید از طریق کلید Api-Key در header درخواست سرویس بگنجانید.
3. ۳

   درخواست خود را با توجه به پارامترهایی که مربوط به سرویس موردنظرتان است با متد GET فراخوانی کنید.
4. ۴

   چنانچه درخواست شما با موفقیت پردازش و پاسخ داده شود، خروجی با فرمت JSON دریافت خواهید کرد و چنانچه به هر دلیل خطایی رخ دهد، کد خطا بصورت HTTP Status Code و نوع آن با فرمت JSON ارسال می‌گردد. کدهای خطای احتمالی نیز در ادامه به صورت کامل توضیح داده شده‌اند.

## شیوه‌ی فراخوانی

### آدرس Endpoint

برای استفاده از این سرویس، یک درخواست `GET` به اندپوینت زیر ارسال کنید:

```http
https://api.neshan.org/v2/isochrone
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `latitude` | عرض جغرافیایی نقطه‌ مرکزی. | **اجباری** |
| `longitude` | طول جغرافیایی نقطه‌ مرکزی. | **اجباری** |
| `time` | یک عدد بر حسب **دقیقه** که حداکثر زمان قابل دسترسی را مشخص می‌کند. | **یکی از این دو اجباری است** |
| `distance` | یک عدد بر حسب **کیلومتر** که حداکثر مسافت قابل دسترسی را مشخص می‌کند. | **یکی از این دو اجباری است** |
| `dataset` | نوع مسیریابی که محدوده بر اساس آن محاسبه می‌شود. مقادیر مجاز در جدول پایین آمده است. | اختیاری |
| `polygons` | یکی از دو مقدار `true` یا `false` را می‌پذیرد. اگر `true` باشد، خروجی از نوع `Polygon` خواهد بود. در غیر این صورت، خروجی `LineString` است. (پیش‌فرض `false`) | اختیاری |
| `denoise` | عددی بین `0` تا `1` برای کنترل ساده‌سازی محدوده. هرچه این عدد به `1` نزدیک‌تر باشد، پولیگان ساده‌تر (با نقاط کمتر) خواهد بود. (پیش‌فرض `0`) | اختیاری |

هشدار

پارامترهای `time` و `distance` را **نمی‌توانید با هم** ارسال کنید؛ در این حالت سرویس خطای `400` با پیام `only one of time or distance is allowed` برمی‌گرداند. اگر هر دو محدوده را لازم دارید، دو درخواست جداگانه بفرستید.

### مقادیر `dataset`

با این پارامتر مشخص می‌کنید محدوده‌ در دسترس بر اساس کدام نوع مسیریابی محاسبه شود:

| مقدار | توضیحات |
| --- | --- |
| `PRIMARY` | مسیریابی خودرو با ترافیک زنده |
| `TYPICAL` | مسیریابی خودرو بر اساس الگوی ترافیک |
| `NO_TRAFFIC` | مسیریابی خودرو بدون در نظر گرفتن ترافیک |
| `MOTORCYCLE` | مسیریابی موتورسیکلت |
| `BICYCLE` | مسیریابی دوچرخه |
| `PEDESTRIAN` | مسیریابی عابر پیاده |

یادداشت

اگر مقداری خارج از این لیست ارسال کنید، سرویس خطای `400` با فیلد `field` برابر `dataset` و فهرست مقادیر مجاز برمی‌گرداند.

## نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --location 'https://api.neshan.org/v2/isochrone?latitude=35.7&longitude=51.4&time=10&dataset=PRIMARY&polygons=true&denoise=0.2' \
--header 'Api-Key: <YOUR_API_KEY>'
```

```javascript
const myHeaders = new Headers();
myHeaders.append("Api-Key", "<YOUR_API_KEY>");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.neshan.org/v2/isochrone?latitude=35.7&longitude=51.4&time=10&dataset=PRIMARY&polygons=true&denoise=0.2", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

```java
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://api.neshan.org/v2/isochrone?latitude=35.7&longitude=51.4&time=10&dataset=PRIMARY&polygons=true&denoise=0.2")
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .build();

Response response = client.newCall(request).execute();
System.out.println(response.body().string());
```

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();

var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v2/isochrone?latitude=35.7&longitude=51.4&time=10&dataset=PRIMARY&polygons=true&denoise=0.2");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v2/isochrone?latitude=35.7&longitude=51.4&time=10&dataset=PRIMARY&polygons=true&denoise=0.2"

headers = {
    'Api-Key': '<YOUR_API_KEY>'
}

response = requests.get(url, headers=headers)

print(response.text)
```

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.neshan.org/v2/isochrone?latitude=35.7&longitude=51.4&time=10&dataset=PRIMARY&polygons=true&denoise=0.2',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'Api-Key: <YOUR_API_KEY>'
  ),
));

$response = curl_exec($curl);
curl_close($curl);

echo $response;

?>
```

## فرمت پاسخ

پاسخ سرویس در قالب یک آبجکت `GeoJSON` بازگردانده می‌شود که شامل فیچر محدوده‌ محاسبه‌شده است.

نمونه‌ زیر پاسخ همان درخواست بالا (محدوده‌ ۱۰ دقیقه‌ای با مسیریابی `PRIMARY`) است:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "metric": "time"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [51.378376, 35.71756],
            [51.378376, 35.714634],
            [51.38198, 35.705853],
            [51.378376, 35.7],
            [51.374772, 35.694147],
            [51.374772, 35.688293],
            [51.38198, 35.685366],
            [51.392792, 35.68244],
            [51.392792, 35.679513],
            [51.396396, 35.679513],
            [51.4, 35.68244],
            [51.410812, 35.68244],
            [51.414416, 35.69122],
            [51.421624, 35.694147],
            [51.425228, 35.694147],
            [51.432436, 35.7],
            [51.428832, 35.705853],
            [51.421624, 35.70878],
            [51.41802, 35.714634],
            [51.410812, 35.71756],
            [51.407208, 35.71756],
            [51.396396, 35.720487],
            [51.392792, 35.720487],
            [51.38198, 35.71756],
            [51.378376, 35.71756]
          ]
        ]
      }
    }
  ]
}
```

یادداشت

اولین و آخرین نقطه‌ آرایه‌ `coordinates` یکسان هستند؛ این ویژگی استاندارد GeoJSON برای بسته بودن پولیگان است و نباید آن را نقطه‌ تکراری تلقی کنید.

## اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `type` | نوع آبجکت `GeoJSON` که در اینجا همیشه `FeatureCollection` است. |
| `features` | آرایه‌ای از فیچرهای (نواحی) ایجاد شده. هر فیچر شامل `properties` و `geometry` است. |

### آبجکت `feature`

| پارامتر | توضیحات |
| --- | --- |
| `type` | نوع آبجکت که همیشه `Feature` است. |
| `properties` | یک آبجکت شامل مشخصات فیچر تولید شده. |
| `geometry` | یک آبجکت شامل اطلاعات هندسی و مختصات لازم برای رسم ناحیه. |

### آبجکت `properties`

| پارامتر | توضیحات |
| --- | --- |
| `metric` | مشخص می‌کند که این محدوده بر اساس کدام پارامتر ورودی ایجاد شده است: `time` یا `distance`. |

### آبجکت `geometry`

| پارامتر | توضیحات |
| --- | --- |
| `type` | نوع ناحیه ایجاد شده که `Polygon` یا `LineString` است (بسته به پارامتر ورودی `polygons`). |
| `coordinates` | آرایه‌ای از مختصات (`Longitude`, `Latitude`) که نقاط تشکیل‌دهنده محدوده را مشخص می‌کنند. |

توجه

ترتیب مختصات در پاسخ، مطابق استاندارد GeoJSON به‌صورت `[Longitude, Latitude]` است — یعنی برعکس ترتیبی که در پارامترهای ورودی همین سرویس (`latitude` و `longitude`) استفاده می‌شود.

### تاثیر پارامتر `denoise`

- **`denoise = 0` (پیش‌فرض):** پولیگان با جزئیات کامل و بدون ساده‌سازی ایجاد می‌شود.

- **`denoise = 1`:** پولیگان با بالاترین حد ساده‌سازی ایجاد می‌شود که منجر به تعداد نقاط کمتر و حجم پاسخ کمتر می‌شود.

!Isochrone/isoDistance Denoise 1

## کد خطاهای سرویس

| HTTP Code | Status | Description |
| --- | --- | --- |
| 400 | INVALID\_ARGUMENT | خطا در پارامتر های ورودی |
| 470 | CoordinateParseError | چنانچه مختصات جغرافیایی ارسالی معتبر نباشد رخ خواهد داد. |
| 480 | KeyNotFound | در صورتی که در فراخوانی وب‌سرویس از یک Api Key نامعتبر استفاده کنید یا Api Key خود را در header ارسال نکنید رخ خواهد داد. |
| 481 | LimitExceeded | در صورتی که تعداد فراخوانی وب‌سرویس‌ها از میزان مجازی که برای شما تعیین شده‌است عبور کند رخ خواهد داد. |
| 482 | RateExceeded | چنانچه تعداد درخواست وب‌سرویس در دقیقه از حد مجاز عبور کند رخ خواهد داد. |
| 483 | ApiKeyTypeError | کلید دسترسی استفاده شده با سرویس فراخوانی شده همخوانی ندارد. بایستی از کلید دسترسی مرتبط با سرویس مورد نظر استفاده کنید. |
| 484 | ApiWhiteListError | با توجه به اسکوپ تعریف‌شده برای این کلید، شما مجاز به استفاده نیستید. |
| 485 | ApiServiceListError | سرویس فراخوانی شده با سرویس‌های تعریف‌شده برای این کلید دسترسی همخوانی ندارد. |
| 500 | GenericError | وقوع خطای ناشناخته |
