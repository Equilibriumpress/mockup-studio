# Mockup Studio

Mockup Studio is a browser-first screenshot, mockup, App Store, animation, video, code, social and browser-capture editor. It is hosted directly from `main/docs` on GitHub Pages and does not require an account or backend.

Live: https://equilibriumpress.github.io/mockup-studio/

## v0.7.1 — parity + premium device artwork

### Screenshot and mockup editor
- PostSpark-style Screenshot and Mockup entry points
- Image, Frame, Annotate and Auto inspector tabs
- Backdrop, Overlay Effects, Pattern and Portrait controls
- solid, gradient and uploaded-image backdrops
- automatic gradients sampled locally from the screenshot
- vignette, shine, darken, warm and cool overlays
- dots, grid, diagonal and checker patterns
- portrait/stage background treatment
- crop presets, crop zoom and X/Y positioning
- text alignment
- border styles and colors
- None, Spread and Hug shadow modes with intensity controls
- Shift/Cmd/Ctrl multi-select, snapping, group drag and layer ordering
- text, shapes, arrows, stickers, numbered steps, blur and redact tools

### Device mockups
- 35 device/screen presets
- Apple, Google, Samsung, Nothing, Microsoft, Dell, generic and browser/display presets
- screen-only output
- multiple device colors
- portrait/landscape switching
- recommended-device hints based on media aspect ratio
- single-device and group-device modes
- 18 multi-device layouts without deleting unused media
- original premium SVG artwork for iPhone Pro, iPhone Air, iPad Pro, Pixel 9 Pro, Galaxy S25 Ultra, Nothing Phone, MacBook Pro/Air and Studio Display/iMac
- the same device-color and hardware detail model is used in preview and canvas export

### Background and batch workflows
- reusable local templates
- bulk replacement of one screenshot layer across many source images
- optional multi-size bulk output
- deterministic filename tokens
- local settings for default canvas, device and export filename
- Start Over control

### App Store Studio
- iPhone 6.9-inch and iPad 13-inch presets
- safe-area guides
- localized screenshot sets in EN, NL, DE, FR and ES
- current-language and all-language ZIP export
- SnapFrame JSON import path

### Animation and video
- keyframes for position, size, rotation and opacity
- easing and animation presets
- timeline preview
- screen-recording mockups
- trim, jump cuts, speed and mute
- 30/60 fps choices and 1080p/1440p/2K choices
- WebCodecs/MediaRecorder paths with frame-ZIP fallback

### Code Studio
- Swift, TypeScript, JavaScript, JSON, HTML, CSS, Python, shell and plain text
- themes, line numbers, line highlighting and diff coloring
- editable generated code cards

### Post Studio
- public Bluesky import through `public.api.bsky.app`
- galleries up to four images
- quote and first-reply rendering
- author, handle, date and metrics
- light and dark cards
- manual X cards without storing an X API credential in public JavaScript

### Browser and URL Capture
- Chrome / Edge Manifest V3 extension under `docs/extension`
- viewport, stitched full-page and visible-element capture
- URL → Screenshot requests directly from Mockup Studio
- optional capture delay and dark color-scheme preference
- local extension-to-editor handoff
- no screenshot server

## UI parity program

`UI_PARITY_PLAN.md` defines the v0.8 sequence for fully aligning editor hierarchy, contextual controls, canvas behavior, device/layout pickers, backdrop/effects, annotations, timeline and mobile interaction. It also defines desktop/mobile reference sizes and visual-regression acceptance criteria.

## Architecture

The published app has no runtime package dependencies:

- `docs/index.html` — base application shell
- `docs/styles.css` — core editor UI
- `docs/v06.css` — code/social/capture integration UI
- `docs/v07.css` — PostSpark-parity editor UI
- `docs/v071-artwork.css` — premium vector artwork overlay styling
- `docs/devices/premium-artwork.svg` — original device artwork sprite
- `docs/js/*.js` — editor, renderer, export, App Store, animation, video, code, social, capture, parity and artwork modules
- `docs/extension/*` — browser capture extension

Projects persist through IndexedDB with localStorage fallback. Media stays inside the browser. Exported `.mockupstudio` documents embed media data URLs and v0.7 migrates older projects to schema 7.

## GitHub Pages

- branch: `main`
- folder: `/docs`
- GitHub Actions: not used

## Development

Serve the `docs` folder with any static web server. No build step is required.
