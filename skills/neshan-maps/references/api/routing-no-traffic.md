---
source: https://platform.neshan.org/docs/api/routing-category/noTraffic-routing-api/
title: سرویس مسیریابی بدون ترافیک
---

آخرین نسخهنسخه 2.0.0

# سرویس مسیریابی بدون ترافیک (noTraffic Routing API)

اطلاع

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات آخرین نسخه سرویس مسیریابی بدون ترافیک می‌باشد.
مستندات مرتبط با نسخه قدیمی این سرویس را در این صفحه می‌توانید مشاهده کنید.

سرویس مسیریابی بدون ترافیک بدون اعمال تغییرات ترافیکی و صرفا بر اساس یک ترافیک ثابت معتبر برای هر معبر فرایند بهترین مسیر را بین دو یا چند نقطه برای **خودرو** محاسبه می‌کند. این سرویس که به عنوان سرویس **تخمین زمان سفر (ETA)** نیز عمل می‌کند، در پاسخ خود یک یا چند مسیر جایگزین را به همراه جزئیات کامل، زمان و مسافت سفر ارائه می‌دهد.

[هم‌اکنون این سرویس را امتحان کنید](https://platform.neshan.org/demo/direction_demo)

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

برای فراخوانی کافیست درخواست خود را با متد GET به اندپوینت زیر ارسال نمائید.

```http
https://api.neshan.org/v4/direction/no-traffic
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
| `bearing` | زاویه‌ای بین `0` تا `360` (نسبت به شمال) که جهت شروع بهینه مسیر را مشخص می‌کند. | اختیاری |

نکته

با توجه به اینکه نام طرح ترافیک در شهرهای دیگر (غیر از تهران) عموماً یه جای طرح زوج و فرد نیز استفاده می‌شود، چنانچه در سایر شهرها هر یک از پارامترهای `avoidTrafficZone` و `avoidOddEvenZone` مقدار `true` داشته باشند و مقصد درون طرح زوج و فرد آن شهر باشد، سرویس مسیریابی خطای `NoRouteFound` در پاسخ برمی‌گرداند.

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
curl --location 'https://api.neshan.org/v4/direction/no-traffic?type=car&origin=35.72084257271665%2C51.432258666992766&destination=35.67032306940622%2C51.29844587298737&waypoints=35.7001%2C51.3882%7C35.7005%2C51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true&bearing=90' \
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

fetch("https://api.neshan.org/v4/direction/no-traffic?type=car&origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&waypoints=35.7001,51.3882|35.7005,51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true&bearing=90", requestOptions)
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
.url("https://api.neshan.org/v4/direction/no-traffic?type=car&origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&waypoints=35.7001,51.3882|35.7005,51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true&bearing=90")
.method("GET", body)
.addHeader("Api-Key", "<YOUR_API_KEY>")
.build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v4/direction/no-traffic?type=car&origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&waypoints=35.7001,51.3882|35.7005,51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true&bearing=90");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v4/direction/no-traffic?type=car&origin=35.72084257271665,51.432258666992766&destination=35.67032306940622,51.29844587298737&waypoints=35.7001,51.3882|35.7005,51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true&bearing=90"

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
CURLOPT_URL => 'https://api.neshan.org/v4/direction/no-traffic?type=car&origin=35.72084257271665%2C51.432258666992766&destination=35.67032306940622%2C51.29844587298737&waypoints=35.7001%2C51.3882%7C35.7005%2C51.3895&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=true&bearing=90',
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
      "overview_polyline": {
        "points": "kz{xEggtxHn@E|@iAtMcAq@k`Ap@yO_OyA"
      },
      "legs": [
        {
          "summary": "روانمهر - ولیعصر",
          "distance": {
            "value": 1820.0,
            "text": "۲ کیلومتر"
          },
          "duration": {
            "value": 487.0,
            "text": "۸ دقیقه"
          },
          "steps": [
            {
              "name": "میدان انقلاب اسلامی",
              "instruction": "در جهت جنوب در میدان انقلاب اسلامی قرار بگیرید",
              "bearing_after": 193,
              "type": "depart",
              "modifier": "left",
              "distance": {
                "value": 61.0,
                "text": "۷۵ متر"
              },
              "duration": {
                "value": 13.0,
                "text": "کمتر از ۱ دقیقه"
              },
              "polyline": "kz{xEggtxHHBRAPGPMJSDS",
              "start_location": [
                51.390755,
                35.701021
              ]
            },
            {
              "name": "",
              "instruction": "به مسیر خود ادامه دهید",
              "bearing_after": 147,
              "type": "exit rotary",
              "modifier": "slight right",
              "exit": 1,
              "distance": {
                "value": 279.0,
                "text": "۳۰۰ متر"
              },
              "duration": {
                "value": 72.0,
                "text": "۱ دقیقه"
              },
              "polyline": "ww{xEcitxHXSf@Ih@EvCS~AMjCQ",
              "start_location": [
                51.391063,
                35.700596
              ]
            },
            {
              "name": "روانمهر",
              "instruction": "به سمت روانمهر، به چپ بپیچید",
              "bearing_after": 80,
              "type": "turn",
              "modifier": "left",
              "distance": {
                "value": 983.0,
                "text": "۱۰۰۰ متر"
              },
              "duration": {
                "value": 261.0,
                "text": "۴ دقیقه"
              },
              "polyline": "gh{xE{ktxHASC]AkB?_@A}AGgJAy@?....",
              "start_location": [
                51.391498,
                35.698122
              ]
            },
            {
              "name": "خسرو شکیبایی",
              "instruction": "در خسرو شکیبایی به مسیر خود ادامه دهید",
              "bearing_after": 95,
              "type": "new name",
              "modifier": "straight",
              "distance": {
                "value": 210.0,
                "text": "۲۲۵ متر"
              },
              "duration": {
                "value": 78.0,
                "text": "۱ دقیقه"
              },
              "polyline": "yi{xEuovxHXuFVuE",
              "start_location": [
                51.402349,
                35.698366
              ]
            },
            {
              "name": "ولیعصر",
              "instruction": "به چپ بپیچید و وارد ولیعصر شوید",
              "bearing_after": 7,
              "type": "end of road",
              "modifier": "left",
              "distance": {
                "value": 288.0,
                "text": "۳۰۰ متر"
              },
              "duration": {
                "value": 130.0,
                "text": "۲ دقیقه"
              },
              "polyline": "gh{xEa~vxHgAK{BUcCU_AKwBU",
              "start_location": [
                51.404651,
                35.698117
              ]
            },
            {
              "name": "ولیعصر",
              "instruction": "در مقصد قرار دارید",
              "bearing_after": 0,
              "type": "arrive",
              "distance": {
                "value": 0.0,
                "text": ""
              },
              "duration": {
                "value": 0.0,
                "text": ""
              },
              "polyline": "gx{xE{`wxH",
              "start_location": [
                51.405102,
                35.700682
              ]
            }
          ]
        }
      ]
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
| `type` | نوع مانور (مانند `turn`, `depart`, `arrive`). |
| `modifier` | جهت تغییر مسیر (`right`, `left`, `uturn`, `straight`). |
| `distance` | آبجکتی شامل طول گام. |
| `duration` | آبجکتی شامل زمان سفر در این گام. |
| `polyline` | هندسه دقیق گام به صورت **Encoded Polyline**. |
| `start_location` | نقطه شروع گام به صورت `[longitude, latitude]`. |

### نکات مرتبط با `step`

#### پارامترهای (Conditional)

- `exit` و `rotary_name`: این دو پارامتر فقط زمانی مقدار دارند که `type` گام از نوع مرتبط با میدان یا خروجی باشد (مانند `roundabout`, `rotary`, `exit roundabout`).
- `name`: این پارامتر ممکن است برای خیابان‌های بی‌نام یا لینک‌های اتصال کوتاه خالی باشد.
- `modifier`: زمانی که `type` از نوع `depart` یا `arrive` است و مبدأ و مقصد بسیار به هم نزدیک هستند، این پارامتر وجود نخواهد داشت.

#### انواع `type`

| Type | توضیح |
| --- | --- |
| `turn` | یک گردش ساده در مسیر. |
| `new name` | نام خیابان تغییر می‌کند اما گردشی وجود ندارد. |
| `depart` | نشان‌دهنده شروع حرکت است. |
| `arrive` | نشان‌دهنده رسیدن به مقصد است. |
| `merge` | پیوستن به یک خیابان (مانند ورود از یک رَمپ به یک بزرگراه، که در اینصورت `modifier` جهت ورود یا پیوستن به خیابان جدید را مشخص می کند) |
| `continue` | ادامه دادن مسیر در راستای `modifier`. |
| `on ramp` | ورود به بزرگراه از طریق رمپ. (جهت آن با `modifier` مشخص میشود) |
| `off ramp` | خروج از بزرگراه از طریق رمپ. (جهت آن با `modifier` مشخص میشود) |
| `fork` | رفتن به راست یا چپ در دوراهی، بر اساس `modifier` |
| `end of road` | خیابان در یک تقاطع T شکل تمام میشود و در مسیر `modifier` گردش میکند. |
| `roundabout` | عبور از میدان - اگر مسیر از میدان عبور کند و از آن بگذرد یک `property` اضافی بنام `exit` وجود خواهد داشت. در این حالت `modifier` جهت ورود به میدان را مشخص میکند. |
| `rotary` | عبور از میدان - اگر مسیر از میدان عبور کند و از آن بگذرد یک `property` اضافی بنام `exit` وجود خواهد داشت. در این حالت `modifier` جهت ورود به میدان را مشخص میکند. |
| `roundabout turn` | گردش در یک میدان کوچک، که باید با آن مانند یک گردش عادی برخورد کرد. `modifier` نشاندهنده جهت گردش است. |
| `notification` | نشاندهنده تغییر در شرایط رانندگی. چنانچه خیابان گردش داشته باشد `modifier` جهت آن را نشان میدهد. |
| `exit roundabout` | مانور خروج از میدان. |
| `exit rotary` | نشاندهنده ی maneuver در حال خروج از یک rotary (نسخه بزرگی از یک roundabout) |

### توضیحات مرتبط با فیلد `modifier`

این پارامتر جهت دقیق مانور را مشخص می‌کند:

- **right** / **left**: گردش به راست / چپ.
- **slight-right** / **slight-left**: گردش به راست / چپ با زاویه کم.
- **sharp-right** / **sharp-left**: گردش به راست / چپ با زاویه تند.
- **uturn**: دوربرگردان.
- **straight**: مسیر مستقیم.

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
