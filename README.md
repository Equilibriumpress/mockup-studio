# Mockup Studio

Mockup Studio is a browser-first screenshot, App Store asset, animation, video, code, social card and browser-capture editor. The app is hosted directly from `main/docs` on GitHub Pages and does not require an account or backend.

Live: https://equilibriumpress.github.io/mockup-studio/

## v0.6

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

### Code Studio
- Swift, TypeScript, JavaScript, JSON, HTML, CSS, Python, shell and plain text
- Midnight, Graphite and Paper themes
- local high-resolution canvas rendering
- line numbers
- line highlighting such as `2-4,8`
- diff coloring for `+` and `-` lines
- editable generated code cards stored as normal image layers with source metadata

### Social Studio
- public Bluesky post import through `public.api.bsky.app`
- author, handle, text, date, counts, avatar and first embedded image
- light and dark social cards
- manual X card creation
- no X API token stored in the public client

### Browser Capture
- Chrome / Edge Manifest V3 extension under `docs/extension`
- viewport capture
- stitched full-page capture
- visible-element selection
- direct extension-to-editor handoff through extension-local storage
- downloadable extension ZIP assembled in the browser
- no screenshot server

## Architecture

The published app has no runtime package dependencies:

- `docs/index.html` — application shell
- `docs/styles.css` — core responsive editor UI
- `docs/v06.css` — v0.6 integration UI
- `docs/js/*.js` — document model, editor, renderer, export, animation, video, code, social and capture modules
- `docs/extension/*` — browser capture extension source

Projects persist locally through IndexedDB with localStorage fallback. Media remains inside the browser. Exported `.mockupstudio` files are portable JSON documents with embedded media data URLs. v0.6 migrates projects to schema 6 while retaining the v0.1-v0.5 project structure.

## GitHub Pages

Pages source:

- branch: `main`
- folder: `/docs`
- GitHub Actions: not used

## Development

Serve the `docs` folder with any static web server. No build step is required.
