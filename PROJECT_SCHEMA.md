# Project schema v5

A `.mockupstudio` project is JSON. Media is embedded as data URLs so a project stays portable and does not depend on a server.

```json
{
  "version": 5,
  "name": "Launch assets",
  "canvas": {
    "width": 1290,
    "height": 2796,
    "background": "#f4f1ea"
  },
  "elements": [
    {
      "id": "uuid",
      "type": "image | video | text | shape",
      "x": 120,
      "y": 600,
      "width": 800,
      "height": 1700,
      "rotation": 0,
      "opacity": 1,
      "z": 1,
      "keyframes": []
    }
  ],
  "animation": {
    "duration": 5,
    "easing": "ease"
  },
  "appStore": {
    "device": "iphone",
    "language": "en",
    "shots": []
  }
}
```

Media elements add `src`, `frame`, `cropZoom`, `cropX`, `cropY`, `radius` and `shadow`. Video elements also add `duration`, `trimStart`, `trimEnd`, `speed`, `muted` and `cuts`.

Shape elements use `shape` values `rect`, `ellipse`, `arrow`, `step`, `blur` or `redact`, plus fill/stroke properties.

Keyframes store `time`, `x`, `y`, `width`, `height`, `rotation`, `opacity` and `easing`.

App Store shots keep a project snapshot plus localized headline/subtitle dictionaries. This makes screenshot-set rendering deterministic even after the main editor canvas changes.
