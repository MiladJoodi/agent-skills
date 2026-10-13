---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/user-location/
title: موقعیت کاربر (User Location)
---

# مستندات نمایش موقعیت کاربر در نقشه

## نسخه 1.0.3

هدف از این بخش از پروژه، نمایش یک نشانگر بر روی موقعیت فعلی کاربر و به‌روزرسانی مکان نمایشگر با تغییر موقعیت جغرافیایی کاربر است.

خطوط زیر را به وابستگی‌های فایل `build.gradle (Module.app)` اضافه کنید:

```text
//Play Services
implementation 'com.google.android.gms:play-services-gcm:17.0.0'
implementation 'com.google.android.gms:play-services-location:21.0.1'
```

دسترسی‌های زیر را برای به دست آوردن موقعیت جغرافیایی به فایل **`androidManifest.xml`** اضافه کنید:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

در صفحه **`activity_user_location.xml`** علاوه بر المان نقشه نشان، یک `FloatingActionButton` اضافه شده‌است که با هر بار کلیک بر روی آن، متد `focusOnUserLocation` صدا زده می‌شود. این متد در ادامه توضیح داده خواهد شد.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
	xmlns:tools="http://schemas.android.com/tools"
	android:layout_width="match_parent"
	android:layout_height="match_parent"
	xmlns:app="http://schemas.android.com/apk/res-auto"
	tools:context=".UserLocation">

	<org.neshan.mapsdk.MapView
		android:id="@+id/map"
		android:layout_width="0dp"
		android:layout_height="0dp"
		app:layout_constraintTop_toTopOf="parent"
		app:layout_constraintBottom_toBottomOf="parent"
		app:layout_constraintStart_toStartOf="parent"
		app:layout_constraintEnd_toEndOf="parent"/>

	<android.support.design.widget.FloatingActionButton
		android:layout_width="wrap_content"
		android:layout_height="wrap_content"
		app:fabSize="mini"
		android:src="@drawable/ic_my_location"
		android:layout_marginBottom="8dp"
		android:layout_marginEnd="8dp"
		app:layout_constraintBottom_toBottomOf="parent"
		app:layout_constraintEnd_toEndOf="parent"
		android:onClick="focusOnUserLocation"/>

</android.support.constraint.ConstraintLayout>
```

## اضافه کردن موقعیت کاربر

در فایل **`UserLocation.java`** و یا فایل **`UserLocation.kt`** مراحل زیر را انجام می‌دهیم.

ثابت‌های جدیدی که در طول برنامه استفاده خواهد شد در این بخش تعریف شده‌است.

ثابت `REQUEST_CODE` برای دنبال کردن درخواست مجوز (permission) است و مقدار آن به دلخواه برابر با ۱۲۳ در نظر گرفته شده‌است.

ثابت `UPDATE_INTERVAL_IN_MILLISECONDS` فاصله دوره‌های زمانی جهت درخواست موقعیت جدید را مشخص می‌کند. بسته به نیاز خود می‌توانید مقدار این ثابت را کم یا زیاد کنید.

- java
- kotlin

```java
// used to track request permissions
final int REQUEST_CODE = 123;
// location updates interval - 1 sec
private static final long UPDATE_INTERVAL_IN_MILLISECONDS = 1000;
```

```kotlin
// used to track request permissions
private val REQUEST_CODE = 123
// location updates interval - 1 sec
private val UPDATE_INTERVAL_IN_MILLISECONDS: Long = 1000
// fastest updates interval - 1 sec
// location updates will be received if another app is requesting the locations
// than your app can handle
private val FASTEST_UPDATE_INTERVAL_IN_MILLISECONDS: Long = 1000
```

موقعیت فعلی کاربر در متغیر `userLocation` ذخیره می‌شود.

برای به دست آوردن موقعیت مکانی، از یک شی از نوع `FusedLocationProviderClient` استفاده می‌شود که توضیحات مربوط به این کلاس را می‌توانید از اینجا بخوانید:

<https://developers.google.com/android/reference/com/google/android/gms/location/FusedLocationProviderClient>

سایر متغیرهایی که برای دریافت موقعیت کاربر استفاده می‌شوند، متغیرهایی از کلاس‌های `SettingsClient`، `LocationRequest`، `LocationSettingsRequest` و `LocationCallback` هستند.

آخرین زمان به‌روزرسانی موقعیت فعلی کاربر در متغیر `lastUpdateTime` – که از نوع `String` است ذخیره می‌شود. و در آخر متغیر `marker` که نشانگر اضافه شده بر روی نقشه در آن نگهداری میشود تا در صورت نیاز امکان حذف یا ویرایش آن وجود داشته باشد.

- java
- kotlin

```java
// User's current location
private Location userLocation;
private FusedLocationProviderClient fusedLocationClient;
private SettingsClient settingsClient;
private LocationRequest locationRequest;
private LocationSettingsRequest locationSettingsRequest;
private LocationCallback locationCallback;
private String lastUpdateTime;
// boolean flag to toggle the ui
private Boolean mRequestingLocationUpdates;
private Marker marker;
```

```kotlin
// User's current location
private var userLocation: Location? = null
private lateinit var fusedLocationClient: FusedLocationProviderClient
private lateinit var settingsClient: SettingsClient
private lateinit var locationRequest: LocationRequest
private var locationSettingsRequest: LocationSettingsRequest? = null
private var locationCallback: LocationCallback? = null
private var lastUpdateTime: String? = null
// boolean flag to toggle the ui
private var mRequestingLocationUpdates: Boolean? = null
private var marker: Marker? = null
```

متد `initLayoutRefrences` جهت مقداردهی اولیه کردن به تمامی المان‌های مربوط به رابط کاربری نوشته شده‌است. به دلیل این که لازم است تا المان اندرویدی نقشه نشان ابتدا به طور کامل ایجاد شود و سپس با آن تعامل برقرار شود (متدهای مختلف بر روی المان نقشه اجرا شود)، تمامی متدهای مربوط به رابط کاربری باید در متد `onStart` انجام شوند.

در متد `onStart` و پس از مقداردهی اولیه المان‌های مربوط به رابط کاربری، دو متد `initLocation` و `startReceivingLocationUpdates` صدا زده می‌شوند که در ادامه کد، نقش هر یک توضیح داده خواهد شد.

- java
- kotlin

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
	super.onCreate(savedInstanceState);

	// starting app in full screen
	requestWindowFeature(Window.FEATURE_NO_TITLE);
	getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
	setContentView(R.layout.activity_user_location);
}
@Override
protected void onStart() {
	super.onStart();
	// everything related to ui is initialized here
	initLayoutReferences();
	initLocation();
	startReceivingLocationUpdates();
}
```

```kotlin
override fun onStart() {
	super.onStart()
	// everything related to ui is initialized here
	initLayoutReferences()
	// Initializing user location
	initLocation()
	startReceivingLocationUpdates()
}
```

در متد `onPause`، متد `stopLocationUpdates` صدا زده می‌شود و دریافت موقعیت کاربر متوقف می‌شود.

- java
- kotlin

```java
@Override
protected void onPause() {
    super.onPause();
    stopLocationUpdates();
}
```

```kotlin
override fun onPause() {
	super.onPause()
	stopLocationUpdates()
}
```

در این متد پس از مقداردهی اولیه Viewها و نقشه نشان، موقعیت مکانی مقداردهی اولیه می ‌شود.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
	// Initializing views
	initViews();
	// Initializing mapView element
	initMap();
}
```

```kotlin
// Initializing layout references (views, map and map events)
private fun initLayoutReferences() {
	// Initializing views
	initViews()
	// Initializing mapView element
	initMap()
}
```

برای مقداردهی اولیه کردن موقعیت مکانی، متد `getFusedLocationProviderClient` از کلاس `LocationServices` صدا زده میشود. متغیر `settingsClient` با استفاده از متد `getSettingsClient` از کلاس `LocationServices` مقداردهی می‌شود. کاربرد این متغیر در متدهای بعدی توضیح داده خواهد شد.

متغیر `locationCallback` با یک شی جدید ایجاد شده از کلاس `LocationCallback` مقداردهی می‌شود. متد `onLocationResult` این کلاس Override شده است و در این متد آخرین موقعیت کاربر در `userLocation` و زمان فعلی (به عنوان آخرین زمان دریافت موقعیت کاربر) در متغیر `lastUpdateTime` ذخیره می‌شود. در نهایت متد `onLocationChange` – که مجموعه اتفاقاتی است که با هر بار تغییر موقعیت کاربر باید انجام شود – صدا زده می‌شود.

در ادامه دوره زمانی دریافت مجدد موقعیت کاربر، حداقل زمان به‌روزرسانی و اولویت این کاربر با استفاده از صدا زدن متدهای مربوطه بر روی `locationRequest` تنظیم می‌شود و شی `locationSettingsRequest` از روی آن ساخته می‌شود.

- java
- kotlin

```java
private void initLocation() {
	fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
	settingsClient = LocationServices.getSettingsClient(this);

	locationCallback = new LocationCallback() {
		@Override
		public void onLocationResult(LocationResult locationResult) {
			super.onLocationResult(locationResult);
			// location is received
			userLocation = locationResult.getLastLocation();
			lastUpdateTime = DateFormat.getTimeInstance().format(new Date());

			onLocationChange();
		}
	};

	mRequestingLocationUpdates = false;

	if (locationRequest == null) {
		locationRequest = new LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, UPDATE_INTERVAL_IN_MILLISECONDS).build();
		LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder();
		builder.addLocationRequest(locationRequest);
		locationSettingsRequest = builder.build();
	}
}
```

```kotlin
private fun initLocation() {
	fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
	settingsClient = LocationServices.getSettingsClient(this)

	locationCallback = object : LocationCallback() {
		override fun onLocationResult(locationResult: LocationResult) {
			super.onLocationResult(locationResult)
			// location is received
			userLocation = locationResult.lastLocation
			lastUpdateTime = DateFormat.getTimeInstance().format(Date())
			onLocationChange()
		}
	}

	mRequestingLocationUpdates = false

	locationRequest = LocationRequest.Builder(
		Priority.PRIORITY_HIGH_ACCURACY,
		UPDATE_INTERVAL_IN_MILLISECONDS
	).build()
	val builder = LocationSettingsRequest.Builder()
	builder.addLocationRequest(locationRequest)
	locationSettingsRequest = builder.build()
}
```

متد `startReceivingLocationUpdates` ابتدا چک میکند که ورژن اندروید دستگاه کاربر 6 و بالاتر از آن است یا خیر، در صورتی که بود، چک میکند که آیا دسترسی به 2 مجوز **ACCESS\_FINE\_LOCATION** و **ACCESS\_COARSE\_LOCATION** وجود دارد یا خیر، در صورتی که وجود داشت، متد `startLocationUpdates` صدا زده میشود. در غیر اینصورت درخواست دسترسی مجوز این 2 مجوز ارسال میشود.

- java
- kotlin

```java
public void startReceivingLocationUpdates() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        if (ContextCompat.checkSelfPermission(UserLocation.this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(UserLocation.this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            mRequestingLocationUpdates = true;
            startLocationUpdates();
        } else {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION}, REQUEST_CODE);
        }
    } else {
        mRequestingLocationUpdates = true;
        startLocationUpdates();
    }
}
```

```kotlin
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
            mRequestingLocationUpdates = true
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
        mRequestingLocationUpdates = true
        startLocationUpdates()
    }
}
```

نتیجه درخواست مجوز در این متد بررسی شده و در صورتی که مجوز توسط کاربر داده شود، مقدار `mRequestingLocationUpdates` برابر با `true` می‌شود و متد `startLocationUpdates` صدا زده میشود شد.

- java
- kotlin

```java
@Override
public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
	super.onRequestPermissionsResult(requestCode, permissions, grantResults);
	if (requestCode == REQUEST_CODE) {
		if (ContextCompat.checkSelfPermission(UserLocation.this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(UserLocation.this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
			mRequestingLocationUpdates = true;
			startLocationUpdates();
		}
	}
}
```

```kotlin
override fun onRequestPermissionsResult(
	requestCode: Int,
	permissions: Array<out String>,
	grantResults: IntArray
) {
	super.onRequestPermissionsResult(requestCode, permissions, grantResults)

	if (requestCode == REQUEST_CODE) {
		if (ContextCompat.checkSelfPermission(
				this@UserLocationActivity,
				Manifest.permission.ACCESS_FINE_LOCATION
			) == PackageManager.PERMISSION_GRANTED
			&& ContextCompat.checkSelfPermission(
				this@UserLocationActivity,
				Manifest.permission.ACCESS_COARSE_LOCATION
			) == PackageManager.PERMISSION_GRANTED
		) {
			mRequestingLocationUpdates = true
			startLocationUpdates()
		}
	}
}
```

در متد `startLocationUpdates`  بررسی می‌شود که اگر تنظیمات تعریف شده در `locationSettingsRequest` برقرار باشد، متد `requestLocationUpdates` بر روی `fusedLocationClient` صدا زده می‌شود و سپس متد `onLocationChange` صدا زده می‌شود. در غیر این صورت با بررسی کد خطا، رفتار مناسب انجام می‌شود (کدهای داخل متد `onFailure` و کامنت‌های نوشته شده را دنبال کنید)

- java
- kotlin

```java
/**
 * Starting location updates
 * Check whether location settings are satisfied and then
 * location updates will be requested
 */
private void startLocationUpdates() {
	settingsClient
			.checkLocationSettings(locationSettingsRequest)
			.addOnSuccessListener(this, new OnSuccessListener<LocationSettingsResponse>() {
				@SuppressLint("MissingPermission")
				@Override
				public void onSuccess(LocationSettingsResponse locationSettingsResponse) {
					Log.i(TAG, "All location settings are satisfied.");

					if (ContextCompat.checkSelfPermission(UserLocation.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(UserLocation.this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
						Log.d("UserLocationUpdater", " required permissions are not granted ");
						return;
					}

					fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, Looper.myLooper());
				}
			})
			.addOnFailureListener(this, new OnFailureListener() {
				@Override
				public void onFailure(@NonNull Exception e) {
					int statusCode = ((ApiException) e).getStatusCode();
					switch (statusCode) {
						case LocationSettingsStatusCodes.RESOLUTION_REQUIRED:
							try {
								Log.i(TAG, "Location settings are not satisfied. Attempting to upgrade location settings");
								// Show the dialog by calling startResolutionForResult(), and check the
								// result in onActivityResult().
								ResolvableApiException rae = (ResolvableApiException) e;
								rae.startResolutionForResult(UserLocation.this, REQUEST_CODE);
							} catch (IntentSender.SendIntentException sie) {
								Log.i(TAG, "PendingIntent unable to execute request.");
							}
							break;
						case LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE:
							String errorMessage = "Location settings are inadequate, and cannot be fixed here. Fix in Settings.";
							Log.e(TAG, errorMessage);
							Toast.makeText(UserLocation.this, errorMessage, Toast.LENGTH_LONG).show();
					}
				}
			});
}
```

```kotlin
/**
 * Starting location updates
 * Check whether location settings are satisfied and then
 * location updates will be requested
 */
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
				} catch (sie: SendIntentException) {
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
```

در صورتی که GPS غیرفعال باشد، پنجره مربوط به فعالسازی GPS ظاهر میشود. در صورتی که درخواست فعالسازی تایید شود، متد `onActivityResult` صدا زده میشود و در این متد با توجه به نتیجه درخواست که RESULT\_OK است، متد `startLocationUpdates`  صدا زده میشود. در غیر اینصورت متغیر `mRequestingLocationUpdates` برابر مقدار `false` خواهد شد.

- java
- kotlin

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
	super.onActivityResult(requestCode, resultCode, data);
	switch (requestCode) {
		// Check for the integer request code originally supplied to startResolutionForResult().
		case REQUEST_CODE:
			switch (resultCode) {
				case Activity.RESULT_OK:
					Log.e(TAG, "User agreed to make required location settings changes.");
					mRequestingLocationUpdates = true;
					startLocationUpdates();
					break;
				case Activity.RESULT_CANCELED:
					Log.e(TAG, "User choose not to make required location settings changes.");
					mRequestingLocationUpdates = false;
					break;
			}
			break;
	}
}
```

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)
    when (requestCode) {
        REQUEST_CODE -> {
            when (resultCode) {
                RESULT_OK -> {
                    Log.e(
                        TAG,
                        "User agreed to make required location settings changes."
                    )
                    mRequestingLocationUpdates = true
                    startLocationUpdates()
                }
                RESULT_CANCELED -> {
                    Log.e(
                        TAG,
                        "User choose not to make required location settings changes."
                    )
                    mRequestingLocationUpdates = false
                }
            }
        }
    }
}
```

در این متد، متد `removeLocationUpdates` بر روی `fusedLocationClient` صدا زده شده و به‌روزرسانی موقعیت کاربر متوقف می‌شود.

- java
- kotlin

```java
public void stopLocationUpdates() {
	// Removing location updates
	fusedLocationClient
			.removeLocationUpdates(locationCallback)
			.addOnCompleteListener(this, new OnCompleteListener<Void>() {
				@Override
				public void onComplete(@NonNull Task<Void> task) {
					Toast.makeText(getApplicationContext(), "Location updates stopped!", Toast.LENGTH_SHORT).show();
				}
			});
}
```

```kotlin
fun stopLocationUpdates() {
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
```

در صورتی که این متد صدا زده شود و `userLocation` به درستی مقدار گرفته باشد، متد `addUserMarker` با موقعیت جدید کاربر صدا زده می‌شود. سپس دوربین روی موقعیت کاربر قرار میگیرد.

- java
- kotlin

```java
private void onLocationChange() {
	if (userLocation != null) {
		addUserMarker(new LatLng(userLocation.getLatitude(), userLocation.getLongitude()));
		map.moveCamera(new LatLng(userLocation.getLatitude(), userLocation.getLongitude()), .5f);
	}
}
```

```kotlin
private fun onLocationChange() {
    if (userLocation != null) {
        addUserMarker(LatLng(userLocation!!.latitude, userLocation!!.longitude))
        map.moveCamera(LatLng(userLocation!!.latitude, userLocation!!.longitude), .5f)
    }
}
```

متد `addUserMarker` یک نشان‌گر در موقعیت فعلی کاربر نمایش می‌دهد. این متد دقیقا مشابه با متد `addMarker` که در اضافه کردن نشانگر توضیح داده‌شده است می‌باشد.

- java
- kotlin

```java
// This method gets a LngLat as input and adds a marker on that position
private void addUserMarker(LatLng loc){
	//remove existing marker from map
	if(marker!=null){
		map.removeMarker(marker);
	}
	// Creating marker style. We should use an object of type MarkerStyleCreator, set all features on it
	// and then call buildStyle method on it. This method returns an object of type MarkerStyle
	MarkerStyleBuilder markStCr = new MarkerStyleBuilder();
	markStCr.setSize(30f);
	markStCr.setBitmap(BitmapUtils.createBitmapFromandroidBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.ic_marker)));
	MarkerStyle markSt = markStCr.buildStyle();

	// Creating user marker
	marker = new Marker(loc, markSt);

	// Adding user marker to map!
	map.addMarker(marker);
}
```

```kotlin
private fun addUserMarker(loc: LatLng) {
    //remove existing marker from map
    if (marker != null) {
        map.removeMarker(marker)
    }
    // Creating marker style. We should use an object of type MarkerStyleCreator, set all features on it
    // and then call buildStyle method on it. This method returns an object of type MarkerStyle
    val markStCr = MarkerStyleBuilder()
    markStCr.size = 30f
    markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
        BitmapFactory.decodeResource(
            resources, R.drawable.ic_marker
        )
    )
    val markSt = markStCr.buildStyle()

    // Creating user marker
    marker = Marker(loc, markSt)

    // Adding user marker to map!
    map.addMarker(marker)
}
```

با هر بار لمس دکمه موجود در رابط کاربری، در صورتی که متغیر `userLocation` مقداردهی شده باشد (موقعیت کاربر دریافت شده باشد) دوربین بر روی موقعیت کاربر متمرکز می‌شود. در غیر اینصورت متد `startReceivingLocationUpdates` صدا زده میشود.

- java
- kotlin

```java
public void focusOnUserLocation(View view) {
	if (userLocation != null) {
		map.moveCamera(new LatLng(userLocation.getLatitude(), userLocation.getLongitude()), 0.25f);
		map.setZoom(15, 0.25f);
	} else {
		startReceivingLocationUpdates();
	}
}
```

```kotlin
fun focusOnUserLocation(view: View?) {
    if (userLocation != null) {
        map.moveCamera(
            LatLng(userLocation!!.latitude, userLocation!!.longitude), 0.25f
        )
        map.setZoom(15f, 0.25f)
    } else {
        startReceivingLocationUpdates()
    }
}
```

## نمایش محدوده تقریبی کاربر

زمانی که از موقعیت تقریبی کاربر (ACCESS\_COARSE\_LOCATION) برای نمایش موقعیت کاربر استفاده میکنید، همانطور که از نامش پیداست، موقعیتی که روی نقشه نمایش داده میشود تقریبی است. برای نمایش محدوده تقریبی کاربر میتوانید از متد زیر استفاده نمایید:

- java
- kotlin

```java
map.showAccuracyCircle(userLocation);
```

```kotlin
map.showAccuracyCircle(userLocation)
```

پارامتر ورودی این متد از نوع **Location** است که طبق توضیحات بالا باید متغیر **userLocation** به آن پاس داده شود. طبق مثال بالا این متد باید در متد **onLocationChange** صدا زده شود.

## نمایش جهت کاربر

برای نمایش جهت ایستادن کاربر روی نقشه میتوانید از متد زیر استفاده نمایید:

- java
- kotlin

```java
map.enableUserMarkerRotation(marker);
```

```kotlin
map.enableUserMarkerRotation(marker)
```

نکته

متد بالا باید پس از افزودن مارکر کاربر به نقشه صدا زده شود.
