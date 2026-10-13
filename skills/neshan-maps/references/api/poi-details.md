---
source: https://platform.neshan.org/docs/api/search-category/poi-details/
title: POI Details API
---

# سرویس دریافت اطلاعات مکان‌های شاخص (POI Details API)

وب‌سرویس دریافت اطلاعات مکان شاخص (POI)، جزئیات کامل یک مکان مانند نام، آدرس، شماره تماس، وبسایت، دسته‌بندی و ساعات کاری را بر اساس یک هش (Hash) منحصربه‌فرد بازمی‌گرداند.

نکته

برای فعال سازی این سرویس لطفا از طریق ارسال تیکت در پنل کاربری با پشتیبانی تماس بگیرید.

## پیش‌نیاز: دریافت `poiHash`

این سرویس مکان مورد نظر را با یک شناسه‌ منحصربه‌فرد به نام **هش مکان** (`poiHash`) پیدا می‌کند و ورودی دیگری نمی‌پذیرد؛ بنابراین پیش از فراخوانی آن، باید هش مکان را در اختیار داشته باشید.

این هش در خروجی دو سرویس دیگر و در فیلد `poiHash` هر نتیجه بازگردانده می‌شود:

- سرویس جستجوی مکان‌مبنا (نسخه ۳) — وقتی کاربر عبارتی را جستجو می‌کند.
- سرویس جستجوی مکان‌های نزدیک — وقتی می‌خواهید مکان‌های یک دسته‌بندی را در اطراف یک موقعیت پیدا کنید.

توجه کنید که `poiHash` تنها برای مکان‌های تاییدشده در نشان بازگردانده می‌شود و ممکن است برخی نتایج جستجو (مثلاً معابر شهری) این فیلد را نداشته باشند.

بنابراین جریان کار استفاده از این سرویس به این شکل است:

۱. با سرویس جستجوی مکان‌مبنا (نسخه ۳) یا سرویس جستجوی مکان‌های نزدیک مکان مورد نظر را پیدا کنید.

۲. مقدار `poiHash` را از نتیجه‌ انتخاب‌شده بردارید.

۳. همان مقدار را به‌عنوان پارامتر `hash` به این سرویس بدهید تا جزئیات کامل مکان را دریافت کنید.

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
https://api.neshan.org/v1/point
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

پارامترها باید در رشته‌ کوئری (Query String) درخواست ارسال شوند.

| پارامتر | توضیحات | نوع داده | نوع پارامتر |
| --- | --- | --- | --- |
| `hash` | هش منحصربه‌فرد مکان شاخص مورد نظر؛ این مقدار از فیلد `poiHash` در خروجی سرویس جستجو (نسخه ۳) یا سرویس مکان‌های نزدیک به‌دست می‌آید. | String | **اجباری** |

## نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --location 'https://api.neshan.org/v1/point?hash=wXtqMQxZnBicNffFbj37mUMdyo_92YTV2jf6sB110zXQzyjSoSOcPWdzWPU4oEeL8O75AsLHWqHCd22jyD5Tlg' \
--header 'Api-Key: <YOUR_API_KEY>'
```

```javascript
const myHeaders = new Headers();
myHeaders.append("Api-Key", "<YOUR_API_KEY>");

const poiHash = "wXtqMQxZnBicNffFbj37mUMdyo_92YTV2jf6sB110zXQzyjSoSOcPWdzWPU4oEeL8O75AsLHWqHCd22jyD5Tlg";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://api.neshan.org/v1/point?hash=${poiHash}`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

```java
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

OkHttpClient client = new OkHttpClient();

String poiHash = "wXtqMQxZnBicNffFbj37mUMdyo_92YTV2jf6sB110zXQzyjSoSOcPWdzWPU4oEeL8O75AsLHWqHCd22jyD5Tlg";

Request request = new Request.Builder()
  .url("https://api.neshan.org/v1/point?hash=" + poiHash)
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

string poiHash = "wXtqMQxZnBicNffFbj37mUMdyo_92YTV2jf6sB110zXQzyjSoSOcPWdzWPU4oEeL8O75AsLHWqHCd22jyD5Tlg";
string url = $"https://api.neshan.org/v1/point?hash={poiHash}";

var request = new HttpRequestMessage(HttpMethod.Get, url);
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

poi_hash = "wXtqMQxZnBicNffFbj37mUMdyo_92YTV2jf6sB110zXQzyjSoSOcPWdzWPU4oEeL8O75AsLHWqHCd22jyD5Tlg"
url = f"https://api.neshan.org/v1/point?hash={poi_hash}"

headers = {
    'Api-Key': '<YOUR_API_KEY>'
}

response = requests.get(url, headers=headers)

print(response.text)
```

```php
<?php

$poiHash = "wXtqMQxZnBicNffFbj37mUMdyo_92YTV2jf6sB110zXQzyjSoSOcPWdzWPU4oEeL8O75AsLHWqHCd22jyD5Tlg";
$url = "https://api.neshan.org/v1/point?hash=" . $poiHash;

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

## فرمت پاسخ

پاسخ سرویس در قالب یک آبجکت JSON با جزئیات کامل مکان بازگردانده می‌شود:

```json
{
  "name": "نام مکان مورد نظر",
  "address": "استان تهران، تهران، خیابان اصلی، خیابان فرعی ، پلاک 1",
  "phoneNumber": "02111111111",
  "website": "www.example.com",
  "workHours": [
    {
      "day": "شنبه",
      "ranges": [
        { "start": "09:00", "end": "21:00" }
      ]
    },
    {
      "day": "یک‌شنبه",
      "ranges": [
        { "start": "09:00", "end": "21:00" }
      ]
    },
    {
      "day": "دوشنبه",
      "ranges": [
        { "start": "09:00", "end": "21:00" }
      ]
    },
    {
      "day": "سه‌شنبه",
      "ranges": [
        { "start": "09:00", "end": "21:00" }
      ]
    },
    {
      "day": "چهارشنبه",
      "ranges": [
        { "start": "09:00", "end": "21:00" }
      ]
    },
    {
      "day": "پنج‌شنبه",
      "ranges": [
        { "start": "09:00", "end": "21:00" }
      ]
    },
    {
      "day": "جمعه",
      "ranges": []
    }
  ],
  "layer": {
    "slug": "pharmacy",
    "title": "داروخانه",
    "icon": "https://static.neshanmap.ir/poi/64/pharmacy.png"
  },
  "location": {
    "x": 51.42968359729929,
    "y": 35.806801040812374
  },
  "socialNetworks": [],
  "config": {}
}
```

## اجزای پاسخ

| پارامتر | توضیحات | نوع داده |
| --- | --- | --- |
| `name` | نام کامل مکان. | String |
| `address` | آدرس پستی مکان. | String |
| `phoneNumber` | شماره تماس مکان. | String |
| `website` | آدرس وبسایت یا صفحه‌ اجتماعی مکان. | String |
| `workHours` | آرایه‌ای از ساعات کاری مکان به تفکیک روزهای هفته. | Array of Objects |
| `layer` | آبجکتی شامل جزئیات لایه/دسته‌بندی مکان. | Object |
| `location` | مختصات جغرافیایی مکان. | Object |
| `socialNetworks` | آرایه‌ای از شبکه‌های اجتماعی مکان. | Array |

یادداشت

مقادیر فیلدهایی مانند `website`، `phoneNumber`، `workHours` و `socialNetworks` به اطلاعات ثبت‌شده‌ هر مکان بستگی دارد و ممکن است برای برخی مکان‌ها خالی بازگردانده شود.

همچنین `website` یک **متن آزاد** است که صاحب مکان وارد کرده؛ ممکن است پروتکل (`https://`) نداشته باشد یا آدرس یک صفحه‌ شبکه‌ اجتماعی باشد. پیش از استفاده به‌عنوان لینک، آن را اعتبارسنجی و در صورت نیاز نرمال‌سازی کنید.

### آبجکت `workHours` (درون آرایه)

| پارامتر | توضیحات | نوع داده |
| --- | --- | --- |
| `day` | نام روز هفته (مثلاً شنبه). | String |
| `ranges` | آرایه‌ای از بازه‌های زمانی کاری در آن روز؛ هر بازه شامل `start` و `end` است. | Array of Objects |

نکته

اگر `ranges` یک روز **آرایه‌ خالی** باشد، آن مکان در آن روز تعطیل است؛ در نمونه‌ بالا روز جمعه این حالت را دارد. یک روز می‌تواند بیش از یک بازه هم داشته باشد (مثلاً تعطیلی میان‌روز)، پس آرایه را پیمایش کنید و به وجود تنها یک بازه تکیه نکنید.

### آبجکت `layer`

| پارامتر | توضیحات | نوع داده |
| --- | --- | --- |
| `slug` | شناسه (slug) دسته‌بندی. | String |
| `title` | عنوان فارسی دسته‌بندی (مثلاً داروخانه). | String |
| `icon` | آدرس آیکون دسته‌بندی. | String |

### آبجکت `location`

| پارامتر | توضیحات | نوع داده |
| --- | --- | --- |
| `x` | طول جغرافیایی مکان (longitude). | Double |
| `y` | عرض جغرافیایی مکان (latitude). | Double |

هشدار

دقت کنید که ترتیب این دو فیلد برعکس چیزی است که در بسیاری از سرویس‌های دیگر نشان می‌بینید: `x` **طول** جغرافیایی است و `y` **عرض** جغرافیایی. اگر این دو را جابه‌جا کنید، نقطه به جای تهران در جایی وسط عربستان می‌افتد.

## کد خطاهای سرویس

در صورت بروز خطا، کدهای HTTP زیر بازگردانده می‌شوند. خطاهای عمومی سرویس‌ها نیز در این سرویس صدق می‌کند.

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
| 404 | NOT\_FOUND | عدم ارسال درخواست به آدرس صحیح |
