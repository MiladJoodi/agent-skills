---
source: https://platform.neshan.org/docs/sdk/android/legacy/features/remove-marker/
title: حذف مارکر از روی نقشه  (Remove marker)
---

# حذف نشانگر (Marker) - نسخه 1.0.3

این بخش از پروژه عملکرد حذف و اضافه کردن نشانگر (پین) را بیان می‌کند.

در این پروژه نشانگرها با لمس طولانی ایجاد می‌شوند و پس از آن با لمس هر یک از نشانگرها منویی برای تایید حذف نشانگر به صورت یک bottom sheet پدیدار می‌شود.

## اعمال تغییرات در لی‌اوت **`remove_marker_bottom_sheet.xml`**

این فایل طراحی منوی bottom sheet است که برای تایید حذف نمایش داده می‌شود.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:layout_marginEnd="8dp"
    android:clickable="true"
    android:fitsSystemWindows="true"
    android:focusable="true"
    android:layoutDirection="ltr"
    app:behavior_hideable="false"
    app:behavior_peekHeight="0dp"
    app:cardCornerRadius="8dp"
    app:cardElevation="8dp"
    app:layout_behavior="android.support.design.widget.BottomSheetBehavior">

    <android.support.constraint.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <Button
            android:id="@+id/remove_marker"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginStart="25dp"
            android:layout_marginTop="10dp"
            android:layout_marginBottom="15dp"
            android:background="@android:color/holo_red_dark"
            android:text="حذف"
            android:textColor="@color/textPrimaryColorInverse"
            android:textSize="15sp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintVertical_bias="1.0" />

        <TextView
            android:id="@+id/marker_id"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="25dp"
            android:fontFamily="@font/iran_sans_bold"
            android:text="از حذف پین مطمئن هستید؟"
            android:textSize="15sp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toEndOf="@+id/remove_marker"
            app:layout_constraintTop_toTopOf="parent" />

    </android.support.constraint.ConstraintLayout>

</android.support.v7.widget.CardView>
```

## اعمال تغییرات در لی‌اوت **`activity_remove_marker.xml`**

این فایل فقط شامل نقشه و یک include از فایل قبل (bottom sheet) می‌باشد.

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".activity.RemoveMarker">

    <org.neshan.mapsdk.MapView
        android:id="@+id/map"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

    <include
        android:id="@+id/remove_marker_bottom_sheet_include"
        layout="@layout/remove_marker_bottom_sheet" />

</android.support.design.widget.CoordinatorLayout>
```

## حذف مارکر

در فایل `RemoveMarker.java` و یا فایل `RemoveMarker.kt` مراحل زیر را انجام می‌دهیم.

### متد `initViews`

ابتدا در متد `initViews` تمام المان‌های موجود را تعریف می‌کنیم. همچنین در این‌جا از متد `BottomSheetCallback` برای bottom sheet استفاده می‌کنیم. در این متد تعریف می‌کنیم که اگر کاربر bottom sheet را به صورت دستی `collapse` کرد، نشانگر انتخاب شده نیز deselect شود.

- java
- kotlin

```java
private void initViews() {
    map = findViewById(R.id.map);
    marker_id = findViewById(R.id.marker_id);
    remove_marker = findViewById(R.id.remove_marker);
    // bottom sheet include tag and behavior
    remove_marker_bottom_sheet = findViewById(R.id.remove_marker_bottom_sheet_include);
    bottomSheetBehavior = BottomSheetBehavior.from(remove_marker_bottom_sheet);
    remove_marker.setVisibility(View.GONE);
    marker_id.setText(Html.fromHtml(firstTipString));
    bottomSheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);

    // bottom sheet callback deselect marker for when bottom sheet collapsed manually
    bottomSheetBehavior.setBottomSheetCallback(new BottomSheetBehavior.BottomSheetCallback() {
        @Override
        public void onStateChanged(@NonNull View bottomSheet, int newState) {
            if (newState == BottomSheetBehavior.STATE_COLLAPSED && selectedMarker != null) {
                deselectMarker(selectedMarker);
            }
        }

        @Override
        public void onSlide(@NonNull View bottomSheet, float slideOffset) {
        }
    });
}
```

```kotlin
// We use findViewByID for every element in our layout file here
private fun initViews() {
    map = findViewById(R.id.mapview)
    removeMarker = findViewById(R.id.remove_marker)
    markerId = findViewById(R.id.marker_id)
    removeMarkerBottomSheet = findViewById(R.id.remove_marker_bottom_sheet_include)
    bottomSheetBehavior = BottomSheetBehavior.from<View>(removeMarkerBottomSheet)

    removeMarker.visibility = GONE
    markerId.text = Html.fromHtml(firstTipString)
    bottomSheetBehavior.state = BottomSheetBehavior.STATE_EXPANDED

    // bottom sheet callback deselect marker for when bottom sheet collapsed manually
    bottomSheetBehavior.setBottomSheetCallback(object : BottomSheetCallback() {
        override fun onStateChanged(bottomSheet: View, newState: Int) {
            if (newState == BottomSheetBehavior.STATE_COLLAPSED && selectedMarker != null) {
                deselectMarker(selectedMarker)
            }
        }

        override fun onSlide(bottomSheet: View, slideOffset: Float) {}
    })
}
```

### متد `changeMarkerToRed`

متد `changeMarkerToRed` نیز دقیقاً مشابه متد `changeMarkerToBlue` کار می‌کند با این تفاوت که رنگ نشانگر را به رنگ قرمز تغییر می‌دهد.

- java
- kotlin

```java
private void changeMarkerToRed(Marker blueMarker){
    // create new marker style
    MarkerStyleCreator markStCr = new MarkerStyleCreator();
    markStCr.setSize(30f);
    // Setting a new bitmap as marker
    markStCr.setBitmap(BitmapUtils.createBitmapFromandroidBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.ic_marker)));
    markStCr.setAnimationStyle(animSt);
    MarkerStyle redMarkSt = markStCr.buildStyle();

    // changing marker style using setStyle
    blueMarker.setStyle(redMarkSt);
}
```

```kotlin
private fun changeMarkerToRed(blueMarker: Marker) {
    // create new marker style
    val markStCr = MarkerStyleBuilder()
    markStCr.size = 30f
    // Setting a new bitmap as marker
    markStCr.bitmap = BitmapUtils.createBitmapFromandroidBitmap(
        BitmapFactory.decodeResource(
            resources, R.drawable.ic_marker
        )
    )
    markStCr.animationStyle = animSt
    val redMarkSt = markStCr.buildStyle()

    // changing marker style using setStyle
    blueMarker.setStyle(redMarkSt)
}
```

### متد `initLayoutReferences`

در این متد پس از فراخوانی متدهای `initViews` و `initMap` برای map یک `setOnMapLongClickListener` تعریف می‌شود برای تشخیص لمس طولانی بر روی نقشه.

- java
- kotlin

```java
map.setOnMapLongClickListener(new MapView.OnMapLongClickListener() {
    @Override
    public void onMapLongClick(LatLng var1) {
        // check the bottom sheet expanded or collapsed
        if (bottomSheetBehavior.getState() == BottomSheetBehavior.STATE_EXPANDED) {

            if (selectedMarker == null) {
                // if bottom sheet is expanded and no marker selected second tip is going up (for just one time)
                collapseBottomSheet();
                // delay for collapsing then expanding bottom sheet
                remove_marker_bottom_sheet.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        expandBottomSheet();
                    }
                }, 200);
                remove_marker_bottom_sheet.post(new Runnable() {
                    @Override
                    public void run() {
                        marker_id.setText(Html.fromHtml(secondTipString));
                    }
                });
            } else {
                // if bottom sheet is expanded and any marker selected deselect that marker by long tap
                deselectMarker(selectedMarker);
            }
        }
        // addMarker adds a marker (pretty self explanatory :D) to the clicked location
        addMarker(var1, "Marker "+ ++markerIndex);
    }
});
```

```kotlidn
map.setOnMapLongClickListener { var1 -> // check the bottom sheet expanded or collapsed
    if (bottomSheetBehavior.state == BottomSheetBehavior.STATE_EXPANDED) {
        if (selectedMarker == null) {
            // if bottom sheet is expanded and no marker selected second tip is going up (for just one time)
            collapseBottomSheet()
            // delay for collapsing then expanding bottom sheet
            removeMarkerBottomSheet.postDelayed({ expandBottomSheet() }, 200)
            removeMarkerBottomSheet.post { markerId.text = Html.fromHtml(secondTipString) }
        } else {
            // if bottom sheet is expanded and any marker selected deselect that marker by long tap
            deselectMarker(selectedMarker)
        }
    }
    // addMarker adds a marker (pretty self explanatory :D) to the clicked location
    addMarker(var1, "Marker " + ++markerIndex)
}
```

### کلیک روی نقشه

یک `setOnMapClickListener` برای تشخیص کلیک بر روی نقشه و deselect کردن نشانه انتخاب شده تعریف شده است.

- java
- kotlin

```java
map.setOnMapClickListener(new MapView.OnMapClickListener() {
    @Override
    public void onMapClick(LatLng var1) {
        if (selectedMarker != null) {
            // deselect marker when tap on map and a marker is selected
            deselectMarker(selectedMarker);
        }
    }
});
```

```kotlin
map.setOnMapClickListener { selectedMarker?.let { deselectMarker(it) } }
```

### کلیک روی نشانگر

با اضافه کردن یک `setOnMarkerClickListener` نیز این امکان ایجاد می‌شود تا با تشخصی کلیک بر روی نشانه‌های اضافه شده در نقشه، اگر نشانه انتخاب شده است، از انتخاب خارج شود و اگر انتخاب نشده، انتخاب شود.

- java
- kotlin

```java
// marker listener for select and deselect markers
map.setOnMarkerClickListener(new MapView.OnMarkerClickListener() {
    @Override
    public void OnMarkerClicked(Marker marker) {
        if (selectedMarker != null) {
            // deselect marker when tap on a marker and a marker is selected
            deselectMarker(selectedMarker);
        } else {
            // select marker when tap on a marker
            selectMarker(marker);
            remove_marker_bottom_sheet.post(new Runnable() {
                @Override
                public void run() {
                    marker_id.setText("از حدف پین " + marker.getTitle() + " اطمینان دارید؟");
                    remove_marker.setVisibility(View.VISIBLE);
                }
            });
        }
    }
});
```

```kotlin
/ marker listener for select and deselect markers
map.setOnMarkerClickListener { marker ->
    if (selectedMarker != null) {
        // deselect marker when tap on a marker and a marker is selected
        deselectMarker(selectedMarker)
    } else {
        // select marker when tap on a marker
        selectMarker(marker)
        removeMarkerBottomSheet.post {
            markerId.text = "از حدف پین " + marker.title + " اطمینان دارید؟"
            removeMarker.visibility = VISIBLE
        }
    }
}
```

### کلیک روی دکمه حذف

یک رویداد کلیک هم بر روی کلید `remove_marker` تعریف شده تا با زدن آن، نشانه انتخاب شده به کمک متد `removeMarker` از روی نقشه حذف شود.

- java
- kotlin

```java
// remove marker and deselect that marker
remove_marker.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View view) {
        if (selectedMarker != null) {
            map.removeMarker(selectedMarker);
            deselectMarker(selectedMarker);
        }
    }
});
```

```kotlian
// remove marker and deselect that marker
removeMarker.setOnClickListener {
    map.removeMarker(selectedMarker)
    deselectMarker(selectedMarker)
}
```

### متدهای کمکی

#### متد `deselectMarker`

در متد `deselectMarker` همانطور که از نامش پیداست یک نشانگر را در ورودی دریافت می‌کند و آن را با تغییر رنگ و بستن bottom sheet و مساوی قرار دادن متغیر `selectedMarker` با `null` آن نشانگر را deselect (لغو انتخاب) می‌کند.

- java
- kotlin

```java
private void deselectMarker(final Marker deselectMarker) {
    collapseBottomSheet();
    changeMarkerToBlue(deselectMarker);
    selectedMarker = null;
}
```

```kotlian
// deselect marker and collapsing bottom sheet
private fun deselectMarker(deselectMarker: Marker?) {
    collapseBottomSheet()
    changeMarkerToBlue(deselectMarker)
    selectedMarker = null
}
```

#### متد `selectMarker`

متد `selectMarker` نیز همانند متد قبل یک نشانگر را انتخاب می‌کند. این عملیات شامل نمایان شدن bottom sheet، تغییر رنگ نشانگر و ذخیره نشانگر در متغیر `selectedMarker` می‌شود.

- java
- kotlin

```java
private void selectMarker(final Marker selectMarker) {
    expandBottomSheet();
    changeMarkerToRed(selectMarker);
    selectedMarker = selectMarker;
}
```

```kotlian
// select marker and expanding bottom sheet
private fun selectMarker(selectMarker: Marker) {
    expandBottomSheet()
    changeMarkerToRed(selectMarker)
    selectedMarker = selectMarker
}
```

#### توابع مدیریت bottom sheet

توابع `collapseBottomSheet` و `expandBottomSheet` به ترتیب کار بسته شدن و نمایان شدن bottom sheet را بر عهده دارند.

- java
- kotlin

```java
private void collapseBottomSheet() {
    bottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
}

private void expandBottomSheet() {
    bottomSheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
}
```

```kotlian
private fun collapseBottomSheet() {
    bottomSheetBehavior.state = BottomSheetBehavior.STATE_HIDDEN
}

private fun expandBottomSheet() {
    bottomSheetBehavior.state = BottomSheetBehavior.STATE_EXPANDED
}
```

### مدیریت دکمه Back

در انتها در متد `onBackPressed` تغییری به این صورت ایجاد می‌کنیم که اگر یک نشانگر انتخاب شده باشد، با فشردن دکمه back از صفحه خارج نشویم و فقط bottom sheet ناپدید شود.

- java
- kotlin

```java
@Override
public void onBackPressed() {
    if (selectedMarker != null) {
        deselectMarker(selectedMarker);
    } else {
        super.onBackPressed();
    }
}
```

```kotlin
// customize back button for when a marker is selected
override fun onBackPressed() {
    if (selectedMarker != null) {
        deselectMarker(selectedMarker)
    } else {
        super.onBackPressed()
    }
}
```
