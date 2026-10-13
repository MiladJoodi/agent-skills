---
source: https://platform.neshan.org/docs/api/search-category/geocoding/4.0.0/
title: Geocoding API  تبدیل آدرس به مختصات
---

آخرین نسخهنسخه 6.0.0نسخه 4.0.0

# سرویس تبدیل آدرس به موقعیت (Geocoding API) - نسخه 4.0.0

هشدار

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات نسخه قدیمی سرویس تبدیل آدرس به موقعیت می‌باشد.
مستندات مرتبط با آخرین نسخه این سرویس را در این صفحه می‌توانید مشاهده کنید.

از سرویس تبدیل آدرس به موقعیت می‌توانید برای تبدیل یک آدرس نوشتاری به یک مختصات جغرافیایی استفاده کنید.

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

برای استفاده از این سرویس، یک درخواست `GET` به اندپوینت زیر ارسال کنید:

```http
https://api.neshan.org/v4/geocoding
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `address` | آدرس نوشتاری مورد نظر برای تبدیل به مختصات. | **اجباری** |

## نمونه درخواست

- cURL
- javascript
- java
- c#
- python
- php

```bash
curl --location 'https://api.neshan.org/v4/geocoding?address=ADDRESS' \
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

fetch("https://api.neshan.org/v4/geocoding?address=ADDRESS", requestOptions)
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
.url("https://api.neshan.org/v4/geocoding?address=ADDRESS")
.method("GET", body)
.addHeader("Api-Key", "<YOUR_API_KEY>")
.build();
Response response = client.newCall(request).execute();
```

```csharp
var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v4/geocoding?address=ADDRESS");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v4/geocoding?address=ADDRESS"

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
CURLOPT_URL => 'https://api.neshan.org/v4/geocoding?address=ADDRESS',
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

پاسخ سرویس در قالب یک آبجکت JSON بازگردانده می‌شود.

```json
{
    "status": "OK",
    "location": {
        "x": 59.58030012321334,
        "y": 36.30608816378243
    }
}
```

### اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `status` | وضعیت کلی پاسخ را نشان می‌دهد. در صورت موفقیت‌آمیز بودن، مقدار آن `OK` خواهد بود. |
| `location` | یک آبجکت شامل مختصات جغرافیایی معادل با آدرس ورودی. |

### آبجکت `location`

| پارامتر | توضیحات |
| --- | --- |
| `x` | طول جغرافیایی (Longitude). |
| `y` | عرض جغرافیایی (Latitude). |

## نکات برای دریافت نتایج دقیق‌تر

برای بهبود دقت سرویس، نکات زیر را در آدرس‌های ارسالی رعایت کنید:

1. **ترتیب اجزای آدرس:** تا حد امکان ترتیب زیر را رعایت کنید:

   - `استان + شهر/روستا + میدان + خیابان + کوچه + پلاک`
   > **نکته:** شماره پلاک در حال حاضر در شهرهای **تهران، مشهد، تبریز و کرج** قابل استفاده است.
2. **استفاده از جداکننده:** حتماً همه اجزای آدرس را با کاراکتر فاصله (space) از هم جدا کنید. برای مثال، `شهیدبابایی` را به صورت `شهید بابایی` ارسال کنید.
3. **حذف اطلاعات اضافی:** مشخصات مربوط به POIها مانند نام ساختمان، طبقات و برج‌ها را از آدرس حذف کنید.

   - **مثال:** آدرس `آذربایجان شرقی تبریز خیابان ارتش شمالی کوچه بازارچه رنگی ساختمان رضوی` را به `آذربایجان شرقی تبریز خیابان ارتش شمالی کوچه بازارچه رنگی` تغییر دهید.
4. **آدرس روستا:** اگر مقصد یک روستا است، بعد از نام استان، بلافاصله نام روستا را بیاورید و نیازی به ذکر نام شهر نیست.

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
