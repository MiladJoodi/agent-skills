---
source: https://platform.neshan.org/docs/api/search-category/search/
title: سرویس جستجوی مکان‌مبنای نشان
---

آخرین نسخهنسخه 1.0.0

# سرویس جستجوی مکان‌مبنا (Search API)

اطلاع

صفحه‌ای که در حال مشاهده آن هستید، حاوی مستندات آخرین نسخه سرویس جستجوی مکان‌مبنا می‌باشد.
مستندات مرتبط با نسخه قدیمی این سرویس را در صفحه نسخه 1.0.0 می‌توانید مشاهده کنید.

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
https://api.neshan.org/v3/search
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

پارامتر اصلی ورودی `q` است که حاوی یک آبجکت JSON شامل عبارت جستجو و مختصات نقطه مرجع است. این آبجکت باید پیش از ارسال، URL-encode شود.

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `q` | رشته JSON شامل پارامترهای جستجو. | **اجباری** |

#### اجزای آبجکت `q`

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `term` | عبارت مورد نظر برای جستجو. | **اجباری** |
| `center` | یک آبجکت شامل مختصات نقطه مرجع برای مرکز جستجو. | **اجباری** |

#### اجزای آبجکت `center` (درون `q`)

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `latitude` | عرض جغرافیایی نقطه مرجع. | **اجباری** |
| `longitude` | طول جغرافیایی نقطه مرجع. | **اجباری** |

نکته

نقطه‌ مرجع می‌تواند موقعیت فعلی کاربر یا مرکز نقشه‌ای باشد که در حال مشاهده آن است. ارسال این پارامتر برای نمایش موقعیت‌های اطراف الزامی می‌باشد.

## نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
# آدرس درخواست به‌صورت decode‌شده:
# https://api.neshan.org/v3/search?q={"term":"تهران، میدان تجریش","center":{"latitude":35.8069995955,"longitude":51.428789156}}

curl --location --globoff 'https://api.neshan.org/v3/search?q=%7B%22term%22%3A%22%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C%20%D9%85%DB%8C%D8%AF%D8%A7%D9%86%20%D8%AA%D8%AC%D8%B1%DB%8C%D8%B4%22%2C%22center%22%3A%7B%22latitude%22%3A35.8069995955%2C%22longitude%22%3A51.428789156%7D%7D' \
--header 'Api-Key: <YOUR_API_KEY>'
```

```javascript
const myHeaders = new Headers();
myHeaders.append("Api-Key", "<YOUR_API_KEY>");

// آبجکت JSON مربوط به پارامتر q
const query = {
  term: "تهران، میدان تجریش",
  center: {
    latitude: 35.8069995955,
    longitude: 51.428789156
  }
};

const encodedQuery = encodeURIComponent(JSON.stringify(query));

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://api.neshan.org/v3/search?q=${encodedQuery}`, requestOptions)
  .then((response) => response.text())
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

String query = "{\"term\":\"تهران، میدان تجریش\",\"center\":{\"latitude\":35.8069995955,\"longitude\":51.428789156}}";
String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);

Request request = new Request.Builder()
  .url("https://api.neshan.org/v3/search?q=" + encodedQuery)
  .addHeader("Api-Key", "<YOUR_API_KEY>")
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

var query = new Dictionary<string, object>
{
    ["term"] = "تهران، میدان تجریش",
    ["center"] = new Dictionary<string, double>
    {
        ["latitude"] = 35.8069995955,
        ["longitude"] = 51.428789156
    }
};

string jsonString = JsonSerializer.Serialize(query);
string encodedQuery = HttpUtility.UrlEncode(jsonString);
string url = $"https://api.neshan.org/v3/search?q={encodedQuery}";

var request = new HttpRequestMessage(HttpMethod.Get, url);
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests
import json
import urllib.parse

# آبجکت JSON مربوط به پارامتر q
query = {
    "term": "تهران، میدان تجریش",
    "center": {
        "latitude": 35.8069995955,
        "longitude": 51.428789156
    }
}

encoded_query = urllib.parse.quote(json.dumps(query, ensure_ascii=False))
url = f"https://api.neshan.org/v3/search?q={encoded_query}"

headers = {
    'Api-Key': '<YOUR_API_KEY>'
}

response = requests.get(url, headers=headers)

print(response.text)
```

```php
<?php

$query = json_encode([
    "term" => "تهران، میدان تجریش",
    "center" => [
        "latitude" => 35.8069995955,
        "longitude" => 51.428789156
    ]
], JSON_UNESCAPED_UNICODE);

$url = "https://api.neshan.org/v3/search?q=" . urlencode($query);

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

پاسخ سرویس در قالب یک آبجکت JSON بازگردانده می‌شود. در نمونه‌ زیر، برای اختصار ۸ نتیجه‌ اول از ۱۹ نتیجه‌ بازگشتی این درخواست نمایش داده شده است.

```json
{
  "count": 19,
  "items": [
    {
      "title": "میدان تجریش",
      "address": "میدان تجریش",
      "category": "place",
      "type": "town_square",
      "region": "تهران، استان تهران",
      "neighbourhood": "",
      "location": {
        "x": 51.42885773612889,
        "y": 35.80698735620152
      },
      "poiHash": "m9ycZYMyEDXwGRNsy-HfJjy0crsnk-fP-3_xgWA53DErRHSpAiiLu-lym_JX0iaq1c9Q8pWsLl8scjIDdT7gxw"
    },
    {
      "title": "ایستگاه پلیس میدان تجریش",
      "address": "ولیعصر، دربندی",
      "category": "place",
      "type": "police",
      "region": "تهران، استان تهران",
      "neighbourhood": "محله تجریش",
      "location": {
        "x": 51.42926825823118,
        "y": 35.806566737765394
      },
      "poiHash": "yNa-B1Wc9u5sRxeXELqi7AeYt8ZwpIjJrCXm0wWGG9crRHSpAiiLu-lym_JX0iaq5w2-tKkN-wXcUQN9KD928A"
    },
    {
      "title": "داروخانه میدان تجریش",
      "address": "شهرداری، زعیم",
      "category": "place",
      "type": "pharmacy",
      "region": "تهران، استان تهران",
      "neighbourhood": "",
      "location": {
        "x": 51.429683597299295,
        "y": 35.806801040812374
      },
      "poiHash": "wXtqMQxZnBicNffFbj37mUMdyo_92YTV2jf6sB110zUrRHSpAiiLu-lym_JX0iaqr5QiD7k_I9F9qz-w0HI5Qg"
    },
    {
      "title": "فروشگاه کفش ملی شعبه میدان تجریش",
      "address": "شهرداری، زعیم",
      "category": "place",
      "type": "shoe_store",
      "region": "تهران، استان تهران",
      "neighbourhood": "",
      "location": {
        "x": 51.42972451415558,
        "y": 35.806768135174806
      },
      "poiHash": "CtUlXVF7hBl4wanBUJc7f3l_JwrVGDPAIqz5h7xeYJQrRHSpAiiLu-lym_JX0iaq1Dd1XTJYrYRXGqr_ccnnSw"
    },
    {
      "title": "بیمه ایران میدان تجریش",
      "address": "شهرداری، زعیم",
      "category": "place",
      "type": "insurance_agency",
      "region": "تهران، استان تهران",
      "neighbourhood": "محله تجریش",
      "location": {
        "x": 51.43005370858895,
        "y": 35.806404429269236
      },
      "poiHash": "ggB6afGcJRUXfc4BzLbK_KrhqMEf0sUFt36hJFBcrDkrRHSpAiiLu-lym_JX0iaqucCnJDzkjskySJIIWwnc_g"
    },
    {
      "title": "بازار میوه و تره بار تجریش",
      "address": "ولیعصر، جلالوند",
      "category": "place",
      "type": "vegetable_market",
      "region": "تهران، استان تهران",
      "neighbourhood": "",
      "location": {
        "x": 51.42828510000002,
        "y": 35.808315700000016
      },
      "poiHash": "kxLx0a1gT_0JWI5iJ_nXs32QU70Gx4nFTUJ2hIW3oRIrRHSpAiiLu-lym_JX0iaq83PESnXEWB3RoNMf2YSmUQ"
    },
    {
      "title": "بانک تجارت (میدان تجریش)",
      "address": "شهرداری",
      "category": "place",
      "type": "bank",
      "region": "تهران، استان تهران",
      "neighbourhood": "محله تجریش",
      "location": {
        "x": 51.43192291259766,
        "y": 35.80565643310546
      },
      "poiHash": "7g0UsSjHVgzXvTTh_ctDr-b-Dszz8jembz0iP557Zy0rRHSpAiiLu-lym_JX0iaq0Hjz2H-H5mMkGEq3o-ulYg"
    },
    {
      "title": "میدان قدس",
      "address": "باهنر",
      "category": "municipal",
      "type": "roundabout",
      "region": "تهران، استان تهران",
      "neighbourhood": "محله تجریش",
      "location": {
        "x": 51.4340203,
        "y": 35.8047944
      },
      "poiHash": "K0R0qQIoi7vpcpvyV9Imqsr2rD0JInXAHUSOFGu6wF4"
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
| `poiHash` | هش منحصربه‌فرد مکان (برای مکان‌های تاییدشده در نشان). این مقدار ورودی سرویس دریافت اطلاعات مکان‌های شاخص است. |

نکته

با استفاده از مقدار `poiHash` هر نتیجه می‌توانید جزئیات کامل آن مکان (شماره تماس، وبسایت، ساعات کاری، دسته‌بندی و …) را از سرویس دریافت اطلاعات مکان‌های شاخص بگیرید.

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
