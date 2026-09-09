# Project schema v7

A `.mockupstudio` project is JSON. Media is embedded as data URLs so a project stays portable and does not depend on a server.

```json
{
  "version": 7,
  "name": "Launch assets",
  "canvas": {
    "width": 1290,
    "height": 2796,
    "background": "#f4f1ea"
  },
  "effects": {
    "backdropImage": "",
    "pattern": "none",
    "patternOpacity": 0.12,
    "patternScale": 28,
    "overlay": "none",
    "overlayStrength": 0.25,
    "portrait": "none",
    "portraitStrength": 0.35
  },
  "settings": {
    "deviceMode": "single",
    "exportName": "{project}-{size}",
    "defaultTemplate": ""
  },
  "elements": [],
  "animation": {"duration": 5, "easing": "ease"},
  "appStore": {"device": "iphone", "language": "en", "shots": []},
  "integrations": {"code": {}, "social": {}}
}
```

Media elements retain `src`, `frame`, crop fields, radius and shadow fields. v0.7 also adds `deviceColor`, `orientation`, `shadowStyle`, `shadowIntensity`, `borderStyle`, `borderWidth` and `borderColor`.

`frame` can reference one of the v0.7 device preset IDs. Rendering maps those presets onto Mockup Studio's original phone, tablet, laptop, monitor, browser and screen-only frame primitives, so older projects remain compatible.

Text elements add optional `textAlign` with `left`, `center` or `right`.

Backdrop effects are stored at project level and render in both the live stage and exported canvases. Uploaded backdrop media is embedded as a data URL in `effects.backdropImage`.

Generated Code Studio cards stay ordinary image elements with `codeCard` source metadata. Generated Post Studio cards use `socialCard`, including arrays of gallery images plus optional quote and reply text.

Browser-extension captures enter the project as normal image layers. Temporary extension handoff data remains outside the `.mockupstudio` file.

Projects from v0.1 through v0.6 migrate in-browser to schema 7 while retaining existing editor, animation, App Store, code and social fields.
