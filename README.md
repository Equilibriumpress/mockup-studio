# Mockup Studio

Mockup Studio is a browser-first screenshot, mockup, App Store, animation, video, code, social and browser-capture editor. It is hosted directly from `main/docs` on GitHub Pages and does not require an account or backend.

Live: https://equilibriumpress.github.io/mockup-studio/

## v0.8.1 — direct canvas editing

### Canvas interaction
- unified single- and multi-selection bounding box
- eight on-canvas resize handles
- direct rotation handle with Shift 15° snapping
- proportional multi-layer resize and group rotation
- Position Picker with automatic dominant-axis lock and visible guideline
- canvas edge, center, element-edge and element-center snapping
- equal-spacing detection with distance feedback
- Shift-constrained X/Y drag
- existing 1px keyboard nudging and Shift+arrow 10px nudging
- zoom out / zoom percentage / zoom in / Fit controls
- pointer-centered Cmd/Ctrl-wheel zoom
- Hand mode and temporary Space-to-pan
- manual zoom preserved across normal rerenders
- direct double-click text editing
- touch-sized transform targets

### Crop interaction
- direct Crop mode for one selected image or video
- rule-of-thirds crop overlay
- drag the media inside its frame to reposition the crop
- mouse-wheel crop zoom
- double-click media to enter crop mode
- Escape exits crop mode
- improved object-position based preview for tall and full-page website screenshots
- crop continues to use the same `cropZoom`, `cropX` and `cropY` project fields used by export

### UI shell
- Screenshot / Mockup / Tweet / Post / Code / View All product navigation
- persistent Export action in the top bar
- compact Reset and Project utilities
- left media thumbnail rail
- Image / Frame / Annotate / Auto contextual tools near the canvas
- Backdrop / Overlay Effects / Pattern / Portrait in a dedicated right-side style inspector
- transform and layer properties in a collapsible secondary section
- shared `docs/ui-tokens.css` design-token layer

### Screenshot and mockup editor
- solid, gradient and uploaded-image backdrops
- automatic gradients sampled locally from screenshots
- vignette, shine, darken, warm and cool overlays
- dots, grid, diagonal and checker patterns
- crop presets and text alignment
- border styles/colors
- None, Spread and Hug shadows with intensity
- text, shapes, arrows, stickers, steps, blur and redact

### Device mockups
- 35 device/screen presets
- screen-only output
- multiple device colors
- portrait/landscape switching
- recommended-device hints
- single/group device modes
- 18 layouts that retain unused media
- original premium SVG artwork for iPhone Pro, iPhone Air, iPad Pro, Pixel 9 Pro, Galaxy S25 Ultra, Nothing Phone, MacBook Pro/Air and Studio Display/iMac
- matching preview/export hardware details

### Other studios
- App Store screenshot sets for iPhone/iPad with EN/NL/DE/FR/ES and ZIP export
- animation keyframes, easing and presets
- video mockups with trim, jump cuts, speed, mute and browser-side export
- Code Studio for Swift, TypeScript, JavaScript, JSON, HTML, CSS, Python, shell and plain text
- public Bluesky import with galleries, quote and first-reply rendering
- manual X cards without client-side API credentials
- Chrome/Edge capture extension for viewport, full-page, element and URL screenshots

## UI parity program

`UI_PARITY_PLAN.md` defines the remaining v0.8 sequence. v0.8.0 completed the shell/design-token phase and v0.8.1 completes the canvas-interaction phase. v0.8.2 through v0.8.5 cover all-device artwork and styling fidelity, the full annotation/timeline environment, dedicated mobile UX and the final visual-regression/performance gate.

## Architecture

The published app has no runtime package dependencies:

- `docs/index.html` — base application shell
- `docs/styles.css` — original editor UI
- `docs/v06.css` — code/social/capture integration UI
- `docs/v07.css` — parity editor controls
- `docs/v071-artwork.css` — premium vector artwork overlay styling
- `docs/ui-tokens.css` — shared v0.8 UI design tokens
- `docs/v080-shell.css` — contextual desktop shell
- `docs/v081-canvas.css` — direct selection, transform, crop, zoom and position controls
- `docs/devices/premium-artwork.svg` — original device artwork sprite
- `docs/js/v081-canvas.js` — v0.8.1 direct-canvas interaction layer
- `docs/js/*.js` — editor, renderer, export and studio modules
- `docs/extension/*` — browser capture extension

Projects persist through IndexedDB with localStorage fallback. Media stays inside the browser. Exported `.mockupstudio` documents embed media data URLs. Existing schema-7 projects remain compatible.

## GitHub Pages

- branch: `main`
- folder: `/docs`
- GitHub Actions: not used

## Development

Serve the `docs` folder with any static web server. No build step is required.
