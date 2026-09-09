# Mockup Studio

Mockup Studio is a browser-first screenshot, App Store asset, animation and video mockup editor. The app is hosted directly from `main/docs` on GitHub Pages and does not require an account or backend.

Live: https://equilibriumpress.github.io/mockup-studio/

## v0.5

### Editor
- image upload, drag/drop and clipboard paste
- video upload
- drag, resize, rotate, opacity and layer ordering
- Shift/Cmd/Ctrl multi-select and group drag
- center snapping and element alignment guides
- crop zoom and X/Y crop positioning
- text, rectangles, ellipses, arrows, numbered steps, blur and redact overlays
- iPhone 17 Pro, iPhone Air, iPad Pro, Android, MacBook and browser frames
- reusable local templates plus built-in layouts
- PNG, JPEG and WebP export
- 1x/2x export and multi-size ZIP export

### App Store Studio
- iPhone 6.9-inch and iPad 13-inch output presets
- safe-area guides
- multi-shot screenshot sets
- per-language headline and subtitle content
- EN, NL, DE, FR and ES editing
- current-language and all-language ZIP export
- deterministic batch filenames
- SnapFrame JSON import path

### Animation Studio
- keyframes for position, size, rotation and opacity
- 0.1-second timeline snapping
- duration control
- linear, ease, ease-in, ease-out and ease-in-out interpolation
- Fade Up, Pop and Slide In presets
- looping preview
- animation data persists in `.mockupstudio` projects

### Video mockups
- screen-recording upload
- video inside all device masks
- trim start/end
- jump-cut ranges
- speed and mute controls
- 30/60 fps choices
- 1080p, 1440p and 2K choices
- WebCodecs `VideoFrame` path when available
- MediaRecorder browser export with frame-ZIP fallback
- stricter file, fps and resolution caps on iPhone/iPad and low-memory devices

## Architecture

The published app has no runtime dependencies:

- `docs/index.html` — application shell
- `docs/styles.css` — responsive editor UI
- `docs/js/*.js` — document model, editor, renderer, export, animation and video modules

Projects persist locally through IndexedDB with localStorage fallback. Media remains inside the browser. Exported `.mockupstudio` files are portable JSON documents with embedded media data URLs.

## GitHub Pages

Pages source:

- branch: `main`
- folder: `/docs`
- GitHub Actions: not used

## Development

Serve the `docs` folder with any static web server. No build step is required.
