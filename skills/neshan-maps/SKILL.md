---
name: neshan-maps
description: "Complete guide to the Neshan Maps Platform (platform.neshan.org, نقشه نشان, Iranian/Persian maps): REST APIs (routing with live traffic, no-traffic, predictive, typical, pedestrian, TSP, distance matrix, isochrone, map matching, logistics/VRP, search, geocoding, reverse geocoding, nearby, POI, region, static map, account) and SDKs (web MapLibre/Leaflet/OpenLayers/Mapbox, React, Vue, Android, iOS, WordPress). Use whenever the user mentions Neshan/نشان, api.neshan.org, static.neshan.org, @neshan-maps-platform, or wants Iran maps, routing with traffic, geocoding or place search (مسیریابی، ترافیک، ژئوکدینگ، نقشه فارسی). Read the matching reference file before writing code; never answer endpoint or parameter details from memory."
---

# Neshan Maps Platform

Neshan (نشان) is an Iranian maps, navigation and logistics platform. It offers:

- **Web services (REST APIs)** at `https://api.neshan.org/...` authenticated with an `Api-Key` header.
- **SDKs** for web, Android, iOS and a WordPress add-on, authenticated with a *map key* passed at map creation.

The full official documentation is bundled in `references/` as one Markdown file per page (converted verbatim from platform.neshan.org/docs). **This SKILL.md is only the router and a list of hard-won gotchas.** For any endpoint, parameter, response field, error code, or SDK option, open the matching reference file first and base the code on it.

## How to use this skill

1. Identify what the user needs: an **API call** (server/client HTTP request) or an **SDK** (displaying an interactive map)? Often both.
2. Open the reference file(s) from the routing tables below. Read the whole file for the endpoint you are about to use; each contains parameters, sample requests in cURL/JS/Java/C#/Python/PHP, the response format, and error codes.
3. Prefer the **latest version** of an endpoint. Files ending in `-legacy` are old versions; use them only if the user is already on that version.
4. Write the code, then apply the checklist at the bottom.

If something is not in the references, say so; do not invent parameters. The docs index is in `references/00-index.md`.

## Quick start (facts that apply to almost everything)

- Get a key (free signup) from the Neshan developer panel: `https://platform.neshan.org/panel`.
- **Different keys for different products.** Keys are issued per service/app type (for example a web map key for SDKs vs a service key for APIs). Using the wrong type returns error `483 ApiKeyTypeError`. Details: `references/getting-started.md`.
- REST APIs: send `Api-Key: <YOUR_API_KEY>` as an HTTP **header**. Exception: the Static Map APIs take `key` as a **query parameter** (see gotchas).
- Request coordinates for REST APIs are almost always `latitude,longitude` (lat first). SDK coordinates are `[longitude, latitude]` (lng first, standard GeoJSON/MapLibre order). Response fields such as `start_location` are `[longitude, latitude]`.
- Multiple points are separated by the pipe `|` (URL-encoded `%7C`). Always URL-encode query values (`encodeURIComponent`, `urllib.parse.quote`, etc.).
- Success responses are JSON. Errors use HTTP status codes (400, 470, 480-485, 500) plus a JSON body.

## Routing table: Web services (APIs)

| User wants | Endpoint | Reference file |
|---|---|---|
| Route between points for car/motorcycle with live traffic (ETA) | `GET /v4/direction` | `references/api/routing-traffic.md` |
| Route without traffic data (car only) | `GET /v4/direction/no-traffic` | `references/api/routing-no-traffic.md` |
| Predicted route/ETA for a future time | `GET /v1/direction/historical` | `references/api/routing-predictive.md` |
| Route from typical (historical pattern) traffic | `GET /v1/direction/typical` | `references/api/routing-typical.md` |
| Walking route | see file (**docs inconsistent**, see gotchas) | `references/api/routing-pedestrian.md` |
| Best visiting order for many stops (TSP) | `GET /v3/trip` | `references/api/tsp.md` |
| Many-to-many distance/duration table | `GET /v1/distance-matrix` and `/v1/distance-matrix/no-traffic` | `references/api/distance-matrix.md` |
| Reachable area by time/distance | `GET /v2/isochrone` | `references/api/isochrone.md` |
| Snap GPS trace to roads | `POST /v3/map-matching` | `references/api/map-matching.md` |
| Fleet optimisation, vehicles + orders (VRP) | `/vrp/logistic` | `references/api/logistic-vrp.md` |
| Text search for places near a point | `GET /v3/search` | `references/api/search.md` |
| Address text to coordinates | `/geocoding/v1`, `/geocoding/v1/plus` | `references/api/geocoding.md` |
| Coordinates to address | `GET /v5/reverse` | `references/api/reverse-geocoding.md` |
| Places of a category within a radius | `GET /v1/nearby` | `references/api/nearby.md` |
| Details of one POI by hash | `GET /v1/point` | `references/api/poi-details.md` |
| Provinces / cities / geometry | `/v2/region/...` | `references/api/region.md` |
| Map image (PNG) with marker | `GET /v5/static` | `references/api/static-map.md` |
| Map image with an arc between two points | `GET /v5/static/arc` | `references/api/static-map-arc.md` |
| Remaining quota/charge of a key | `/account-inquiry/v1/remaining-charge` | `references/api/account-remaining-charge.md` |
| Which services a key can use | `/account-inquiry/v1/services` | `references/api/account-active-services.md` |

Older versions (`*-legacy.md`): routing v3/v2, no-traffic v2, isochrone v1, map-matching v2, geocoding v4/v6, reverse-geocoding v2, search v1. All are in `references/api/`.

Cross-API workflow: **Search (v3) returns `poiHash` -> POI Details (`/v1/point`)**. Nearby also returns `poiHash`. Search results need a reference `center` point.

## Routing table: SDKs

First choose the platform, then read the overview file for it.

| Platform | Recommended | Read first | Notes |
|---|---|---|---|
| **Web (new projects)** | MapLibre SDK `@neshan-maps-platform/maplibre-sdk` | `references/sdk/web/maplibre.md` | Based on MapLibre GL JS, RTL Persian text on by default, 5 hosted styles. |
| Web, React/Vue/etc. | Same MapLibre SDK; framework samples are inside the page | `references/sdk/web/maplibre.md` | Create the map in a client-side lifecycle hook, call `map.remove()` on unmount. |
| Web, custom map style | MapLibre style editor | `references/sdk/web/maplibre-style-editor.md` | |
| Web, Leaflet-based | `@neshan-maps-platform/leaflet` | `references/sdk/web/leaflet.md` | Leaflet 1.9.4. Traffic and POI layers are **not updated**. |
| Web, OpenLayers-based | `@neshan-maps-platform/ol` (+ `react-openlayers`, `vue3-openlayers`) | `references/sdk/web/openlayers.md`, `openlayers-react.md`, `openlayers-vue.md` | OpenLayers 8.1.0. Traffic and POI layers are **not updated**. |
| Web, Mapbox GL based | `@neshan-maps-platform/mapbox-gl` (+ react/vue) | `references/sdk/web/mapbox.md` | **Marked expired / unsupported in the docs.** Migrate to MapLibre unless the user is already on it. |
| **Android (new)** | MapLibre Native based | `references/sdk/android/00-overview.md`, `01-installation.md` | Maven Central, key in `AndroidManifest.xml`. |
| Android (old SDK) | Legacy SDK | `references/sdk/android-legacy/00-overview.md` | Large legacy feature set (layers, clustering, Jetpack Compose, B4A, ...). |
| **iOS (new)** | MapLibre Native based | `references/sdk/ios/00-overview.md`, `01-installation.md` | Local Swift Package, key in `Info.plist`. |
| iOS (old SDK) | Legacy | `references/sdk/ios-legacy/00-legacy-sdk.md` | |
| WordPress | Add-on | `references/sdk/wordpress-addon.md` | |

Feature recipes (markers, lines, routes, clustering, bounds, click coordinates, ...) are the `*-ex-*.md` files on web and `feature-*.md` files on Android/iOS. Full file list: `references/00-index.md`.

## Gotchas (verified against the bundled docs)

1. **Coordinate order differs.** REST request params: `lat,lng`. SDK / GeoJSON / response `start_location`: `[lng, lat]`. Mixing them puts points in the wrong place (Iran is lat ~25-40, lng ~44-64, so the swap is silent).
2. **Static Map docs have the labels swapped.** In `static-map.md` the parameter `latitude` is described as "طول جغرافیایی" (longitude) and `longitude` as "عرض جغرافیایی" (latitude). Treat `latitude` as latitude and `longitude` as longitude, and verify with the sample request/output.
3. **Static Map uses `key` as a query parameter**, not an `Api-Key` header. Zoom is 5-19, width/height 200-2048 px (default 512), `style` is `light` or `dark`.
4. **Pedestrian routing endpoint is inconsistent in the docs.** The Endpoint section lists `/v4/direction` but the sample requests use `/v1/direction?type=pedestrian`. Read `routing-pedestrian.md`, prefer what the samples do, and tell the user to verify.
5. **No-traffic routing is car-only** (`type=car`). The with-traffic API supports `car` and `motorcycle`.
6. **`NoRouteFound` surprise:** outside Tehran, if `avoidTrafficZone` or `avoidOddEvenZone` is `true` and the destination is inside that city's odd-even zone, routing returns `NoRouteFound`.
7. **Search (v3) takes one JSON param `q`** containing `term` and `center {latitude, longitude}`; it must be URL-encoded. Geocoding (`/geocoding/v1/plus`) takes a `json` param. Read the file for the exact shape.
8. **Map matching is `POST`** with JSON body `{"path": "lat,lng|lat,lng|..."}`, min 2 and max 1000 points, headers `Api-Key` and `Content-Type: application/json`.
9. **Polylines are Encoded Polyline** (Google polyline algorithm) in routing responses (`overview_polyline`, `step.polyline`); decode before drawing. See the `*-ex-draw-route.md` examples.
10. **Web SDK key option names differ per SDK:** MapLibre `apiKey`; Mapbox GL `mapKey`; Leaflet `key`; OpenLayers SDK `key`; React/Vue components `mapKey`. MapLibre throws `Api key is not defined!` if missing. Import the CSS (`@neshan-maps-platform/maplibre-sdk/style.css`) or controls render unstyled.
11. **SSR:** MapLibre touches `window` at construction. In Next.js/Nuxt/SvelteKit create the map client-side only (`"use client"` + `dynamic(..., { ssr: false })`, `useEffect`, `onMounted`).
12. **Logo and copyright cannot be removed** from the maps; only their position is configurable (`logoPosition` = attribution control, `copyRightPosition` = Neshan logo; naming is counter-intuitive).
13. **Never hard-code API keys in front-end source you commit.** Keys can be restricted in the panel (domain/app scope; errors 484/485 relate to that). Keep service keys server-side where possible.
14. **Rate and quota errors:** `481 LimitExceeded` (quota) vs `482 RateExceeded` (per-minute). Back off on 482; do not retry-loop on 481.
15. **Legacy and new mobile SDKs are different libraries with different setup.** The new Android/iOS SDKs are MapLibre Native based (Android: Maven Central `org.neshan.maplibre:android-sdk-opengl`, key in `AndroidManifest.xml`; iOS: local Swift Package, `MLNApiKey` in `Info.plist`). The legacy Android SDK needs a license file (`neshan.license`, generated in the panel from the package name and SHA1 fingerprints) and the Neshan Maven repository. Do not mix their snippets.
16. **Direct raster tile service** (OSM-like) exists only for verified legal entities via support ticket; it is not part of the normal key.

## Writing code: checklist

- [ ] Used the latest endpoint version from the reference file.
- [ ] Key goes in the right place (header / `key` query / SDK option / manifest / Info.plist) and is read from config or env, not a literal.
- [ ] Coordinates in the right order for the surface (REST vs SDK).
- [ ] Query values URL-encoded; points joined with `|`.
- [ ] Handles error codes from the file (at least 480-485, 500) and shows a useful message.
- [ ] For maps: container element exists with a height, CSS imported, map created client-side, cleaned up on unmount.
- [ ] Persian text: use RTL-capable containers (`dir="rtl"`), `lang="fa"`; the MapLibre SDK renders Persian labels correctly by default.
- [ ] Mentioned any doc inconsistency you relied on (items 2 and 4 above).

## Other helpers

- `references/getting-started.md`: keys, key types, error code table, URL encoding, coordinate conventions, versions.
- `references/api-overview.md`: auto-extracted endpoint, headers and parameter tables for every API (quick lookup; the per-API file stays the source of truth).
- `references/sdk-overview.md`: install commands, key options, style URLs and versions for every SDK.
- `references/00-index.md`: every reference file with its title and source URL.
- Neshan also publishes an official MCP server (tools for routing, search, deeplinks). If the user wants an agent to call Neshan live, point them to it rather than re-implementing the tools.
- Support: platform@neshan.org. Panel and ticketing: `https://platform.neshan.org/panel`.
