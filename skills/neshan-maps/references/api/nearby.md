---
source: https://platform.neshan.org/docs/api/search-category/nearby/
title: Nearby Search API
---

# سرویس جستجوی مکان‌های نزدیک (Nearby Search)

با این سرویس، نزدیک‌ترین مکان‌های یک **دسته‌بندی مشخص** (مثلاً بوستان، بیمارستان، ایستگاه مترو یا داروخانه) را در شعاع دلخواه از یک موقعیت جغرافیایی پیدا می‌کنید و برای هر مکان، نام، مختصات، مسافت و زمان رسیدن را دریافت می‌کنید.

کاربرد آن جایی است که کاربر می‌پرسد «نزدیک‌ترین … کجاست؟»: نمایش امکانات اطراف یک ملک، پیدا کردن نزدیک‌ترین شعبه یا مرکز خدماتی، و هر سناریویی که در آن باید فهرستی از مکان‌های یک دسته را بر اساس نزدیکی به کاربر نشان دهید.

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
https://api.neshan.org/v1/nearby
```

### هدرهای درخواست (Headers)

```http
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

پارامترها در رشته‌ کوئری (Query String) ارسال می‌شوند:

| پارامتر | نوع داده | توضیحات | نوع پارامتر |
| --- | --- | --- | --- |
| `location` | String | موقعیت مبدا با فرمت `latitude,longitude` (مثلاً `32.657307,51.677579`). | **اجباری** |
| `layer` | String | نام لایه یا دسته‌بندی مکانی که جستجو در آن انجام می‌شود؛ فهرست کامل در پایین همین صفحه آمده است. | **اجباری** |
| `searchRadius` | Integer | شعاع جستجو بر حسب متر. | **اجباری** |

یادداشت

کاراکتر کاما در مقدار `location` جداکننده‌ عرض و طول جغرافیایی است. اگر کتابخانه‌ شما مقدار پارامترها را encode می‌کند، این کاما به `%2C` تبدیل می‌شود که کاملاً درست است و سرویس هر دو شکل را می‌پذیرد.

## نمونه درخواست

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --location 'https://api.neshan.org/v1/nearby?location=32.657307,51.677579&layer=park&searchRadius=1200' \
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

fetch("https://api.neshan.org/v1/nearby?location=32.657307,51.677579&layer=park&searchRadius=1200", requestOptions)
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
  .url("https://api.neshan.org/v1/nearby?location=32.657307,51.677579&layer=park&searchRadius=1200")
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

var request = new HttpRequestMessage(HttpMethod.Get, "https://api.neshan.org/v1/nearby?location=32.657307,51.677579&layer=park&searchRadius=1200");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/v1/nearby?location=32.657307,51.677579&layer=park&searchRadius=1200"

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
  CURLOPT_URL => 'https://api.neshan.org/v1/nearby?location=32.657307,51.677579&layer=park&searchRadius=1200',
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

در صورت موفقیت و وجود حداقل یک نتیجه در شعاع مشخص‌شده، پاسخ به شکل زیر بازگردانده می‌شود:

```json
{
  "layerPoints": {
    "layer": {
      "farsiTitle": "بوستان",
      "icon": "https://static.neshanmap.ir/poi/64/park.png",
      "slug": "park"
    },
    "nearestPoints": [
      {
        "distance": 2828,
        "duration": 471,
        "location": {
          "latitude": 32.65758359999999,
          "longitude": 51.675046300000005
        },
        "name": "پارک استانداری",
        "poiHash": "Twv1A2RG1HVVYxRqAQfHeKgMLEtfGNuHURi8GBdD6iVqdcX-EE0KnTO0MobBxezpgeLBNt9QZS532FawuD1FbA"
      },
      {
        "distance": 2937,
        "duration": 486,
        "location": {
          "latitude": 32.6579886,
          "longitude": 51.6753564
        },
        "name": "بوستان مشاهیر صفوی",
        "poiHash": "8D4tOlj4fldYt_1QQ_fKuVNbJFcTu2HIbjRc_bgVA4FqdcX-EE0KnTO0MobBxezpGPnZnujTdC_IgeTPlWjU1g"
      },
      {
        "distance": 3085,
        "duration": 514,
        "location": {
          "latitude": 32.65512069999999,
          "longitude": 51.67072830000001
        },
        "name": "پارک شهید رجایی",
        "poiHash": "8z-NNbsPp0GcWwtezwnNbcyFTFpqUmqGC0EwekKqjohqdcX-EE0KnTO0MobBxezpAL6buG9vnS4-uTyO2vNegw"
      },
      {
        "distance": 3281,
        "duration": 535,
        "location": {
          "latitude": 32.654284,
          "longitude": 51.6702465
        },
        "name": "بوستان هشت بهشت",
        "poiHash": "6F1lYKQUHBCwxnP7LV3kCinYE86WJFmP-TjVM8ewPJNqdcX-EE0KnTO0MobBxezpK1ckr-sYUUuIGpDp5DtlCg"
      }
    ]
  }
}
```

## اجزای پاسخ

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `layerPoints` | Object | آبجکت نتیجه، شامل اطلاعات لایه و فهرست نزدیک‌ترین نقاط. |

### آبجکت `layer`

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `slug` | String | نام انگلیسی لایه (همان مقداری که در پارامتر `layer` فرستادید). |
| `farsiTitle` | String | عنوان فارسی لایه. |
| `icon` | String | آدرس آیکون لایه. |

### آبجکت `nearestPoints` (درون آرایه)

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `name` | String | نام مکان. |
| `location` | Object | مختصات مکان با فیلدهای `latitude` و `longitude`. |
| `distance` | Integer | مسافت تا مبدا بر حسب متر. |
| `duration` | Integer | زمان تخمینی رسیدن به مکان بر حسب ثانیه. |
| `poiHash` | String | هش منحصربه‌فرد مکان. این مقدار ورودی سرویس دریافت اطلاعات مکان‌های شاخص است. |

یادداشت

نتایج به‌ترتیب نزدیکی مرتب شده‌اند. مقدار `distance` مسافت پیمایش تا مکان است، نه فاصله‌ مستقیم؛ به همین دلیل می‌تواند از عددی که در `searchRadius` فرستاده‌اید بزرگ‌تر باشد (در نمونه‌ بالا شعاع ۱۲۰۰ متر است ولی مسافت‌ها بین ۲۸۰۰ تا ۳۳۰۰ متر هستند، در حالی که فاصله‌ مستقیم همه‌ این نقاط کمتر از ۱۲۰۰ متر است). پس برای فیلتر کردن بر اساس فاصله‌ هوایی به `distance` تکیه نکنید.

نکته

با استفاده از مقدار `poiHash` هر نتیجه می‌توانید جزئیات کامل آن مکان (شماره تماس، وبسایت، ساعات کاری، دسته‌بندی و …) را از سرویس دریافت اطلاعات مکان‌های شاخص بگیرید.

## فهرست لایه‌های موجود

مقدار پارامتر `layer` باید یکی از مقادیر ستون اول باشد:

| نام لایه | عنوان فارسی |
| --- | --- |
| `airline` | شرکت هواپیمایی |
| `airport` | فرودگاه |
| `bank` | بانک |
| `cafe` | کافی‌شاپ |
| `cafe_restaurant` | کافه رستوران |
| `campground` | اردوگاه |
| `car_dealer_official` | نمایندگی خودرو |
| `car_inspection` | معاینه فنی |
| `charity` | موسسه خیریه |
| `cinema` | سالن و پردیس سینمایی |
| `city_hall` | مرکز همایش و سالن اجتماعات |
| `clinic` | درمانگاه |
| `college` | دانشکده |
| `commercial_complex` | مجتمع تجاری اداری |
| `company` | شرکت خصوصی |
| `courthouse` | دادگاه |
| `embassy` | سفارت |
| `entertainment` | تفریح و سرگرمی |
| `finance` | موسسه مالی و اعتباری |
| `foreign_consulate` | کنسولگری |
| `formal_school` | مدرسه |
| `garden` | باغ |
| `gym` | مجموعه ورزشی |
| `health_complex` | مجتمع پزشکی |
| `helal_ahmar` | هلال احمر |
| `historical` | مکان تاریخی |
| `hospital` | بیمارستان |
| `hotel` | هتل |
| `industrial_zone` | منطقه و شهرک صنعتی |
| `interests` | مکان دیدنی |
| `international_expo` | نمایشگاه بین المللی |
| `juice_shop` | آبمیوه و بستنی |
| `library` | کتابخانه |
| `local_government_office` | اداره و سازمان دولتی |
| `lodging` | مهمانپذیر و پانسیون |
| `lodging_tourist` | اقامتگاه بومگردی |
| `marriage_registration_office` | دفتر رسمی ازدواج و طلاق |
| `mosque` | مسجد |
| `movie_theater` | سالن نمایش و آمفی تئاتر |
| `natural_feature` | جاذبه طبیعی |
| `notary_public` | دفتر اسناد رسمی |
| `park` | بوستان |
| `bus_station` | ایستگاه اتوبوس |
| `metro_entrance` | ایستگاه مترو |
| `parking` | پارکینگ |
| `pool` | استخر شنا |
| `post_office` | اداره پست |
| `post_service` | خدمات پست و حمل بار هوایی |
| `restaurant` | رستوران |
| `school` | موسسه آموزشی |
| `shopping_mall` | بازار و مرکز خرید |
| `stadium` | استادیوم ورزشی |
| `studying_center` | مرکز مطالعه |
| `temporary_accommodation` | اردوگاه اسکان اضطراری |
| `theater` | سالن تئاتر |
| `traffic_police` | پلیس راهنمایی و رانندگی |
| `train_station` | ایستگاه قطار |
| `transit_station` | پایانه مسافربری و ایستگاه سوار |
| `university` | دانشگاه و موسسه آموزش عالی |
| `vegetable_market` | بازار روز و میوه تره‌بار |
| `water_park` | پارک آبی |
| `wedding_venue` | تالار پذیرایی |

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
| 404 | NOT\_FOUND | مسیری با این مشخصات یافت نشده است. |
