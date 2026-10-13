---
source: https://platform.neshan.org/docs/api/routing-category/routing_pedestrian/
title: سرویس مسیریابی عابر پیاده
---

# سرویس مسیریابی عابر پیاده (Pedestrian Routing)

اطلاع

1. ۱

   اولین قدم [ثبت‌نام و دریافت API KEY](https://platform.neshan.org/panel) برای اپلیکیشنی است که قصد دارید در آن از Map Api نشان استفاده کنید. کافیست در لینک فوق فرم مربوطه را تکمیل کنید تا بلافاصله API KEY را دریافت نمایید.
2. ۲

   Api Key دریافتی از پنل توسعه‌دهندگان نشان را به صورتی که در ادامه مشاهده می‌کنید از طریق کلید Api-Key در header درخواست سرویس بگنجانید.
3. ۳

   درخواست خود را با توجه به پارامترهایی که مربوط به سرویس موردنظرتان است با متد GET فراخوانی کنید.
4. ۴

   چنانچه درخواست شما با موفقیت پردازش و پاسخ داده شود، خروجی با فرمت JSON دریافت خواهید کرد و چنانچه به هر دلیل خطایی رخ دهد، کد خطا بصورت HTTP Status Code و نوع آن با فرمت JSON ارسال می‌گردد. کدهای خطای احتمالی نیز در ادامه به صورت کامل توضیح داده شده‌اند.

سرویس مسیریابی عابر پیاده نشان با در نظر گرفتن مسیر های کم خطر و مناسب سازی شده برای عبور عابرین پیاده سعی می‌کند بهترین مسیر برای رفت‌وآمد عابر پیاده را در خروجی خود بازگرداند و برای استفاده های مختلفی شما می‌توانید از این سرویس استفاده کنید. همچنین در کنار مسیر پیشنهادی زمان رسیدن (ETA) آن را نیز داشته باشید.

## شیوه‌ی فراخوانی

### آدرس Endpoint

برای فراخوانی این سرویس کافیست درخواست خود را با مدت GET و به همراه پارامتر های لازم به اندپوینت زیر ارسال نمائید.

```http
https://api.neshan.org/v4/direction
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه: `pedestrian` (عابر پیاده) | **اجباری** |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |
| `bearing` | زاویه‌ای بین `0` تا `360` (نسبت به شمال) که جهت شروع بهینه مسیر را مشخص می‌کند. | اختیاری |

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
curl --location 'https://api.neshan.org/v1/direction?type=pedestrian&origin=35.71894606684752%2C51.40033306667587&destination=35.71672918275509%2C51.396250101470315&waypoints=35.720336441184074%2C51.41545854278445bearing=220' \
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

  fetch("https://api.neshan.org/v1/direction?type=pedestrian&origin=35.71894606684752%2C51.40033306667587&destination=35.71672918275509%2C51.396250101470315&waypoints=35.720336441184074%2C51.41545854278445bearing=220", requestOptions)
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
.url("https://api.neshan.org/v1/direction?type=pedestrian&origin=35.71894606684752%2C51.40033306667587&destination=35.71672918275509%2C51.396250101470315&waypoints=35.720336441184074%2C51.41545854278445bearing=220")
.method("GET", body)
.addHeader("Api-Key", "<YOUR_API_KEY>")
.build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v1/direction?type=pedestrian&origin=35.71894606684752%2C51.40033306667587&destination=35.71672918275509%2C51.396250101470315&waypoints=35.720336441184074%2C51.41545854278445bearing=220");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v1/direction?type=pedestrian&origin=35.71894606684752%2C51.40033306667587&destination=35.71672918275509%2C51.396250101470315&waypoints=35.720336441184074%2C51.41545854278445bearing=220"

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
CURLOPT_URL => 'https://api.neshan.org/v1/direction?type=pedestrian&origin=35.71894606684752%2C51.40033306667587&destination=35.71672918275509%2C51.396250101470315&waypoints=35.720336441184074%2C51.41545854278445bearing=220',
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
        "points": "mj_yEgcvxHGBUmAxB@VEHTVFhHbZ"
      },
      "legs": [
        {
          "summary": "کاج - دکتر فاطمی",
          "distance": {
            "value": 574.0,
            "text": "۵۷۵ متر"
          },
          "duration": {
            "value": 392.0,
            "text": "۷ دقیقه"
          },
          "steps": [
            {
              "name": "هشت بهشت",
              "instruction": "در جهت شمال در هشت بهشت قرار بگیرید",
              "bearing_after": 340,
              "type": "depart",
              "distance": {
                "value": 4.0,
                "text": "۴ متر"
              },
              "duration": {
                "value": 2.0,
                "text": "کمتر از ۱ دقیقه"
              },
              "polyline": "mj_yEgcvxHGB",
              "start_location": [
                51.400356,
                35.718953
              ]
            },
            {
              "name": "دوم",
              "instruction": "به سمت دوم، به راست بپیچید",
              "bearing_after": 70,
              "type": "turn",
              "modifier": "right",
              "distance": {
                "value": 37.0,
                "text": "۳۷ متر"
              },
              "duration": {
                "value": 30.0,
                "text": "۱ دقیقه"
              },
              "polyline": "uj_yEccvxHUmA",
              "start_location": [
                51.400342,
                35.718985
              ]
            },
            {
              "name": "کاج",
              "instruction": "به سمت کاج، به راست بپیچید",
              "bearing_after": 180,
              "type": "turn",
              "modifier": "right",
              "distance": {
                "value": 81.0,
                "text": "۱۰۰ متر"
              },
              "duration": {
                "value": 59.0,
                "text": "۱ دقیقه"
              },
              "polyline": "kk_yEqevxHd@@rA?RCBA",
              "start_location": [
                51.400725,
                35.719096
              ]
            },
            {
              "name": "",
              "instruction": "به راست بپیچید",
              "bearing_after": 241,
              "type": "turn",
              "modifier": "right",
              "distance": {
                "value": 12.0,
                "text": "۱۲ متر"
              },
              "duration": {
                "value": 9.0,
                "text": "کمتر از ۱ دقیقه"
              },
              "polyline": "yf_yEuevxHHT",
              "start_location": [
                51.400753,
                35.718372
              ]
            },
            {
              "name": "دکتر فاطمی",
              "instruction": "به سمت دکتر فاطمی، به چپ برانید",
              "bearing_after": 170,
              "type": "turn",
              "modifier": "slight left",
              "distance": {
                "value": 441.0,
                "text": "۴۵۰ متر"
              },
              "duration": {
                "value": 344.0,
                "text": "۶ دقیقه"
              },
              "polyline": "of_yE_evxHFAHBDD`CvJDNDRr@tCBJFXxAbG@F",
              "start_location": [
                51.400637,
                35.718324
              ]
            },
            {
              "name": "دکتر فاطمی",
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
              "polyline": "m|~xEsiuxH",
              "start_location": [
                51.396259,
                35.716711
              ]
            }
          ]
        }
      ]
    },
    {
      "overview_polyline": {
        "points": "mj_yEgcvxHe@PhDvQvE{AbBdH"
      },
      "legs": [
        {
          "summary": "لعل شرقی - دکتر فاطمی",
          "distance": {
            "value": 581.0,
            "text": "۶۰۰ متر"
          },
          "duration": {
            "value": 401.0,
            "text": "۷ دقیقه"
          },
          "steps": [
            {
              "name": "هشت بهشت",
              "instruction": "در جهت شمال در هشت بهشت قرار بگیرید",
              "bearing_after": 340,
              "type": "depart",
              "distance": {
                "value": 22.0,
                "text": "۲۲ متر"
              },
              "duration": {
                "value": 21.0,
                "text": "کمتر از ۱ دقیقه"
              },
              "polyline": "mj_yEgcvxHGB]L",
              "start_location": [
                51.400356,
                35.718953
              ]
            },
            {
              "name": "لعل شرقی",
              "instruction": "به سمت لعل شرقی، به چپ بپیچید",
              "bearing_after": 250,
              "type": "turn",
              "modifier": "left",
              "distance": {
                "value": 288.0,
                "text": "۳۰۰ متر"
              },
              "duration": {
                "value": 229.0,
                "text": "۴ دقیقه"
              },
              "polyline": "sk_yEubvxH\\fBJj@ZbBLp@TjARhAj@vC",
              "start_location": [
                51.400272,
                35.71914
              ]
            },
            {
              "name": "پروین اعتصامی",
              "instruction": "به سمت پروین اعتصامی، به چپ بپیچید",
              "bearing_after": 160,
              "type": "turn",
              "modifier": "left",
              "distance": {
                "value": 127.0,
                "text": "۱۵۰ متر"
              },
              "duration": {
                "value": 84.0,
                "text": "۱ دقیقه"
              },
              "polyline": "if_yE}ouxHtBq@\\Kr@WNE",
              "start_location": [
                51.397267,
                35.718294
              ]
            },
            {
              "name": "دکتر فاطمی",
              "instruction": "به سمت دکتر فاطمی، به راست بپیچید",
              "bearing_after": 247,
              "type": "turn",
              "modifier": "right",
              "distance": {
                "value": 144.0,
                "text": "۱۵۰ متر"
              },
              "duration": {
                "value": 122.0,
                "text": "۲ دقیقه"
              },
              "polyline": "q__yEyruxHFXxAbG@F",
              "start_location": [
                51.39773,
                35.71721
              ]
            },
            {
              "name": "دکتر فاطمی",
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
              "polyline": "m|~xEsiuxH",
              "start_location": [
                51.396259,
                35.716711
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
