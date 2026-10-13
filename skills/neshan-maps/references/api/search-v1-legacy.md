---
source: https://platform.neshan.org/docs/api/search-category/search/1.0.0/
title: Search API سرویس جستجوی مکان‌مبنا
---

آخرین نسخهنسخه 1.0.0

# سرویس جستجوی مکان‌مبنا (Search API) - نسخه 1.0.0

هشدار

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات نسخه قدیمی سرویس جستجوی مکان‌مبنا می‌باشد.
مستندات مرتبط با آخرین نسخه این سرویس را در این صفحه می‌توانید مشاهده کنید.

وب‌سرویس جستجوی مکان‌مبنا، با توجه به یک نقطه‌ مرجع (مختصات جغرافیایی)، بهترین نتایج ممکن را برای جستجوی نام خیابان‌ها، اماکن و کسب‌وکارها در اختیار شما قرار می‌دهد.
این سرویس یکی از کامل‌ترین سرویس‌های جستجوی موقعیت‌محور در ایران است که با پشتیبانی کامل از زبان فارسی، نتایج را بر اساس فاصله از نقطه مرجع مرتب کرده و در هر درخواست، حداکثر **۳۰ نتیجه** مرتبط را باز می‌گرداند.

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

## شیوه‌ فراخوانی

### آدرس Endpoint

برای استفاده از این سرویس، یک درخواست `GET` به اندپوینت زیر ارسال کنید:

```http
https://api.neshan.org/v1/search
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `term` | عبارت مورد نظر برای جستجو. | **اجباری** |
| `lat` | عرض جغرافیایی (Latitude) نقطه مرجع برای مرکز جستجو. | **اجباری** |
| `lng` | طول جغرافیایی (Longitude) نقطه مرجع برای مرکز جستجو. | **اجباری** |

نکته

نقطه‌ مرجع می‌تواند موقعیت فعلی کاربر یا مرکز نقشه‌ای باشد که در حال مشاهده آن است. ارسال این پارامتر به بهبود کیفیت نتایج کمک شایانی می‌کند.

## نمونه درخواست

- cURL
- javascript
- java
- c#
- python
- php

```bash
curl --location 'https://api.neshan.org/v1/search?term=YOUR_SEARCH_TERM&lat=LATITUDE&lng=LONGITUDE' \
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

  fetch("https://api.neshan.org/v1/search?term=YOUR_SEARCH_TERM&lat=LATITUDE&lng=LONGITUDE", requestOptions)
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
    .url("https://api.neshan.org/v1/search?term=YOUR_SEARCH_TERM&lat=LATITUDE&lng=LONGITUDE")
    .method("GET", body)
    .addHeader("Api-Key", "<YOUR_API_KEY>")
    .build();
  Response response = client.newCall(request).execute();
```

```csharp
  var client = new HttpClient();
  var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v1/search?term=YOUR_SEARCH_TERM&lat=LATITUDE&lng=LONGITUDE");
  request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
  var response = await client.SendAsync(request);
  response.EnsureSuccessStatusCode();
  Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
    import requests

    url = "https://api.neshan.org/v1/search?term=YOUR_SEARCH_TERM&lat=LATITUDE&lng=LONGITUDE"

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
      CURLOPT_URL => 'https://api.neshan.org/v1/search?term=YOUR_SEARCH_TERM&lat=LATITUDE&lng=LONGITUDE',
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
  "count": 25,
  "items": [
    {
      "title": "میدان آزادی",
      "address": "تهران، میدان آزادی",
      "neighbourhood": "استاد معین",
      "region": "تهران، استان تهران",
      "type": "میدان",
      "category": "municipal",
      "location": {
        "x": 51.352,
        "y": 35.700
      }
    }
  ]
}
```

## اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `count` | تعداد کل نتایج یافت‌شده. |
| `items` | آرایه‌ای از نتایج یافت‌شده. |

### آبجکت `item`

| پارامتر | توضیحات |
| --- | --- |
| `title` | عنوان نتیجه یافت‌شده. |
| `address` | آدرس کامل مکان یا معبر. |
| `neighbourhood` | نام محله (در صورت وجود). |
| `region` | نام شهر و استان. |
| `type` | نوع رکورد یافت‌شده (مثلاً: مسجد، خیابان، بزرگراه، میدان). |
| `category` | دسته‌بندی اصلی رکورد که یکی از مقادیر زیر است: `place` (مکان)، `municipal` (معبر شهری)، `region` (شهر، روستا، استان). |
| `location` | یک آبجکت شامل مختصات جغرافیایی نتیجه. |

### آبجکت `location`

| پارامتر | توضیحات |
| --- | --- |
| `x` | طول جغرافیایی (Longitude). |
| `y` | عرض جغرافیایی (Latitude). |

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
