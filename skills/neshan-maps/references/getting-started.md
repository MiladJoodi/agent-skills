# Getting started with Neshan APIs and SDKs

Docs snapshot: pages saved 2026-10-11 from https://platform.neshan.org/docs/ . Versions and endpoints below are what that snapshot documents; if the user reports different behaviour, check the live docs.

## 1. Keys

- Free signup and key issuance: https://platform.neshan.org/panel (terms: https://platform.neshan.org/tos/).
- The panel issues keys per application and service. The API returns `483 ApiKeyTypeError` when the key type does not match the called service, `485 ApiServiceListError` when the service is not enabled for that key, and `484 ApiWhiteListError` when the key's scope (restrictions set in the panel) does not allow the caller.
- To check programmatically which services a key can call, use the Active Services API (`/account-inquiry/v1/services`, see `api/account-active-services.md`). The docs say this API must be activated by sending a support ticket in the panel.
- Remaining quota: `api/account-remaining-charge.md`.

Where the key goes:

| Surface | Where |
|---|---|
| REST APIs (routing, search, geocoding, ...) | HTTP header `Api-Key: <KEY>` |
| Static Map, Static Map Arc | query parameter `key=<KEY>` |
| Web MapLibre SDK | `apiKey` option of `new maplibregl.Map({...})` |
| Web Mapbox GL SDK (expired) | `mapKey` option |
| Web Leaflet / OpenLayers SDK | `key` option |
| React / Vue Neshan components | `mapKey` prop |
| Android (new) | `<meta-data android:name="org.maplibre.android.API_KEY" android:value="..."/>` in `<application>` |
| iOS (new) | `MLNApiKey` string in `Info.plist` |
| Android (legacy) | license file `neshan.license` + panel setup (see `sdk/android-legacy/01-installation.md`) |

## 2. HTTP conventions for REST APIs

- Base host: `https://api.neshan.org`.
- Most endpoints are `GET` with query parameters. `POST` endpoints: map matching (`/v3/map-matching`) and logistics (`/vrp/logistic`, JSON body).
- Success: JSON. Errors: HTTP status code plus JSON describing the error type.
- Coordinates in requests: `latitude,longitude` (lat first). Some newer endpoints take separate `lat`/`lng` or `latitude`/`longitude` params, or JSON objects with `latitude` and `longitude`. Always check the per-API file.
- Multiple points: separate with `|` which must be sent as `%7C` when URL-encoding. Libraries usually encode for you (`encodeURIComponent`, `URLEncoder.encode`, `urlencode`, `requests` params).
- Encoded polylines: routing returns `overview_polyline` and `step.polyline` in Encoded Polyline Algorithm Format (same as Google's). Decode before drawing. `start_location` in steps is `[longitude, latitude]`.
- Distances are in meters and durations in seconds as numbers (`value`), with a Persian text form (`text`).

## 3. Error codes (shared by all APIs)

| HTTP | Name | Meaning |
|---|---|---|
| 400 | INVALID_ARGUMENT | bad input parameters |
| 404 | NOT_FOUND | listed in the error tables of Nearby, POI Details and Logistics (read the description in those files) |
| 470 | CoordinateParseError | coordinates invalid |
| 480 | KeyNotFound | invalid key, or `Api-Key` header missing |
| 481 | LimitExceeded | total quota exceeded |
| 482 | RateExceeded | per-minute request rate exceeded |
| 483 | ApiKeyTypeError | key type does not match the called service |
| 484 | ApiWhiteListError | caller not allowed by the key's scope |
| 485 | ApiServiceListError | service not enabled for this key |
| 500 | GenericError | unknown error |
| 503 | render_timeout / overloaded | Static Map only: render timeout or server not responding |

Routing may also return an error named `NoRouteFound` (for example when avoiding a zone that contains the destination, see `api/routing-traffic.md`).

Suggested client behaviour: treat 480/483/484/485 as configuration errors (do not retry), 481 as quota (alert, do not loop), 482 and 503 as retry-with-backoff, 400/470 as caller bugs (validate coordinates before sending).

## 4. Versions at a glance (as documented)

| Service | Latest | Older docs kept |
|---|---|---|
| Routing with traffic | v4 `/v4/direction` | v3, v2 |
| Routing no traffic | v4 `/v4/direction/no-traffic` | v2 |
| Predictive routing | v1 `/v1/direction/historical` | |
| Typical routing | v1 `/v1/direction/typical` | |
| Pedestrian routing | see file (docs inconsistent) | |
| TSP | v3 `/v3/trip` | |
| Distance matrix | v1 | |
| Isochrone | v2 | v1 |
| Map matching | v3 | v2 |
| Search | v3 | v1 |
| Geocoding | `/geocoding/v1`, `/geocoding/v1/plus` | v4, v6 pages |
| Reverse geocoding | v5 | v2 |
| Nearby | v1 | |
| POI details | v1 `/v1/point` | |
| Region | v2 | |
| Static map / arc | v5 | |

## 5. Typical flows

1. **Place search UI:** user types text -> `search` with map center -> list results -> user picks one -> (optional) `poi-details` with `poiHash` -> add marker on the SDK map.
2. **Address form to map pin:** `geocoding` -> `[lat, lng]` -> center map / marker (remember SDK wants `[lng, lat]`).
3. **Pin to address:** user taps map -> SDK click event gives `lngLat` -> `reverse-geocoding` with `lat`, `lng`.
4. **Show a route:** `routing-traffic` -> decode `overview_polyline` (or each step) -> draw as a line layer. See `sdk/web/maplibre-ex-draw-route.md`.
5. **Delivery planning:** `distance-matrix` for costs, `tsp` for a single vehicle order, `logistic-vrp` for many vehicles/orders.
6. **Email/SMS/preview image of a location:** `static-map` returns an image URL you can embed.

## 6. Support

- Email: platform@neshan.org
- Panel and tickets: https://platform.neshan.org/panel
