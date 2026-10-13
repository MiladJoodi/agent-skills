---
source: https://platform.neshan.org/docs/api/routing-category/tsp/
title: TSP API
---

# سرویس ترتیب بهینه‌ مقاصد (فروشنده دوره‌گرد - TSP)

سرویس فروشنده دوره‌گرد (TSP API)، ابزاری قدرتمند برای بهینه‌سازی عملیات حمل‌ونقل و تحویل کالا است. این سرویس با استفاده از الگوریتم‌های پیشرفته و با در نظر گرفتن شبکه‌ معابر شهری، مشخص می‌کند که چند مقصد مورد نظر شما را با چه **ترتیبی** پیمایش کنید تا کمترین زمان و هزینه‌ سفر را داشته باشید.

یادداشت

خروجی این سرویس، **ترتیب بهینه‌ نقاط** است؛ یعنی همان نقاط ورودی شما را مرتب‌شده بازمی‌گرداند و خودِ مسیر (هندسه‌ مسیر، دستورات پیچ‌به‌پیچ، مسافت و زمان هر پایه) را محاسبه نمی‌کند.

برای رسم مسیر روی نقشه و دریافت مسافت و زمان، نقاط را به همان ترتیبی که این سرویس برمی‌گرداند به سرویس مسیریابی بدهید.

[هم‌اکنون این سرویس را امتحان کنید](https://platform.neshan.org/demo/TSPdemo)

## موارد استفاده

این سرویس برای کسب‌وکارهای مختلفی کاربردی است:

- **شرکت‌های تاکسی اینترنتی:** بهینه‌سازی مسیر راننده برای رسیدن به چندین مسافر و رساندن آن‌ها به مقصدهایشان.
- **فروشگاه‌های آنلاین:** محاسبه بهینه‌ترین مسیر تحویل سفارش مشتریان از نزدیک‌ترین انبار.
- **شرکت‌های لجستیک:** کاهش هزینه‌های حمل‌ونقل با محاسبه کمترین فاصله و زمان ممکن برای توزیع چندین محموله.
- **شرکت‌های خدمات‌رسانی:** بهینه‌سازی مسیر اعزام نیروهای فنی و خدماتی به محل‌های مختلف.
- **شرکت‌های پخش و توزیع:** برنامه‌ریزی بهترین مسیر روزانه برای مراجعه ویزیتورها به مشتریان و فروشگاه‌های متعدد.

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
https://api.neshan.org/v3/trip
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `waypoints` | مختصات نقاط مورد نظر برای مسیریابی به‌صورت `latitude,longitude`. هر نقطه باید با کاراکتر پایپ (\|) از نقطه‌ی دیگر جدا شود. | **اجباری** |
| `roundTrip` | مشخص می‌کند که آیا مسیر باید به نقطه‌ی شروع بازگردد یا خیر. مقادیر مجاز `true` و `false` هستند. مقدار پیش‌فرض `true` است. | اختیاری |
| `sourceIsAnyPoint` | اگر `true` باشد، سرویس بهینه‌ترین نقطه‌ی شروع را از بین تمام نقاط ورودی انتخاب می‌کند. اگر `false` باشد، اولین نقطه در `waypoints` به‌عنوان مبدأ در نظر گرفته می‌شود. مقدار پیش‌فرض `true` است. | اختیاری |
| `lastIsAnyPoint` | اگر `true` باشد، سرویس بهینه‌ترین نقطه‌ی پایانی را از بین تمام نقاط ورودی انتخاب می‌کند. اگر `false` باشد، آخرین نقطه در `waypoints` به‌عنوان مقصد در نظر گرفته می‌شود. مقدار پیش‌فرض `true` است. | اختیاری |

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
curl --location 'https://api.neshan.org/v3/trip?waypoints=35.7001%2C51.3882%7C35.7005%2C51.3895%7C35.7010%2C51.3905&roundTrip=true&sourceIsAnyPoint=true&lastIsAnyPoint=true' \
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

fetch("https://api.neshan.org/v3/trip?waypoints=35.7001,51.3882|35.7005,51.3895|35.7010,51.3905&roundTrip=true&sourceIsAnyPoint=true&lastIsAnyPoint=true", requestOptions)
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
  .url("https://api.neshan.org/v3/trip?waypoints=35.7001,51.3882|35.7005,51.3895|35.7010,51.3905&roundTrip=true&sourceIsAnyPoint=true&lastIsAnyPoint=true")
  .method("GET", body)
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v3/trip?waypoints=35.7001,51.3882|35.7005,51.3895|35.7010,51.3905&roundTrip=true&sourceIsAnyPoint=true&lastIsAnyPoint=true");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v3/trip?waypoints=35.7001,51.3882|35.7005,51.3895|35.7010,51.3905&roundTrip=true&sourceIsAnyPoint=true&lastIsAnyPoint=true"

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
  CURLOPT_URL => 'https://api.neshan.org/v3/trip?waypoints=35.7001%2C51.3882%7C35.7005%2C51.3895%7C35.7010%2C51.3905&roundTrip=true&sourceIsAnyPoint=true&lastIsAnyPoint=true',
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

پاسخ شامل لیستی از نقاط ورودی است که بر اساس ترتیب بهینه‌ پیمایش مرتب شده‌اند؛ این سرویس هندسه‌ مسیر بین نقاط را بازنمی‌گرداند.

```json
{
  "points": [
    {
      "name": "نام نزدیک‌ترین معبر",
      "location": [51.421, 35.748],
      "index": 2
    },
    {
      "name": "نام نزدیک‌ترین معبر",
      "location": [51.388, 35.700],
      "index": 0
    }
  ]
}
```

### اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `points` | آرایه‌ای از نقاط که به ترتیب بهینه مرتب شده‌اند. |

### آبجکت `point`

| پارامتر | توضیحات |
| --- | --- |
| `name` | نام نزدیک‌ترین معبر به آن نقطه. |
| `location` | مختصات نقطه به صورت `[longitude, latitude]`. |
| `index` | اندیس (شماره ترتیب) اصلی نقطه در لیست `waypoints` ورودی (شروع از 0). این پارامتر به شما کمک می‌کند تا نقاط مرتب‌شده را به نقاط ورودی خودتان متصل کنید. |

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
