# SDK overview (as documented in the 2026-10-11 docs snapshot)

Pick one stack per platform, then open its page for full setup and the feature recipes.

## Web

| SDK | Status | npm package | CDN / version | Key option | Base library |
|---|---|---|---|---|---|
| **MapLibre (recommended)** | current | `@neshan-maps-platform/maplibre-sdk` | `https://static.neshan.org/sdk/maplibre/5.24.3/neshan-maplibre-sdk.umd.js` and `.css` (global `window.maplibregl.default`) | `apiKey` | MapLibre GL JS (bundled, do not install separately) |
| Mapbox GL | **expired / unsupported per docs** | `@neshan-maps-platform/mapbox-gl` | `https://static.neshan.org/sdk/mapboxgl/v1.13.2/neshan-sdk/v1.1.5/index.js` and `index.css` (global `nmp_mapboxgl`) | `mapKey` | Mapbox GL JS 1.13.2 |
| Leaflet | current, traffic and POI layers not updated | `@neshan-maps-platform/leaflet` | `https://static.neshan.org/sdk/leaflet/v1.9.4/neshan-sdk/v1.0.8/index.js` and `index.css` | `key` (plus `maptype`) | Leaflet 1.9.4 |
| OpenLayers | current, traffic and POI layers not updated | `@neshan-maps-platform/ol` | `https://static.neshan.org/sdk/openlayers/v8.1.0/neshan-sdk/v1.0.5/index.js` and `index.css` | `key` (plus `maptype`) | OpenLayers 8.1.0 |
| React + Mapbox GL | tied to Mapbox SDK | `@neshan-maps-platform/mapbox-gl-react` | | `mapKey` prop | |
| Vue + Mapbox GL | tied to Mapbox SDK | `@neshan-maps-platform/mapbox-gl-vue` | | `mapKey` prop | |
| React + OpenLayers | latest needs React 19.2.1+; `@3.0.1` documented for React 18 | `@neshan-maps-platform/react-openlayers` | | `mapKey` prop | OpenLayers 8.1.0 |
| Vue 3 + OpenLayers | current | `@neshan-maps-platform/vue3-openlayers` | | `mapKey` prop | |

Files: `sdk/web/maplibre.md`, `mapbox.md`, `leaflet.md`, `openlayers.md`, `mapbox-react.md`, `mapbox-vue.md`, `openlayers-react.md`, `openlayers-react-v3.0.1-legacy.md`, `openlayers-vue.md`.

Some pages mention that the Neshan package registry can be used to fetch libraries; read the "install" section of the page for the exact registry steps.

### MapLibre minimal (from the docs)

```js
import maplibregl from "@neshan-maps-platform/maplibre-sdk";
import "@neshan-maps-platform/maplibre-sdk/style.css";

const map = new maplibregl.Map({
  container: "map",
  style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
  center: [51.383743, 35.701150], // [lng, lat]
  zoom: 12, minZoom: 2, maxZoom: 21,
  trackResize: true,
  apiKey: "YOUR_MAP_API_KEY",
});
map.addControl(new maplibregl.NavigationControl());
```

Hosted styles: `light`, `dark`, `monochrome_light`, `monochrome_dark`, `pastel` at `https://static.neshan.org/sdk/maplibre/styles/<name>.json`. Custom style: design in the style editor (`sdk/web/maplibre-style-editor.md`) and pass the JSON object as `style`.

Persian RTL text is on by default; options: `rtl: false`, `rtl: { lazy: false }`, `rtl: { url: "/rtl.js" }`.

Framework rule: create the map only on the client (React `useEffect`, Vue `onMounted`, Angular `ngAfterViewInit`, Svelte `onMount`; Next.js dynamic import with `ssr: false`) and call `map.remove()` on unmount. The MapLibre page contains working React, Next.js, Vue 3, Angular and Svelte examples.

## Android

- **New SDK (MapLibre Native):** `implementation("org.neshan.maplibre:android-sdk-opengl:13.4.1")` from Maven Central; permission `INTERNET`; key via `<meta-data android:name="org.maplibre.android.API_KEY" .../>`; view class `org.maplibre.android.maps.MapView`; call `MapLibre.getInstance(this)` before inflating the layout; forward lifecycle callbacks to `MapView`. Style URL example: `https://static.neshan.org/sdk/maplibre/styles/light.json`. Files: `sdk/android/00-overview.md`, `01-installation.md`, `feature-change-map-style.md`, `feature-add-marker.md`, `feature-draw-line.md`.
- **Legacy SDK:** requires `neshan.license` (from package name + SHA1 fingerprints), Maven repo `https://maven.neshan.org/artifactory/public-maven`, dependency `neshan-android-sdk:mobile-sdk:1.0.3`. Large feature set in `sdk/android-legacy/` (layers, clustering, user location, API calls via Retrofit/Volley/OkHttp, Jetpack Compose, B4A, convert-google-maps-code).

## iOS

- **New SDK (MapLibre Native):** download `https://static.neshan.org/sdk/maplibre/ios/MapLibre-6.28.0.zip`, add as a **local Swift Package** in Xcode (File > Add Package Dependencies > Add Local), enable product `MapLibre`, add `MLNApiKey` to `Info.plist`, then use `MLNMapView`. No init call needed. Files: `sdk/ios/`.
- **Legacy:** `sdk/ios-legacy/00-legacy-sdk.md`.

## WordPress

`sdk/wordpress-addon.md`.

## Choosing quickly

- New web project, any framework -> MapLibre.
- Existing Leaflet/OpenLayers codebase -> corresponding Neshan SDK, but warn that live traffic and POI layers are not maintained there; MapLibre has the full style/layers support.
- Existing Mapbox GL integration -> docs say expired; recommend migrating to MapLibre (API is very similar).
- Native mobile -> new MapLibre-based SDKs unless the project is already on the legacy SDK.
