---
source: https://platform.neshan.org/docs/api/static-map-category/static-map/
title: Static Map API
---

# سرویس نقشه‌ی استاتیک

سرویس نقشه‌ی استاتیک نشان، امکان تولید تصویر آماده از نقشه را بر اساس موقعیت جغرافیایی، سطح زوم و با ابعاد دلخواه فراهم می‌کند.

[هم‌اکنون این سرویس را امتحان کنید](https://platform.neshan.org/docs-samples/static-map/)

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

با استفاده از آدرس زیر تولید تصویری از نقشه با ابعاد و موقعیت موردنظرتان امکان‌پذیر می‌باشد:

```http
https://api.neshan.org/v5/static
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `key` | کلید اختصاصی که از پنل توسعه‌دهندگان نشان دریافت کرده‌اید. | **اجباری** |
| `zoom` | سطح بزرگنمایی نقشه که حداقل ۵ و حداکثر ۱۹ می‌تواند باشد. | **اجباری** |
| `latitude` | طول جغرافیایی مرکز نقشه که باید در سیستم مختصات جغرافیایی WGS84 تعریف شده باشد. | **اجباری** |
| `longitude` | عرض جغرافیایی مرکز نقشه که باید در سیستم مختصات جغرافیایی WGS84 تعریف شده باشد. | **اجباری** |
| `width` | عرض تصویر مورد نظر که حداقل 200 پیکسل و حداکثر 2048 پیکسل می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض 512 در نظر گرفته می‌شود. | اختیاری |
| `height` | ارتفاع تصویر مورد نظر که حداقل 200 پیکسل و حداکثر 2048 پیکسل می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض 512 در نظر گرفته می‌شود. | اختیاری |
| `style` | استایل نقشه که یکی از مقادیر `light` و `dark` می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض `light` در نظر گرفته می‌شود. | اختیاری |
| `marker` | آیکن مرکز عکس را با استفاده از این پارامتر می‌توانید تنظیم کنید. مقادیر پیش فرض: `red`,`green`,`blue`,`violet`  برای ایجاد آیکن دلخواه می‌توانید با [مراجعه به پنل کاربری خود، قسمت آیکن‌ها](https://platform.neshan.org/panel/icons) تصویر مارکر دلخواه را آپلود نمائید و توکن آن را به جای مقادیر پیش فرض ارسال کنید. اگر این پارامتر درون درخواست ارسالی وجود نداشته باشد روی عکس مارکری قرار نمی‌گیرد. | اختیاری |

## نمونه درخواست

- cURL
- javascript
- java
- c#
- python
- php

```bash
curl --location 'https://api.neshan.org/v5/static?key=<YOUR_API_KEY>&style=light&width=500&height=500&zoom=15&latitude=32.657307&longitude=51.677579&marker=red'
```

```javascript
const urlencoded = new URLSearchParams();

const requestOptions = {
  method: "GET",
  body: urlencoded,
  redirect: "follow"
};

fetch("https://api.neshan.org/v5/static?key=<YOUR_API_KEY>&style=light&width=500&height=500&zoom=15&latitude=32.657307&longitude=51.677579&marker=red", requestOptions)
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
  .url("https://api.neshan.org/v5/static?key=<YOUR_API_KEY>&style=light&width=500&height=500&zoom=15&latitude=32.657307&longitude=51.677579&marker=red")
  .method("GET", body)
  .build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v5/static?key=<YOUR_API_KEY>&style=light&width=500&height=500&zoom=15&latitude=32.657307&longitude=51.677579&marker=red");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v5/static?key=<YOUR_API_KEY>&style=light&width=500&height=500&zoom=15&latitude=32.657307&longitude=51.677579&marker=red"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.neshan.org/v5/static?key=<YOUR_API_KEY>&style=light&width=500&height=500&zoom=15&latitude=32.657307&longitude=51.677579&marker=red',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
```

نکته

برای مارکر می‌توانید از رنگ‌های از پیش تعریف‌شده (`red`, `green`, `blue`, `violet`) استفاده کنید. در صورت نیاز به آپلود تصویر مارکر دلخواه، به این [آدرس](https://platform.neshan.org/panel/icons) در پروفایل خود مراجعه بفرمایید. پس از آپلود هر تصویر توکنی در اختیار شما قرار می‌گیرد که زمان فراخوانی سرویس نقشه استاتیک در پارامتر marker به عنوان مارکر ارسال می‌شود.

##### خروجی تولید شده با ارسال درخواست:

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
| 503 | render\_timeout | زمان مجاز برای رندر به پایان رسید |
| 503 | overloaded | عدم پاسخگویی سرور |
