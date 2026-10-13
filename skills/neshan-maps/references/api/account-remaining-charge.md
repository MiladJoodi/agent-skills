---
source: https://platform.neshan.org/docs/api/account-category/remaining-charge/
title: Remaining Charge API
---

# سرویس شارژ باقیمانده حساب

با این سرویس، **اعتبار باقیمانده‌ حساب** خود را دریافت می‌کنید: هم اعتبار خریداری‌شده و هم اعتبارهای هدیه‌ای که به حساب شما تعلق گرفته است.

کاربرد اصلی آن پایش خودکار حساب است؛ می‌توانید مصرف را در داشبورد داخلی خودتان نشان دهید یا پیش از اتمام شارژ به تیم خود هشدار بدهید تا سرویس‌هایتان بی‌مقدمه قطع نشوند.

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

پاسخ این سرویس مربوط به همان کلید دسترسی است که در هدر `Api-Key` ارسال می‌کنید. برای دیدن فهرست سرویس‌هایی که روی این کلید فعال است، سرویس فهرست سرویس‌های فعال را فراخوانی کنید.

## شیوه‌ فراخوانی

### آدرس Endpoint

برای استفاده از این سرویس، یک درخواست `GET` به اندپوینت زیر ارسال کنید:

```http
https://api.neshan.org/account-inquiry/v1/remaining-charge
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

این سرویس پارامتر ورودی ندارد؛ حساب از روی کلید دسترسی ارسالی در هدر تشخیص داده می‌شود.

## نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --location 'https://api.neshan.org/account-inquiry/v1/remaining-charge' \
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

fetch("https://api.neshan.org/account-inquiry/v1/remaining-charge", requestOptions)
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
  .url("https://api.neshan.org/account-inquiry/v1/remaining-charge")
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

var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/account-inquiry/v1/remaining-charge");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/account-inquiry/v1/remaining-charge"

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
  CURLOPT_URL => 'https://api.neshan.org/account-inquiry/v1/remaining-charge',
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

پاسخ سرویس یک آبجکت JSON شامل اعتبار خریداری‌شده و اعتبارهای هدیه است:

```json
{
  "paidCharge": -1082542850791,
  "generalFreeCharge": 0,
  "typedFreeCharges": {
    "WebService": 0,
    "WebSite": 0
  }
}
```

## اجزای پاسخ

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `paidCharge` | Number | اعتبار خریداری‌شده‌ باقیمانده‌ حساب. |
| `generalFreeCharge` | Number | اعتبار هدیه‌ عمومی که برای همه‌ سرویس‌ها قابل استفاده است. |
| `typedFreeCharges` | Object | اعتبارهای هدیه‌ تفکیک‌شده بر اساس نوع محصول. |

### آبجکت `typedFreeCharges`

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `WebService` | Number | اعتبار هدیه‌ قابل استفاده برای وب‌سرویس‌ها. |
| `WebSite` | Number | اعتبار هدیه‌ قابل استفاده برای محصولات وب. |

هشدار

مقدار `paidCharge` می‌تواند **منفی** باشد؛ در نمونه‌ بالا مقدار منفی است. پیش از نمایش این عدد به کاربر یا مقایسه‌ آن با آستانه‌ هشدار، حالت منفی را هم در نظر بگیرید و فرض نکنید همیشه صفر یا بزرگ‌تر است.

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
