---
source: https://platform.neshan.org/docs/api/account-category/services/
title: Active Services API
---

# سرویس فهرست سرویس‌های فعال

این سرویس فهرست وب‌سرویس‌هایی را برمی‌گرداند که روی **کلید دسترسی شما** فعال هستند.

کاربرد آن این است که پیش از فراخوانی یک سرویس، مطمئن شوید کلیدتان به آن دسترسی دارد و در نتیجه با خطای `485` (`ApiServiceListError`) روبه‌رو نشوید. اگر پنل چند کلید با دسترسی‌های متفاوت دارید، این سرویس بهترین راه برای تشخیص برنامه‌نویسی‌شده‌ دسترسی هر کلید است.

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

یادداشت

پاسخ این سرویس مربوط به همان کلید دسترسی است که در هدر `Api-Key` ارسال می‌کنید؛ اگر چند کلید دارید، برای هر کلید جداگانه فراخوانی کنید. برای دیدن اعتبار باقیمانده‌ حساب، سرویس شارژ باقیمانده حساب را فراخوانی کنید.

## شیوه‌ فراخوانی

### آدرس Endpoint

برای استفاده از این سرویس، یک درخواست `GET` به اندپوینت زیر ارسال کنید:

```http
https://api.neshan.org/account-inquiry/v1/services
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

این سرویس پارامتر ورودی ندارد؛ فهرست بر اساس کلید دسترسی ارسالی در هدر بازگردانده می‌شود.

## نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --location 'https://api.neshan.org/account-inquiry/v1/services' \
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

fetch("https://api.neshan.org/account-inquiry/v1/services", requestOptions)
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
  .url("https://api.neshan.org/account-inquiry/v1/services")
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

var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/account-inquiry/v1/services");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/account-inquiry/v1/services"

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
  CURLOPT_URL => 'https://api.neshan.org/account-inquiry/v1/services',
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

پاسخ سرویس یک آرایه از سرویس‌های فعال روی کلید است. نمونه‌ زیر خروجی واقعی یک کلید است:

```json
[
  {
    "tag": "search",
    "name": "جستجو"
  },
  {
    "tag": "mapMatching",
    "name": "نگاشت نقطه بر نقشه"
  },
  {
    "tag": "noTrafficDistanceMatrix",
    "name": "ماتریس فاصله بدون ترافیک"
  },
  {
    "tag": "reverse",
    "name": "تبدیل نقطه به آدرس"
  },
  {
    "tag": "geocoding",
    "name": "تبدیل ادرس به نقطه"
  },
  {
    "tag": "geocoding-plus",
    "name": "تبدیل آدرس به نقطه پلاس (در نظر گرفتن پلاک و مکان های شاخص در آدرس)"
  },
  {
    "tag": "routing",
    "name": "مسیریابی با در نظر گرفتن ترافیک + تخمین زمان رسیدن"
  },
  {
    "tag": "account-inquiry",
    "name": "استعلام سرویس های فعال کلید"
  },
  {
    "tag": "account-inquiry",
    "name": "استعلام اعتبار حساب"
  },
  {
    "tag": "trip",
    "name": "فروشنده دوره گرد"
  }
]
```

## اجزای پاسخ

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `tag` | String | شناسه‌ انگلیسی سرویس. |
| `name` | String | نام فارسی سرویس. |

هشدار

مقدار `tag` **یکتا نیست**. در نمونه‌ بالا `account-inquiry` دو بار تکرار شده است (یک‌بار برای «استعلام سرویس های فعال کلید» و یک‌بار برای «استعلام اعتبار حساب»). اگر این آرایه را در قالب map یا dictionary با کلید `tag` ذخیره کنید، رکوردها روی هم می‌افتند و بخشی از فهرست را از دست می‌دهید؛ آرایه را به‌صورت لیست نگه دارید.

یادداشت

مقادیر `name` متن نمایشی هستند و ممکن است در آینده تغییر کنند یا اصلاح نگارشی شوند؛ منطق برنامه‌ خود را به `tag` گره بزنید، نه به `name`.

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
