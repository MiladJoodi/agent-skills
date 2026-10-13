---
source: https://platform.neshan.org/docs/api/search-category/reverse-geocoding/2.0.0/
title: Reverse Geocoding API تبدیل مختصات به آدرس نشان
---

آخرین نسخهنسخه 2.0.0

# سرویس تبدیل نقطه به آدرس (Reverse Geocoding)

هشدار

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات قدیمی نسخه سرویس تبدیل نقطه به آدرس می‌باشد.
مستندات مرتبط با نسخه جدید این سرویس را در این صفحه می‌توانید مشاهده کنید.

با استفاده از این سرویس می‌توانید با ارسال یک مختصات جغرافیایی (طول و عرض جغرافیایی)، اطلاعات مکانی دقیقی مانند آدرس کامل، نام محله، منطقه شهرداری و وضعیت قرارگیری در طرح‌های ترافیکی را دریافت کنید.

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
https://api.neshan.org/v2/reverse
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `lat` | عرض جغرافیایی (Latitude) نقطه مورد نظر. | **اجباری** |
| `lng` | طول جغرافیایی (Longitude) نقطه مورد نظر. | **اجباری** |

## نمونه درخواست

- cURL
- javascript
- java
- c#
- python
- php

```bash
  curl --location 'https://api.neshan.org/v2/reverse?lat=LATITUDE&lng=LONGITUDE' \
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

  fetch("https://api.neshan.org/v2/reverse?lat=LATITUDE&lng=LONGITUDE", requestOptions)
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
    .url("https://api.neshan.org/v2/reverse?lat=LATITUDE&lng=LONGITUDE")
    .method("GET", body)
    .addHeader("Api-Key", "<YOUR_API_KEY>")
    .build();
  Response response = client.newCall(request).execute();
```

```csharp
  var client = new HttpClient();
  var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v2/reverse?lat=LATITUDE&lng=LONGITUDE");
  request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
  var response = await client.SendAsync(request);
  response.EnsureSuccessStatusCode();
  Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
  import requests

  url = "https://api.neshan.org/v2/reverse?lat=LATITUDE&lng=LONGITUDE"

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
    CURLOPT_URL => 'https://api.neshan.org/v2/reverse?lat=LATITUDE&lng=LONGITUDE',
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
    "formatted_address": "تهران، تهران، فاطمي، حجاب، سازمان آب، نزدیک به عبدالله زاده",
    "route_name": "سازمان آب",
    "route_type": "secondary",
    "neighbourhood": "فاطمي",
    "city": "تهران",
    "state": "تهران",
    "place": null,
    "municipality_zone": "6",
    "in_traffic_zone": true,
    "in_odd_even_zone": true,
    "addresses": [
        {
            "formatted": "حجاب، سازمان آب، نزدیک به عبدالله زاده",
            "components": [
                {
                    "name": "حجاب",
                    "type": "primary"
                },
                {
                    "name": "سازمان آب",
                    "type": "secondary"
                }
            ]
        }
    ]
}
```

## اجزای پاسخ

| پارامتر | توضیحات |
| --- | --- |
| `status` | در صورت موفقیت‌آمیز بودن درخواست، مقدار `OK` خواهد بود. |
| `formatted_address` | آدرس کامل موقعیت مورد نظر شامل استان، شهر، محله و خیابان. |
| `route_name` | نام آخرین خیابان در آدرس. |
| `route_type` | نوع آخرین خیابان در آدرس (مثلاً `secondary`). |
| `neighbourhood` | نام محله (در صورت وجود). |
| `city` | نام شهر. |
| `state` | نام استان. |
| `place` | نام مکان عمومی که نقطه در آن قرار دارد (در صورت وجود). |
| `municipality_zone` | منطقه شهرداری (در صورت وجود). |
| `in_traffic_zone` | مشخص می‌کند که آیا نقطه در **طرح ترافیک** قرار دارد یا خیر (`true`/`false`). |
| `in_odd_even_zone` | مشخص می‌کند که آیا نقطه در **طرح زوج و فرد** قرار دارد یا خیر (`true`/`false`). |
| `addresses` | آرایه‌ای از آدرس‌های تولیدشده برای موقعیت انتخابی. |

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
