# API overview (auto-extracted from the per-API reference files)

Quick lookup of endpoint, headers and input parameters. For response format, samples in 6 languages, and error tables open the per-API file. `-legacy` files are old versions.

All APIs: header `Api-Key` (except Static Map: `key` query param). Coordinates `lat,lng`. Points separated by `|`.


## account-active-services

- Title: Active Services API
- Method: GET
- Endpoint(s): `https://api.neshan.org/account-inquiry/v1/services`
- Full doc: `references/api/account-active-services.md` | Source: https://platform.neshan.org/docs/api/account-category/services/

### Input parameters

این سرویس پارامتر ورودی ندارد؛ فهرست بر اساس کلید دسترسی ارسالی در هدر بازگردانده می‌شود.


## account-remaining-charge

- Title: Remaining Charge API
- Method: GET
- Endpoint(s): `https://api.neshan.org/account-inquiry/v1/remaining-charge`
- Full doc: `references/api/account-remaining-charge.md` | Source: https://platform.neshan.org/docs/api/account-category/remaining-charge/

### Input parameters

این سرویس پارامتر ورودی ندارد؛ حساب از روی کلید دسترسی ارسالی در هدر تشخیص داده می‌شود.


## distance-matrix

- Title: Distance Matrix API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v1/distance-matrix`, `https://api.neshan.org/v1/distance-matrix/no-traffic`
- Full doc: `references/api/distance-matrix.md` | Source: https://platform.neshan.org/docs/api/routing-category/distance-matrix/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه را مشخص می‌کند. مقادیر مجاز `car` (خودرو) و `motorcycle` (موتورسیکلت) هستند. مقدار پیش‌فرض `car` است. | اختیاری |
| `origins` | لیستی از مختصات نقاط مبدأ به‌صورت `latitude,longitude`. نقاط مختلف با کاراکتر پایپ (\|) از هم جدا می‌شوند. | **اجباری** |
| `destinations` | لیستی از مختصات نقاط مقصد با فرمتی مشابه `origins`. | **اجباری** |


## geocoding-v4-legacy

- Title: Geocoding API  تبدیل آدرس به مختصات
- Method: GET
- Endpoint(s): `https://api.neshan.org/v4/geocoding`
- Full doc: `references/api/geocoding-v4-legacy.md` | Source: https://platform.neshan.org/docs/api/search-category/geocoding/4.0.0/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `address` | آدرس نوشتاری مورد نظر برای تبدیل به مختصات. | **اجباری** |


## geocoding-v6-legacy

- Title: Geocoding API  تبدیل آدرس به مختصات
- Method: GET
- Endpoint(s): `https://api.neshan.org/v6/geocoding`
- Full doc: `references/api/geocoding-v6-legacy.md` | Source: https://platform.neshan.org/docs/api/search-category/geocoding/6.0.0/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `address` | آدرس نوشتاری مورد نظر برای تبدیل به مختصات. | **اجباری** |


## geocoding

- Title: Geocoding API
- Method: GET
- Endpoint(s): `https://api.neshan.org/geocoding/v1`, `https://api.neshan.org/geocoding/v1/plus`
- Full doc: `references/api/geocoding.md` | Source: https://platform.neshan.org/docs/api/search-category/geocoding/

### Input parameters

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


## isochrone-v1-legacy

- Title: Isochrone API سرویس محدوده در دسترس
- Method: GET
- Endpoint(s): `https://api.neshan.org/v1/isochrone`
- Full doc: `references/api/isochrone-v1-legacy.md` | Source: https://platform.neshan.org/docs/api/routing-category/isochrone/1.0.0/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `location` | مختصات مرکز به صورت `Lat,Lng`. | **اجباری** |
| `distance` | یک عدد بر حسب **کیلومتر** که حداکثر مسافت قابل دسترسی را مشخص می‌کند. | **یکی از این دو اجباری است** |
| `time` | یک عدد بر حسب **دقیقه** که حداکثر زمان قابل دسترسی را مشخص می‌کند. | **یکی از این دو اجباری است** |
| `polygon` | یکی از دو مقدار `true` یا `false` را می‌پذیرد. اگر `true` باشد، خروجی از نوع `Polygon` خواهد بود. در غیر این صورت، خروجی `LineString` است. (پیش‌فرض `false`) | اختیاری |
| `denoise` | عددی بین `0` تا `1` برای کنترل ساده‌سازی محدوده. هرچه این عدد به `1` نزدیک‌تر باشد، پولیگان ساده‌تر (با نقاط کمتر) خواهد بود. (پیش‌فرض `0`) | اختیاری |


## isochrone

- Title: Isochrone API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v2/isochrone`
- Full doc: `references/api/isochrone.md` | Source: https://platform.neshan.org/docs/api/routing-category/isochrone/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `latitude` | عرض جغرافیایی نقطه‌ مرکزی. | **اجباری** |
| `longitude` | طول جغرافیایی نقطه‌ مرکزی. | **اجباری** |
| `time` | یک عدد بر حسب **دقیقه** که حداکثر زمان قابل دسترسی را مشخص می‌کند. | **یکی از این دو اجباری است** |
| `distance` | یک عدد بر حسب **کیلومتر** که حداکثر مسافت قابل دسترسی را مشخص می‌کند. | **یکی از این دو اجباری است** |
| `dataset` | نوع مسیریابی که محدوده بر اساس آن محاسبه می‌شود. مقادیر مجاز در جدول پایین آمده است. | اختیاری |
| `polygons` | یکی از دو مقدار `true` یا `false` را می‌پذیرد. اگر `true` باشد، خروجی از نوع `Polygon` خواهد بود. در غیر این صورت، خروجی `LineString` است. (پیش‌فرض `false`) | اختیاری |
| `denoise` | عددی بین `0` تا `1` برای کنترل ساده‌سازی محدوده. هرچه این عدد به `1` نزدیک‌تر باشد، پولیگان ساده‌تر (با نقاط کمتر) خواهد بود. (پیش‌فرض `0`) | اختیاری |

هشدار

پارامترهای `time` و `distance` را **نمی‌توانید با هم** ارسال کنید؛ در این حالت سرویس خطای `400` با پیام `only one of time or distance is allowed` برمی‌گرداند. اگر هر دو محدوده را لازم دارید، دو درخواست جداگانه بفرستید.


## logistic-vrp

- Title: سرویس لجستیک و بهینه‌سازی مسیر ناوگان نشان
- Method: POST
- Endpoint(s): `https://api.neshan.org/vrp/logistic`
- Full doc: `references/api/logistic-vrp.md` | Source: https://platform.neshan.org/docs/api/routing-category/logistic/

### Input parameters

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


## map-matching-v2-legacy

- Title: Map Matching API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v2/map-matching`
- Full doc: `references/api/map-matching-v2-legacy.md` | Source: https://platform.neshan.org/docs/api/routing-category/map-matching/2.0.0/

### Input parameters

| پارامتر | توضیحات |
| --- | --- |
| `path` | نقاطی که باید به یک مسیر نگاشت شوند. هر کدام از این نقاط با علامت پایپ ( \| ) از یکدیگر جدا شده‌اند. مختصات هر نقطه به فرم latitude,longitude است. حداقل تعداد نقاط ورودی برابر با 2 است؛ در غیر این صورت خطای 470 برگردانده می‌شود. |


## map-matching

- Title: Map Matching API
- Method: POST
- Endpoint(s): `https://api.neshan.org/v3/map-matching`
- Full doc: `references/api/map-matching.md` | Source: https://platform.neshan.org/docs/api/routing-category/map-matching/

### Input parameters

درخواست باید شامل پارامتر `path` در بدنه‌ی خود باشد.

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `path` | رشته‌ای شامل مختصات نقاط ورودی به‌صورت `latitude,longitude`. هر نقطه باید با کاراکتر پایپ (\|) از نقطه‌ی دیگر جدا شود. حداقل **۲** نقطه و حداکثر **۱۰۰۰** نقطه در هر درخواست پشتیبانی می‌شود. | **اجباری** |


## nearby

- Title: Nearby Search API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v1/nearby`
- Full doc: `references/api/nearby.md` | Source: https://platform.neshan.org/docs/api/search-category/nearby/

### Input parameters

پارامترها در رشته‌ کوئری (Query String) ارسال می‌شوند:

| پارامتر | نوع داده | توضیحات | نوع پارامتر |
| --- | --- | --- | --- |
| `location` | String | موقعیت مبدا با فرمت `latitude,longitude` (مثلاً `32.657307,51.677579`). | **اجباری** |
| `layer` | String | نام لایه یا دسته‌بندی مکانی که جستجو در آن انجام می‌شود؛ فهرست کامل در پایین همین صفحه آمده است. | **اجباری** |
| `searchRadius` | Integer | شعاع جستجو بر حسب متر. | **اجباری** |

یادداشت

کاراکتر کاما در مقدار `location` جداکننده‌ عرض و طول جغرافیایی است. اگر کتابخانه‌ شما مقدار پارامترها را encode می‌کند، این کاما به `%2C` تبدیل می‌شود که کاملاً درست است و سرویس هر دو شکل را می‌پذیرد.


## poi-details

- Title: POI Details API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v1/point`
- Full doc: `references/api/poi-details.md` | Source: https://platform.neshan.org/docs/api/search-category/poi-details/

### Input parameters

پارامترها باید در رشته‌ کوئری (Query String) درخواست ارسال شوند.

| پارامتر | توضیحات | نوع داده | نوع پارامتر |
| --- | --- | --- | --- |
| `hash` | هش منحصربه‌فرد مکان شاخص مورد نظر؛ این مقدار از فیلد `poiHash` در خروجی سرویس جستجو (نسخه ۳) یا سرویس مکان‌های نزدیک به‌دست می‌آید. | String | **اجباری** |


## region

- Title: Region API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v2/region/provinces`, `https://api.neshan.org/v2/region/provinces/geometry`
- Full doc: `references/api/region.md` | Source: https://platform.neshan.org/docs/api/search-category/region/

### Input parameters

این اندپوینت پارامتر ورودی ندارد.


## reverse-geocoding-v2-legacy

- Title: Reverse Geocoding API تبدیل مختصات به آدرس نشان
- Method: GET
- Endpoint(s): `https://api.neshan.org/v2/reverse`
- Full doc: `references/api/reverse-geocoding-v2-legacy.md` | Source: https://platform.neshan.org/docs/api/search-category/reverse-geocoding/2.0.0/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `lat` | عرض جغرافیایی (Latitude) نقطه مورد نظر. | **اجباری** |
| `lng` | طول جغرافیایی (Longitude) نقطه مورد نظر. | **اجباری** |


## reverse-geocoding

- Title: Reverse Geocoding API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v5/reverse`
- Full doc: `references/api/reverse-geocoding.md` | Source: https://platform.neshan.org/docs/api/search-category/reverse-geocoding/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `lat` | عرض جغرافیایی (Latitude) نقطه مورد نظر. | **اجباری** |
| `lng` | طول جغرافیایی (Longitude) نقطه مورد نظر. | **اجباری** |


## routing-no-traffic-v2-legacy

- Title: API سرویس مسیریابی بدون ترافیک  معابر پلتفرم نشان
- Method: GET
- Endpoint(s): `https://api.neshan.org/v2/direction/no-traffic`
- Full doc: `references/api/routing-no-traffic-v2-legacy.md` | Source: https://platform.neshan.org/docs/api/routing-category/noTraffic-routing-api/2.0.0/

### Input parameters

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه: `car` (خودرو) . | **اجباری** |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `avoidTrafficZone` | اگر `true` باشد، مسیر از **طرح ترافیک** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `avoidOddEvenZone` | اگر `true` باشد، مسیر از **طرح زوج و فرد** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |

نکته

با توجه به اینکه نام طرح ترافیک در شهرهای دیگر (غیر از تهران) عموماً یه جای طرح زوج و فرد نیز استفاده می‌شود، چنانچه در سایر شهرها هر یک از پارامترهای avoidTrafficZone و avoidOddEvenZone مقدار true داشته باشند و مقصد درون طرح زوج و فرد آن شهر باشد، سرویس مسیریابی خطای NoRouteFound در پاسخ برمی‌گرداند.


## routing-no-traffic

- Title: سرویس مسیریابی بدون ترافیک
- Method: GET
- Endpoint(s): `https://api.neshan.org/v4/direction/no-traffic`
- Full doc: `references/api/routing-no-traffic.md` | Source: https://platform.neshan.org/docs/api/routing-category/noTraffic-routing-api/

### Input parameters

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه: `car` (خودرو) . | **اجباری** |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `avoidTrafficZone` | اگر `true` باشد، مسیر از **طرح ترافیک** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `avoidOddEvenZone` | اگر `true` باشد، مسیر از **طرح زوج و فرد** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |
| `bearing` | زاویه‌ای بین `0` تا `360` (نسبت به شمال) که جهت شروع بهینه مسیر را مشخص می‌کند. | اختیاری |

نکته

با توجه به اینکه نام طرح ترافیک در شهرهای دیگر (غیر از تهران) عموماً یه جای طرح زوج و فرد نیز استفاده می‌شود، چنانچه در سایر شهرها هر یک از پارامترهای `avoidTrafficZone` و `avoidOddEvenZone` مقدار `true` داشته باشند و مقصد درون طرح زوج و فرد آن شهر باشد، سرویس مسیریابی خطای `NoRouteFound` در پاسخ برمی‌گرداند.


## routing-pedestrian

- Title: سرویس مسیریابی عابر پیاده
- Method: GET
- Endpoint(s): `https://api.neshan.org/v4/direction`
- Full doc: `references/api/routing-pedestrian.md` | Source: https://platform.neshan.org/docs/api/routing-category/routing_pedestrian/

### Input parameters

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه: `pedestrian` (عابر پیاده) | **اجباری** |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |
| `bearing` | زاویه‌ای بین `0` تا `360` (نسبت به شمال) که جهت شروع بهینه مسیر را مشخص می‌کند. | اختیاری |


## routing-predictive

- Title: سرویس مسیریابی پیش‌بینی
- Method: GET
- Endpoint(s): `https://api.neshan.org/v1/direction/historical`
- Full doc: `references/api/routing-predictive.md` | Source: https://platform.neshan.org/docs/api/routing-category/routing-historical/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `origin` | مختصات مبدأ به‌صورت `Lat,Lng` | **اجباری** |
| `destination` | مختصات مقصد به‌صورت `Lat,Lng` | **اجباری** |
| `routingType` | نوع تخمین مسیریابی را مشخص می‌کند و یکی از دو مقدار `DepartAt` یا `ArriveAt` را می‌پذیرد. `DepartAt` تخمین را بر اساس زمان حرکت و `ArriveAt` تخمین را بر اساس زمان رسیدن به مقصد انجام می‌دهد. | **اجباری** |
| `dateTime` | زمان و تاریخ مد نظر برای دریافت ترافیک با فرمت استاندارد (`YYYY-MM-DDThh:mm`). این بازه از لحظه حال تا یک هفته آینده معتبر است. (بدون در نظر گرفتن منطقه زمانی UTC-0) | **اجباری** |
| `avoidTrafficZone` | مشخص می‌کند که آیا مسیر پیشنهادی از داخل **طرح ترافیک** عبور کند یا خیر. مقادیر مجاز `true` و `false` هستند. (مقدار پیش‌فرض `false`) | اختیاری |
| `alternative` | مشخص می‌کند که آیا علاوه‌بر مسیر اصلی، حداکثر تا دو مسیر جایگزین نیز پیشنهاد داده شود. (مقدار پیش‌فرض `false`) | اختیاری |


## routing-traffic-v2-legacy

- Title: API سرویس مسیریابی براساس ترافیک زنده نشان
- Method: GET
- Endpoint(s): `https://api.neshan.org/v2/direction`
- Full doc: `references/api/routing-traffic-v2-legacy.md` | Source: https://platform.neshan.org/docs/api/routing-category/routing/2.0.0/

### Input parameters

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `avoidTrafficZone` | اگر `true` باشد، مسیر از **طرح ترافیک** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `avoidOddEvenZone` | اگر `true` باشد، مسیر از **طرح زوج و فرد** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |

نکته

با توجه به اینکه نام طرح ترافیک در شهرهای دیگر (غیر از تهران) عموماً یه جای طرح زوج و فرد نیز استفاده می‌شود، چنانچه در سایر شهرها هر یک از پارامترهای avoidTrafficZone و avoidOddEvenZone مقدار true داشته باشند و مقصد درون طرح زوج و فرد آن شهر باشد، سرویس مسیریابی خطای NoRouteFound در پاسخ برمی‌گرداند.


## routing-traffic-v3-legacy

- Title: API سرویس مسیریابی براساس ترافیک زنده نشان
- Method: GET
- Endpoint(s): `https://api.neshan.org/v3/direction`
- Full doc: `references/api/routing-traffic-v3-legacy.md` | Source: https://platform.neshan.org/docs/api/routing-category/routing/3.0.0/

### Input parameters

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه: `car` (خودرو) یا `motorcycle` (موتورسیکلت). | **اجباری** |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `avoidTrafficZone` | اگر `true` باشد، مسیر از **طرح ترافیک** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `avoidOddEvenZone` | اگر `true` باشد، مسیر از **طرح زوج و فرد** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |

نکته

با توجه به اینکه نام طرح ترافیک در شهرهای دیگر (غیر از تهران) عموماً یه جای طرح زوج و فرد نیز استفاده می‌شود، چنانچه در سایر شهرها هر یک از پارامترهای avoidTrafficZone و avoidOddEvenZone مقدار true داشته باشند و مقصد درون طرح زوج و فرد آن شهر باشد، سرویس مسیریابی خطای NoRouteFound در پاسخ برمی‌گرداند.


## routing-traffic

- Title: سرویس مسیریابی با ترافیک زنده نشان
- Method: GET
- Endpoint(s): `https://api.neshan.org/v4/direction`
- Full doc: `references/api/routing-traffic.md` | Source: https://platform.neshan.org/docs/api/routing-category/routing/

### Input parameters

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه: `car` (خودرو) یا `motorcycle` (موتورسیکلت). | **اجباری** |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `avoidTrafficZone` | اگر `true` باشد، مسیر از **طرح ترافیک** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `avoidOddEvenZone` | اگر `true` باشد، مسیر از **طرح زوج و فرد** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |
| `bearing` | زاویه‌ای بین `0` تا `360` (نسبت به شمال) که جهت شروع بهینه مسیر را مشخص می‌کند. | اختیاری |

نکته

با توجه به اینکه نام طرح ترافیک در شهرهای دیگر (غیر از تهران) عموماً یه جای طرح زوج و فرد نیز استفاده می‌شود، چنانچه در سایر شهرها هر یک از پارامترهای `avoidTrafficZone` و `avoidOddEvenZone` مقدار `true` داشته باشند و مقصد درون طرح زوج و فرد آن شهر باشد، سرویس مسیریابی خطای `NoRouteFound` در پاسخ برمی‌گرداند.


## routing-typical

- Title: سرویس مسیریابی بر اساس الگو ترافیک
- Method: GET
- Endpoint(s): `https://api.neshan.org/v1/direction/typical`
- Full doc: `references/api/routing-typical.md` | Source: https://platform.neshan.org/docs/api/routing-category/routing_typical/

### Input parameters

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `type` | نوع وسیله نقلیه: `car` (خودرو) | **اجباری** |
| `origin` | مختصات مبدأ به صورت `latitude,longitude`. | **اجباری** |
| `destination` | مختصات مقصد به صورت `latitude,longitude`. | **اجباری** |
| `waypoints` | این پارامتر اختیاری بوده و برای مشخص کردن نقاط میانی مسیر استفاده می‌شود. فرمت ارسال هر نقطه میانی به صورت `latitude,longitude` می‌باشد. در صورتی که بیش از یک نقطه میانی دارید، آن‌ها را با علامت پایپ از هم جدا کنید. | اختیاری |
| `avoidTrafficZone` | اگر `true` باشد، مسیر از **طرح ترافیک** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `avoidOddEvenZone` | اگر `true` باشد، مسیر از **طرح زوج و فرد** عبور نمی‌کند. (پیش‌فرض `false`) | اختیاری |
| `alternative` | اگر `true` باشد، مسیرهای جایگزین نیز (در صورت وجود) ارائه می‌شوند. (پیش‌فرض `false`) | اختیاری |
| `bearing` | زاویه‌ای بین `0` تا `360` (نسبت به شمال) که جهت شروع بهینه مسیر را مشخص می‌کند. | اختیاری |


## search-v1-legacy

- Title: Search API سرویس جستجوی مکان‌مبنا
- Method: GET
- Endpoint(s): `https://api.neshan.org/v1/search`
- Full doc: `references/api/search-v1-legacy.md` | Source: https://platform.neshan.org/docs/api/search-category/search/1.0.0/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `term` | عبارت مورد نظر برای جستجو. | **اجباری** |
| `lat` | عرض جغرافیایی (Latitude) نقطه مرجع برای مرکز جستجو. | **اجباری** |
| `lng` | طول جغرافیایی (Longitude) نقطه مرجع برای مرکز جستجو. | **اجباری** |

نکته

نقطه‌ مرجع می‌تواند موقعیت فعلی کاربر یا مرکز نقشه‌ای باشد که در حال مشاهده آن است. ارسال این پارامتر به بهبود کیفیت نتایج کمک شایانی می‌کند.


## search

- Title: سرویس جستجوی مکان‌مبنای نشان
- Method: GET
- Endpoint(s): `https://api.neshan.org/v3/search`
- Full doc: `references/api/search.md` | Source: https://platform.neshan.org/docs/api/search-category/search/

### Input parameters

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


## static-map-arc

- Title: Static Map Arc API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v5/static/arc`
- Full doc: `references/api/static-map-arc.md` | Source: https://platform.neshan.org/docs/api/static-map-category/static-map-arc/

### Input parameters

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


## static-map

- Title: Static Map API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v5/static`
- Full doc: `references/api/static-map.md` | Source: https://platform.neshan.org/docs/api/static-map-category/static-map/

### Input parameters

| پارامتر | توضیحات | نوع |
| --- | --- | --- |
| `key` | کلید اختصاصی که از پنل توسعه‌دهندگان نشان دریافت کرده‌اید. | **اجباری** |
| `zoom` | سطح بزرگنمایی نقشه که حداقل ۵ و حداکثر ۱۹ می‌تواند باشد. | **اجباری** |
| `latitude` | طول جغرافیایی مرکز نقشه که باید در سیستم مختصات جغرافیایی WGS84 تعریف شده باشد. | **اجباری** |
| `longitude` | عرض جغرافیایی مرکز نقشه که باید در سیستم مختصات جغرافیایی WGS84 تعریف شده باشد. | **اجباری** |
| `width` | عرض تصویر مورد نظر که حداقل 200 پیکسل و حداکثر 2048 پیکسل می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض 512 در نظر گرفته می‌شود. | اختیاری |
| `height` | ارتفاع تصویر مورد نظر که حداقل 200 پیکسل و حداکثر 2048 پیکسل می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض 512 در نظر گرفته می‌شود. | اختیاری |
| `style` | استایل نقشه که یکی از مقادیر `light` و `dark` می‌تواند باشد. در صورت عدم ارسال، مقدار پیش‌فرض `light` در نظر گرفته می‌شود. | اختیاری |
| `marker` | آیکن مرکز عکس را با استفاده از این پارامتر می‌توانید تنظیم کنید. مقادیر پیش فرض: `red`,`green`,`blue`,`violet`  برای ایجاد آیکن دلخواه می‌توانید با [مراجعه به پنل کاربری خود، قسمت آیکن‌ها](https://platform.neshan.org/panel/icons) تصویر مارکر دلخواه را آپلود نمائید و توکن آن را به جای مقادیر پیش فرض ارسال کنید. اگر این پارامتر درون درخواست ارسالی وجود نداشته باشد روی عکس مارکری قرار نمی‌گیرد. | اختیاری |


## tsp

- Title: TSP API
- Method: GET
- Endpoint(s): `https://api.neshan.org/v3/trip`
- Full doc: `references/api/tsp.md` | Source: https://platform.neshan.org/docs/api/routing-category/tsp/

### Input parameters

| پارامتر | توضیحات | نوع پارامتر |
| --- | --- | --- |
| `waypoints` | مختصات نقاط مورد نظر برای مسیریابی به‌صورت `latitude,longitude`. هر نقطه باید با کاراکتر پایپ (\|) از نقطه‌ی دیگر جدا شود. | **اجباری** |
| `roundTrip` | مشخص می‌کند که آیا مسیر باید به نقطه‌ی شروع بازگردد یا خیر. مقادیر مجاز `true` و `false` هستند. مقدار پیش‌فرض `true` است. | اختیاری |
| `sourceIsAnyPoint` | اگر `true` باشد، سرویس بهینه‌ترین نقطه‌ی شروع را از بین تمام نقاط ورودی انتخاب می‌کند. اگر `false` باشد، اولین نقطه در `waypoints` به‌عنوان مبدأ در نظر گرفته می‌شود. مقدار پیش‌فرض `true` است. | اختیاری |
| `lastIsAnyPoint` | اگر `true` باشد، سرویس بهینه‌ترین نقطه‌ی پایانی را از بین تمام نقاط ورودی انتخاب می‌کند. اگر `false` باشد، آخرین نقطه در `waypoints` به‌عنوان مقصد در نظر گرفته می‌شود. مقدار پیش‌فرض `true` است. | اختیاری |
