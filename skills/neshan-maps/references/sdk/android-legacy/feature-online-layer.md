---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/online-layer/
title: لایه آنلاین (Online Layer)
---

# مستندات اضافه کردن لایه آنلاین به نقشه

هدف از این بخش از پروژه اضافه کردن یک لایه آنلاین به نقشه است.

با فرض این که لایه آنلاین مورد استفاده در این پروژه در آدرس فرضی زیر قرار دارد:

<https://example.com/points.geojson>

اطلاعات موجود در این فایل geojson به صورت زیر است:

```json
{
"type": "FeatureCollection",
"name": "points",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
"features": [
{ "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ 51.368444458834389, 35.722048959450113 ] } },
{ "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ 51.384140003141582, 35.778596997768005 ] } },
{ "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ 51.456522296148684, 35.663707775556659 ] } },
{ "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ 51.373137257878632, 35.656614228822541 ] } },
{ "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ 51.527715399382672, 35.737503116119001 ] } },
{ "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ 51.25037627592824, 35.74785430829283 ] } },
{ "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ 51.297536031713946, 35.676263156219797 ] } },
{ "type": "Feature", "properties": { }, "geometry": { "type": "Point", "coordinates": [ 51.461240697178525, 35.725292478576648 ] } }
]
}
```

## اعمال تغییرات در لی‌اوت **`activity_online_layer.xml`**

در این صفحه علاوه بر المان نقشه نشان، یک `ToggleButton` وجود دارد که با هر بار لمس شدنش، متد `toggleOnlineLayer` صدا زده می‌شود و لایه آنلاین نمایش داده می‌شود و یا در صورتی که در حال نمایش باشد حذف می‌شود.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".activity.OnlineLayer">

    <org.neshan.mapsdk.MapView
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:id="@+id/map"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"/>

    <ToggleButton
        android:checked="true"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textColor="@color/toggle_button_text_color"
        android:textOff="لایه آنلاین"
        android:textOn="لایه آنلاین"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:drawableStart="@drawable/ic_online_layer"
        android:drawableTint="@color/toggle_button_text_color"
        android:drawablePadding="8dp"
        android:background="@drawable/toggle_button_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        tools:targetApi="m"
        android:onClick="toggleOnlineLayer"/>

</android.support.constraint.ConstraintLayout>
```

## دریافت لایه

در فایل **`DownloadTask.java`** و یا فایل **`DownloadTask.kt`** مراحل زیر را انجام می‌دهیم.

این task که `AsyncTask` را extend می‌کند برای بارگیری فایل geojson نقاط نوشته شده‌است.

جزئیات نحوه پیاده‌سازی این task به صورت کامنت در متن کد نوشته شده‌است.

- java
- kotlin

```java
public class DownloadTask extends AsyncTask<String, Void, JSONObject> {
    // hold reference of activity to emit messages
    private Callback callback;

    public DownloadTask(Callback callback) {
        this.callback = callback;
    }

    @Override
    protected JSONObject doInBackground(String... strings) {
        String response = downloadRawFile(strings[0]);
        try {
            // convert raw to JSON object
            return new JSONObject(response);
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onPostExecute(JSONObject jsonObject) {
        super.onPostExecute(jsonObject);
        this.callback.onJsonDownloaded(jsonObject);
    }

    // download file from link (in this sample link is https://example.com/points.geojson)
    private String downloadRawFile(String link) {
        StringBuilder response = new StringBuilder();
        try {
            //Prepare the URL and the connection
            URL u = new URL(link);
            HttpURLConnection conn = (HttpURLConnection) u.openConnection();
            if (conn.getResponseCode() == HttpURLConnection.HTTP_OK) {
                //Get the Stream reader ready
                BufferedReader input = new BufferedReader(new InputStreamReader(conn.getInputStream()),8192);
                //Loop through the return data and copy it over to the response object to be processed
                String line;
                while ((line = input.readLine()) != null) {
                    response.append(line);
                }
                input.close();
            }
            return response.toString();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public interface Callback{
        void onJsonDownloaded(JSONObject jsonObject);
    }
}
```

```kotlin
package org.neshan.kotlinsample.task

import android.os.AsyncTask
import org.json.JSONObject
import org.json.JSONException
import java.io.BufferedReader
import java.io.InputStreamReader
import java.lang.Exception
import java.lang.StringBuilder
import java.net.HttpURLConnection
import java.net.URL

class DownloadTask(// hold reference of activity to emit messages
    private val callback: Callback) : AsyncTask<String?, Void?, JSONObject?>() {

    override fun doInBackground(vararg p0: String?): JSONObject? {
        val response = downloadRawFile(p0[0])
        try {
            // convert raw to JSON object
            return JSONObject(response)
        } catch (e: JSONException) {
            e.printStackTrace()
        }
        return null
    }

    override fun onPostExecute(jsonObject: JSONObject?) {
        super.onPostExecute(jsonObject)
        callback.onJsonDownloaded(jsonObject)
    }

    // download file from link (in this sample link is https://example.com/points.geojson)
    private fun downloadRawFile(link: String?): String? {
        val response = StringBuilder()
        try {
            //Prepare the URL and the connection
            val u = URL(link)
            val conn = u.openConnection() as HttpURLConnection
            if (conn.responseCode == HttpURLConnection.HTTP_OK) {
                //Get the Stream reader ready
                val input = BufferedReader(InputStreamReader(conn.inputStream), 8192)
                //Loop through the return data and copy it over to the response object to be processed
                var line: String?
                while (input.readLine().also { line = it } != null) {
                    response.append(line)
                }
                input.close()
            }
            return response.toString()
        } catch (ex: Exception) {
            ex.printStackTrace()
        }
        return null
    }

    interface Callback {
        fun onJsonDownloaded(jsonObject: JSONObject?)
    }
}
```

## نمایش لایه

در فایل **`OnlineLayer.java`** و یا فایل **`OnlineLayer.kt`** مراحل زیر را انجام می‌دهیم.

متد `initLayoutRefrences` جهت مقداردهی اولیه کردن به تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است. به دلیل این که لازم است تا المان اندرویدی نقشه نشان ابتدا به طور کامل ایجاد شود و سپس با آن تعامل برقرار شود (متدهای مختلف بر روی المان نقشه اجرا شود)، تمامی متدهای مربوط به رابط کاربری باید در متد `onStart` انجام شوند.

- java
- kotlin

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // starting app in full screen
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_online_layer);
    }

@Override
    protected void onStart() {
        super.onStart();
        // everything related to ui is initialized here
        initLayoutReferences();
    }
```

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_online_layer)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

پس از مقداردهی اولیه Viewهای رابط کاربری و نقشه، با استفاده از متد `checkInternet` – که در ادامه توضیح داده خواهد شد – درستی ارتباط با اینترنت بررسی می‌شود و در صورت وجود ارتباط صحیح، یک شی `DownloadTask` ایحاد می‌شود و متد `execute` بر روی آن اجرا می‌شود. به عنوان ورودی به این متد، آدرس فایل geojson داده می‌شود.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
    // Initializing views
    initViews();
    // Initializing mapView element
    initMap();

    if (checkInternet()) {
        DownloadTask downloadTask = new DownloadTask(this);
        downloadTask.execute("https://api.neshan.org/points.geojson");
    }
}
```

```kotlin
// Initializing layout references (views, map and map events)
private fun initLayoutReferences() {
    // Initializing views
    initViews()
    // Initializing mapView element
    initMap()

    if (checkInternet()) {
        val downloadTask = DownloadTask(this@OnlineLayerActivity)
        downloadTask.execute("https://api.neshan.org/points.geojson")
    }
}
```

این متد در دسترس بودن اتصال اینترنت را بررسی می‌کند.

- java
- kotlin

```java
// Check for Internet connectivity.
private Boolean checkInternet() {
    ConnectivityManager connectivityManager = (ConnectivityManager) this.getSystemService(Context.CONNECTIVITY_SERVICE);
    assert connectivityManager != null;
    NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
    return networkInfo != null;
}
```

```kotlin
// Check for Internet connectivity.
private fun checkInternet(): Boolean {
    val connectivityManager =
        (this.getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager)
    val networkInfo = connectivityManager.activeNetworkInfo
    return networkInfo != null
}
```

این متد در مختصات داده‌شده به آن، یک نشان‌گر نمایش می‌دهد. توضیحات مربوط به این متد در صفحه لایه ترافیک داده شده است.

- java
- kotlin

```java
// This method gets a LngLat as input and adds a marker on that position
private Marker addMarker(LatLng loc) {
            // Creating animation for marker. We should use an object of type AnimationStyleBuilder, set
    // all animation features on it and then call buildStyle() method that returns an object of type
    // AnimationStyle
    AnimationStyleBuilder animStBl = new AnimationStyleBuilder();
    animStBl.setFadeAnimationType(AnimationType.ANIMATION_TYPE_SMOOTHSTEP);
    animStBl.setSizeAnimationType(AnimationType.ANIMATION_TYPE_SPRING);
    animStBl.setPhaseInDuration(0.5f);
    animStBl.setPhaseOutDuration(0.5f);
    AnimationStyle animSt = animStBl.buildStyle();

    // Creating marker style. We should use an object of type MarkerStyleCreator, set all features on it
    // and then call buildStyle method on it. This method returns an object of type MarkerStyle
    MarkerStyleBuilder markStCr = new MarkerStyleBuilder();
    markStCr.setSize(30f);
    markStCr.setBitmap(BitmapUtils.createBitmapFromandroidBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.ic_marker)));
    // AnimationStyle object - that was created before - is used here
    markStCr.setAnimationStyle(animSt);
    MarkerStyle markSt = markStCr.buildStyle();

    // Creating marker
    Marker marker = new Marker(loc, markSt);

    // Adding marker to markerLayer, or showing marker on map!
    map.addMarker(marker);
    return marker;
}
```

```kotlin
// This method gets a LatLng as input and adds a marker on that position
private fun addMarker(loc: LatLng): Marker {
    // Creating animation for marker. We should use an object of type AnimationStyleBuilder, set
    // all animation features on it and then call buildStyle() method that returns an object of type
    // AnimationStyle
    val animStBl = AnimationStyleBuilder()
    animStBl.fadeAnimationType = AnimationType.ANIMATION_TYPE_SMOOTHSTEP
    animStBl.sizeAnimationType = AnimationType.ANIMATION_TYPE_SPRING
    animStBl.phaseInDuration = 0.5f
    animStBl.phaseOutDuration = 0.5f
    val animSt = animStBl.buildStyle()

    // Creating marker style. We should use an object of type MarkerStyleCreator, set all features on it
    // and then call buildStyle method on it. This method returns an object of type MarkerStyle
    val markStCr = MarkerStyleBuilder()
    markStCr.size = 30f
    markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
        BitmapFactory.decodeResource(
            resources, R.drawable.ic_marker
        )
    )
    // AnimationStyle object - that was created before - is used here
    markStCr.animationStyle = animSt
    val markSt = markStCr.buildStyle()

    // Creating marker
    val marker = Marker(loc, markSt)

    // Adding marker to markerLayer, or showing marker on map!
    map.addMarker(marker)
    return marker
}
```

بعد از اتمام دانلود فایل geojson، json موجود در آن پردازش شده و به ازای هر مختصات موجود در آن، یک بار متد `addMarker` صدا زده می‌شود و نشان‌گری بر روی نقشه در آن نقطه نمایش داده می‌شود.

برای محدود کردن ناحیه‌ای از نقشه که قرار است نمایش داده شود، متد `moveToCameraBounds` بر روی `map` صدا زده می‌شود. ورودی اول این متد، یک شی از نوع `LatLngBounds` است که مختصات نقطه شمال شرق و جنوب غرب به عنوان ورودی به آن داده می‌شود. دومین آرگومان ورودی این متد، یک `ScreenBounds` است که دو ورودی از نوع `ScreenPos` به آن داده می‌شود که اولین ورودی نقطه ۰ و ۰ است و دومین ورودی اندازه عرض و طول نقشه است. به این ترتیب زوم و مکان نقشه به شکلی تنظیم میشود که محدوده مختصات مشخص شده ( پارامتر اول ) در کل بخش نمایشی نقشه ( پارامتر دوم ) به نمایش در بیاید.

- java
- kotlin

```java
@Override
public void onJsonDownloaded(JSONObject jsonObject) {
    try {
        JSONArray features = jsonObject.getJSONArray("features");
        // variable for creating bound
        // min = south-west
        // max = north-east
        double minLat = Double.MAX_VALUE;
        double minLng = Double.MAX_VALUE;
        double maxLat = Double.MIN_VALUE;
        double maxLng = Double.MIN_VALUE;
        for (int i = 0; i < features.length(); i++) {
            JSONObject geometry = features.getJSONObject(i).getJSONObject("geometry");
            JSONArray coordinates = geometry.getJSONArray("coordinates");
            LatLng LatLng = new LatLng(coordinates.getDouble(1),coordinates.getDouble(0));

            // validating min and max
            minLat = Math.min(LatLng.getLatitude(), minLat);
            minLng = Math.min(LatLng.getLongitude(), minLng);
            maxLat = Math.max(LatLng.getLatitude(), maxLat);
            maxLng = Math.max(LatLng.getLongitude(), maxLng);

            markers.add(addMarker(LatLng));
        }
        map.moveToCameraBounds(
                new LatLngBounds(new LatLng(minLat,minLng ), new LatLng(maxLat,maxLng )),
                new ScreenBounds(
                        new ScreenPos(0,0),
                        new ScreenPos(map.getWidth(),map.getHeight())
                ),
                true, 0.25f);
    } catch (JSONException e) {
        e.printStackTrace();
    }
}
```

```kotlin
override fun onJsonDownloaded(jsonObject: JSONObject?) {
    try {
        val features = jsonObject?.getJSONArray("features")
        // variable for creating bound
        // min = south-west
        // max = north-east
        var minLat = Double.MAX_VALUE
        var minLng = Double.MAX_VALUE
        var maxLat = Double.MIN_VALUE
        var maxLng = Double.MIN_VALUE
        for (i in 0 until features!!.length()) {
            val geometry = features.getJSONObject(i)?.getJSONObject("geometry")
            val coordinates = geometry?.getJSONArray("coordinates")
            val LatLng = LatLng(coordinates?.getDouble(1)!!, coordinates.getDouble(0))

            // validating min and max
            minLat = Math.min(LatLng.latitude, minLat)
            minLng = Math.min(LatLng.longitude, minLng)
            maxLat = Math.max(LatLng.latitude, maxLat)
            maxLng = Math.max(LatLng.longitude, maxLng)
            markers.add(addMarker(LatLng))
        }
        map.moveToCameraBounds(
            LatLngBounds(LatLng(minLat, minLng), LatLng(maxLat, maxLng)),
            ScreenBounds(
                ScreenPos(0f, 0f),
                ScreenPos(map.width.toFloat(), map.height.toFloat())
            ),
            true, 0.25f
        )
    } catch (e: JSONException) {
        e.printStackTrace()
    }
}
```

متد`toggleOnlineLayer` زمانی فراخوانی می‌شود که کاربر `ToggleButton` موجود در رابط کاربری را لمس کند.

در صورتی که این دکمه انتخاب شده باشد، پس از بررسی در دسترس بودن اینترنت با استفاده از متد `checkInternet` یک `DownloadTask` ایجاد شده و متد `execute` با آرگومان ورودی آدرس فایل geojson به آن داده می‌شود. در صورتی که این دکمه از حالت انتخاب خارج شود، لایه مربوط به نشانگرها از نقشه حذف می‌شود.

- java
- kotlin

```java
public void toggleOnlineLayer(View view) {
    ToggleButton toggleButton = (ToggleButton) view;
    if (toggleButton.isChecked()) {
        if (checkInternet()) {
            DownloadTask downloadTask = new DownloadTask(this);
            downloadTask.execute("https://api.neshan.org/points.geojson");
        }
    } else {
        for (Marker marker:markers) {
            map.removeMarker(marker);
        }
    }
}
```

```kotlin
//Download markers and add to map
fun toggleOnlineLayer(view: View) {
    val toggleButton = view as ToggleButton
    if (toggleButton.isChecked) {
        if (checkInternet()) {
            val downloadTask = DownloadTask(this@OnlineLayerActivity)
            downloadTask.execute("https://api.neshan.org/points.geojson")
        }
    } else {
        for (marker in markers) {
            map.removeMarker(marker)
        }
    }
}
```
