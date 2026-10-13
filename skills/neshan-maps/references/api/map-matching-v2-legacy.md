---
source: https://platform.neshan.org/docs/api/routing-category/map-matching/2.0.0/
title: Map Matching API
---

آخرین نسخهنسخه 2.0.0

# سرویس نگاشت نقطه بر نقشه (Map Matching API)

هشدار

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات قدیمی نسخه سرویس نگاشت نقطه بر نقشه می‌باشد.
مستندات مرتبط با نسخه جدید این سرویس را در این صفحه می‌توانید مشاهده کنید.

این سرویس مجموعه‌ای از نقاط مکانی خام (مانند داده‌های GPS) را دریافت کرده و آن‌ها را به محتمل‌ترین مسیر واقعی روی نقشه نگاشت می‌کند. این فرآیند نقاطی را که ممکن است به دلیل خطا دقیقاً روی جاده نباشند، اصلاح کرده و یک مسیر منطقی و پیوسته ایجاد می‌کند.

این سرویس با قابلیت پردازش بیش از **۱۰۰۰ نقطه** در هر درخواست، برای تحلیل مسیر، مسیریابی پیشرفته و هر کاربردی که به مسیر دقیق نیاز دارد، ایده‌آل است.

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
https://api.neshan.org/v2/map-matching
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامتر ورودی

| پارامتر | توضیحات |
| --- | --- |
| `path` | نقاطی که باید به یک مسیر نگاشت شوند. هر کدام از این نقاط با علامت پایپ ( \| ) از یکدیگر جدا شده‌اند. مختصات هر نقطه به فرم latitude,longitude است. حداقل تعداد نقاط ورودی برابر با 2 است؛ در غیر این صورت خطای 470 برگردانده می‌شود. |

#### رمزگذاری آدرس اینترنتی (URL Encoding)

از آنجا که برخی کاراکترها در URL معنای خاصی دارند، باید قبل از ارسال در پارامترها رمزگذاری (Encode) شوند.

**مثال:** برای جدا کردن نقاط در پارامتر `path` از کاراکتر `|` استفاده می‌شود که معادل رمزگذاری شده آن `%7C` است.

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
curl --location 'https://api.neshan.org/v2/map-matching?path=36.31828168531638%2C59.546990007465496%7C36.31756809784359%2C59.56833348789962%7C36.30738928265211%2C59.59581281927757' \
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

fetch("https://api.neshan.org/v2/map-matching?path=36.31828168531638%2C59.546990007465496%7C36.31756809784359%2C59.56833348789962%7C36.30738928265211%2C59.59581281927757", requestOptions)
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
  .url("https://api.neshan.org/v2/map-matching?path=36.31828168531638%2C59.546990007465496%7C36.31756809784359%2C59.56833348789962%7C36.30738928265211%2C59.59581281927757")
  .method("GET", body)
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v2/map-matching?path=36.31828168531638%2C59.546990007465496%7C36.31756809784359%2C59.56833348789962%7C36.30738928265211%2C59.59581281927757");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v2/map-matching?path=36.31828168531638%2C59.546990007465496%7C36.31756809784359%2C59.56833348789962%7C36.30738928265211%2C59.59581281927757"

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
  CURLOPT_URL => 'https://api.neshan.org/v2/map-matching?path=36.31828168531638%2C59.546990007465496%7C36.31756809784359%2C59.56833348789962%7C36.30738928265211%2C59.59581281927757',
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

پاسخ شامل نقاط نگاشت‌شده روی نقشه و یک Polyline انکود شده از کل مسیر است.

```json
{
	"snappedPoints": [
    	{
        	"location": {
            	"latitude": 36.299336,
            	"longitude": 59.606256
        	},
        	"originalIndex": 0
    	},
    	{
        	"location": {
            	"latitude": 36.297886,
            	"longitude": 59.604335
        	},
        	"originalIndex": 1
    	},
    	{
        	"location": {
            	"latitude": 36.297218,
            	"longitude": 59.603496
        	},
        	"originalIndex": 2
    	}
	]
}
```

### اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `snappedPoints` | لیستی از نقاطی که به مسیر واقعی نگاشت شده‌اند. نقاطی که قابلیت نگاشت نداشته باشند، از این لیست حذف می‌شوند. |

### آبجکت `snappedPoint`

| پارامتر | توضیحات |
| --- | --- |
| `location` | مختصات نقطه نگاشت‌شده به صورت `[latitude, longitude]`. |
| `originalIndex` | اندیسی است که مشخص میکند این نقطه نگاشت کدام یک از نقاط ورودی است. شماره اندیس‌ها از 0 شروع میشود و برای n ورودی حداکثر n-1 است. |

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

نکته

چنانچه تعداد زیادی از نقاط ورودی قابلیت نگاشت شدن به هیچ مسیری را نداشته باشند، سرویس خطای **404 Not Found** را باز می‌گرداند.
