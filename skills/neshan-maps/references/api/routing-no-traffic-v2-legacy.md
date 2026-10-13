---
source: https://platform.neshan.org/docs/api/routing-category/noTraffic-routing-api/2.0.0/
title: API سرویس مسیریابی بدون ترافیک  معابر پلتفرم نشان
---

آخرین نسخهنسخه 2.0.0

# وب‌سرویس مسیریابی بدون ترافیک - نگارش 2.0.0

هشدار

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات قدیمی نسخه سرویس مسیریابی بدون ترافیک می‌باشد.
مستندات مرتبط با نسخه جدید این سرویس را در این صفحه می‌توانید مشاهده کنید.

سرویس مسیریابی بدون ترافیک بدون اعمال تغییرات ترافیکی و صرفا بر اساس یک ترافیک ثابت معتبر برای هر معبر فرایند بهترین مسیر را بین دو یا چند نقطه برای خودرو محاسبه می‌کند. این سرویس که به عنوان سرویس تخمین زمان سفر (ETA) نیز عمل می‌کند، در پاسخ خود یک یا چند مسیر جایگزین را به همراه جزئیات کامل، زمان و مسافت سفر ارائه می‌دهد.

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

برای فراخوانی سرویس بایستی درخواست خود را به آدرس زیر ارسال نمائید.

```http
https://api.neshan.org/v2/direction/no-traffic
```

نکته

این سرویس مختص به مسیریابی خودرو می‌باشد

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه: `car` (خودرو) . | **اجباری** |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `avoidTrafficZone` | اگر `true` باشد، مسیر از **طرح ترافیک** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `avoidOddEvenZone` | اگر `true` باشد، مسیر از **طرح زوج و فرد** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |

نکته

با توجه به اینکه نام طرح ترافیک در شهرهای دیگر (غیر از تهران) عموماً یه جای طرح زوج و فرد نیز استفاده می‌شود، چنانچه در سایر شهرها هر یک از پارامترهای avoidTrafficZone و avoidOddEvenZone مقدار true داشته باشند و مقصد درون طرح زوج و فرد آن شهر باشد، سرویس مسیریابی خطای NoRouteFound در پاسخ برمی‌گرداند.

#### رمزگذاری آدرس اینترنتی (URL Encoding)

از آنجا که برخی کاراکترها در URL معنای خاصی دارند، باید قبل از ارسال در پارامترها رمزگذاری (Encode) شوند.

**مثال:** برای جدا کردن نقاط در پارامتر `waypoints` از کاراکتر `|` استفاده می‌شود که معادل رمزگذاری شده آن `%7C` است.

| کاراکتر | معادل رمزگذاری |
| --- | --- |
| `Space` | `%20` |
| `"` | `%22` |
| `#` | `%23` |
| `\|` | `%7C` |
| `%` | `%25` |

#### مستندات و کتابخانه‌ها

برای اطلاعات بیشتر در مورد URL Encoding می‌توانید از منابع زیر استفاده کنید:

- [مستندات گوگل](https://developers.google.com/maps/documentation/urls/url-encoding)
- [ساخت یک پارامتر موفق UrlEncode](https://www.werockyourweb.com/url-escape-characters/)
- **کتابخانه‌ها:** اکثر زبان‌های برنامه‌نویسی توابع داخلی برای این کار دارند (مانند `encodeURIComponent` در جاوااسکریپت، `URLEncoder.encode` در جاوا و `urlencode` در PHP).

## نمونه درخواست

- cURL
- javascript
- java
- c#
- python
- php

```bash
curl --location 'https://api.neshan.org/v2/direction/no-traffic?type=car&origin=35.72084257271665%2C51.432258666992766&destination=35.67032306940622%2C51.29844587298737&waypoints=35.7001%2C51.3882%7C35.7005%2C51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true' \
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

fetch("https://api.neshan.org/v2/direction/no-traffic?type=car&origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&waypoints=35.7001,51.3882|35.7005,51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true", requestOptions)
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
  .url("https://api.neshan.org/v2/direction/no-traffic?type=car&origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&waypoints=35.7001,51.3882|35.7005,51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true")
  .method("GET", body)
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v2/direction/no-traffic?type=car&origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&waypoints=35.7001,51.3882|35.7005,51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v2/direction/no-traffic?type=car&origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&waypoints=35.7001,51.3882|35.7005,51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true"

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
  CURLOPT_URL => 'https://api.neshan.org/v2/direction/no-traffic?type=car&origin=35.72084257271665%2C51.432258666992766&destination=35.67032306940622%2C51.29844587298737&waypoints=35.7001%2C51.3882%7C35.7005%2C51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true',
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

```json
{
  "routes": [
    {
      "legs": [
        {
          "summary": "آزادی - ولیعصر",
          "distance": {
            "value": 8998,
            "text": "۹ کیلومتر"
          },
          "duration": {
            "value": 2012,
            "text": "۳۴ دقیقه"
          },
          "steps": [
            {
              "name": "عضدی جنوبی",
              "instruction": "در جهت شرق در عضدی جنوبی قرار بگیرید",
              "distance": {
                "value": 46,
                "text": "۴۶ متر"
              },
              "duration": {
                "value": 11,
                "text": "کمتر از ۱ دقیقه"
              },
              "polyline": "qxu|EkpcjJb@{@Tc@b...",
              "maneuver": "depart",
              "start_location": [
                51.344035,
                35.695452
              ]
            }
          ]
        }
      ],
      "overview_polyline": {
        "points": "qwzxEgckxHBeAWEDq ..."
      }
    }
  ]
}
```

## اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `routes` | آرایه‌ای از مسیرهای پیشنهادی. |
| `overview_polyline` | نمای کلی و ساده‌شده مسیر به صورت **Encoded Polyline**. |
| `legs` | هر مسیر از یک یا چند `leg` (بخش) تشکیل شده است (بین مبدأ، مقصد و نقاط میانی). |
| `summary` | خلاصه‌ای از نام خیابان‌های اصلی در هر `leg`. |
| `distance` | آبجکتی شامل مسافت کل `leg` (به **متر** و به صورت متنی). |
| `duration` | آبجکتی شامل زمان کل `leg` (به **ثانیه** و به صورت متنی). |
| `steps` | آرایه‌ای از گام‌های جزئی برای پیمودن هر `leg`. |

### آبجکت `step`

| پارامتر | توضیحات |
| --- | --- |
| `name` | نام معبری که گام در آن شروع می‌شود. |
| `instruction` | دستورالعمل راهنمای مسیر برای آن گام. |
| `maneuver` | جهت تغییر مسیر (`right`, `left`, `uturn`, `straight`, `slight-right`, `sharp-right`, `slight-left`, `sharp-left`, `exit-rotary`, `depart`, `arrive`). |
| `distance` | آبجکتی شامل طول گام. |
| `duration` | آبجکتی شامل زمان سفر در این گام. |
| `polyline` | هندسه دقیق گام به صورت **Encoded Polyline**. |
| `startLocation` | نقطه شروع گام به صورت `[longitude, latitude]`. |

### توضیحات مرتبط با فیلد `maneuver`

- `right`: گردش به راست
- `slight-right`: گردش به راست با زاویه کم
- `sharp-right`: گردش به راست با زاویه تند
- `left`: گردش به چپ
- `slight-left`: گردش به چپ با زاویه کم
- `sharp-left`: گردش به چپ با زاویه تند
- `uturn`: دور برگردان
- `straight`: مسیر مستقیم
- `exit-rotary`: خروجی میدان
- `depart`: شروع مسیر (مبدا)
- `arrive`: خاتمه مسیر (مقصد)

#### نکته: فرمت Encoded Polyline

برای کاهش حجم پاسخ، مختصات مسیر (پارامتر `polyline`) به فرمت **Encoded Polyline** ارائه می‌شود. برای آشنایی با نحوه کدگشایی (Decode) این فرمت می‌توانید به منابع زیر مراجعه کنید:

- [Encoded Polyline Algorithm Format](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
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
