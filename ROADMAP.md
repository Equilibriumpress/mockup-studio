# Mockup Studio roadmap

## Completed

### v0.1 Foundation
Canvas editor, local projects, basic frames and PNG export.

### v0.2 Production editor
Multi-select, snapping, crop controls, annotations, blur/redact, expanded device library, reusable templates, JPEG/WebP and batch ZIP export.

### v0.3 App Store Studio
Screenshot sets, iPhone/iPad presets, safe-area helpers, localized headlines/subtitles, deterministic batch export and SnapFrame import.

### v0.4 Animation Studio
Keyframes, easing, timeline preview and animation presets.

### v0.5 Video mockups
Video layers, device masks, trim, cuts, speed/mute, 30/60 fps choices and browser-side video/frame export paths.

### v0.6 Capture, code and social integrations
Chrome/Edge capture extension, Code Studio, public Bluesky import and token-free manual X cards.

### v0.7 PostSpark parity
- Screenshot/Mockup interaction model
- Image / Frame / Annotate / Auto inspector
- Backdrop / Overlay Effects / Pattern / Portrait controls
- 35 device presets and 18 layouts
- auto backgrounds, crop presets, text alignment, border/shadow styles
- bulk editing, enhanced Bluesky and extension-powered URL capture
- schema 7 migration

### v0.7.1 Premium device artwork
- original SVG artwork for key phone, tablet, laptop and display families
- color-aware editor overlays
- matching canvas-export hardware detailing

### v0.8.0 UI shell and design tokens
- current public UI reference baseline documented in `UI_REFERENCE_BASELINE.md`
- shared design tokens in `docs/ui-tokens.css`
- Screenshot / Mockup / Tweet / Post / Code / View All product navigation
- persistent Export plus compact Reset/Project utilities
- left media thumbnail rail
- contextual Image / Frame / Annotate / Auto tools near the canvas
- Backdrop / Overlay Effects / Pattern / Portrait moved into a dedicated style inspector
- transform/layer properties demoted to a collapsible secondary panel
- canvas-first empty state and responsive shell breakpoints
- existing v0.7.1 renderer and premium artwork preserved

### v0.8.1 Canvas interaction parity
- Position Picker with dominant-axis locking and visible X/Y guidelines
- zoom, Fit and pointer-centered Cmd/Ctrl-wheel zoom
- Hand mode and temporary Space-to-pan
- unified single/multi selection bounding box
- eight direct resize handles plus rotation handle
- proportional multi-layer resize and group rotation
- canvas edge, center, element-edge and element-center snapping
- equal-spacing detection with distance feedback
- Shift-constrained X/Y dragging and existing 1px/10px keyboard nudging
- interactive crop overlay with drag-to-pan and wheel-to-zoom
- improved full-page/website screenshot crop positioning
- direct double-click text editing
- touch-sized transform handles
- manual zoom retained across normal rerenders

## Next: v0.8 UI parity program

The implementation sequence and acceptance criteria are defined in `UI_PARITY_PLAN.md`.

- v0.8.2 — all-device artwork, picker/layout previews and styling fidelity
- v0.8.3 — full annotation environment and animation timeline parity
- v0.8.4 — dedicated mobile editor
- v0.8.5 — visual-regression, performance and final parity gate

## Remaining architecture gaps

- direct X URL import still needs an authenticated X API strategy
- Unsplash search is not bundled because a public static client should not expose an application credential
- 35 device presets exist, while premium original artwork is currently implemented for the highest-priority device families and will expand in v0.8.2
- cloud storage/share links remain outside the no-login GitHub Pages scope
