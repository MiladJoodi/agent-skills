---
source: https://platform.neshan.org/docs/sdk/android/legacy/jetpack-compose/
title: نقشه نشان در Jetpack Compose
---

# مستندات پیاده‌سازی نقشه نشان در Jetpack Compose

## نسخه 1.0.3

**Jetpack Compose** یک **toolkit** برای ساخت **UI** است که به ساخت **UI** سادگی و سرعت بخشیده است.
جهت کسب اطلاعات بیشتر در مورد **Jetpack compose** می‌توانید به [این صفحه](https://developer.android.com/jetpack/compose?gclid=Cj0KCQjw1OmoBhDXARIsAAAYGSFQCGTfmpZOtQWMtw_7P9nZeVOGYGMzEGFbxIQTDOMy1qWhUnGqEIcaAjfiEALw_wcB&gclsrc=aw.ds) مراجعه نمایید.
در این نسخه از اس دی کی نشان، امکان پیاده‌سازی و استفاده از نقشه در **Jetpack Compose** فراهم شده است.
ابتدا پس از پیاده‌سازی **dependency** های مربوط به **Jetpack Compose** از وجود **dependency** های زیر در فایل **build.gradle** خود مطمئن شوید:

```bash
implementation 'androidx.appcompat:appcompat:1.6.1'
implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
```

سپس پس از طی کردن مراحل مربوط به راه‌اندازی اس دی کی در صفحه شروع کار با کیت توسعه اندروید، جهت پیاده‌سازی نقشه نشان در این **Toolkit** می‌توانید به صورت زیر عمل نمایید:

```kotlin
override fun onStart() {
    super.onStart()
    // Initializing user location
    setContent {
        MyApplicationTheme {
            // A surface container using the 'background' color from the theme
            Surface(
                modifier = Modifier.fillMaxSize(),
                color = MaterialTheme.colorScheme.background
            ) {
                NeshanMapView(this@MainActivity)
            }
        }
    }
}

@Composable
private fun NeshanMapView(context: Context) {
    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {},
                )
            }
        }
    }
}
```

تابع **NeshanMapView** با ایجاد یک **androidView** آبجکت **MapView** نشان را به **UI** اضافه می‌کند.

## ست کردن موارد پیش فرض نقشه

در صورتی که می‌خواهید نقشه به صورت پیش فرض دارای مقادیر دلخواه باشد، می‌توانید مقادیر را در بلوک **apply** از **MapView** ست نمایید.

در مثال زیر، هنگام لود نقشه، زوم نقشه روی **13** و لایه ترافیک غیر فعال و لایه **poi** فعال شده است.

```kotlin
@Composable
private fun NeshanMapView(context: Context) {
    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context).apply {
                            setZoom(13f, .5f)
                            isTrafficEnabled = false
                            isPoiEnabled = true
                            .
                            .
                            .
                        }
                    },
                    update = {}
                )
            }
        }
    }
}
```

## افزودن مارکر

جهت اعمال تغییرات روی نقشه مانند افزودن مارکر، تغییر جهت نقشه، چرخاندن نقشه و … باید از **Recomposition** استفاده کرد. همچنین چون متغیرها داخل تابع **NeshanMapView** تعریف شده است، برای حفظ مقادیر قبلی هنگام **recomposition** باید از **remember** استفاده کرد.

با توجه به توضیحات بالا، نحوه افزودن مارکر در **Jetpack Compose** به صورت زیر است:

در مثال بالا یک نقشه و یک **ElevatedButton** زیر آن ایجاد شده است که با کلیک روی دکمه یک مارکر روی نقشه ایجاد می‌شود.

فرایند افزودن مارکر به این صورت است که پس از کلیک کاربر روی دکمه **Add marker** متد **createMarker** یک شی مارکر با مختصات مشخص ایجاد می‌کند و مقدار بازگشتی تابع که از نوع **Marker** است در متغیر **marker** که در فانکشن **NeshanMapView** ساخته شده است ریخته می‌شود.

متغیر **markerRemember** متغیری از نوع **remember** است که آبجکت ایجاد شده را در هر **Recomposition** نگهداری می‌کند. **marker** ایجاد شده به عنوان **value** ی **markerRemember** ست می‌شود و عملیات **Recomposition** انجام می‌شود.

هنگام اجرای **Recomposition** تابع **NeshanMapView** مجددا اجرا می‌شود و **value** ی مربوط به **markerRemember** در بلوک **update** چک می‌شود.

در صورتی که مقدار آن مخالف **null** باشد، توسط شی **it** که نام **object** نقشه افزوده شده است و متد **addMarker**، مارکر ایجاد شده روی نقشه اضافه می‌شود.

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var marker: Marker? = null

    val markerRemember = remember { mutableStateOf(marker) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (markerRemember.value != null) {
                            it.addMarker(markerRemember.value)
                            markerRemember.value = null
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        marker = createMarker(context, LatLng(35.12345, 52.12345))
                        markerRemember.value = marker
                    }
                ) {
                    Text("Add marker")
                }
            }
        }
    }
}
```

موارد زیر را می‌توان همانند روش افزودن مارکر روی نقشه اعمال کرد.

## حذف مارکر

قطعه کد زیر نحوه حذف مارکر از روی نقشه را نمایش می‌دهد:

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var marker1: Marker? = null

    val marker1Remember = remember { mutableStateOf(marker1) }
    val removeMarker1Remember = remember { mutableStateOf(false) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (marker1Remember.value != null) {
                            it.addMarker(marker1Remember.value)
                            marker1Remember.value = null
                        }
                        if(removeMarker1Remember.value){
                            it.removeMarker(marker1)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        marker1 = createMarker(context, LatLng(35.70204, 51.335352))
                        marker1Remember.value = marker1
                    }
                ) {
                    Text("Add marker")
                }
                ElevatedButton(
                    onClick = {
                        removeMarker1Remember.value = true
                    }
                ) {
                    Text("Remove marker")
                }
            }
        }
    }
}
```

در مثال بالا متغیری از نوع **Marker** به نام **marker1** ساخته می‌شود. سپس یک متغیر از نوع **remember** برای ذخیذه سازی مقدار **marker1** ساخته می‌شود.

متغیر **removeMarker1Remember** نیز از نوع **remember** است و برای حذف مارکر از آن استفاده می‌کنیم.

پس از کلیک روی دکمه **Add marker**، متغیر **marker1** ساخته شده و به عنوان **value** ی متغیر **marker1Remember** ست می‌شود.

پس از ست شدن این مقدار، عملیات **Recomposition** به صورت اتوماتیک اتفاق می‌افتد و در بلوک **update** چک می‌شود که آیا مقدار **value** ی متغیر **marker1Remember** مخالف **null** است یا خیر که در این صورت **marker1** روی نقشه اضافه می‌شود.

سپس پس از کلیک روی دکمه **Remove marker**، مقداری **value** ی متغیر **removeMarker1Remember** برابر **true** ست می‌شود و مجددا عملیات **Recomposition** اتفاق می‌افتد.

در عملیات **Recomposition**، در بلوک **update** چک می‌شود که آیا مقدار **removeMarker1Remember** برابر **true** است یا خیر، که در این صورت توسط شی نقشه که در اینجا **it** نام دارد، اقدام به حذف مارکر می‌کند.

## رسم خط

قطعه کد زیر نحوه رسم خط روی نقشه را نمایش می‌دهد:

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var polyline: Polyline? = null

    val polylineRemember = remember { mutableStateOf(polyline) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if(polylineRemember.value != null){
                            it.addPolyline(polylineRemember.value)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        polyline = createPolyline()
                        polylineRemember.value = polyline
                    }
                ) {
                    Text("Add polyline")
                }
            }
        }
    }
}

fun createPolyline(): Polyline {
    var latLngs = ArrayList<LatLng>()
    latLngs.add(LatLng(35.769368, 51.327650))
    latLngs.add(LatLng(35.756670, 51.323889))
    latLngs.add(LatLng(35.746670, 51.383889))

    return Polyline(latLngs, getLineStyle())
}

fun getLineStyle(): LineStyle {
    val lineStyleBuilder = LineStyleBuilder()
    lineStyleBuilder.color = Color(2, 119, 189, 190)
    lineStyleBuilder.width = 4f
    return lineStyleBuilder.buildStyle()
}
```

## رسم و حذف دایره

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var circle1: Circle? = null

    val circle1Remember = remember { mutableStateOf(circle1) }
    val removeCircle1Remember = remember { mutableStateOf(false) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (circle1Remember.value != null) {
                            it.addCircle(circle1Remember.value)
                            circle1Remember.value = null
                        }
                        if (removeCircle1Remember.value) {
                            it.removeCircle(circle1)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        circle1 = createCircle(LatLng(35.70204, 51.335352),100f)
                        circle1Remember.value = circle1
                    }
                ) {
                    Text("Add circle")
                }
                ElevatedButton(
                    onClick = {
                        removeCircle1Remember.value = true
                    }
                ) {
                    Text("Remove circle")
                }
            }
        }
    }
}

fun createCircle(centerLatLng: LatLng, radius: Double): Circle {
    return Circle(centerLatLng, radius, Color(2, 119, 189, 190), getLineStyle())
}

fun getLineStyle(): LineStyle {
    val lineStyleBuilder = LineStyleBuilder()
    lineStyleBuilder.color = Color(2, 119, 189, 190)
    lineStyleBuilder.width = 4f
    return lineStyleBuilder.buildStyle()
}
```

## رسم و حذف چند ضلعی

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var polygon1: Polygon? = null

    val polygon1Remember = remember { mutableStateOf(polygon1) }
    val removePolygon1Remember = remember { mutableStateOf(false) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (polygon1Remember.value != null) {
                            it.addPolygon(polygon1Remember.value)
                            polygon1Remember.value = null
                        }
                        if (removePolygon1Remember.value) {
                            it.removePolygon(polygon1)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        var latLngs = ArrayList<LatLng>()
                        latLngs.add(LatLng(35.704760, 51.333912))
                        latLngs.add(LatLng(35.702212, 51.340889))
                        latLngs.add(LatLng(35.699977, 51.336472))
                        latLngs.add(LatLng(35.700902, 51.330897))
                        polygon1 = createPolygon(latLngs)

                        polygon1Remember.value = polygon1
                    }
                ) {
                    Text("Add polygon")
                }
                ElevatedButton(
                    onClick = {
                        removePolygon1Remember.value = true
                    }
                ) {
                    Text("Remove polygon")
                }
            }
        }
    }
}
```

## تغییر زاویه دوربین

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var tiltCameraAmount: Float? = null
    var tiltCameraDuration: Float? = null

    val tiltCameraAmountRemember = remember { mutableStateOf(tiltCameraAmount) }
    val tiltCameraDurationRemember = remember { mutableStateOf(tiltCameraDuration) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (tiltCameraAmountRemember.value != null && tiltCameraDurationRemember.value != null) {
                            it.setTilt(
                                tiltCameraAmountRemember.value!!,
                                tiltCameraDurationRemember.value!!
                            )
                            tiltCameraAmountRemember.value = null
                            tiltCameraDurationRemember.value = null
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        tiltCameraAmount = 30f
                        tiltCameraDuration = .5f
                        tiltCameraAmountRemember.value = tiltCameraAmount
                        tiltCameraDurationRemember.value = tiltCameraDuration
                    }
                ) {
                    Text("Tilt camera")
                }
            }
        }
    }
}
```

## تغییر جهت دوربین

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var cameraBearingAmount: Float? = null
    var cameraBearingDuration: Float? = null

    val cameraBearingAmountRemember = remember { mutableStateOf(cameraBearingAmount) }
    val cameraBearingDurationRemember = remember { mutableStateOf(cameraBearingDuration) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (cameraBearingAmountRemember.value != null && cameraBearingDurationRemember.value != null) {
                            it.setBearing(
                                cameraBearingAmountRemember.value!!,
                                cameraBearingDurationRemember.value!!
                            )
                            cameraBearingAmountRemember.value = null
                            cameraBearingDurationRemember.value = null
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        cameraBearingAmount = 30f
                        cameraBearingDuration = .5f
                        cameraBearingAmountRemember.value = cameraBearingAmount
                        cameraBearingDurationRemember.value = cameraBearingDuration
                    }
                ) {
                    Text("Rotate camera")
                }
            }
        }
    }
}
```

## تغییر استایل نقشه

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var mapStyle: Int? = null

    val mapStyleRemember = remember { mutableStateOf(mapStyle) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (mapStyleRemember.value != null) {
                            it.setMapStyle(mapStyleRemember.value!!)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        mapStyleRemember.value = NeshanMapStyle.NESHAN_NIGHT
                    }
                ) {
                    Text("Night style")
                }
            }
        }
    }
}
```

## نمایش موقعیت کاربر

```kotlin
class UserLocationActivity : ComponentActivity() {

    private val TAG: String = MainActivity::class.java.name
    private val REQUEST_CODE = 123
    private val UPDATE_INTERVAL_IN_MILLISECONDS: Long = 1000

    private var userMarker: Marker? = null
    private var addUserMarkerRemember = mutableStateOf(userMarker)
    private var moveCameraLatLng: LatLng? = null
    private var moveCameraState = mutableStateOf(moveCameraLatLng)
    private var moveCameraDuration: Float? = null
    private var moveCameraDurationState = mutableStateOf(moveCameraDuration)

    private var userLocation: Location? = null
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var settingsClient: SettingsClient
    private lateinit var locationRequest: LocationRequest
    private var locationSettingsRequest: LocationSettingsRequest? = null
    private var locationCallback: LocationCallback? = null

    override fun onStart() {
        super.onStart()
        setContent {
            JetpackComposeTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    NeshanMapView(this@UserLocationActivity)
                }
            }
        }
        initLocation()
        startReceivingLocationUpdates()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    @Composable
    private fun NeshanMapView(context: Context) {
        Surface() {
            Row() {
                Column() {
                    androidView(
                        factory = { context ->
                            MapView(context) as View
                        },
                        update = {
                            if (addUserMarkerRemember.value != null) {
                                it.addMarker(addUserMarkerRemember.value)
                            }
                            if (moveCameraState.value != null && moveCameraDurationState.value != null) {
                                it.moveCamera(
                                    moveCameraState.value,
                                    moveCameraDurationState.value!!
                                )
                            }
                        },
                        modifier = Modifier.weight(1f),
                    )
                }
            }
        }
    }

    fun createMarker(context: Context, loc: LatLng?): Marker {
        val animStBl = AnimationStyleBuilder()
        animStBl.fadeAnimationType = AnimationType.ANIMATION_TYPE_SMOOTHSTEP
        animStBl.sizeAnimationType = AnimationType.ANIMATION_TYPE_SPRING
        animStBl.phaseInDuration = 0.5f
        animStBl.phaseOutDuration = 0.5f
        val animSt = animStBl.buildStyle()

        val markStCr = MarkerStyleBuilder()
        markStCr.size = 30f
        markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
            BitmapFactory.decodeResource(context.resources, R.drawable.ic_marker)
        )
        markStCr.animationStyle = animSt
        val markSt = markStCr.buildStyle()

        return Marker(loc, markSt)
    }

    private fun initLocation() {
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        settingsClient = LocationServices.getSettingsClient(this)

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                super.onLocationResult(locationResult)
                // location is received
                userLocation = locationResult.lastLocation
                onLocationChange()
            }
        }

        locationRequest = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            UPDATE_INTERVAL_IN_MILLISECONDS
        ).build()
        val builder = LocationSettingsRequest.Builder()
        builder.addLocationRequest(locationRequest)
        locationSettingsRequest = builder.build()
    }

    private fun startReceivingLocationUpdates() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ContextCompat.checkSelfPermission(
                    this@UserLocationActivity,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(
                    this@UserLocationActivity,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED
            ) {
                startLocationUpdates()
            } else {
                requestPermissions(
                    arrayOf(
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION
                    ), REQUEST_CODE
                )
            }

        } else {
            startLocationUpdates()
        }
    }

    private fun startLocationUpdates() {
        settingsClient
            .checkLocationSettings(locationSettingsRequest!!)
            .addOnSuccessListener(this, OnSuccessListener {
                Log.i(
                    TAG,
                    "All location settings are satisfied."
                )
                if (ContextCompat.checkSelfPermission(
                        this@UserLocationActivity,
                        Manifest.permission.ACCESS_FINE_LOCATION
                    ) != PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(
                        this@UserLocationActivity,
                        Manifest.permission.ACCESS_COARSE_LOCATION
                    ) != PackageManager.PERMISSION_GRANTED
                ) {
                    Log.d("UserLocationUpdater", " required permissions are not granted ")
                    return@OnSuccessListener
                }
                fusedLocationClient.requestLocationUpdates(
                    locationRequest,
                    locationCallback!!,
                    Looper.myLooper()
                )
            })
            .addOnFailureListener(this) { e ->
                val statusCode = (e as ApiException).statusCode
                when (statusCode) {
                    LocationSettingsStatusCodes.RESOLUTION_REQUIRED -> try {
                        Log.i(
                            TAG,
                            "Location settings are not satisfied. Attempting to upgrade location settings"
                        )
                        // Show the dialog by calling startResolutionForResult(), and check the
                        // result in onActivityResult().
                        val rae = e as ResolvableApiException
                        rae.startResolutionForResult(this@UserLocationActivity, REQUEST_CODE)
                    } catch (sie: IntentSender.SendIntentException) {
                        Log.i(
                            TAG,
                            "PendingIntent unable to execute request."
                        )
                    }
                    LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE -> {
                        val errorMessage =
                            "Location settings are inadequate, and cannot be fixed here. Fix in Settings."
                        Log.e(
                            TAG,
                            errorMessage
                        )
                        Toast.makeText(this@UserLocationActivity, errorMessage, Toast.LENGTH_LONG)
                            .show()
                    }
                }
            }
    }

    private fun onLocationChange() {
        if (userLocation != null) {
            stopLocationUpdates()
            var marker: Marker = createMarker(
                this@UserLocationActivity,
                LatLng(userLocation!!.latitude, userLocation!!.longitude)
            )
            addUserMarkerRemember.value = marker
            moveCameraState.value = LatLng(userLocation!!.latitude, userLocation!!.longitude)
            moveCameraDurationState.value = .5f
        }
    }

    private fun stopLocationUpdates() {
        // Removing location updates
        fusedLocationClient
            .removeLocationUpdates(locationCallback!!)
            .addOnCompleteListener(
                this
            ) {
                Toast.makeText(applicationContext, "Location updates stopped!", Toast.LENGTH_SHORT)
                    .show()
            }
    }
}
```

در مثال بالا علاوه بر پیاده‌سازی نحوه نمایش موقعیت کاربر، نحوه حرکت دادن دوربین را نیز پیاده‌سازی کرده‌ایم.

متغیرهای **moveCameraLatLng** ، **moveCameraDuration** ، **moveCameraState** و **moveCameraDurationState** برای حرکت دادن دوربین مورد استفاده قرار می‌گیرند.

## فعالسازی لایه ترافیک

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    val trafficLayerRemember = remember { mutableStateOf(false) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (trafficLayerRemember.value != null) {
                            it.setTrafficEnabled(trafficLayerRemember.value)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        trafficLayerRemember.value = !trafficLayerRemember.value
                    }
                ) {
                    Text("Toggle traffic layer")
                }
            }
        }
    }
}
```

## فعالسازی لایه poi

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    val poiLayerRemember = remember { mutableStateOf(false) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (poiLayerRemember.value != null) {
                            it.setPoiEnabled(poiLayerRemember.value)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        poiLayerRemember.value = !poiLayerRemember.value
                    }
                ) {
                    Text("Toggle poi layer")
                }
            }
        }
    }
}
```

## افزودن برچسب

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var label1:Label? = null

    val addLabel1Remember = remember { mutableStateOf(label1) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (addLabel1Remember.value != null) {
                            it.addLabel(addLabel1Remember.value)
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        addLabel1Remember.value = createLabel(LatLng(35.700476, 51.337644),"Label1 caption")
                    }
                ) {
                    Text("Add label")
                }
            }
        }
    }
}
```

## خوشه بندی نشانگرها

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context).apply {
                            settings.isMarkerClusteringEnabled = true
                        }
                    },
                    update = {

                    },
                    modifier = Modifier.weight(1f),
                )
            }
        }
    }
}
```

## متدهای کار با دوربین

جهت آشنایی با متدهای کار با دوربین روی نقشه می‌توانید به صفحه متدهای کار با دوربین مراجعه نمایید.

در ادامه نحوه پیاده‌سازی این متدها در Jetpack Compose را شرح می‌دهیم:

## متد moveToCameraBounds

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var moveToCameraBoundsNorthEast: LatLng? = null
    var moveToCameraBoundsSouthWest: LatLng? = null
    var moveToCameraBoundsintegerZoom: Boolean? = null
    var moveToCameraBoundsDuration: Float? = null

    val moveToCameraBoundsNorthEastRemember =
        remember { mutableStateOf(moveToCameraBoundsNorthEast) }
    val moveToCameraBoundsSouthWestRemember =
        remember { mutableStateOf(moveToCameraBoundsSouthWest) }
    val moveToCameraBoundsIntegerZoomRemember =
        remember { mutableStateOf(moveToCameraBoundsintegerZoom) }
    val moveToCameraBoundsDurationRemember =
        remember { mutableStateOf(moveToCameraBoundsDuration) }

    var moveCameraLatLng: LatLng? = null
    var moveCameraDuration: Float? = null

    val moveCameraRemember = remember { mutableStateOf(moveCameraLatLng) }
    val moveCameraDurationRemember = remember { mutableStateOf(moveCameraDuration) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (moveCameraRemember.value != null && moveCameraDurationRemember.value != null) {
                            it.moveCamera(
                                moveCameraRemember.value,
                                moveCameraDurationRemember.value!!
                            )
                        }
                        if (moveToCameraBoundsNorthEastRemember.value != null
                            && moveToCameraBoundsSouthWestRemember.value != null
                            && moveToCameraBoundsIntegerZoomRemember.value != null
                            && moveToCameraBoundsDurationRemember.value != null
                        ) {

                            it.moveToCameraBounds(
                                LatLngBounds(
                                    moveToCameraBoundsNorthEastRemember.value,
                                    moveToCameraBoundsSouthWestRemember.value
                                ),
                                ScreenBounds(
                                    ScreenPos(0f, 0f),
                                    ScreenPos(it.width.toFloat(), it.height.toFloat())
                                ),
                                moveToCameraBoundsIntegerZoomRemember.value!!,
                                moveToCameraBoundsDurationRemember.value!!
                            )
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        moveCameraLatLng = LatLng(36.316203, 59.576074)
                        moveCameraDuration = .5f

                        moveCameraRemember.value = moveCameraLatLng
                        moveCameraDurationRemember.value = moveCameraDuration
                    }
                ) {
                    Text("Move camera")
                }
                ElevatedButton(
                    onClick = {
                        moveToCameraBoundsNorthEast =
                            LatLng(35.809174301661336, 51.53005019022984)
                        moveToCameraBoundsSouthWest =
                            LatLng(35.61431826413479, 51.137353382540034)
                        moveToCameraBoundsintegerZoom = false
                        moveToCameraBoundsDuration = .5f

                        moveToCameraBoundsNorthEastRemember.value = moveToCameraBoundsNorthEast
                        moveToCameraBoundsSouthWestRemember.value = moveToCameraBoundsSouthWest
                        moveToCameraBoundsDurationRemember.value = moveToCameraBoundsDuration
                        moveToCameraBoundsIntegerZoomRemember.value =
                            moveToCameraBoundsintegerZoom
                    }
                ) {
                    Text("MoveToCameraBounds method test")
                }
            }
        }
    }
}
```

## متد moveCamera

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    var moveCameraLatLng: LatLng? = null
    var moveCameraDuration: Float? = null

    val moveCameraRemember = remember { mutableStateOf(moveCameraLatLng) }
    val moveCameraDurationRemember = remember { mutableStateOf(moveCameraDuration) }

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context) as View
                    },
                    update = {
                        if (moveCameraRemember.value != null && moveCameraDurationRemember.value != null) {
                            it.moveCamera(
                                moveCameraRemember.value,
                                moveCameraDurationRemember.value!!
                            )
                        }
                    },
                    modifier = Modifier.weight(1f),
                )
                ElevatedButton(
                    onClick = {
                        moveCameraLatLng = LatLng(35.701519, 51.337244)
                        moveCameraDuration = .5f

                        moveCameraRemember.value = moveCameraLatLng
                        moveCameraDurationRemember.value = moveCameraDuration
                    }
                ) {
                    Text("Move camera")
                }
            }
        }
    }
}
```

## متغیر cameraTargetPosition

برای دسترسی به نقطه وسط نقشه نیز می‌توانید در بلوک‌های **factory** و **update** به صورت زیر دسترسی داشته باشید:

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context).apply{
                            cameraTargetPosition
                        }
                    },
                    update = {
                        it.cameraTargetPosition
                    },
                    modifier = Modifier.weight(1f),
                )
            }
        }
    }
}
```

## لیسندرها

### setOnCameraMoveListener

### setOnCameraMoveStartListener

### setOnCameraMoveFinishedListener

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context).apply{
                            setOnCameraMoveListener {
                                //Do someting...
                            }
                            setOnCameraMoveStartListener {
                                //Do something
                            }
                            setOnCameraMoveFinishedListener {
                                //Do something
                            }
                        }
                    },
                    update = {

                    },
                    modifier = Modifier.weight(1f),
                )
            }
        }
    }
}
```

### setOnMarkerClickListener

### setOnCircleClickListener

### setOnPolygonClickListener

### setOnPolylineClickListener

```kotlin
@Composable
private fun NeshanMapView(context: Context) {

    Surface() {
        Row() {
            Column() {
                androidView(
                    factory = { context ->
                        MapView(context).apply {
                            setOnMarkerClickListener {
                                //Do something
                            }
                            setOnPolylineClickListener {
                                //Do something
                            }
                            setOnPolygonClickListener {
                                //Do something
                            }
                            setOnCircleClickListener {
                                //Do something
                            }
                        }
                    },
                    update = {

                    },
                    modifier = Modifier.weight(1f),
                )
            }
        }
    }
}
```
