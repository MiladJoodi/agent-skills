---
source: https://platform.neshan.org/docs/api/static-map-category/static-map-arc/
title: Static Map Arc API
---

# نقشه استاتیک با امکان رسم کمان بین مبدا و مقصد

سرویس نقشه‌ی استاتیک با رسم کمان نشان، امکان تولید تصویر نقشه با خط کمان بین مبدا و مقصد را فراهم می‌کند.
این سرویس به شما اجازه می‌دهد مسیرهای قوسی را با رنگ، استایل و مارکر دلخواه نمایش دهید و تصویر نهایی را برای استفاده در وب‌سایت، اپلیکیشن یا مستندات خود آماده کنید.

[هم‌اکنون این سرویس را امتحان کنید](https://platform.neshan.org/docs-samples/static-map-arc/)

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

با استفاده از آدرس زیر تولید تصویری از نقشه با ابعاد و موقعیت موردنظرتان امکان‌پذیر می‌باشد:

```http
https://api.neshan.org/v5/static/arc
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `key` | کلید اختصاصی که از پنل توسعه‌دهندگان نشان دریافت کرده‌اید. | **اجباری** |
| `fromLatitude` | عرض جغرافیایی نقطه مبدا خط کمان که باید در سیستم مختصات جغرافیایی WGS84 تعریف شده باشد. | **اجباری** |
| `fromLongitude` | طول جغرافیایی نقطه مبدا خط کمان که باید در سیستم مختصات جغرافیایی WGS84 تعریف شده باشد. | **اجباری** |
| `toLatitude` | عرض جغرافیایی نقطه مقصد خط کمان که باید در سیستم مختصات جغرافیایی WGS84 تعریف شده باشد. | **اجباری** |
| `toLongitude` | طول جغرافیایی نقطه مقصد خط کمان که باید در سیستم مختصات جغرافیایی WGS84 تعریف شده باشد. | **اجباری** |
| `width` | عرض تصویر موردنظر که حداقل 200 و حداکثر 2048 پیکسل می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض 512 در نظر گرفته می‌شود. | اختیاری |
| `height` | ارتفاع تصویر موردنظر که حداقل 200 و حداکثر 2048 پیکسل می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض 512 در نظر گرفته می‌شود. | اختیاری |
| `style` | استایل نقشه که یکی از مقادیر `light` و `dark` می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض `light` در نظر گرفته می‌شود. | اختیاری |
| `color` | رنگ خط کمان را مشخص می‌کند، مقدار آن به‌صورت هگز وارد می‌شود (مثال: `#f50559` یا `f50559`). در صورت عدم ارسال، رنگ مشکی در نظر گرفته می‌شود. | اختیاری |
| `dashed` | این پارامتر استایل خط کمان را مشخص می‌کند. مقادیر آن `true` یا `false` می‌تواند باشد. در صورتی که این پارامتر `true` باشد، خط کمان به‌صورت خط‌چین نمایش داده می‌شود. مقدار پیش‌فرض `false` می‌باشد. | اختیاری |
| `fromMarker` | مارکر نقطه مبدا کمان را مشخص می‌کند. مقدار آن می‌تواند یکی از رنگ‌های از پیش تعریف‌شده (`red`, `green`, `blue`, `violet`) یا توکن فایل آپلود شده در قسمت آیکن‌های پروفایل باشد. | اختیاری |
| `toMarker` | مارکر نقطه مقصد کمان را مشخص می‌کند. مقدار آن می‌تواند یکی از رنگ‌های از پیش تعریف‌شده (`red`, `green`, `blue`, `violet`) یا توکن فایل آپلود شده در قسمت آیکن‌های پروفایل باشد. | اختیاری |

## نمونه درخواست

- cURL
- javascript
- java
- c#
- python
- php

```bash
curl --location 'https://api.neshan.org/v5/static/arc?key=<YOUR_API_KEY>&style=light&fromLatitude=38.073362&fromLongitude=46.298018&toLatitude=25.292741&toLongitude=60.649445&width=600&height=600&dashed=true&color=%23FF0AA5&fromMarker=<MARKER_TOKEN>&toMarker=<MARKER_TOKEN>'
```

```javascript
const urlencoded = new URLSearchParams();

const requestOptions = {
method: "GET",
body: urlencoded,
redirect: "follow"
};

fetch("https://api.neshan.org/v5/static/arc?key=<YOUR_API_KEY>&style=light&fromLatitude=38.073362&fromLongitude=46.298018&toLatitude=25.292741&toLongitude=60.649445&width=600&height=600&dashed=true&color=%23FF0AA5&fromMarker=<MARKER_TOKEN>&toMarker=<MARKER_TOKEN>", requestOptions)
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
.url("https://api.neshan.org/v5/static/arc?key=<YOUR_API_KEY>&style=light&fromLatitude=38.073362&fromLongitude=46.298018&toLatitude=25.292741&toLongitude=60.649445&width=600&height=600&dashed=true&color=%23FF0AA5&fromMarker=<MARKER_TOKEN>&toMarker=<MARKER_TOKEN>")
.method("GET", body)
.build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v5/static/arc?key=<YOUR_API_KEY>&style=dark&fromLatitude=38.073362&fromLongitude=46.298018&toLatitude=25.292741&toLongitude=60.649445&width=600&height=600&dashed=true&color=%23FF0AA5&fromMarker=<MARKER_TOKEN>&toMarker=<MARKER_TOKEN>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v5/static/arc?key=<YOUR_API_KEY>&style=dark&fromLatitude=38.073362&fromLongitude=46.298018&toLatitude=25.292741&toLongitude=60.649445&width=600&height=600&dashed=true&color=%23FF0AA5&fromMarker=<MARKER_TOKEN>&toMarker=<MARKER_TOKEN>"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
CURLOPT_URL => 'https://api.neshan.org/v5/static/arc?key=<YOUR_API_KEY>&style=dark&fromLatitude=38.073362&fromLongitude=46.298018&toLatitude=25.292741&toLongitude=60.649445&width=600&height=600&dashed=true&color=%23FF0AA5&fromMarker=<MARKER_TOKEN>&toMarker=<MARKER_TOKEN>',
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

##### خروجی تولید شده با ارسال درخواست:

نکته

برای مارکر مبدا و مقصد می‌توانید از رنگ‌های از پیش تعریف‌شده (`red`, `green`, `blue`, `violet`) استفاده کنید. در صورت نیاز به آپلود تصویر مارکر دلخواه، به این [آدرس](https://platform.neshan.org/panel/icons) در پروفایل خود مراجعه بفرمایید. پس از آپلود هر تصویر توکنی در اختیار شما قرار می‌گیرد که زمان فراخوانی سرویس نقشه استاتیک در پارامترهای fromMarker و toMarker به عنوان مارکر مبدا و مقصد ارسال می‌شود.

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
