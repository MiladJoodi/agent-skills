---
source: https://platform.neshan.org/docs/api/search-category/region/
title: Region API
---

# سرویس تقسیمات کشوری (استان و شهرستان)

با این سرویس می‌توانید **لیست استان‌های ایران** را به همراه شناسه‌ (ID) هر استان دریافت کنید و سپس با ارسال شناسه‌ یک استان، **لیست شهرستان‌های** آن استان را بگیرید.
هر دو اندپوینت یک نسخه‌ «با جئومتری» هم دارند که علاوه بر شناسه و نام، **محدوده‌ جغرافیایی (مرز)** هر استان یا شهرستان را نیز برمی‌گرداند.

این سرویس برای ساخت منوها و فیلترهای انتخاب استان و شهر، اعتبارسنجی آدرس‌ها، تحلیل‌های منطقه‌ای و ترسیم مرز مناطق روی نقشه کاربرد دارد.

نکته

برای فعال سازی این سرویس لطفا از طریق ارسال تیکت در پنل کاربری با پشتیبانی تماس بگیرید.

اطلاع

1. ۱

   اولین قدم [ثبت‌نام و دریافت API KEY](https://platform.neshan.org/panel) برای اپلیکیشنی است که قصد دارید در آن از Map Api نشان استفاده کنید. کافیست در لینک فوق فرم مربوطه را تکمیل کنید تا بلافاصله API KEY را دریافت نمایید.
2. ۲

   Api Key دریافتی از پنل توسعه‌دهندگان نشان را به صورتی که در ادامه مشاهده می‌کنید از طریق کلید Api-Key در header درخواست سرویس بگنجانید.
3. ۳

   درخواست خود را با توجه به پارامترهایی که مربوط به سرویس موردنظرتان است با متد GET فراخوانی کنید.
4. ۴

   چنانچه درخواست شما با موفقیت پردازش و پاسخ داده شود، خروجی با فرمت JSON دریافت خواهید کرد و چنانچه به هر دلیل خطایی رخ دهد، کد خطا بصورت HTTP Status Code و نوع آن با فرمت JSON ارسال می‌گردد. کدهای خطای احتمالی نیز در ادامه به صورت کامل توضیح داده شده‌اند.

## سرویس لیست استان‌ها

### آدرس Endpoint

برای دریافت لیست استان‌ها، یک درخواست `GET` به یکی از اندپوینت‌های زیر ارسال کنید:

بدون اطلاعات جئومتری:

```http
https://api.neshan.org/v2/region/provinces
```

با اطلاعات جئومتری (محدوده‌ جغرافیایی هر استان):

```http
https://api.neshan.org/v2/region/provinces/geometry
```

نکته

پاسخ اندپوینت با جئومتری به‌مراتب حجیم‌تر است. اگر فقط به شناسه و نام استان‌ها نیاز دارید (مثلاً برای منوی انتخاب استان)، از اندپوینت بدون جئومتری استفاده کنید.

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

این اندپوینت پارامتر ورودی ندارد.

### نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --location 'https://api.neshan.org/v2/region/provinces' \
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

fetch("https://api.neshan.org/v2/region/provinces", requestOptions)
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
  .url("https://api.neshan.org/v2/region/provinces")
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

var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v2/region/provinces");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v2/region/provinces"

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
  CURLOPT_URL => 'https://api.neshan.org/v2/region/provinces',
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

یادداشت

برای دریافت خروجی با جئومتری، کافی است در همین نمونه‌ها عبارت `/geometry` را به انتهای آدرس اضافه کنید.

### فرمت پاسخ

پاسخ سرویس یک آرایه از آبجکت‌های استان است. در نمونه‌ زیر، برای اختصار تنها چند استان اول نمایش داده شده است:

#### بدون جئومتری

```json
[
  {
    "id": 3581,
    "name": "استان یزد"
  },
  {
    "id": 3641,
    "name": "استان لرستان"
  },
  {
    "id": 3595,
    "name": "استان اصفهان"
  },
  {
    "id": 3682,
    "name": "استان خوزستان"
  },
  ...
]
```

#### با جئومتری

در پاسخ اندپوینت `provinces/geometry`، هر آبجکت استان علاوه بر `id` و `name`، فیلد `geometry` را نیز دارد که ساختار آن همانند فیلد `geometry` در خروجی سرویس لیست شهرستان‌ها (بخش پایین همین صفحه) است.

### اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `id` | شناسه‌ عددی هر استان. این مقدار ورودی سرویس لیست شهرستان‌ها است. |
| `name` | نام استان. |
| `geometry` | محدوده‌ جغرافیایی (مرز) استان به‌صورت رشته‌ [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry). فقط در پاسخ اندپوینت `provinces/geometry` وجود دارد. |

## سرویس لیست شهرستان‌های هر استان

### آدرس Endpoint

برای دریافت لیست شهرستان‌های یک استان، شناسه‌ آن استان را در مسیر درخواست قرار دهید و یک درخواست `GET` به یکی از اندپوینت‌های زیر ارسال کنید:

بدون اطلاعات جئومتری:

```http
https://api.neshan.org/v2/region/provinces/{provinceId}/cities
```

با اطلاعات جئومتری (محدوده‌ جغرافیایی هر شهرستان):

```http
https://api.neshan.org/v2/region/provinces/{provinceId}/cities/geometry
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | نوع داده | توضیحات | نوع پارامتر |
| --- | --- | --- | --- |
| `provinceId` | Integer | شناسه‌ عددی استان که در مسیر (Path) درخواست قرار می‌گیرد. این مقدار از فیلد `id` در خروجی سرویس لیست استان‌ها به‌دست می‌آید. | **اجباری** |

### نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --location 'https://api.neshan.org/v2/region/provinces/3641/cities' \
--header 'Api-Key: <YOUR_API_KEY>'
```

```javascript
const myHeaders = new Headers();
myHeaders.append("Api-Key", "<YOUR_API_KEY>");

const provinceId = 3641;

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://api.neshan.org/v2/region/provinces/${provinceId}/cities`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

```java
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

OkHttpClient client = new OkHttpClient();

int provinceId = 3641;

Request request = new Request.Builder()
  .url("https://api.neshan.org/v2/region/provinces/" + provinceId + "/cities")
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

int provinceId = 3641;
string url = $"https://api.neshan.org/v2/region/provinces/{provinceId}/cities";

var request = new HttpRequestMessage(HttpMethod.Get, url);
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

province_id = 3641
url = f"https://api.neshan.org/v2/region/provinces/{province_id}/cities"

headers = {
    'Api-Key': '<YOUR_API_KEY>'
}

response = requests.get(url, headers=headers)

print(response.text)
```

```php
<?php

$provinceId = 3641;
$url = "https://api.neshan.org/v2/region/provinces/{$provinceId}/cities";

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $url,
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

یادداشت

برای دریافت خروجی با جئومتری، کافی است در همین نمونه‌ها عبارت `/geometry` را به انتهای آدرس اضافه کنید.

### فرمت پاسخ

پاسخ سرویس یک آرایه از آبجکت‌های شهرستان است. در نمونه‌های زیر، برای اختصار تنها چند شهرستان اول استان لرستان (`provinceId = 3641`) نمایش داده شده است.

#### بدون جئومتری

```json
[
  {
    "id": 1084,
    "name": "بروجرد"
  },
  {
    "id": 1065,
    "name": "بیران شهر"
  },
  {
    "id": 1051,
    "name": "الشتر"
  },
  {
    "id": 1063,
    "name": "خرم آباد"
  },
  ...
]
```

#### با جئومتری

رشته‌های `geometry` معمولاً شامل صدها نقطه هستند و در نمونه‌ زیر برای اختصار کوتاه شده‌اند:

```json
[
  {
    "id": 1084,
    "name": "بروجرد",
    "geometry": "POLYGON ((48.71005579999999 33.932573299599625, 48.7103566 33.930705999599574, 48.7106801 33.93051719959956, ..."
  },
  {
    "id": 1065,
    "name": "بیران شهر",
    "geometry": "POLYGON ((48.5568122 33.6506106, 48.5556167 33.6520903, 48.556419 33.6530986, 48.5572055 33.6529807, ..."
  },
  {
    "id": 1063,
    "name": "خرم آباد",
    "geometry": "POLYGON ((48.3127547 33.4367287, 48.3116385 33.4392149, 48.3105787 33.4404204, 48.3096968 33.4415193, ..."
  },
  ...
]
```

### اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `id` | شناسه‌ عددی هر شهرستان. |
| `name` | نام شهرستان. |
| `geometry` | محدوده‌ جغرافیایی (مرز) شهرستان به‌صورت رشته‌ [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry). فقط در پاسخ اندپوینت `cities/geometry` وجود دارد. |

## ساختار فیلد `geometry`

فیلد `geometry` یک رشته‌ متنی در قالب استاندارد WKT (Well-Known Text) است؛ برای مثال `POLYGON ((x1 y1, x2 y2, ...))`.

- در هر جفت مختصات، **عدد اول طول جغرافیایی (Longitude) و عدد دوم عرض جغرافیایی (Latitude)** است. این ترتیب برعکسِ ترتیب رایج `lat,lng` در بسیاری از سرویس‌هاست؛ پیش از رسم روی نقشه به آن دقت کنید.
- برای تبدیل این رشته به GeoJSON و نمایش آن روی نقشه، می‌توانید از کتابخانه‌هایی مانند [wellknown](https://www.npmjs.com/package/wellknown) یا `wkx` در جاوااسکریپت و [Shapely](https://shapely.readthedocs.io/) در پایتون استفاده کنید.

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
