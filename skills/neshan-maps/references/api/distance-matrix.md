---
source: https://platform.neshan.org/docs/api/routing-category/distance-matrix/
title: Distance Matrix API
---

# سرویس ماتریس فاصله (Distance Matrix)

سرویس ماتریس فاصله (Distance Matrix) با بهره‌گیری از داده‌های ترافیک آنلاین، فاصله و زمان سفر را بین مجموعه‌ای از نقاط مبدأ و مقصد محاسبه می‌کند. این سرویس به صورت مجزا برای **خودرو** و **موتورسیکلت** قابل استفاده است و تمامی محاسبات بر اساس بهترین مسیر و با در نظر گرفتن وضعیت لحظه‌ای ترافیک انجام می‌شود.

[هم‌اکنون این سرویس را امتحان کنید](https://platform.neshan.org/demo/distance-matrix)

## موارد کاربرد

- **شرکت‌های تاکسی آنلاین:** محاسبه دقیق زمان و هزینه سفر برای مسافت.
- **شرکت‌های لجستیک و فروشگاه‌های آنلاین:** محاسبه دقیق هزینه حمل‌ونقل بر اساس مسافت.
- **مدیریت ناوگان:** بهینه‌سازی تخصیص منابع با دانستن فاصله بین وسایل نقلیه.
- **سرویس‌های گردشگری:** ارائه اطلاعات دقیق در مورد فاصله هتل‌ها تا جاذبه‌های توریستی.
- **رستوران‌ها و سرویس‌های تحویل غذا:** تعیین محدوده بهینه ارسال، برآورد هزینه و زمان تحویل.
- **برنامه‌ریزی شهری:** تحلیل فاصله بین امکانات و مراکز مهم شهری.

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

این سرویس دارای دو اندپوینت مجزا برای محاسبه با ترافیک و بدون ترافیک است.

#### با در نظر گرفتن ترافیک لحظه‌ای

```http
https://api.neshan.org/v1/distance-matrix
```

#### بدون در نظر گرفتن ترافیک

```http
https://api.neshan.org/v1/distance-matrix/no-traffic
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه را مشخص می‌کند. مقادیر مجاز `car` (خودرو) و `motorcycle` (موتورسیکلت) هستند. مقدار پیش‌فرض `car` است. | اختیاری |
| `origins` | لیستی از مختصات نقاط مبدأ به‌صورت `latitude,longitude`. نقاط مختلف با کاراکتر پایپ (\|) از هم جدا می‌شوند. | **اجباری** |
| `destinations` | لیستی از مختصات نقاط مقصد با فرمتی مشابه `origins`. | **اجباری** |

#### رمزگذاری آدرس اینترنتی (URL Encoding)

از آنجا که برخی کاراکترها در URL معنای خاصی دارند، باید قبل از ارسال در پارامترها رمزگذاری (Encode) شوند.

**مثال:** برای جدا کردن نقاط در پارامتر `origins` از کاراکتر `|` استفاده می‌شود که معادل رمزگذاری شده آن `%7C` است.

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
curl --location 'https://api.neshan.org/v1/distance-matrix?type=car&origins=36.31876204344907%2C59.54472335603879%7C36.31617787431888%2C59.548692437923506%7C36.31405962397302%2C59.55402379242608&destinations=36.338905463387704%2C59.47409301742675%7C36.34057409632669%2C59.466775394793785%7C36.338265845619375%2C59.465756456130975' \
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

fetch("https://api.neshan.org/v1/distance-matrix?type=car&origins=36.31876204344907,59.54472335603879|36.31617787431888,59.548692437923506|36.31405962397302,59.55402379242608&destinations=36.338905463387704,59.47409301742675|36.34057409632669,59.466775394793785|36.338265845619375,59.465756456130975", requestOptions)
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
  .url("https://api.neshan.org/v1/distance-matrix?type=car&origins=36.31876204344907,59.54472335603879|36.31617787431888,59.548692437923506|36.31405962397302,59.55402379242608&destinations=36.338905463387704,59.47409301742675|36.34057409632669,59.466775394793785|36.338265845619375,59.465756456130975")
  .method("GET", body)
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v1/distance-matrix?type=car&origins=36.31876204344907,59.54472335603879|36.31617787431888,59.548692437923506|36.31405962397302,59.55402379242608&destinations=36.338905463387704,59.47409301742675|36.34057409632669,59.466775394793785|36.338265845619375,59.465756456130975");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v1/distance-matrix?type=car&origins=36.31876204344907,59.54472335603879|36.31617787431888,59.548692437923506|36.31405962397302,59.55402379242608&destinations=36.338905463387704,59.47409301742675|36.34057409632669,59.466775394793785|36.338265845619375,59.465756456130975"

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
  CURLOPT_URL => 'https://api.neshan.org/v1/distance-matrix?type=car&origins=36.31876204344907%2C59.54472335603879%7C36.31617787431888%2C59.548692437923506%7C36.31405962397302%2C59.55402379242608&destinations=36.338905463387704%2C59.47409301742675%7C36.34057409632669%2C59.466775394793785%7C36.338265845619375%2C59.465756456130975',
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

پاسخ سرویس در قالب یک آبجکت JSON بازگردانده می‌شود.

```json
{
	"status": "Ok",
	"rows": [
		{
			"elements": [
				{
					"status": "Ok",
					"duration": { "value": 699, "text": "۱۲ دقیقه" },
					"distance": { "value": 8332, "text": "۸ کیلومتر" }
				}
			]
		}
	],
	"origin_addresses": ["36.317559,59.532226"],
	"destination_addresses": ["36.350681,59.545227"]
}
```

## اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `status` | وضعیت کلی درخواست را نشان می‌دهد. در صورت موفقیت، مقدار آن `Ok` است. |
| `origin_addresses` | آرایه‌ای از مختصات نقاط مبدأ به ترتیب ورودی. |
| `destination_addresses` | آرایه‌ای از مختصات نقاط مقصد به ترتیب ورودی. |
| `rows` | آرایه‌ای از سطرها. هر سطر `row` متناظر با یک مبدأ از `origin_addresses` است. |

### آبجکت `row`

هر سطر شامل یک آرایه از `elements` است. هر `element` نتیجه محاسبه فاصله و زمان بین مبدأ آن سطر و یکی از مقاصد است.

### آبجکت `element`

| پارامتر | توضیحات |
| --- | --- |
| `status` | وضعیت محاسبه برای این زوج مبدأ و مقصد. مقادیر ممکن: `Ok` (موفق)، `NoRoute` (مسیری یافت نشد)، `UnknownError` (خطای سرور). |
| `distance` | آبجکتی شامل فاصله بین دو نقطه. (فقط در صورت `status: "Ok"`) |
| `duration` | آبجکتی شامل زمان سفر بین دو نقطه. (فقط در صورت `status: "Ok"`) |

### آبجکت `distance` و `duration`

| پارامتر | توضیحات |
| --- | --- |
| `value` | مقدار عددی: برای `distance` به **متر** و برای `duration` به **ثانیه**. |
| `text` | نمایش متنی قابل خواندن برای کاربر. |

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
