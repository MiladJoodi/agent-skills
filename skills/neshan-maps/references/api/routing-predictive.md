---
source: https://platform.neshan.org/docs/api/routing-category/routing-historical/
title: سرویس مسیریابی پیش‌بینی
---

# سرویس مسیریابی پیش‌بینی | Predictive Routing API

این سرویس با تحلیل داده‌های ترافیکی جمع‌آوری‌شده، بهترین مسیر را براساس زمان حرکت از مبدأ یا زمان رسیدن به مقصد پیشنهاد می‌دهد. این قابلیت به کاربران کمک می‌کند تا با تعیین زمان سفر برای روزهای آینده (در بازه‌ یک هفته‌ پیش‌رو)، برنامه‌ریزی دقیق‌تری برای سفرهای خود داشته باشند.

نکته

درحال‌حاضر، این سرویس برای سه شهر **تهران**، **مشهد** و **کرج** فعال است.

اطلاع

1. ۱

   اولین قدم [ثبت‌نام و دریافت API KEY](https://platform.neshan.org/panel) برای اپلیکیشنی است که قصد دارید در آن از Map Api نشان استفاده کنید. کافیست در لینک فوق فرم مربوطه را تکمیل کنید تا بلافاصله API KEY را دریافت نمایید.
2. ۲

   Api Key دریافتی از پنل توسعه‌دهندگان نشان را به صورتی که در ادامه مشاهده می‌کنید از طریق کلید Api-Key در header درخواست سرویس بگنجانید.
3. ۳

   درخواست خود را با توجه به پارامترهایی که مربوط به سرویس موردنظرتان است با متد GET فراخوانی کنید.
4. ۴

   چنانچه درخواست شما با موفقیت پردازش و پاسخ داده شود، خروجی با فرمت JSON دریافت خواهید کرد و چنانچه به هر دلیل خطایی رخ دهد، کد خطا بصورت HTTP Status Code و نوع آن با فرمت JSON ارسال می‌گردد. کدهای خطای احتمالی نیز در ادامه به صورت کامل توضیح داده شده‌اند.

## شیوه‌ فراخوانی

### آدرس Endpoint

برای استفاده از این سرویس، یک درخواست `GET` به اندپوینت زیر ارسال کنید:

```http
https://api.neshan.org/v1/direction/historical
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `origin` | مختصات مبدأ به‌صورت `Lat,Lng` | **اجباری** |
| `destination` | مختصات مقصد به‌صورت `Lat,Lng` | **اجباری** |
| `routingType` | نوع تخمین مسیریابی را مشخص می‌کند و یکی از دو مقدار `DepartAt` یا `ArriveAt` را می‌پذیرد. `DepartAt` تخمین را بر اساس زمان حرکت و `ArriveAt` تخمین را بر اساس زمان رسیدن به مقصد انجام می‌دهد. | **اجباری** |
| `dateTime` | زمان و تاریخ مد نظر برای دریافت ترافیک با فرمت استاندارد (`YYYY-MM-DDThh:mm`). این بازه از لحظه حال تا یک هفته آینده معتبر است. (بدون در نظر گرفتن منطقه زمانی UTC-0) | **اجباری** |
| `avoidTrafficZone` | مشخص می‌کند که آیا مسیر پیشنهادی از داخل **طرح ترافیک** عبور کند یا خیر. مقادیر مجاز `true` و `false` هستند. (مقدار پیش‌فرض `false`) | اختیاری |
| `alternative` | مشخص می‌کند که آیا علاوه‌بر مسیر اصلی، حداکثر تا دو مسیر جایگزین نیز پیشنهاد داده شود. (مقدار پیش‌فرض `false`) | اختیاری |

## نمونه درخواست

- cURL
- javascript
- java
- c#
- python
- php

```bash
curl --location 'https://api.neshan.org/v1/direction/historical?origin=35.72084257271665%2C51.432258666992766&destination=35.67032306940622%2C51.29844587298737&routingType%09=DepartAt&dateTime=2025-03-18T14%3A00&avoidTrafficZone=false&alternative=false' \
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

fetch("https://api.neshan.org/v1/direction/historical?origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&routingType	=DepartAt&dateTime=2025-03-18T14:00&avoidTrafficZone=false&alternative=false", requestOptions)
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
  .url("https://api.neshan.org/v1/direction/historical?origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&routingType	=DepartAt&dateTime=2025-03-18T14:00&avoidTrafficZone=false&alternative=false")
  .method("GET", body)
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v1/direction/historical?origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&routingType	=DepartAt&dateTime=2025-03-18T14:00&avoidTrafficZone=false&alternative=false");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v1/direction/historical?origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&routingType	=DepartAt&dateTime=2025-03-18T14:00&avoidTrafficZone=false&alternative=false"

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
  CURLOPT_URL => 'https://api.neshan.org/v1/direction/historical?origin=35.72084257271665%2C51.432258666992766&destination=35.67032306940622%2C51.29844587298737&routingType%09=DepartAt&dateTime=2025-03-18T14%3A00&avoidTrafficZone=false&alternative=false',
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

پاسخ این سرویس در قالب یک آبجکت JSON بازگردانده می‌شود.

```json
{
  "routes": [
    {
      "duration": 139.0,
      "distance": 694.459,
      "legs": [
        {
          "summary": "آزادی, کارگر شمالی",
          "distance": 694.459,
          "duration": 139.814,
          "steps": [
            {
              "direction": "E",
              "type": "depart",
              "location": { "longitude": 51.388078, "latitude": 35.700804 },
              "distance": 261.564,
              "duration": 56.603,
              "name": "آزادی",
              "geometry": "_y{xEovsxHAOCmFAmBDa@BKHs@B...."
            },
            {
              "direction": "E",
              "type": "rotary",
              "modifier": "straight",
              "location": { "longitude": 51.390955, "latitude": 35.700632 },
              "distance": 145.0,
              "duration": 31.482,
              "name": "کارگر شمالی",
              "geometry": "}w{xEohtxHDSBUCUESEKGKSOUEW@UJORKXAN?N",
              "exit": 2,
              "rotaryName": "میدان انقلاب اسلامی"
            },
            {
              "direction": "N",
              "type": "exit rotary",
              "modifier": "right",
              "location": { "longitude": 51.391154, "latitude": 35.701293 },
              "distance": 287.895,
              "duration": 51.729,
              "name": "کارگر شمالی",
              "geometry": "a|{xEuitxH_ADaBLO@{BR}BPwAJ"
            },
            {
              "direction": "N",
              "type": "arrive",
              "modifier": "left",
              "location": { "longitude": 51.39079, "latitude": 35.703867 },
              "name": "کارگر شمالی",
              "geometry": "el|xEmgtxH??"
            }
          ]
        }
      ],
      "dateTime": "2025-03-18T10:32:19Z",
      "geometry": "_y{xEovsxHAOCmFAmBDa@BKHs@BW....."
    }
  ]
}
```

## اجزای پاسخ

### آبجکت اصلی

| پارامتر | توضیحات |
| --- | --- |
| `routes` | آرایه‌ای از مسیرهای پیشنهادی. |

### آبجکت `route`

| پارامتر | توضیحات |
| --- | --- |
| `duration` | مدت زمان کل مسیر (برحسب **دقیقه**). |
| `distance` | مسافت کل مسیر (برحسب **متر**). |
| `legs` | آرایه‌ای متشکل از بخش‌های اصلی مسیر. |
| `dateTime` | زمان رسیدن به مقصد یا زمان خروج از مبدأ. |
| `geometry` | کل ژئومتری مسیر به‌صورت [Encoded Polyline](#%D8%AF%DB%8C%DA%A9%D8%AF-%DA%A9%D8%B1%D8%AF%D9%86-polyline). |

### آبجکت `leg`

| پارامتر | توضیحات |
| --- | --- |
| `summary` | خلاصه‌ای از نام خیابان‌های اصلی در این بخش. |
| `distance` | مسافت کل بخش (برحسب **متر**). |
| `duration` | مدت زمان کل بخش (برحسب **دقیقه**). |
| `steps` | آرایه‌ای از گام‌های جزئی برای پیمودن این بخش. |

### آبجکت `step`

| پارامتر | توضیحات |
| --- | --- |
| `direction` | جهت جغرافیایی این گام از مسیر (مثلاً `N` برای شمال). |
| `type` | نوع مانور در این گام. توضیحات کامل در [بخش `type`](#%D9%BE%D8%A7%D8%B1%D8%A7%D9%85%D8%AA%D8%B1-type) آمده است. |
| `modifier` | نوع و جهت تغییر مسیر. توضیحات کامل در [بخش `modifier`](#%D9%BE%D8%A7%D8%B1%D8%A7%D9%85%D8%AA%D8%B1-modifier) آمده است. |
| `location` | یک آبجکت شامل `longitude` و `latitude` نقطه‌ی شروع این گام. |
| `distance` | مسافت این گام (برحسب **متر**). |
| `duration` | مدت زمان این گام (برحسب **دقیقه**). |
| `name` | نام معبری که این گام در آن شروع می‌شود. |
| `geometry` | ژئومتری این گام به‌صورت [Encoded Polyline](#%D8%AF%DB%8C%DA%A9%D8%AF-%DA%A9%D8%B1%D8%AF%D9%86-polyline). |
| `exit` | شماره خروجی در میدان‌ها. (فقط در `type`های مرتبط با میدان وجود دارد) |
| `rotaryName` | نام میدان. (فقط در `type`های مرتبط با میدان وجود دارد) |

### توضیحات تکمیلی پارامترها

#### پارامتر `type`

این پارامتر نوع مانور را در هر گام مشخص می‌کند:

- **depart**: شروع حرکت.
- **arrive**: رسیدن به مقصد.
- **turn**: یک گردش ساده که جهت آن با `modifier` مشخص می‌شود.
- **new name**: ادامه مسیر مستقیم اما با تغییر نام خیابان.
- **merge**: پیوستن به یک خیابان جدید (مانند ورود از رمپ به بزرگراه).
- **on ramp / off ramp**: ورود یا خروج از بزرگراه از طریق رمپ.
- **fork**: انتخاب مسیر در یک دوراهی.
- **end of road**: رسیدن به انتهای خیابان در یک تقاطع T شکل.
- **roundabout / rotary**: عبور از میدان.
- **exit roundabout / exit rotary**: مانور خروج از میدان.
- **roundabout turn**: گردش در یک میدان کوچک که مانند یک گردش عادی است.
- **continue**: ادامه مسیر در راستای `modifier`.
- **notification**: نشان‌دهنده تغییر در شرایط رانندگی.

#### پارامتر `modifier`

این پارامتر جهت تغییر مسیر را در هر گام مشخص می‌کند:

- **right**: گردش به راست
- **slight-right**: گردش به راست با زاویه کم
- **sharp-right**: گردش به راست با زاویه تند
- **left**: گردش به چپ
- **slight-left**: گردش به چپ با زاویه کم
- **sharp-left**: گردش به چپ با زاویه تند
- **uturn**: دوربرگردان
- **straight**: مسیر مستقیم

### دیکد کردن Polyline

پارامتر `geometry` در پاسخ به‌صورت **Encoded Polyline** ارائه می‌شود. برای دیکد کردن و نمایش مسیر بر روی نقشه، می‌توانید از منابع زیر استفاده کنید:

- [Encoded Polyline Algorithm Format](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
- [Mapbox Polyline](https://github.com/mapbox/polyline)
- [Openlayers Encoded Polyline example](https://openlayers.org/en/latest/examples/polyline.html)

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
