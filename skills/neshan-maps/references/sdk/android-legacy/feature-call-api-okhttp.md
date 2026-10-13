---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/call-api-OkHttp/
title: فراخوانی سرویس ها با OkHttp ( OkHttp API Call)
---

# نسخه 1.0.3

یکی دیگر از کتابخانه‌های که با استفاده از آن می‌توان در اندروید یک درخواست HTTP را انجام داد، کتابخانه OkHttp است. در این بخش پروژه، مانند دو بخش قبل (Retrofit و Volley) می‌خواهیم پس از لمس طولانی کاربر و نمایش نشانگر، آدرس نقطه انتخاب شده را با استفاده از وب‌سرویس «تبدیل نقطه به آدرس» به دست آورده و در bottom sheet نمایش دهیم.

توضیحات داده شده در مورد ساختار درخواست و انواع پاسخ‌های سرور در بخش (Retrofit) آورده شده است. همچنین بخش‌هایی از این کد که نسبت به کد بخش Volley تکراری است مجددا توضیح داده نشده است.

## افزودن کتابخانه به `build.gradle (Module: app)`

برای استفاده از کتابخانه OkHttp وابستگی زیر را به لیست وابستگی های این فایل اضافه کنید:

```java
implementation 'com.squareup.okhttp3:okhttp:3.10.0'
```

## فراخوانی سرویس

در فایل **`APIOkHttp.java`** و یا فایل **`APIOkHttp.kt`** مراحل زیر را انجام می‌دهیم.

تنها بخش متفاوت در این کد، پیاده‌سازی متد `neshanReverseAPI` است.

ابتدا رشته درخواست ساخته می‌شود و سپس رشته‌ای شامل طول و عرض جغرافیایی – که با یک ویرگول از هم جدا شده‌اند – ساخته می‌شود. این رشته زمانی استفاده می‌شود که آدرس به درستی از وب‌سرویس دریافت نشود.

یک شی از کلاس `Request` با نام `request` ساخته می‌شود. در هنگام ساختن این شی، در سرآمد (Header) کلید API خود را وارد می‌کنیم و رشته درخواست را نیز به آن می‌دهیم. سپس بر روی `client` متد `newCall` صدا زده می‌شود و `request` به عنوان ورودی به آن داده می‌شود و در نهایت متد `enqueue` صدا زده شده و یک `Callback` جدید به عنوان ورودی به آن داده می‌شود و متد‌های `onFailure` و `onResponse` پیاده‌سازی می‌شوند.

در متد `onResponse` تمامی کارهایی که در هنگام دریافت جواب از سرور نیاز هست که انجام داده شود، نوشته می‌شود. در این‌جا ابتدا بررسی شده است که آیا جواب موفقیت آمیز بوده است یا خیر و در صورت موفقیت آمیز بودن جواب، اطلاعات مربوط به همسایگی و آدرس از پاسخ استخراج شده و در bottom sheet نمایش داده می‌شود. در صورتی که آدرس به درستی از سرور دریافت نشود، طول و عرض جغرافیایی نقطه به عنوان آدرس نمایش داده می‌شود.

- java
- kotlin

```java
private void neshanReverseAPI(LatLng loc) {
    String requestURL = "https://api.neshan.org/v1/reverse?lat=" + loc.getLatitude() + "&lng=" + loc.getLongitude();
    final String latLngAddr = String.format("%.6f", loc.getLatitude()) + "," + String.format("%.6f", loc.getLongitude());

    // adding the created certPinner to OkHttpClient
    OkHttpClient client = new OkHttpClient.Builder()
            .build();

    Request request = new Request.Builder()
            //TODO: replace "<YOUR_API_KEY>" with your api key
            .header("Api-Key", "<YOUR_API_KEY>")
            .url(requestURL)
            .build();

    client.newCall(request).enqueue(new Callback() {
        @Override
        public void onFailure(Call call, IOException e) {
            e.printStackTrace();
        }

        @Override
        public void onResponse(Call call, final Response response) throws IOException {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            } else {

                String neighbourhood = "آدرس نامشخص";
                String address = latLngAddr;

                try {
                    String jsonData = response.body().string();
                    JSONObject obj = new JSONObject(jsonData);

                    neighbourhood = obj.getString("neighbourhood");
                    address = obj.getString("address");

                    // if server was able to return neighbourhood and address to us
                    if (neighbourhood.equals("null") && address.equals("null")) {
                        neighbourhood = "آدرس نامشخص";
                        address = latLngAddr;
                    }

                } catch (Exception e) {
                    Log.d("nehsnaReverse", Log.getStackTraceString(e));
                    neighbourhood = "آدرس نامشخص";
                    address = latLngAddr;
                } finally {

                    final String fNeighbourhood = neighbourhood;
                    final String fAddrees = address;

                    runOnUiThread(() -> {
                        addressTitle.setText(fNeighbourhood);
                        addressDetails.setText(fAddrees);
                    });
                }
            }
        }
    });
}
```

```kotlin
private fun neshanReverseAPI(loc: LatLng) {
    val requestURL =
        "https://api.neshan.org/v1/reverse?lat=" + loc.latitude + "&lng=" + loc.longitude
    val latLngAddr =
        String.format("%.6f", loc.latitude) + "," + String.format("%.6f", loc.longitude)

    // adding the created certPinner to OkHttpClient
    val client = OkHttpClient.Builder()
        .build()
    val request = Request.Builder() //TODO: replace "<YOUR_API_KEY>" with your api key
        .header("Api-Key", "service.kREahwU7lND32ygT9ZgPFXbwjzzKukdObRZsnUAJ")
        .url(requestURL)
        .build()
    client.newCall(request).enqueue(object : Callback {
        override fun onFailure(call: Call, e: IOException) {
            e.printStackTrace()
        }

        @Throws(IOException::class)
        override fun onResponse(call: Call, response: Response) {
            if (!response.isSuccessful) {
                throw IOException("Unexpected code $response")
            } else {
                var neighbourhood = "آدرس نامشخص"
                var address = latLngAddr
                try {
                    val jsonData = response.body()!!.string()
                    val obj = JSONObject(jsonData)
                    neighbourhood = obj.getString("neighbourhood")
                    address = obj.getString("address")

                    // if server was able to return neighbourhood and address to us
                    if (neighbourhood == "null" && address == "null") {
                        neighbourhood = "آدرس نامشخص"
                        address = latLngAddr
                    }
                } catch (e: Exception) {
                    Log.d("nehsnaReverse", Log.getStackTraceString(e))
                    neighbourhood = "آدرس نامشخص"
                    address = latLngAddr
                } finally {
                    val fNeighbourhood = neighbourhood
                    val fAddrees = address
                    runOnUiThread {
                        addressTitle.text = fNeighbourhood
                        addressDetails.text = fAddrees
                    }
                }
            }
        }
    })
}
```
