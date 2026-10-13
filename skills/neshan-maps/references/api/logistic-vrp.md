---
source: https://platform.neshan.org/docs/api/routing-category/logistic/
title: سرویس لجستیک و بهینه‌سازی مسیر ناوگان نشان
---

# سرویس لجستیک و بهینه‌سازی مسیر ناوگان

سرویس لجستیک نشان با دریافت مجموعه‌ای از **وسایل نقلیه** و **وظایف**، بهترین تخصیص وظایف به هر وسیله و بهینه‌ترین ترتیب پیمایش مقاصد را محاسبه می‌کند.

این سرویس در محاسبه‌ خود محدودیت‌های واقعی عملیات لجستیک را در نظر می‌گیرد: ظرفیت بار هر وسیله، پنجره‌های زمانی فعالیت وسیله و مهلت انجام هر وظیفه، مهارت‌های لازم برای هر وظیفه، محدوده‌های طرح ترافیک و زوج و فرد، انبار مرکزی و ضریب ترافیک مناطق.

[هم‌اکنون این سرویس را امتحان کنید](https://platform.neshan.org/demo/vrp)

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

برای استفاده از این سرویس، یک درخواست `POST` به اندپوینت زیر ارسال کنید:

```http
https://api.neshan.org/vrp/logistic
```

### هدرهای درخواست (Headers)

```http
Content-Type: application/json
Api-Key: <YOUR_API_KEY>
```

### پارامترهای ورودی

بدنه‌ درخواست (Request Body) یک آبجکت JSON با پارامترهای زیر است:

| پارامتر | نوع داده | توضیحات | نوع پارامتر |
| --- | --- | --- | --- |
| `vehicles` | Array | آرایه‌ای از آبجکت‌های وسایل نقلیه. | **اجباری** |
| `jobs` | Array | آرایه‌ای از آبجکت‌های وظایف. | **اجباری** |
| `depot` | Object | آبجکت انبار مرکزی. در صورتی که برای یک وسیله نقلیه، مبدا و/یا مقصد حرکت تعیین نشده باشد، از مختصات انبار به‌عنوان نقطه شروع و/یا پایان آن وسیله استفاده می‌شود. | اختیاری |
| `solutionStrategy` | String | استراتژی حل مسئله را مشخص می‌کند. | اختیاری (پیش‌فرض: `STRICT`) |
| `costType` | String | معیار بهینه‌سازی مسیرها را تعیین می‌کند. | اختیاری (پیش‌فرض: `DISTANCE`) |
| `explorationLevel` | String | سطح جستجو برای یافتن بهترین راه‌حل را مشخص می‌کند. | اختیاری (پیش‌فرض: `MEDIUM`) |
| `routingEngine` | String | موتور مسیریابی مورد استفاده برای محاسبه مسافت و زمان را مشخص می‌کند. | اختیاری (پیش‌فرض: `typical`) |
| `balanceWorkload` | Boolean | تعیین می‌کند که بار کاری (مسافت یا زمان) بین وسایل نقلیه متعادل شود یا خیر. | اختیاری (پیش‌فرض: `false`) |
| `useTimeBalancing` | Boolean | تعیین می‌کند که زمان کاری بین وسایل نقلیه متعادل شود یا خیر. | اختیاری (پیش‌فرض: `false`) |
| `useTrafficMultiplier` | Boolean | تعیین می‌کند که ضریب ترافیک در بهینه‌سازی مسیرها لحاظ شود یا خیر. ضریب ترافیک کمک می‌کند ترتیب پیمایش مقاصد، متناسب با وضعیت ترافیک هر منطقه در زمان‌های بهینه تخصیص یابد. | اختیاری (پیش‌فرض: `false`) |
| `planTime` | Number | زمان شروع فرایند لجستیک. کاربرد این پارامتر در فعال‌سازی ضریب ترافیک است تا ترتیب مقاصد با توجه به وضعیت ترافیک منطقه بهینه شود. | اختیاری |

هشدار

در صورت فعال بودن `useTrafficMultiplier` **حتماً** باید `routingEngine` را روی `notraffic` تنظیم کنید. نمونه‌ کامل این حالت در بخش «نمونه استفاده از ضریب ترافیک» در پایین همین صفحه آمده است.

## جزئیات پارامترها

### مقادیر `solutionStrategy`

| مقدار | توضیحات |
| --- | --- |
| `STRICT` | سرویس تنها در صورتی پاسخ می‌دهد که بتواند تمام وظایف را به وسایل نقلیه اختصاص دهد؛ در غیر این صورت پاسخی با مسیرهای خالی بازمی‌گرداند. |
| `BEST_EFFORT` | سرویس تلاش می‌کند بیشترین تعداد ممکن از وظایف را به وسایل نقلیه اختصاص دهد و وظایف تخصیص‌نیافته را در خروجی بازمی‌گرداند. |

### مقادیر `costType`

| مقدار | توضیحات |
| --- | --- |
| `DISTANCE` | مسیرها بر اساس کمترین مسافت طی‌شده بهینه می‌شوند. |
| `DURATION` | مسیرها بر اساس کمترین زمان سفر بهینه می‌شوند. |

### مقادیر `explorationLevel`

| مقدار | توضیحات |
| --- | --- |
| `FAST` | جستجوی سریع با دقت کمتر؛ مناسب برای سناریوهای بزرگ که سرعت پاسخ در اولویت است. |
| `MEDIUM` | تعادل بین سرعت و کیفیت راه‌حل. این حالت در اکثر موارد بهترین نتیجه را ارائه می‌دهد. |
| `THOROUGH` | جستجوی کامل و جامع برای یافتن بهترین راه‌حل ممکن. این حالت زمان‌برتر است. |

### مقادیر `routingEngine`

| مقدار | توضیحات |
| --- | --- |
| `typical` | مسیریابی بر اساس الگوی ترافیک |
| `primary` | مسیریابی با ترافیک زنده |
| `notraffic` | مسیریابی با ترافیک ثابت |
| `motorcycle` | مسیریابی موتورسیکلت |
| `bicycle` | مسیریابی دوچرخه |
| `foot` | مسیریابی عابر پیاده |

### آبجکت `depot` (انبار)

این پارامتر **اختیاری** است. در صورت ارسال آن، برای وسایلی که پارامتر `start` (مختصات شروع حرکت) و/یا `end` (مختصات پایان حرکت) برایشان تنظیم نشده باشد، موقعیت شروع، پایان یا هر دو معادل موقعیت جغرافیایی انبار در نظر گرفته می‌شود.

| پارامتر | نوع داده | توضیحات | نوع پارامتر |
| --- | --- | --- | --- |
| `latitude` | Number | عرض جغرافیایی انبار | **اجباری** |
| `longitude` | Number | طول جغرافیایی انبار | **اجباری** |

### آبجکت `vehicle` (وسیله نقلیه)

| پارامتر | نوع داده | توضیحات | نوع پارامتر |
| --- | --- | --- | --- |
| `id` | Integer | شناسه یکتا برای هر وسیله نقلیه. | **اجباری** |
| `capacity` | Integer | ظرفیت وسیله نقلیه (مثلاً تعداد بسته‌های قابل حمل). | **اجباری** |
| `timeWindow` | Object | پنجره زمانی فعالیت وسیله نقلیه با فیلدهای `from` و `to` (فرمت `HH:mm:ss`). | **اجباری** |
| `start` | Object | آبجکت موقعیت شروع حرکت وسیله نقلیه با فیلدهای `latitude` و `longitude`. در صورت ارسال نشدن، از `depot` استفاده می‌شود. | مشروط |
| `end` | Object | آبجکت موقعیت پایان حرکت وسیله نقلیه با فیلدهای `latitude` و `longitude`. در صورت ارسال نشدن، از `depot` استفاده می‌شود. | مشروط |
| `maxDistance` | Integer | حداکثر مسافت مجاز برای این وسیله نقلیه. | اختیاری |
| `skills` | Array | آرایه‌ای از شناسه‌های عددی که مهارت‌های وسیله را مشخص می‌کند. | اختیاری |
| `excludeZones` | Array | محدودیت ورود وسیله به محدوده‌های طرح ترافیک و زوج و فرد را مشخص می‌کند (مقادیر ممکن: `TRAFFIC`، `ODD_EVEN`). | اختیاری |

یادداشت

`start` و `end` تنها زمانی اجباری هستند که `depot` را ارسال نکرده باشید؛ در واقع هر وسیله نقلیه باید نقطه شروع و پایان مشخصی داشته باشد که یا از خودش یا از انبار مرکزی تامین می‌شود.

### آبجکت `job` (وظیفه)

| پارامتر | نوع داده | توضیحات | نوع پارامتر |
| --- | --- | --- | --- |
| `id` | Integer | شناسه یکتا برای هر وظیفه. | **اجباری** |
| `location` | Object | آبجکت موقعیت وظیفه با فیلدهای `latitude` و `longitude`. | **اجباری** |
| `timeWindows` | Array | آرایه‌ای از پنجره‌های زمانی مجاز برای انجام وظیفه؛ هر آیتم آبجکتی با فیلدهای `from` و `to` است. | **اجباری** |
| `setUpTime` | Integer | زمان آماده‌سازی در محل، پیش از انجام وظیفه (به ثانیه). | اختیاری |
| `serviceTime` | Integer | زمان لازم برای انجام خود وظیفه (به ثانیه). | اختیاری |
| `delivery` | Integer | مقدار باری که در این محل تحویل داده می‌شود. | اختیاری |
| `pickup` | Integer | مقدار باری که از این محل دریافت می‌شود. | اختیاری |
| `priority` | Integer | اولویت انجام وظیفه (اعداد کمتر، اولویت بالاتر). | اختیاری |
| `skills` | Array | آرایه‌ای از شناسه‌های عددی که مهارت‌های لازم برای انجام این وظیفه را مشخص می‌کند. | اختیاری |

## نمونه درخواست

در نمونه‌ زیر دو وسیله نقلیه با ظرفیت و پنجره‌ زمانی متفاوت و شش وظیفه به سرویس داده شده است. چند نکته‌ این نمونه:

- هر دو وسیله `start` و `end` مشخص دارند، پس نیازی به ارسال `depot` نیست.
- وظیفه‌ ۱۰۷ پنجره‌ زمانی محدودتری (`09:00:00` تا `14:00:00`) دارد و وظیفه‌ ۱۰۴ تا `15:00:00`.
- وظیفه‌ ۱۰۳ باری برابر ۲۰ واحد تحویل می‌گیرد و وظیفه‌ ۱۰۱ هم تحویل (۳) و هم بارگیری (۱۵) دارد.

- cURL
- JavaScript
- Java
- C#
- Python
- PHP

```bash
curl --request POST \
  --url https://api.neshan.org/vrp/logistic \
  --header 'Api-Key: <YOUR_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "planTime": 16200,
    "solutionStrategy": "STRICT",
    "costType": "DURATION",
    "explorationLevel": "MEDIUM",
    "balanceWorkload": true,
    "useTimeBalancing": true,
    "useTrafficMultiplier": false,
    "vehicles": [
      {
        "id": 2, "capacity": 30, "skills": [1],
        "timeWindow": { "from": "06:00:00", "to": "18:00:00" },
        "maxDistance": 360,
        "start": { "latitude": 35.67010751140015, "longitude": 51.29175427985706 },
        "end": { "latitude": 35.67012665966338, "longitude": 51.29147477574162 }
      },
      {
        "id": 1, "capacity": 5, "skills": [1],
        "timeWindow": { "from": "06:00:00", "to": "17:00:00" },
        "maxDistance": 360,
        "start": { "latitude": 35.66503924394529, "longitude": 51.415265681668245 },
        "end": { "latitude": 35.665146600190525, "longitude": 51.41529475262192 }
      }
    ],
    "jobs": [
      {
        "id": 107,
        "location": { "latitude": 35.793488905980425, "longitude": 51.433878981081335 },
        "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "09:00:00", "to": "14:00:00" }]
      },
      {
        "id": 105,
        "location": { "latitude": 35.772862895501646, "longitude": 51.38137237945895 },
        "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
      },
      {
        "id": 104,
        "location": { "latitude": 35.727066323081885, "longitude": 51.4059716551435 },
        "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "15:00:00" }]
      },
      {
        "id": 103,
        "location": { "latitude": 35.70572125983976, "longitude": 51.40742250427718 },
        "setUpTime": 0, "serviceTime": 120, "delivery": 20, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
      },
      {
        "id": 102,
        "location": { "latitude": 35.71281891542067, "longitude": 51.358263933784286 },
        "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
      },
      {
        "id": 101,
        "location": { "latitude": 35.68364537773219, "longitude": 51.3653710832256 },
        "setUpTime": 60, "serviceTime": 300, "delivery": 3, "pickup": 15, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
      }
    ],
    "routingEngine": "primary"
  }'
```

```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Api-Key", "<YOUR_API_KEY>");

const requestBody = {
  planTime: 16200,
  solutionStrategy: "STRICT",
  costType: "DURATION",
  explorationLevel: "MEDIUM",
  balanceWorkload: true,
  useTimeBalancing: true,
  useTrafficMultiplier: false,
  vehicles: [
    {
      id: 2, capacity: 30, skills: [1],
      timeWindow: { from: "06:00:00", to: "18:00:00" },
      maxDistance: 360,
      start: { latitude: 35.67010751140015, longitude: 51.29175427985706 },
      end: { latitude: 35.67012665966338, longitude: 51.29147477574162 }
    },
    {
      id: 1, capacity: 5, skills: [1],
      timeWindow: { from: "06:00:00", to: "17:00:00" },
      maxDistance: 360,
      start: { latitude: 35.66503924394529, longitude: 51.415265681668245 },
      end: { latitude: 35.665146600190525, longitude: 51.41529475262192 }
    }
  ],
  jobs: [
    {
      id: 107,
      location: { latitude: 35.793488905980425, longitude: 51.433878981081335 },
      setUpTime: 20, serviceTime: 120, delivery: 1, pickup: 0, priority: 1,
      skills: [1],
      timeWindows: [{ from: "09:00:00", to: "14:00:00" }]
    },
    {
      id: 105,
      location: { latitude: 35.772862895501646, longitude: 51.38137237945895 },
      setUpTime: 20, serviceTime: 120, delivery: 1, pickup: 0, priority: 1,
      skills: [1],
      timeWindows: [{ from: "06:00:00", to: "18:00:00" }]
    },
    {
      id: 104,
      location: { latitude: 35.727066323081885, longitude: 51.4059716551435 },
      setUpTime: 20, serviceTime: 120, delivery: 1, pickup: 0, priority: 1,
      skills: [1],
      timeWindows: [{ from: "06:00:00", to: "15:00:00" }]
    },
    {
      id: 103,
      location: { latitude: 35.70572125983976, longitude: 51.40742250427718 },
      setUpTime: 0, serviceTime: 120, delivery: 20, pickup: 0, priority: 1,
      skills: [1],
      timeWindows: [{ from: "06:00:00", to: "18:00:00" }]
    },
    {
      id: 102,
      location: { latitude: 35.71281891542067, longitude: 51.358263933784286 },
      setUpTime: 20, serviceTime: 120, delivery: 1, pickup: 0, priority: 1,
      skills: [1],
      timeWindows: [{ from: "06:00:00", to: "18:00:00" }]
    },
    {
      id: 101,
      location: { latitude: 35.68364537773219, longitude: 51.3653710832256 },
      setUpTime: 60, serviceTime: 300, delivery: 3, pickup: 15, priority: 1,
      skills: [1],
      timeWindows: [{ from: "06:00:00", to: "18:00:00" }]
    }
  ],
  routingEngine: "primary"
};

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: JSON.stringify(requestBody),
  redirect: "follow"
};

fetch("https://api.neshan.org/vrp/logistic", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

```java
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

OkHttpClient client = new OkHttpClient();

MediaType mediaType = MediaType.parse("application/json");

String json = """
{
  "planTime": 16200,
  "solutionStrategy": "STRICT",
  "costType": "DURATION",
  "explorationLevel": "MEDIUM",
  "balanceWorkload": true,
  "useTimeBalancing": true,
  "useTrafficMultiplier": false,
  "vehicles": [
    {
      "id": 2, "capacity": 30, "skills": [1],
      "timeWindow": { "from": "06:00:00", "to": "18:00:00" },
      "maxDistance": 360,
      "start": { "latitude": 35.67010751140015, "longitude": 51.29175427985706 },
      "end": { "latitude": 35.67012665966338, "longitude": 51.29147477574162 }
    },
    {
      "id": 1, "capacity": 5, "skills": [1],
      "timeWindow": { "from": "06:00:00", "to": "17:00:00" },
      "maxDistance": 360,
      "start": { "latitude": 35.66503924394529, "longitude": 51.415265681668245 },
      "end": { "latitude": 35.665146600190525, "longitude": 51.41529475262192 }
    }
  ],
  "jobs": [
    {
      "id": 107,
      "location": { "latitude": 35.793488905980425, "longitude": 51.433878981081335 },
      "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "09:00:00", "to": "14:00:00" }]
    },
    {
      "id": 105,
      "location": { "latitude": 35.772862895501646, "longitude": 51.38137237945895 },
      "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
    },
    {
      "id": 104,
      "location": { "latitude": 35.727066323081885, "longitude": 51.4059716551435 },
      "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "15:00:00" }]
    },
    {
      "id": 103,
      "location": { "latitude": 35.70572125983976, "longitude": 51.40742250427718 },
      "setUpTime": 0, "serviceTime": 120, "delivery": 20, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
    },
    {
      "id": 102,
      "location": { "latitude": 35.71281891542067, "longitude": 51.358263933784286 },
      "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
    },
    {
      "id": 101,
      "location": { "latitude": 35.68364537773219, "longitude": 51.3653710832256 },
      "setUpTime": 60, "serviceTime": 300, "delivery": 3, "pickup": 15, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
    }
  ],
  "routingEngine": "primary"
}
""";

RequestBody body = RequestBody.create(json, mediaType);

Request request = new Request.Builder()
  .url("https://api.neshan.org/vrp/logistic")
  .post(body)
  .addHeader("Content-Type", "application/json")
  .addHeader("Api-Key", "<YOUR_API_KEY>")
  .build();

Response response = client.newCall(request).execute();
System.out.println(response.body().string());
```

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

var client = new HttpClient();

string json = @"{
  ""planTime"": 16200,
  ""solutionStrategy"": ""STRICT"",
  ""costType"": ""DURATION"",
  ""explorationLevel"": ""MEDIUM"",
  ""balanceWorkload"": true,
  ""useTimeBalancing"": true,
  ""useTrafficMultiplier"": false,
  ""vehicles"": [
    {
      ""id"": 2, ""capacity"": 30, ""skills"": [1],
      ""timeWindow"": { ""from"": ""06:00:00"", ""to"": ""18:00:00"" },
      ""maxDistance"": 360,
      ""start"": { ""latitude"": 35.67010751140015, ""longitude"": 51.29175427985706 },
      ""end"": { ""latitude"": 35.67012665966338, ""longitude"": 51.29147477574162 }
    },
    {
      ""id"": 1, ""capacity"": 5, ""skills"": [1],
      ""timeWindow"": { ""from"": ""06:00:00"", ""to"": ""17:00:00"" },
      ""maxDistance"": 360,
      ""start"": { ""latitude"": 35.66503924394529, ""longitude"": 51.415265681668245 },
      ""end"": { ""latitude"": 35.665146600190525, ""longitude"": 51.41529475262192 }
    }
  ],
  ""jobs"": [
    {
      ""id"": 107,
      ""location"": { ""latitude"": 35.793488905980425, ""longitude"": 51.433878981081335 },
      ""setUpTime"": 20, ""serviceTime"": 120, ""delivery"": 1, ""pickup"": 0, ""priority"": 1,
      ""skills"": [1],
      ""timeWindows"": [{ ""from"": ""09:00:00"", ""to"": ""14:00:00"" }]
    },
    {
      ""id"": 105,
      ""location"": { ""latitude"": 35.772862895501646, ""longitude"": 51.38137237945895 },
      ""setUpTime"": 20, ""serviceTime"": 120, ""delivery"": 1, ""pickup"": 0, ""priority"": 1,
      ""skills"": [1],
      ""timeWindows"": [{ ""from"": ""06:00:00"", ""to"": ""18:00:00"" }]
    },
    {
      ""id"": 104,
      ""location"": { ""latitude"": 35.727066323081885, ""longitude"": 51.4059716551435 },
      ""setUpTime"": 20, ""serviceTime"": 120, ""delivery"": 1, ""pickup"": 0, ""priority"": 1,
      ""skills"": [1],
      ""timeWindows"": [{ ""from"": ""06:00:00"", ""to"": ""15:00:00"" }]
    },
    {
      ""id"": 103,
      ""location"": { ""latitude"": 35.70572125983976, ""longitude"": 51.40742250427718 },
      ""setUpTime"": 0, ""serviceTime"": 120, ""delivery"": 20, ""pickup"": 0, ""priority"": 1,
      ""skills"": [1],
      ""timeWindows"": [{ ""from"": ""06:00:00"", ""to"": ""18:00:00"" }]
    },
    {
      ""id"": 102,
      ""location"": { ""latitude"": 35.71281891542067, ""longitude"": 51.358263933784286 },
      ""setUpTime"": 20, ""serviceTime"": 120, ""delivery"": 1, ""pickup"": 0, ""priority"": 1,
      ""skills"": [1],
      ""timeWindows"": [{ ""from"": ""06:00:00"", ""to"": ""18:00:00"" }]
    },
    {
      ""id"": 101,
      ""location"": { ""latitude"": 35.68364537773219, ""longitude"": 51.3653710832256 },
      ""setUpTime"": 60, ""serviceTime"": 300, ""delivery"": 3, ""pickup"": 15, ""priority"": 1,
      ""skills"": [1],
      ""timeWindows"": [{ ""from"": ""06:00:00"", ""to"": ""18:00:00"" }]
    }
  ],
  ""routingEngine"": ""primary""
}";

var request = new HttpRequestMessage(HttpMethod.Post, "https://api.neshan.org/vrp/logistic");
request.Headers.Add("Api-Key", "<YOUR_API_KEY>");
request.Content = new StringContent(json, Encoding.UTF8, "application/json");

var response = await client.SendAsync(request);
response.EnsureSuccessStatusCode();
Console.WriteLine(await response.Content.ReadAsStringAsync());
```

```python
import requests

url = "https://api.neshan.org/vrp/logistic"

payload = {
  "planTime": 16200,
  "solutionStrategy": "STRICT",
  "costType": "DURATION",
  "explorationLevel": "MEDIUM",
  "balanceWorkload": True,
  "useTimeBalancing": True,
  "useTrafficMultiplier": False,
  "vehicles": [
    {
      "id": 2, "capacity": 30, "skills": [1],
      "timeWindow": { "from": "06:00:00", "to": "18:00:00" },
      "maxDistance": 360,
      "start": { "latitude": 35.67010751140015, "longitude": 51.29175427985706 },
      "end": { "latitude": 35.67012665966338, "longitude": 51.29147477574162 }
    },
    {
      "id": 1, "capacity": 5, "skills": [1],
      "timeWindow": { "from": "06:00:00", "to": "17:00:00" },
      "maxDistance": 360,
      "start": { "latitude": 35.66503924394529, "longitude": 51.415265681668245 },
      "end": { "latitude": 35.665146600190525, "longitude": 51.41529475262192 }
    }
  ],
  "jobs": [
    {
      "id": 107,
      "location": { "latitude": 35.793488905980425, "longitude": 51.433878981081335 },
      "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "09:00:00", "to": "14:00:00" }]
    },
    {
      "id": 105,
      "location": { "latitude": 35.772862895501646, "longitude": 51.38137237945895 },
      "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
    },
    {
      "id": 104,
      "location": { "latitude": 35.727066323081885, "longitude": 51.4059716551435 },
      "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "15:00:00" }]
    },
    {
      "id": 103,
      "location": { "latitude": 35.70572125983976, "longitude": 51.40742250427718 },
      "setUpTime": 0, "serviceTime": 120, "delivery": 20, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
    },
    {
      "id": 102,
      "location": { "latitude": 35.71281891542067, "longitude": 51.358263933784286 },
      "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
    },
    {
      "id": 101,
      "location": { "latitude": 35.68364537773219, "longitude": 51.3653710832256 },
      "setUpTime": 60, "serviceTime": 300, "delivery": 3, "pickup": 15, "priority": 1,
      "skills": [1],
      "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
    }
  ],
  "routingEngine": "primary"
}

headers = {
    'Content-Type': 'application/json',
    'Api-Key': '<YOUR_API_KEY>'
}

response = requests.post(url, json=payload, headers=headers)

print(response.text)
```

```php
<?php

$payload = json_encode([
  "planTime" => 16200,
  "solutionStrategy" => "STRICT",
  "costType" => "DURATION",
  "explorationLevel" => "MEDIUM",
  "balanceWorkload" => true,
  "useTimeBalancing" => true,
  "useTrafficMultiplier" => false,
  "vehicles" => [
    [
      "id" => 2, "capacity" => 30, "skills" => [1],
      "timeWindow" => [ "from" => "06:00:00", "to" => "18:00:00" ],
      "maxDistance" => 360,
      "start" => [ "latitude" => 35.67010751140015, "longitude" => 51.29175427985706 ],
      "end" => [ "latitude" => 35.67012665966338, "longitude" => 51.29147477574162 ]
    ],
    [
      "id" => 1, "capacity" => 5, "skills" => [1],
      "timeWindow" => [ "from" => "06:00:00", "to" => "17:00:00" ],
      "maxDistance" => 360,
      "start" => [ "latitude" => 35.66503924394529, "longitude" => 51.415265681668245 ],
      "end" => [ "latitude" => 35.665146600190525, "longitude" => 51.41529475262192 ]
    ]
  ],
  "jobs" => [
    [
      "id" => 107,
      "location" => [ "latitude" => 35.793488905980425, "longitude" => 51.433878981081335 ],
      "setUpTime" => 20, "serviceTime" => 120, "delivery" => 1, "pickup" => 0, "priority" => 1,
      "skills" => [1],
      "timeWindows" => [[ "from" => "09:00:00", "to" => "14:00:00" ]]
    ],
    [
      "id" => 105,
      "location" => [ "latitude" => 35.772862895501646, "longitude" => 51.38137237945895 ],
      "setUpTime" => 20, "serviceTime" => 120, "delivery" => 1, "pickup" => 0, "priority" => 1,
      "skills" => [1],
      "timeWindows" => [[ "from" => "06:00:00", "to" => "18:00:00" ]]
    ],
    [
      "id" => 104,
      "location" => [ "latitude" => 35.727066323081885, "longitude" => 51.4059716551435 ],
      "setUpTime" => 20, "serviceTime" => 120, "delivery" => 1, "pickup" => 0, "priority" => 1,
      "skills" => [1],
      "timeWindows" => [[ "from" => "06:00:00", "to" => "15:00:00" ]]
    ],
    [
      "id" => 103,
      "location" => [ "latitude" => 35.70572125983976, "longitude" => 51.40742250427718 ],
      "setUpTime" => 0, "serviceTime" => 120, "delivery" => 20, "pickup" => 0, "priority" => 1,
      "skills" => [1],
      "timeWindows" => [[ "from" => "06:00:00", "to" => "18:00:00" ]]
    ],
    [
      "id" => 102,
      "location" => [ "latitude" => 35.71281891542067, "longitude" => 51.358263933784286 ],
      "setUpTime" => 20, "serviceTime" => 120, "delivery" => 1, "pickup" => 0, "priority" => 1,
      "skills" => [1],
      "timeWindows" => [[ "from" => "06:00:00", "to" => "18:00:00" ]]
    ],
    [
      "id" => 101,
      "location" => [ "latitude" => 35.68364537773219, "longitude" => 51.3653710832256 ],
      "setUpTime" => 60, "serviceTime" => 300, "delivery" => 3, "pickup" => 15, "priority" => 1,
      "skills" => [1],
      "timeWindows" => [[ "from" => "06:00:00", "to" => "18:00:00" ]]
    ]
  ],
  "routingEngine" => "primary"
]);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.neshan.org/vrp/logistic',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => $payload,
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json',
    'Api-Key: <YOUR_API_KEY>'
  ),
));

$response = curl_exec($curl);
curl_close($curl);

echo $response;

?>
```

## فرمت پاسخ

در صورت موفقیت‌آمیز بودن درخواست (کد `200 OK`)، پاسخ یک آبجکت JSON با ساختار زیر است. این پاسخ، خروجی واقعی درخواست نمونه‌ بالاست؛ رشته‌های `geometry` برای خوانایی کوتاه شده‌اند.

```json
{
  "routes": [
    {
      "distance": 38515,
      "duration": 5812,
      "geometry": "oyuxEo|`xHFyE@WU??TOvIC`CQxLA`@GFc@@eEGK@eDCeFIwDGeAAmBOaCIBwALmKHyG@iA@k@?a@U{CDuFFoF@oADkFFgFFqGDgG@IHqGHgGNgLPeG?SJ_F@S ...",
      "steps": [
        { "type": "start" },
        { "id": 102, "type": "job" },
        { "id": 104, "type": "job" },
        { "id": 103, "type": "job" },
        { "id": 101, "type": "job" },
        { "type": "end" }
      ],
      "vehicleId": "2"
    },
    {
      "distance": 51387,
      "duration": 6412,
      "geometry": "oytxEu`yxH~@HfE ...",
      "steps": [
        { "type": "start" },
        { "id": 107, "type": "job" },
        { "id": 105, "type": "job" },
        { "type": "end" }
      ],
      "vehicleId": "1"
    }
  ],
  "summary": {
    "distance": 89902,
    "duration": 12224,
    "routesCount": 2,
    "unassignedCount": 0
  },
  "violationMessages": []
}
```

## اجزای پاسخ

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `routes` | Array | آرایه‌ای از آبجکت‌های مسیر که به هر وسیله نقلیه اختصاص داده شده است. |
| `summary` | Object | خلاصه‌ای از نتایج حل مسئله شامل کل مسافت، زمان، تعداد مسیرها و تعداد وظایف اختصاص‌نیافته. |
| `violationMessages` | Array | آرایه‌ای از پیغام‌ها که در صورت تخطی از شرایط حل مسئله (مانند عدم سازگاری زمان‌ها) تولید می‌شود. |
| `unassignedJobs` | Array | آرایه‌ای از شناسه‌های وظایفی که به هیچ وسیله‌ای اختصاص داده نشده‌اند. |

### آبجکت `route` (مسیر)

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `vehicleId` | String | شناسه وسیله نقلیه‌ای که این مسیر به آن اختصاص داده شده است. |
| `distance` | Integer | مسافت کل مسیر (به متر). |
| `duration` | Integer | زمان کل مسیر شامل زمان سفر و انجام وظایف (به ثانیه). |
| `geometry` | String | رشته Polyline کدشده که نمایانگر مسیر جغرافیایی روی نقشه است. |
| `steps` | Array | آرایه‌ای از مراحل مسیر که ترتیب انجام کارها را مشخص می‌کند. |

### آبجکت `step` (مرحله)

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `type` | String | نوع مرحله؛ مقادیر ممکن: `start`، `end`، `job`، `pickup`، `delivery`. |
| `id` | Integer | شناسه وظیفه (تنها برای مراحل از نوع `job`، `pickup` و `delivery`). |

### آبجکت `summary` (خلاصه)

| پارامتر | نوع داده | توضیحات |
| --- | --- | --- |
| `distance` | Integer | مجموع مسافت همه‌ مسیرها (به متر). |
| `duration` | Integer | مجموع زمان همه‌ مسیرها (به ثانیه). |
| `routesCount` | Integer | تعداد مسیرهای تولیدشده. |
| `unassignedCount` | Integer | تعداد وظایفی که به هیچ وسیله‌ای اختصاص داده نشده‌اند. |

## مثال استفاده از ضریب ترافیک

اگر می‌خواهید ترتیب پیمایش مقاصد متناسب با وضعیت ترافیک هر منطقه در ساعات مختلف روز بهینه شود، `useTrafficMultiplier` را `true` بگذارید و زمان شروع عملیات را در `planTime` بفرستید.

اخطار

در این حالت **حتماً** باید `routingEngine` را روی `notraffic` تنظیم کنید. استفاده از سایر موتورهای مسیریابی همراه با ضریب ترافیک پشتیبانی نمی‌شود.

درخواست زیر دقیقاً همان ورودی نمونه‌ بالاست و فقط دو مقدار در آن تغییر کرده: `useTrafficMultiplier` به `true` و `routingEngine` به `notraffic`.

### درخواست

```bash
curl --request POST \
  --url https://api.neshan.org/vrp/logistic \
  --header 'Api-Key: <YOUR_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{
    "planTime": 16200,
    "solutionStrategy": "STRICT",
    "costType": "DURATION",
    "explorationLevel": "MEDIUM",
    "balanceWorkload": true,
    "useTimeBalancing": true,
    "useTrafficMultiplier": true,
    "vehicles": [
      {
        "id": 2, "capacity": 30, "skills": [1],
        "timeWindow": { "from": "06:00:00", "to": "18:00:00" },
        "maxDistance": 360,
        "start": { "latitude": 35.67010751140015, "longitude": 51.29175427985706 },
        "end": { "latitude": 35.67012665966338, "longitude": 51.29147477574162 }
      },
      {
        "id": 1, "capacity": 5, "skills": [1],
        "timeWindow": { "from": "06:00:00", "to": "17:00:00" },
        "maxDistance": 360,
        "start": { "latitude": 35.66503924394529, "longitude": 51.415265681668245 },
        "end": { "latitude": 35.665146600190525, "longitude": 51.41529475262192 }
      }
    ],
    "jobs": [
      {
        "id": 107,
        "location": { "latitude": 35.793488905980425, "longitude": 51.433878981081335 },
        "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "09:00:00", "to": "14:00:00" }]
      },
      {
        "id": 105,
        "location": { "latitude": 35.772862895501646, "longitude": 51.38137237945895 },
        "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
      },
      {
        "id": 104,
        "location": { "latitude": 35.727066323081885, "longitude": 51.4059716551435 },
        "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "15:00:00" }]
      },
      {
        "id": 103,
        "location": { "latitude": 35.70572125983976, "longitude": 51.40742250427718 },
        "setUpTime": 0, "serviceTime": 120, "delivery": 20, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
      },
      {
        "id": 102,
        "location": { "latitude": 35.71281891542067, "longitude": 51.358263933784286 },
        "setUpTime": 20, "serviceTime": 120, "delivery": 1, "pickup": 0, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
      },
      {
        "id": 101,
        "location": { "latitude": 35.68364537773219, "longitude": 51.3653710832256 },
        "setUpTime": 60, "serviceTime": 300, "delivery": 3, "pickup": 15, "priority": 1,
        "skills": [1],
        "timeWindows": [{ "from": "06:00:00", "to": "18:00:00" }]
      }
    ],
    "routingEngine": "notraffic"
  }'
```

### پاسخ

```json
{
  "routes": [
    {
      "distance": 34034,
      "duration": 5260,
      "geometry": "oyuxEo|`xHFyE@W?WHcFFsE@a@U?_FM{AC{AEgBEeBEqACmAEwBGkBGwCKJcLBwB@qBDaE?]@oABaBBkB@UByBBaCQcGNgLPeG?SJ_F@S ...",
      "steps": [
        { "type": "start" },
        { "id": 102, "type": "job" },
        { "id": 103, "type": "job" },
        { "id": 101, "type": "job" },
        { "type": "end" }
      ],
      "vehicleId": "2"
    },
    {
      "distance": 44838,
      "duration": 5924,
      "geometry": "oytxEu`yxH~@HfE ...",
      "steps": [
        { "type": "start" },
        { "id": 104, "type": "job" },
        { "id": 107, "type": "job" },
        { "id": 105, "type": "job" },
        { "type": "end" }
      ],
      "vehicleId": "1"
    }
  ],
  "summary": {
    "distance": 78872,
    "duration": 11184,
    "routesCount": 2,
    "unassignedCount": 0
  },
  "violationMessages": []
}
```

## ملاحظات مهم

- **یکتایی شناسه‌ها:** مقادیر `id` وسایل نقلیه و وظایف باید در کل درخواست یکتا باشند.
- **فرمت زمان:** تمام مقادیر زمانی در پنجره‌های زمانی (`timeWindow` و `timeWindows`) باید در فرمت `HH:mm:ss` باشند.
- **مختصات جغرافیایی:** تمام مختصات باید در فرمت استاندارد (`latitude`، `longitude`) ارسال شوند.
- **ظرفیت:** مجموع مقادیر `pickup` و `delivery` در یک مسیر نباید از `capacity` وسیله نقلیه تجاوز کند.

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
| 400 | ValidationFailed | داده‌های ارسالی با قوانین سرویس تطابق ندارند (مثلاً فرمت ساعت اشتباه است یا مختصات خارج از محدوده ایران است). |
