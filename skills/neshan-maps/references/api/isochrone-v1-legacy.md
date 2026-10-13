---
source: https://platform.neshan.org/docs/api/routing-category/isochrone/1.0.0/
title: Isochrone API سرویس محدوده در دسترس
---

آخرین نسخهنسخه 1.0.0

# سرویس محدوده در دسترس (Isochrone) - نسخه 1.0.0

هشدار

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات نسخه قدیمی سرویس محدوده در دسترس می‌باشد.
مستندات مرتبط با آخرین نسخه این سرویس را در این صفحه می‌توانید مشاهده کنید.

این سرویس محدوده‌ای را مشخص می‌کند که از یک نقطه مرکزی در زمان یا مسافت معین قابل دسترسی است.

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
https://api.neshan.org/v1/isochrone
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `location` | مختصات مرکز به صورت `Lat,Lng`. | **اجباری** |
| `distance` | یک عدد بر حسب **کیلومتر** که حداکثر مسافت قابل دسترسی را مشخص می‌کند. | **یکی از این دو اجباری است** |
| `time` | یک عدد بر حسب **دقیقه** که حداکثر زمان قابل دسترسی را مشخص می‌کند. | **یکی از این دو اجباری است** |
| `polygon` | یکی از دو مقدار `true` یا `false` را می‌پذیرد. اگر `true` باشد، خروجی از نوع `Polygon` خواهد بود. در غیر این صورت، خروجی `LineString` است. (پیش‌فرض `false`) | اختیاری |
| `denoise` | عددی بین `0` تا `1` برای کنترل ساده‌سازی محدوده. هرچه این عدد به `1` نزدیک‌تر باشد، پولیگان ساده‌تر (با نقاط کمتر) خواهد بود. (پیش‌فرض `0`) | اختیاری |

## نمونه درخواست

- cURL
- javascript
- java
- c#
- python
- php

```bash
curl --location 'https://api.neshan.org/v1/isochrone?location=35.72084257271665%2C51.432258666992766&distance=5&time=5&polygon=false&denoise=0' \
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

fetch("https://api.neshan.org/v1/isochrone?location=35.72084257271665,51.432258666992766&distance=5&time=5&polygon=false&denoise=0", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

```java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("text/plain");
RequestBody body = RequestBody.create(mediaType, "");
Request request = new Request.Builder()
  .url("https://api.neshan.org/v1/isochrone?location=35.72084257271665,51.432258666992766&distance=5&time=5&polygon=false&denoise=0")
  .method("GET", body)
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v1/isochrone?location=35.72084257271665,51.432258666992766&distance=5&time=5&polygon=false&denoise=0");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v1/isochrone?location=35.72084257271665,51.432258666992766&distance=5&time=5&polygon=false&denoise=0"

payload = {}
headers = {
  'Api-Key': '<YOUR_API_KEY>'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.neshan.org/v1/isochrone?location=35.72084257271665%2C51.432258666992766&distance=5&time=5&polygon=false&denoise=0',
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
```

## فرمت پاسخ

پاسخ سرویس در قالب یک آبجکت `GeoJSON` بازگردانده می‌شود که شامل فیچرهای محدوده زمانی و مسافتی است.

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "contour": 1,
        "metric": "distance"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [51.379986, 35.741408],
            [51.378875, 35.742045]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "contour": 1,
        "metric": "time"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [51.374986, 35.737212],
            [51.373986, 35.735875]
          ]
        ]
      }
    }
  ]
}
```

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
| `metric` | مشخص می‌کند که این محدوده بر اساس کدام پارامتر ورودی ایجاد شده است: `distance` یا `time`. |

### آبجکت `geometry`

| پارامتر | توضیحات |
| --- | --- |
| `type` | نوع ناحیه ایجاد شده که `Polygon` یا `LineString` است (بسته به پارامتر ورودی `polygon`). |
| `coordinates` | آرایه‌ای از مختصات (`Longitude`, `Latitude`) که نقاط تشکیل‌دهنده محدوده را مشخص می‌کنند. |

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
