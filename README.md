# Mockup Studio

Mockup Studio is a browser-first screenshot, mockup, App Store, animation, video, code, social and browser-capture editor. It is hosted directly from `main/docs` on GitHub Pages and does not require an account or backend.

Live: https://equilibriumpress.github.io/mockup-studio/

## v0.8.0 — contextual editor shell

### UI shell
- Screenshot / Mockup / Tweet / Post / Code / View All product navigation
- persistent Export action in the top bar
- compact Reset and Project utilities
- left media thumbnail rail with selection and add-media action
- Image / Frame / Annotate / Auto contextual tools close to the canvas
- Backdrop / Overlay Effects / Pattern / Portrait in a dedicated right-side style inspector
- transform and layer properties moved into a collapsible secondary section
- centered canvas with a compact fit/size/selection footer
- true empty-state drop zone
- responsive desktop/tablet fallback shell
- shared `docs/ui-tokens.css` design-token layer
- structural reference documented in `UI_REFERENCE_BASELINE.md`

The new shell sits above the existing v0.7.1 editor and rendering layers. Device artwork, local projects, App Store sets, animation/video, code/social/capture and export behavior remain compatible.

### Screenshot and mockup editor
- solid, gradient and uploaded-image backdrops
- automatic gradients sampled locally from screenshots
- vignette, shine, darken, warm and cool overlays
- dots, grid, diagonal and checker patterns
- portrait/stage treatment
- crop presets, crop zoom and X/Y positioning
- text alignment
- border styles/colors
- None, Spread and Hug shadows with intensity
- multi-select, snapping, group drag and layer ordering
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

### App Store Studio
- iPhone 6.9-inch and iPad 13-inch presets
- safe-area guides
- EN, NL, DE, FR and ES screenshot sets
- current-language and all-language ZIP export
- SnapFrame JSON import

### Animation and video
- position/size/rotation/opacity keyframes
- easing, presets and timeline preview
- screen-recording mockups
- trim, jump cuts, speed and mute
- 30/60 fps and 1080p/1440p/2K choices
- WebCodecs/MediaRecorder paths with frame-ZIP fallback

### Code Studio
- Swift, TypeScript, JavaScript, JSON, HTML, CSS, Python, shell and plain text
- themes, line numbers, line highlighting and diff coloring
- editable generated code cards

### Post Studio
- public Bluesky import through `public.api.bsky.app`
- galleries up to four images
- quote and first-reply rendering
- light/dark cards
- manual X cards without storing an X API credential in public JavaScript

### Browser and URL Capture
- Chrome / Edge Manifest V3 extension
- viewport, stitched full-page and visible-element capture
- URL → Screenshot requests from Mockup Studio
- delay and dark color-scheme preference
- local extension-to-editor handoff
- no screenshot server

## UI parity program

`UI_PARITY_PLAN.md` defines the remaining v0.8 sequence. v0.8.0 completes the shell/design-token phase; v0.8.1 through v0.8.5 cover canvas interaction, all-device artwork and styling, annotations/timeline, dedicated mobile UX and the final visual-regression/performance gate.

## Architecture

The published app has no runtime package dependencies:

- `docs/index.html` — base application shell
- `docs/styles.css` — original editor UI
- `docs/v06.css` — code/social/capture integration UI
- `docs/v07.css` — parity editor controls
- `docs/v071-artwork.css` — premium vector artwork overlay styling
- `docs/ui-tokens.css` — v0.8 shared UI design tokens
- `docs/v080-shell.css` — v0.8 contextual desktop shell
- `docs/devices/premium-artwork.svg` — original device artwork sprite
- `docs/js/*.js` — editor, renderer, export, App Store, animation, video, code, social, capture, parity, artwork and v0.8 shell modules
- `docs/extension/*` — browser capture extension

Projects persist through IndexedDB with localStorage fallback. Media stays inside the browser. Exported `.mockupstudio` documents embed media data URLs. Existing schema-7 projects remain compatible.

## GitHub Pages

- branch: `main`
- folder: `/docs`
- GitHub Actions: not used

## Development

Serve the `docs` folder with any static web server. No build step is required.
