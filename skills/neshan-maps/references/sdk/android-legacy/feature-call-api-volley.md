---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/call-api-volley/
title: فراخوانی سرویس ها با volley (volley API Call)
---

# نسخه 1.0.3

یکی دیگر از کتابخانه‌هایی که برای انجام یک درخواست REST API در اندروید قابل استفاده است، کتابخانه Volley است. در این بخش از پروژه، مشابه کاری که در بخش قبل (Retrofit) انجام داده‌ایم را با Volley انجام می‌دهیم. پس از لمس طولانی در یک نقطه و رسم یک نشانگر در آن نقطه، نام محله و آدرس آن نقطه در Bottom sheet نوشته خواهد شد.

توضیحات اولیه در مورد وب‌سرویس «تبدیل موقعیت به آدرس» و همچنین بخش‌هایی از کد که در بخش (Retrofit) آمده بود، مجددا توضیح داده نخواهد شد.

## افزودن کتابخانه به `build.gradle (Module: app)`

برای استفاده از کتابخانه Volley، وابستگی زیر را به مجموعه وابستگی‌های این فایل اضافه کنید:

```java
implementation 'com.android.volley:volley:1.0.0'
```

## فراخوانی سرویس

در فایل **`APIVolley.java`** و یا فایل **`APIVolley.kt`** مراحل زیر را انجام می‌دهیم.

تنها بخشی متفاوت این کد، نحوه پیاده‌سازی متد `neshanReverseAPI` است.

ابتدا آدرس درخواست (با طول و عرض جغرافیایی مورد نظر) به دست می‌آید و در متغیر `requestURL` ذخیره می‌شود. سپس طول و عرض جغرافیایی با ۶ رقم اعشار و جدا شده از هم با استفاده از یک ویرگول به یک رشته تبدیل می‌شود تا در زمانی که وب‌سرویس قادر به تشخیص آدرس مکانی نباشد، این رشته به جای آدرس آن مکان نشان داده شود.

یک شی از نوع `StringRequest` با نام `reverseGeoSearchRequest` ساخته می‌شود و به عنوان ورودی به آن، نوع درخواست – که در اینجا GET است- و آدرس درخواست – که در بالاتر آماده شد – و یک Listener برای پاسخ و یک Listener برای خطا داده می‌شود.

متد `onResponse` به صورت زیر Override می‌شود که ابتدا یک `JSONObject` از رشته پاسخ ورودی این متد ساخته می‌شود و رشته همسایگی و آدرس از آن دریافت می‌شود. در صورتی که رشته دریافتی برای همسایگی و آدرس برابر با رشته `null` نباشد، یعنی همسایگی و آدرس به درستی دریافت شده است، در این صورت این اطلاعات در Bottomsheet ذخیره نشان داده می‌شود. در صورتی که یکی از این دو مورد برابر با رشته `null` باشد یا Exception ای رخ دهد، رشته ساخته شده از روی طول و عرض جغرافیایی در Bottom sheet نمایش داده می‌شود.

در ادامه در متد `getHeaders` یک `Map<String, String>` ساخته و با استفاده از متد `put` کلید API درون Header درخواست قرار می‌گیرد.

در پایان متد `newRequestQueue` از کلاس `Volley` صدا زده می‌شود و با استفاده از متد `add`، درخواست رشته‌ای ساخته شده به صف درخواست‌ها اضافه می‌شود.

- java
- kotlin

```java
private void neshanReverseAPI(LngLat loc) {
    String requestURL = "https://api.neshan.org/v1/reverse?lat=" + loc.getY() + "&lng=" + loc.getX();
    final String latLngAddr = String.format("%.6f", loc.getY()) + "," + String.format("%.6f", loc.getX());

    RequestQueue requestQueue = Volley.newRequestQueue(this);

    StringRequest reverseGeoSearchRequest = new StringRequest(
            Request.Method.GET,
            requestURL,
            new com.android.volley.Response.Listener<String>() {

                @Override
                public void onResponse(String response) {
                    try {
                        JSONObject obj = new JSONObject(response);
                        String neighbourhood = new String(obj.getString("neighbourhood").getBytes(StandardCharsets.ISO_8859_1),"UTF-8");
                        String address = new String(obj.getString("address").getBytes(StandardCharsets.ISO_8859_1),"UTF-8");

                        // if server was able to return neighbourhood and address to us
                        if(!neighbourhood.equals("null") && !address.equals("null")) {
                            addressTitle.setText(neighbourhood);
                            addressDetails.setText(address);
                        }
                        else{
                            addressTitle.setText("آدرس نامشخص");
                            addressDetails.setText(latLngAddr);
                        }

                    } catch (Exception e) {

                        addressTitle.setText("آدرس نامشخص");
                        addressDetails.setText(latLngAddr);
                    }
                }
            }, new com.android.volley.Response.ErrorListener() {
        @Override
        public void onErrorResponse(VolleyError error) {
            error.printStackTrace();
        }
    }){
        @Override
        public Map<String, String> getHeaders() throws AuthFailureError {
            Map<String, String>  params = new HashMap<>();
            // TODO: replace "<YOUR_API_KEY>" with your api key
            params.put("Api-Key", "<YOUR_API_KEY>");
            return params;
        }
    };

    // Add the request to the queue
    requestQueue.add(reverseGeoSearchRequest);
}
```

```kotlin
private fun neshanReverseAPI(loc: LatLng) {
        val requestURL =
            "https://api.neshan.org/v1/reverse?lat=" + loc.latitude + "&lng=" + loc.longitude
        val latLngAddr =
            String.format("%.6f", loc.latitude) + "," + String.format("%.6f", loc.longitude)
        val requestQueue = Volley.newRequestQueue(this)

        val reverseGeoSearchRequest: StringRequest = object : StringRequest(
            Method.GET,
            requestURL,
            Response.Listener { response: String? ->
                try {
                    val obj = JSONObject(response)
                    val neighbourhood = String(
                        obj.getString("neighbourhood").toByteArray(StandardCharsets.ISO_8859_1),
                        StandardCharsets.UTF_8
                    )
                    val address = String(
                        obj.getString("address").toByteArray(StandardCharsets.ISO_8859_1),
                        StandardCharsets.UTF_8
                    )

                    // if server was able to return neighbourhood and address to us
                    if (neighbourhood != "null" && address != "null") {
                        addressTitle.text = neighbourhood
                        addressDetails.text = address
                    } else {
                        addressTitle.text = "آدرس نامشخص"
                        addressDetails.text = latLngAddr
                    }
                } catch (e: Exception) {
                    addressTitle.text = "آدرس نامشخص"
                    addressDetails.text = latLngAddr
                }
            }, Response.ErrorListener {
                    error: VolleyError -> error.printStackTrace()
            }) {
            override fun getHeaders(): Map<String, String> {
                val params: MutableMap<String, String> = HashMap()
                // TODO: replace "<YOUR_API_KEY>" with your api key
                params["Api-Key"] = "service.kREahwU7lND32ygT9ZgPFXbwjzzKukdObRZsnUAJ"
                return params
            }
        }

//         Add the request to the queue
        requestQueue.add(reverseGeoSearchRequest)
    }
```
