---
source: https://platform.neshan.org/docs/api/routing-category/map-matching/
title: Map Matching API
---

آخرین نسخهنسخه 2.0.0

# سرویس نگاشت نقطه بر نقشه (Map Matching API)

اطلاع

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات آخرین نسخه سرویس نگاشت نقطه بر نقشه می‌باشد.
مستندات مرتبط با نسخه قدیمی این سرویس را در این صفحه می‌توانید مشاهده کنید.

این سرویس مجموعه‌ای از نقاط مکانی خام (مانند داده‌های GPS) را دریافت کرده و آن‌ها را به محتمل‌ترین مسیر واقعی روی نقشه نگاشت می‌کند. این فرآیند نقاطی را که ممکن است به دلیل خطا دقیقاً روی جاده نباشند، اصلاح کرده و یک مسیر منطقی و پیوسته ایجاد می‌کند.

این سرویس با قابلیت پردازش بیش از **۱۰۰۰ نقطه** در هر درخواست، برای تحلیل مسیر، مسیریابی پیشرفته و هر کاربردی که به مسیر دقیق نیاز دارد، ایده‌آل است.

[هم‌اکنون این سرویس را امتحان کنید](https://platform.neshan.org/demo/mapMatchingDemo)

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

برای استفاده از این سرویس، یک درخواست `POST` به اندپوینت زیر ارسال کنید:

```http
https://api.neshan.org/v3/map-matching
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
Content-Type: application/json
```

### پارامتر ورودی

درخواست باید شامل پارامتر `path` در بدنه‌ی خود باشد.

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `path` | رشته‌ای شامل مختصات نقاط ورودی به‌صورت `latitude,longitude`. هر نقطه باید با کاراکتر پایپ (\|) از نقطه‌ی دیگر جدا شود. حداقل **۲** نقطه و حداکثر **۱۰۰۰** نقطه در هر درخواست پشتیبانی می‌شود. | **اجباری** |

### نمونه بدنه درخواست (Request Body)

```text
{
  "path": "35.703983747058494,51.3213872909546|35.70363307719029,51.32144361734391"
}
```

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
curl --location 'https://api.neshan.org/v3/map-matching' \
--header 'Api-Key: <YOUR_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
      "path": "35.703983747058494,51.3213872909546|35.70363307719029,51.32144361734391"
}'
```

```javascript
const myHeaders = new Headers();
myHeaders.append("Api-Key", "<YOUR_API_KEY>");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "path": "35.703983747058494,51.3213872909546|35.70363307719029,51.32144361734391"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.neshan.org/v3/map-matching", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

```java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\n      \"path\": \"35.703983747058494,51.3213872909546|35.70363307719029,51.32144361734391\"\n}");
Request request = new Request.Builder()
  .url("https://api.neshan.org/v3/map-matching")
  .method("POST", body)
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Post, "https://api.neshan.org/v3/map-matching");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var content = new StringContent("{\n      \"path\": \"35.703983747058494,51.3213872909546|35.70363307719029,51.32144361734391\"\n}", null, "application/json");
request.Content = content;
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests
import json

url = "https://api.neshan.org/v3/map-matching"

payload = json.dumps({
  "path": "35.703983747058494,51.3213872909546|35.70363307719029,51.32144361734391"
})
headers = {
  'Api-Key': '<YOUR_API_KEY>',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.neshan.org/v3/map-matching',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
      "path": "35.703983747058494,51.3213872909546|35.70363307719029,51.32144361734391"
}',
  CURLOPT_HTTPHEADER => array(
    'Api-Key: <YOUR_API_KEY>',
    'Content-Type: application/json'
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
      "location": [35.70015, 51.38825],
      "originalIndex": 0
    },
    {
      "location": [35.70052, 51.38953],
      "originalIndex": 1
    },
    {
      "location": [35.70103, 51.39051],
      "originalIndex": 2
    }
  ],
  "geometry": "encoded_polyline_string_here"
}
```

### اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `snappedPoints` | لیستی از نقاطی که به مسیر واقعی نگاشت شده‌اند. نقاطی که قابلیت نگاشت نداشته باشند، از این لیست حذف می‌شوند. |
| `geometry` | ژئومتری کل مسیر عبوری از نقاط نگاشت‌شده که به صورت **Encoded Polyline** ارائه می‌شود. |

### آبجکت `snappedPoint`

| پارامتر | توضیحات |
| --- | --- |
| `location` | مختصات نقطه نگاشت‌شده به صورت `[latitude, longitude]`. |
| `originalIndex` | اندیس (شماره ترتیب) نقطه ورودی متناظر با این نقطه نگاشت‌شده (شروع از 0). |

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
