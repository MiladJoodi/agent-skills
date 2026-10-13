---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/database-layer/
title: لایه دیتابیس (Database Layer)
---

# مستندات لایه پایگاه داده (Database Layer)

## نسخه 1.0.3

هدف این لایه، دریافت نقاطی از پایگاه داده و نمایش یک نشان‌گر به ازای هر کدام از آن‌ها بر روی نقشه است.

فایل `database.sqlite` در پوشه `assets` قرار داده‌ایم.

## اعمال تغییرات در لی‌اوت **`activity_database_layer.xml`**

در این صفحه، علاوه بر المان نقشه نشان یک `ToggleButton` نیز قرار گرفته است که وظیفه آن فعال و غیرفعال کردن لایه پایگاه داده است.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    tools:context=".activity.DatabaseLayer">

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
        android:textOff="لایه دیتابیس"
        android:textOn="لایه دیتابیس"
        android:elevation="8dp"
        android:paddingStart="8dp"
        android:paddingEnd="8dp"
        android:drawableStart="@drawable/ic_database_layer"
        android:drawableTint="@color/toggle_button_text_color"
        android:drawablePadding="8dp"
        android:background="@drawable/toggle_button_bg"
        android:layout_marginBottom="8dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        tools:targetApi="m"
        android:onClick="toggleDatabaseLayer"/>

</android.support.constraint.ConstraintLayout>
```

## نمایش لایه

در فایل **`AssetDatabaseHelper.java`** و یا فایل **`AssetDatabaseHelper.kt`** مراحل زیر را انجام می‌دهیم.

وظیفه این کلاس، کپی کردن فایل پایگاه داده به حافظه داخلی موبایل، باز کردن پایگاه داده و برگرداندن آن است.

آدرس مسیر در حافظه داخلی تلفن همراه را در متغیر `DB_PATH` و نام فایل پایگاه داده را در متغیر `DB_NAME` ذخیره‌ کرده‌ایم.

- java
- kotlin

```java
    // CHANGE THIS TWO LINE OF CODES!
    //The android's default system path of your application database.
    private static String DB_PATH = "/data/data/org.neshan.sample.starter/databases/";
    private static String DB_NAME = "database.sqlite";
```

بقیه بخش‌های این کلاس به طور کامل کامنت‌گذاری شده‌است. برای کپی کردن پایگاه داده به حافظه داخلی تلفن‌همراه می‌توانید از این helper استفاده کنید یا helper خود را بنویسید.

- java
- kotlin

```java
public class AssetDatabaseHelper extends SQLiteOpenHelper {

    // CHANGE THIS TWO LINE OF CODES!
    //The android's default system path of your application database.
    private static String DB_PATH = "/data/data/org.neshan.sample.starter/databases/";
    private static String DB_NAME = "database.sqlite";

    private SQLiteDatabase myDataBase;

    private final Context myContext;

    /**
     * Constructor
     * Takes and keeps a reference of the passed context in order to access to the application assets and resources.
     * @param context
     */
    public AssetDatabaseHelper(Context context) {

        super(context, DB_NAME, null, 1);
        this.myContext = context;
    }

    /**
     * Creates a empty database on the system and rewrites it with your own database.
     * */
    public void createDataBase() throws IOException {
        //By calling this method and empty database will be created into the default system path
        //of your application so we are gonna be able to overwrite that database with our database.
        this.getReadableDatabase();
        try {
            copyDataBase();

        } catch (IOException e) {
            throw new Error("Error copying database");
        }

    }

    /**
     * Check if the database already exist to avoid re-copying the file each time you open the application.
     * @return true if it exists, false if it doesn't
     */
    private boolean checkDataBase(){

        SQLiteDatabase checkDB = null;

        try{
            String myPath = DB_PATH + DB_NAME;
            checkDB = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READONLY);

        }catch(SQLiteException e){

            //database does't exist yet.

        }

        if(checkDB != null){

            checkDB.close();

        }

        return checkDB != null ? true : false;
    }

    /**
     * Copies your database from your local assets-folder to the just created empty database in the
     * system folder, from where it can be accessed and handled.
     * This is done by transfering bytestream.
     * */
    private void copyDataBase() throws IOException{

        //Open your local db as the input stream
        InputStream myInput = myContext.getAssets().open(DB_NAME);

        // Path to the just created empty db
        String outFileName = DB_PATH + DB_NAME;

        //Open the empty db as the output stream
        FileOutputStream myOutput = new FileOutputStream(outFileName, false);

        //transfer bytes from the inputfile to the outputfile
        byte[] buffer = new byte[1024];
        int length;
        while ((length = myInput.read(buffer))>0){
            myOutput.write(buffer, 0, length);
        }

        //Close the streams
        myOutput.flush();
        myOutput.close();
        myInput.close();

    }

    public SQLiteDatabase openDataBase() throws SQLException {

        //Open the database
        String myPath = DB_PATH + DB_NAME;
        myDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READONLY);

        return myDataBase;

    }

    @Override
    public synchronized void close() {

        if(myDataBase != null)
            myDataBase.close();

        super.close();

    }

    @Override
    public void onCreate(SQLiteDatabase db) {

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
    // Add your public helper methods to access and get content from the database.
    // You could return cursors by doing "return myDataBase.query(....)" so it'd be easy
    // to you to create adapters for your views.
}
```

```kotlin
    package org.neshan.kotlinsample.database_helper

    import android.content.Context
    import android.database.SQLException
    import android.database.sqlite.SQLiteOpenHelper
    import android.database.sqlite.SQLiteDatabase
    import kotlin.Throws
    import android.database.sqlite.SQLiteException
    import java.io.FileOutputStream
    import java.io.IOException
    import java.lang.Error
    import kotlin.jvm.Synchronized

    class AssetDatabaseHelper(private val myContext: Context) :
        SQLiteOpenHelper(myContext, DB_NAME, null, 1) {

        private val DB_PATH: String
        private var myDataBase: SQLiteDatabase? = null

        /**
        * Creates a empty database on the system and rewrites it with your own database.
        */
        @Throws(IOException::class)
        fun createDataBase() {

            //By calling this method and empty database will be created into the default system path
            //of your application so we are gonna be able to overwrite that database with our database.
            this.readableDatabase
            try {
                copyDataBase()
            } catch (e: IOException) {
                throw Error("Error copying database")
            }
        }

        /**
        * Check if the database already exist to avoid re-copying the file each time you open the application.
        *
        * @return true if it exists, false if it doesn't
        */
        private fun checkDataBase(): Boolean {
            var checkDB: SQLiteDatabase? = null
            try {
                val myPath = myContext.packageCodePath + DB_NAME
                checkDB = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READONLY)
            } catch (e: SQLiteException) {

                //database does't exist yet.
            }
            checkDB?.close()
            return if (checkDB != null) true else false
        }

        /**
        * Copies your database from your local assets-folder to the just created empty database in the
        * system folder, from where it can be accessed and handled.
        * This is done by transfering bytestream.
        */
        @Throws(IOException::class)
        private fun copyDataBase() {

            //Open your local db as the input stream
            val myInput = myContext.assets.open(DB_NAME)

            // Path to the just created empty db
            val outFileName = DB_PATH + DB_NAME

            //Open the empty db as the output stream
            val myOutput = FileOutputStream(outFileName, false)

            //transfer bytes from the inputfile to the outputfile
            val buffer = ByteArray(1024)
            var length: Int
            while (myInput.read(buffer).also { length = it } > 0) {
                myOutput.write(buffer, 0, length)
            }

            //Close the streams
            myOutput.flush()
            myOutput.close()
            myInput.close()
        }

        @Throws(SQLException::class)
        fun openDataBase(): SQLiteDatabase? {

            //Open the database
            val myPath = DB_PATH + DB_NAME
            myDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READONLY)
            return myDataBase
        }

        @Synchronized
        override fun close() {
            if (myDataBase != null) myDataBase!!.close()
            super.close()
        }

        override fun onCreate(db: SQLiteDatabase) {}

        override fun onUpgrade(
            db: SQLiteDatabase,
            oldVersion: Int,
            newVersion: Int
        ) {
        } // Add your public helper methods to access and get content from the database.

        // You could return cursors by doing "return myDataBase.query(....)" so it'd be easy
        // to you to create adapters for your views.
        companion object {
            private const val DB_NAME = "database.sqlite"
        }

        /**
        * Constructor
        * Takes and keeps a reference of the passed context in order to access to the application assets and resources.
        *
        * @param context
        */
        init {
            DB_PATH = myContext.filesDir.path
        }
    }
```

**`DatabaseLayer`**

یک شی از نوع `SQLiteDatabase` برای ذخیره و کار با پایگاه داده نقاط در نظر گرفته می‌شود.

- java
- kotlin

```java
    // our database points
    SQLiteDatabase pointsDB;
```

```kotlin
    // our database points
    private var pointsDB: SQLiteDatabase? = null
```

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
        setContentView(R.layout.activity_database_layer);
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
    setContentView(R.layout.activity_database_layer)
}

override fun onStart() {
    super.onStart()
    // everything related to ui is initialized here
    initLayoutReferences()
}
```

پس از مقداردهی اولیه viewها و نقشه، متد `getDBPoints` صدا زده می‌شود که جلوتر توضیح داده خواهد شد.

- java
- kotlin

```java
// Initializing layout references (views, map and map events)
private void initLayoutReferences() {
    // Initializing views
    initViews();
    // Initializing mapView element
    initMap();
    // copy database.sqlite file from asset folder to /data/data/... and read points and add marker on map
    getDBPoints();
}
```

```kotlin
// Initializing layout references (views, map and map events)
private fun initLayoutReferences() {
    // Initializing views
    initViews()
    // Initializing mapView element
    initMap()

    // do after 1 secend delay
    Handler(Looper.getMainLooper()).postDelayed({
        // copy database.sqlite file from asset folder to /data/data/... and read points and add marker on map
        getDBPoints()
    }, 1000)
}
```

در این متد، یک شی از کلاس `AssetDatabaseHelper` با نام `myDbHelper` ساخته می‌شود. در ادامه متد `createDataBase` بر روی شی `myDbHelper` صدا زده می‌شود. در صورت موفق بودن، یک پایگاه داده در حافظه داخلی تلفن همراه ایجاد شده و محتویات فایل `database.sqlite` – که در پوشه `assets` وجود دارد – به دیتابیس ساخته شده منتقل می‌شود.

سپس، پایگاه داده ایجاد شده با استفاده از متد `openDataBase` باز می‌شود و شی بازگردانده شده توسط این متد که از نوع `SQLiteDatabase` است، در متغیر `pointsDB` ذخیره می‌شود.

در ادامه یک `Cursor` ایجاد شده و با استفاده از متد `rawQuery` یک کوئری برای دریافت تمام ردیف‌های پایگاه داده – در هر ردیف مختصات جغرافیایی یک نقطه وجود دارد – اجرا می شود. با صدا زدن متد `addMarker` به ازای هر ردیف از اطلاعات، نشان‌گری در موقعیت جغرافیایی به دست آمده بر روی نقشه نشان داده خواهد شد. در ادامه متد `moveToNext` بر روی `cursor` صدا زده می شود تا همین عملیات در مرحله بعد بر روی داده بعدی انجام شود. همنچین هر نشانه ای که به نقشه اضافه میشود به آرایه `markers` هم افزوده میشود تا در ادامه جهت حذف یا تغییرات روی نشانه ها در دسترس باشد.

با استفاده از شی `cursor` اطلاعات مربوط به lat و lng هر ردیف به دست می‌آید و یک شی از نوع `LatLng` از این اطلاعات ساخته می‌شود. همزمان، اندازه lat و lng مینیمم و ماکزیمم را برای مشخص کردن محدوده‌ای که قرار است از نقشه نمایش داده شود به دست می‌آید.

برای محدود کردن ناحیه‌ای از نقشه که قرار است نمایش داده شود، متد `moveToCameraBounds` بر روی `map` صدا زده می‌شود. ورودی اول این متد، یک شی از نوع `LatLngBounds` است که مختصات نقطه شمال شرق و جنوب غرب به عنوان ورودی به آن داده می‌شود. دومین آرگومان ورودی این متد، یک `ScreenBounds` است که دو ورودی از نوع `ScreenPos` به آن داده می‌شود که اولین ورودی نقطه ۰ و ۰ است و دومین ورودی اندازه عرض و طول نقشه است. به این ترتیب زوم و مکان نقشه به شکلی تنظیم میشود که محدوده مختصات مشخص شده ( پارامتر اول ) در کل بخش نمایشی نقشه ( پارامتر دوم ) به نمایش در بیاید.

- java
- kotlin

```java
// copy database.sqlite file from asset folder to /data/data/... and read points and add marker on map
private void getDBPoints(){
    // we create an AssetDatabaseHelper object, create a new database in mobile storage
    // and copy database.sqlite file into the new created database
    // Then we open the database and return the SQLiteDatabase object
    AssetDatabaseHelper myDbHelper = new AssetDatabaseHelper(this);

    try {
        myDbHelper.createDataBase();
    }
    catch (IOException ioe) {
        throw new Error("Unable to create database");
    }

    try {
        pointsDB = myDbHelper.openDataBase();
    }
    catch(SQLException sqle){
        throw sqle;
    }

    // creating a cursor and query all rows of points table
    Cursor cursor = pointsDB.rawQuery("select * from points",null);

    //reading all points and adding a marker for each one
    if (cursor.moveToFirst()) {
        map.getLayers().add(markerLayer);
        // variable for creating bound
        // min = south-west
        // max = north-east
        double minLat = Double.MAX_VALUE;
        double minLng = Double.MAX_VALUE;
        double maxLat = Double.MIN_VALUE;
        double maxLng = Double.MIN_VALUE;
        while (!cursor.isAfterLast()) {
            double lng = cursor.getDouble(cursor.getColumnIndex("lng"));
            double lat = cursor.getDouble(cursor.getColumnIndex("lat"));
            LatLng LatLng = new LatLng(lat,lng);

            // validating min and max
            minLat = Math.min(LatLng.getLatitude(), minLat);
            minLng = Math.min(LatLng.getLongitude(), minLng);
            maxLat = Math.max(LatLng.getLatitude(), maxLat);
            maxLng = Math.max(LatLng.getLongitude(), maxLng);

            markers.add(addMarker(LatLng));

            cursor.moveToNext();
        }

        map.moveToCameraBounds(
                new LatLngBounds(new LatLng(minLat, minLng), new LatLng(maxLat, maxLng)),
                new ScreenBounds(
                        new ScreenPos(0, 0),
                        new ScreenPos(map.getWidth(), map.getHeight())
                ),
                true, 0.25f);
    }
}
```

```kotlin
// copy database.sqlite file from asset folder to /data/data/... and read points and add marker on map
@SuppressLint("Range")
private fun getDBPoints() {
    // we create an AssetDatabaseHelper object, create a new database in mobile storage
    // and copy database.sqlite file into the new created database
    // Then we open the database and return the SQLiteDatabase object
    val myDbHelper = AssetDatabaseHelper(this)
    try {
        myDbHelper.createDataBase()
    } catch (ioe: IOException) {
        throw Error("Unable to create database")
    }
    try {
        pointsDB = myDbHelper.openDataBase()
    } catch (sqle: SQLException) {
        sqle.printStackTrace()
    }

    // creating a cursor and query all rows of points table
    val cursor: Cursor = pointsDB!!.rawQuery("select * from points", null)

    //reading all points and adding a marker for each one
    if (cursor.moveToFirst()) {
        // variable for creating bound
        // min = south-west
        // max = north-east
        var minLat = Double.MAX_VALUE
        var minLng = Double.MAX_VALUE
        var maxLat = Double.MIN_VALUE
        var maxLng = Double.MIN_VALUE
        while (!cursor.isAfterLast) {
            val lng:Double = cursor.getDouble(cursor.getColumnIndex("lng"))
            val lat:Double = cursor.getDouble(cursor.getColumnIndex("lat"))
            Log.i("POINTS", "getDBPoints: $lat $lng")
            val LatLng = LatLng(lat, lng)

            // validating min and max
            minLat = Math.min(LatLng.latitude, minLat)
            minLng = Math.min(LatLng.longitude, minLng)
            maxLat = Math.max(LatLng.latitude, maxLat)
            maxLng = Math.max(LatLng.longitude, maxLng)
            markers.add(addMarker(LatLng))
            cursor.moveToNext()
        }
        map.moveToCameraBounds(
            LatLngBounds(LatLng(minLat, minLng), LatLng(maxLat, maxLng)),
            ScreenBounds(
                ScreenPos(0f, 0f), ScreenPos(map.height.toFloat(), map.height.toFloat())
            ),
            true, 0.25f
        )
        Log.i("BOUND", "getDBPoints: $minLat $minLng----$maxLat $maxLng")
    }
    cursor.close()
}
```

این متد برای اضافه‌کردن نشانگر به نقشه استفاده می‌شود که در صفحات پیش، توضیح داده شده است.

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

    // Adding marker to map!
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

    // Adding marker to map!
    map.addMarker(marker)
    return marker
}
```

با هر بار انتخاب یا لغو انتخاب `ToggleButton` موجود در رابط کاربری، این متد صدا زده می‌شود. در این متد بررسی می‌شود که اگر `toggleButton` انتخاب شده باشد، متد `getDBPoints` صدا زده شود و در غیر این صورت لایه پایگاه داده از مجموعه لایه‌های نقشه حذف شود.

- java
- kotlin

```java
public void toggleDatabaseLayer(View view) {
    ToggleButton toggleButton = (ToggleButton) view;
    if (toggleButton.isChecked())
        getDBPoints();
    else
        for (Marker marker : markers) {
            map.clearMarkers();
        }
}
```

```kotlin
fun toggleDatabaseLayer(view: View) {
    val toggleButton = view as ToggleButton
    if (toggleButton.isChecked) getDBPoints() else for (marker in markers) {
        map.removeMarker(marker)
    }
}
```
