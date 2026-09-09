# Project schema v6

A `.mockupstudio` project is JSON. Media is embedded as data URLs so a project stays portable and does not depend on a server.

```json
{
  "version": 6,
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
  },
  "integrations": {
    "code": {},
    "social": {}
  }
}
```

Media elements add `src`, `frame`, `cropZoom`, `cropX`, `cropY`, `radius` and `shadow`. Video elements also add `duration`, `trimStart`, `trimEnd`, `speed`, `muted` and `cuts`.

Shape elements use `shape` values `rect`, `ellipse`, `arrow`, `step`, `blur` or `redact`, plus fill/stroke properties.

Keyframes store `time`, `x`, `y`, `width`, `height`, `rotation`, `opacity` and `easing`.

App Store shots keep a project snapshot plus localized headline/subtitle dictionaries. This keeps screenshot-set rendering deterministic after the main editor canvas changes.

Generated Code Studio cards are stored as normal image elements with an additional `codeCard` object containing language, theme, title, source code, font size, highlighted lines, line-number preference and diff preference. The rendered PNG remains embedded in `src`, so projects still open without a syntax-highlighting dependency.

Generated Social Studio cards are stored as normal image elements with an additional `socialCard` object containing source, source URL where applicable, author, handle, post text, date label, theme, avatar/image URLs and metrics. X cards use manually supplied source data in v0.6.

Browser-extension captures enter the document as ordinary image elements. Extension-local handoff state is temporary and is not part of the project file.

Projects from v0.1 through v0.5 are migrated in-browser to schema 6. Existing element, animation and App Store fields remain compatible.
