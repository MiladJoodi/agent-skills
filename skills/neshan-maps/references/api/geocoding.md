---
source: https://platform.neshan.org/docs/api/search-category/geocoding/
title: Geocoding API
---

آخرین نسخهنسخه 6.0.0نسخه 4.0.0

# سرویس تبدیل آدرس متنی به مختصات جغرافیایی (ژئوکدینگ - Geocoding)

اطلاع

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات آخرین نسخه سرویس تبدیل آدرس به موقعیت می‌باشد.
مستندات مرتبط با نسخه‌های قدیمی این سرویس را در صفحات نسخه 6.0.0 و نسخه 4.0.0 می‌توانید مشاهده کنید.

اطلاع

1. ۱

   اولین قدم [ثبت‌نام و دریافت API KEY](https://platform.neshan.org/panel) برای اپلیکیشنی است که قصد دارید در آن از Map Api نشان استفاده کنید. کافیست در لینک فوق فرم مربوطه را تکمیل کنید تا بلافاصله API KEY را دریافت نمایید.
2. ۲

   Api Key دریافتی از پنل توسعه‌دهندگان نشان را به صورتی که در ادامه مشاهده می‌کنید از طریق کلید Api-Key در header درخواست سرویس بگنجانید.
3. ۳

   درخواست خود را با توجه به پارامترهایی که مربوط به سرویس موردنظرتان است با متد GET فراخوانی کنید.
4. ۴

   چنانچه درخواست شما با موفقیت پردازش و پاسخ داده شود، خروجی با فرمت JSON دریافت خواهید کرد و چنانچه به هر دلیل خطایی رخ دهد، کد خطا بصورت HTTP Status Code و نوع آن با فرمت JSON ارسال می‌گردد. کدهای خطای احتمالی نیز در ادامه به صورت کامل توضیح داده شده‌اند.

## معرفی سرویس

سرویس تبدیل آدرس به موقعیت (Geocoding API) امکان تبدیل هر آدرس متنی (مثل نام خیابان، شماره پلاک، نام محله یا حتی نقطه‌ شاخصی مثل یک مرکز خرید) را به مختصات جغرافیایی فراهم می‌کند. این سرویس در فرایندهای ثبت و تصحیح موقعیت مکانی کاربران، کاربرد گسترده‌ای برای کسب‌وکارها دارد.

**پیش از معرفی جزئیات فنی سرویس، بهتر است به روش‌های رایج آدرس‌دهی و چالش‌های آن اشاره کنیم.**

آدرس‌های متنی که معمولا در سامانه‌ها و کسب‌وکارها مورد استفاده قرار می‌گیرند را می‌توانیم به دو دسته تقسیم کنیم:

۱. آدرس‌های مبتنی بر اطلاعات پستی (برگرفته از سرویس‌های کد پستی)

۲. آدرس‌های واردشده توسط کاربران (آدرس‌های عام)

هرکدام از این دسته‌ها، ویژگی‌ها و چالش‌های مخصوص به خود را دارند. به‌عنوان مثال، آدرس‌های پستی معمولا استاندارد هستند، اما ممکن است برای کاربران ناآشنا باشند؛ در نتیجه، کاربران آدرس یک نقطه را به شکلی که بهتر می‌شناسند ثبت می‌کنند که ممکن است دقیقا منطبق بر آدرس پستی آن نقطه نباشد. برای نمونه، منطقه «جردن» در آدرس‌های پستی با محله «امانیه» شناخته می‌شود:

| استان تهران، شهر تهران، امانیه بلوار نلسون ماندلا/خیابان گلفام، پلاک 68، طبقه -1، کد پستی:1915673491 |
| --- |
| استان تهران، شهر تهران، **امانیه** بلوار نلسون ماندلا/خیابان تندیس، پلاک -2، طبقه همکف، کد پستی:1915613491 |

در آدرس‌های عام، کاربران براساس شناخت شخصی که از یک منطقه و عوارض شهری دارند، ممکن است همان موقعیت را به شیوه‌های مختلف بیان کنند (به‌طور مثال: نرسیده به چهارراه، بعد از میدان، بعد از بریدگی دوم) یا از مکان‌های مهم به‌عنوان نشانه در آدرس‌دهی استفاده کنند (مانند: جنب بانک، رو‌به‌روی هتل و …). این تنوع در بیان، فرایند تشخیص و تطبیق آدرس را پیچیده می‌کند و نیازمند پردازش هوشمند متن است.

## رویکرد نشان در تبدیل آدرس به مختصات

سرویس ژئوکدینگ نشان در دو سرویس **عادی** و **پلاس** با تحلیل متن کامل آدرس و استفاده از اطلاعات تکمیلی ارسالی توسط کاربر، دقیق‌ترین مختصات ممکن را شناسایی می‌کند و تا ۵ نتیجه پیشنهادی را ارائه می‌دهد.

|  | **سرویس تبدیل آدرس به مختصات عادی** | **سرویس تبدیل آدرس به مختصات پلاس** |
| --- | --- | --- |
| امکان تبدیل آدرس متنی به آدرس تا آخرین معبر اصلی | ✓ | ✓ |
| امکان دریافت محدوده جستجو براساس استان و شهر | ✓ | ✓ |
| امکان دریافت کادر جستجو در یک ناحیه مرزی مشخص (bounding-box) | ✓ | ✓ |
| امکان جستجو آدرس در حول یک مرکز جستجو | ✓ | ✓ |
| **امکان آدرس‌یابی بر اساس پلاک ساختمان‌ها (در شهرهای تهران، مشهد، کرج، اصفهان و اهواز)** | - | ✓ |
| **در نظر گرفتن اطلاعات مکانی ثبت‌شده در نشان (در نظر گرفتن POIها)** | - | ✓ |

## چطور دقت سرویس را برای رسیدن به نتایج بهتر افزایش دهیم؟

برای بهبود دقت، پیشنهاد می‌کنیم در زمان ارسال آدرس، اطلاعات زیر را در فیلدهای مشخص‌شده‌ در قسمت درخواست، وارد کنید. اگرچه ارسال این اطلاعات **اختیاری** است، اما به دریافت خروجی دقیق‌تر کمک بزرگی می‌کند:

- استان
- شهر
- کادر مورد نظر کاربر برای جستجو (Bounding Box)
- مختصات مرکز جستجو

این پارامترها به‌عنوان فیلتر عمل می‌کنند:

- **استان و شهر:** نتایج را به محدوده‌ جغرافیایی مشخص‌شده محدود می‌کنند.
- **کادر جستجو (Bounding Box):** خروجی را به یک چارچوب معین محدود می‌کند.
- **مختصات مرکز جستجو:** دقیق‌ترین نتایج را در اطراف نقطه‌ مرکزی ارائه می‌دهد.
- **بدون فیلتر:** درصورتی‌که هیچ‌ کدام از این موارد ارسال نشوند، سرویس تنها براساس تحلیل متن آدرس، بهترین تطابق را پیدا می‌کند.

**اولویت اعمال محدودیت پاسخ:**

در زمان تشخیص موقعیت براساس آدرس واردشده، خروجی بر اساس توکن‌های موجود در آدرس تشخیص داده می‌شود. توصیه ما این است که این توکن‌ها به‌ترتیب از سطح بالا تا آخرین معبر اصلی وارد شود (مثلا استان، شهر، محله و…). در آدرس‌های پستی، وارد کردن گشت کدپستی **( ۵ رقم ابتدایی کد پستی)** می‌تواند به تولید خروجی دقیق‌تر کمک کند.

در هر مرحله از فرایند تشخیص توکن، درصورتی‌که سرویس نتواند براساس متن آدرس واردشده خروجی را تولید کند، تمامی قسمت‌ها و توکن‌هایی که در فرایند تولید آدرس استفاده نشده است، برای کاربر بازگشت داده می‌شود. این مرحله، کاربر را از اینکه **چه بخش‌هایی در خروجی ایجادشده دخیل نبوده است،** آگاه می‌کند تا اگر ایراداتی در این بخش‌ها وجود دارد یا نیازمند تغییراتی هستند، ویرایش‌های لازم روی آن‌ها انجام شود.

## شیوه‌ فراخوانی

### آدرس Endpoint

**سرویس عادی:**

```http
https://api.neshan.org/geocoding/v1
```

**سرویس پلاس (جستجو با در نظر گرفتن کد پستی و پلاک ثبت‌شده در آدرس):**

```http
https://api.neshan.org/geocoding/v1/plus
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

ورودی این درخواست یک json با پارامترهای جدول زیر است:

| پارامتر | نوع داده (Data Type) | توضیحات |  |
| --- | --- | --- | --- |
| address | String | آدرس مورد نظر کاربر برای موقعیت‌یابی | **اجباری** |
| province | String | استان | اختیاری |
| city | String | شهر | اختیاری |
| extent | Object | ناحیه مورد نظر برای جستجو، شامل دو نقطه شمال شرقی و جنوب غربی | اختیاری |
| location | Object | مرکز جستجو | اختیاری |

#### ساختار آبجکت location:

| پارامتر | نوع داده | اجباری/اختیاری | توضیحات | مثال |
| --- | --- | --- | --- | --- |
| latitude | Float | اجباری | عرض جغرافیایی | 35.6892 |
| longitude | Float | اجباری | طول جغرافیایی | 51.3890 |

#### ساختار آبجکت extent:

| پارامتر | نوع داده | اجباری/اختیاری | توضیحات | مثال |
| --- | --- | --- | --- | --- |
| southWest | Location | اجباری | مختصات جنوب غربی محدوده | `{"latitude": 35.5, "longitude": 51.2}` |
| northEast | Location | اجباری | مختصات شمال شرقی محدوده | `{"latitude": 35.8, "longitude": 51.6}` |

## نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --location --globoff 'https://api.neshan.org/geocoding/v1/plus?json={
  "address": "تهران بلوار ستارخان خیابان داوود اسدی رحیمی",
  "city": "تهران",
  "province": "تهران",
  "location": {
    "latitude": 35.6892,
    "longitude": 51.3890
  },
  "extent": {
    "southWest": {"latitude": 35.5, "longitude": 51.2},
    "northEast": {"latitude": 35.8, "longitude": 51.6}
  }
}' \
--header 'Content-Type: application/json' \
--header 'Api-Key: YOUR_API_KEY'
```

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Api-Key", "YOUR_API_KEY");

const requestData = {
  address: "تهران بلوار ستارخان خیابان داوود اسدی رحیمی",
  city: "تهران",
  province: "تهران",
  location: {
    latitude: 35.6892,
    longitude: 51.3890
  },
  extent: {
    southWest: { latitude: 35.5, longitude: 51.2 },
    northEast: { latitude: 35.8, longitude: 51.6 }
  }
};

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://api.neshan.org/geocoding/v1/plus?json=${encodeURIComponent(JSON.stringify(requestData))}`, requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

```java
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

OkHttpClient client = new OkHttpClient();

String json = "{\"address\":\"تهران بلوار ستارخان خیابان داوود اسدی رحیمی\",\"city\":\"تهران\",\"province\":\"تهران\",\"location\":{\"latitude\":35.6892,\"longitude\":51.3890},\"extent\":{\"southWest\":{\"latitude\":35.5,\"longitude\":51.2},\"northEast\":{\"latitude\":35.8,\"longitude\":51.6}}}";
String encodedJson = URLEncoder.encode(json, StandardCharsets.UTF_8);

Request request = new Request.Builder()
  .url("https://api.neshan.org/geocoding/v1/plus?json=" + encodedJson)
  .addHeader("Content-Type", "application/json")
  .addHeader("Api-Key", "YOUR_API_KEY")
  .build();

Response response = client.newCall(request).execute();
System.out.println(response.body().string());
```

```csharp
using System;
using System.Net.Http;
using System.Web;
using System.Text.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

var client = new HttpClient();

var requestData = new Dictionary<string, object>
{
    ["address"] = "تهران بلوار ستارخان خیابان داوود اسدی رحیمی",
    ["city"] = "تهران",
    ["province"] = "تهران",
    ["location"] = new Dictionary<string, double>
    {
        ["latitude"] = 35.6892,
        ["longitude"] = 51.3890
    },
    ["extent"] = new Dictionary<string, object>
    {
        ["southWest"] = new Dictionary<string, double> { ["latitude"] = 35.5, ["longitude"] = 51.2 },
        ["northEast"] = new Dictionary<string, double> { ["latitude"] = 35.8, ["longitude"] = 51.6 }
    }
};

string jsonString = JsonSerializer.Serialize(requestData);
string encodedJson = HttpUtility.UrlEncode(jsonString);
string url = $"https://api.neshan.org/geocoding/v1/plus?json={encodedJson}";

var request = new HttpRequestMessage(HttpMethod.Get, url);
request.Headers.Add("Api-Key", "YOUR_API_KEY");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests
import json
from urllib.parse import urlencode

request_data = {
    "address": "تهران بلوار ستارخان خیابان داوود اسدی رحیمی",
    "city": "تهران",
    "province": "تهران",
    "location": {
        "latitude": 35.6892,
        "longitude": 51.3890
    },
    "extent": {
        "southWest": {"latitude": 35.5, "longitude": 51.2},
        "northEast": {"latitude": 35.8, "longitude": 51.6}
    }
}

json_string = json.dumps(request_data, ensure_ascii=False)
url = f"https://api.neshan.org/geocoding/v1/plus?json={requests.utils.quote(json_string)}"

headers = {
    'Content-Type': 'application/json',
    'Api-Key': 'YOUR_API_KEY'
}

response = requests.get(url, headers=headers)

print(response.text)
```

```php
<?php

$jsonParam = json_encode([
    "address" => "تهران بلوار ستارخان خیابان داوود اسدی رحیمی",
    "city" => "تهران",
    "province" => "تهران",
    "location" => [
        "latitude" => 35.6892,
        "longitude" => 51.3890
    ],
    "extent" => [
        "southWest" => ["latitude" => 35.5, "longitude" => 51.2],
        "northEast" => ["latitude" => 35.8, "longitude" => 51.6]
    ]
]);

$encodedJson = urlencode($jsonParam);
$url = "https://api.neshan.org/geocoding/v1/plus?json=" . $encodedJson;

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
    'Content-Type: application/json',
    'Api-Key: YOUR_API_KEY'
  ),
));

$response = curl_exec($curl);
curl_close($curl);

echo $response;

?>
```

## فرمت پاسخ

```json
{
  "items": [
    {
      "location": {
        "latitude": 35.719934,
        "longitude": 51.340742
      },
      "province": "تهران",
      "city": "تهران",
      "neighbourhood": "صادقیه",
      "unMatchedTerm": ""
    },
    {
      "location": {
        "latitude": 35.721686,
        "longitude": 51.343201
      },
      "province": "تهران",
      "city": "تهران",
      "neighbourhood": "صادقیه",
      "unMatchedTerm": "رحیمی"
    },
    {
      "location": {
        "latitude": 35.710275,
        "longitude": 51.372291
      },
      "province": "تهران",
      "city": "تهران",
      "neighbourhood": "توحید",
      "unMatchedTerm": "خیابان داوود اسدی رحیمی"
    },
    {
      "location": {
        "latitude": 35.689809,
        "longitude": 51.445475
      },
      "province": "تهران",
      "city": "تهران",
      "neighbourhood": "ایران",
      "unMatchedTerm": ""
    },
    {
      "location": {
        "latitude": 35.721654,
        "longitude": 51.343876
      },
      "province": "تهران",
      "city": "تهران",
      "neighbourhood": "صادقیه",
      "unMatchedTerm": "رحیمی"
    }
  ]
}
```

### اجزای پاسخ

| نام پارامتر (Field) | نوع داده (Data Type) | توضیحات (Description) | مثال (Example) |
| --- | --- | --- | --- |
| items | Array | لیستی از نتایج یافت‌شده برای آدرس مورد نظر. | `[...]` |
| location | Object | شیء حاوی مختصات جغرافیایی مکان یافت‌شده. | `{...}` |
| location.latitude | Number | عرض جغرافیایی نقطه مکانی. | 35.720997 |
| location.longitude | Number | طول جغرافیایی نقطه مکانی. | 51.460834 |
| province | String | نام استانی که مکان در آن قرار دارد. | "تهران" |
| city | String | نام شهری که مکان در آن قرار دارد. | "تهران" |
| neighbourhood | String | نام محله یا منطقه شهری شناسایی‌شده. | "ارامنه شمالی" |
| unMatchedTerm | String | بخشی از آدرس ورودی که سرویس نتوانسته آن را با نقشه تطبیق دهد | "، نبش خالقی" |

## نکات تکمیلی

**unMatchedTerm:** این فیلد بسیار کاربردی است. اگر کاربر آدرس دقیقی را وارد کند (به‌عنوان مثال "تهران، ارامنه، خیابان پلیس، پلاک ۱۰")، ممکن است نقشه بخشی از این آدرس را شناسایی کند که در این‌صورت، بخشی که شناسایی نشده (به‌عنوان مثال "پلاک ۱۰")، در این فیلد قرار می‌گیرد.

با استفاده از این فیلد می‌توانید به کاربر نشان دهید کدام بخش از آدرس روی نقشه پیدا نشده است؛ همچنین در فرایندهای خود می‌توانید نتیجه‌گیری‌های لازم را به‌طور دقیق‌تری براساس این فیلد به‌دست آورید تا صحت نتایج را بهتر مد نظر قرار دهید.

**چند نتیجه‌ای بودن (Items):** از آنجایی‌که items یک آرایه است، ممکن است سرویس برای یک آدرس ناقص، چندین پیشنهاد مختلف بازگرداند که به‌ترتیب جواب‌های مرتبط‌تر در اولویت بالاتری قرار می‌گیرند.

## کد خطاهای سرویس

| Http Code | Status | Description |
| --- | --- | --- |
| 400 | INVALID\_ARGUMENT | خطا در پارامترهای ورودی |
| 470 | CoordinateParseError | چنانچه مختصات جغرافیایی ارسالی معتبر نباشد، این خطا رخ خواهد داد. |
| 480 | KeyNotFound | در صورتی‌که در فراخوانی وب‌سرویس از یک Api Key نامعتبر استفاده کنید یا Api Key خود را در header ارسال نکنید، با این خطا مواجه می‌شوید. |
| 481 | LimitExceeded | در صورتی‌که تعداد فراخوانی وب‌سرویس‌ها از میزان مجازی که برای شما تعیین شده‌، عبور کند شاهد این خطا خواهید بود. |
| 482 | RateExceeded | چنانچه تعداد درخواست وب‌سرویس در دقیقه از حد مجاز عبور کند، این خطا رخ خواهد داد. |
| 483 | ApiKeyTypeError | کلید دسترسی استفاده‌شده با سرویس فراخوانی‌شده همخوانی ندارد. باید از کلید دسترسی مرتبط با سرویس مورد نظر استفاده کنید. |
| 484 | ApiWhiteListError | با توجه به اسکوپ تعریف‌شده برای این کلید، شما مجاز به استفاده نیستید. |
| 485 | ApiServiceListError | سرویس فراخوانی‌شده، با سرویس‌های تعریف‌شده برای این کلید دسترسی، همخوانی ندارد. |
| 500 | GenericError | وقوع خطای ناشناخته |
