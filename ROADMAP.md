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
- PostSpark-style Screenshot/Mockup interaction model
- Image / Frame / Annotate / Auto inspector
- Backdrop / Overlay Effects / Pattern / Portrait controls
- 35 device presets and device colors
- portrait/landscape and single/group device modes
- 18 layouts
- auto backgrounds
- crop presets and text alignment
- border and shadow styles
- bulk editing and filename defaults
- enhanced Bluesky galleries, quotes and replies
- extension-powered URL → Screenshot with delay and dark preference
- schema 7 migration

### v0.7.1 Premium device artwork
- original SVG artwork sprite for key phone, tablet, laptop and display families
- color-aware vector overlays in the live editor
- matching premium hardware detailing in canvas export
- no PostSpark or OEM artwork copied into the repository

## Next: v0.8 UI parity program

The implementation sequence and acceptance criteria are defined in `UI_PARITY_PLAN.md`.

Planned releases:

- v0.8.0 — reference captures, design tokens and editor shell
- v0.8.1 — canvas interaction parity
- v0.8.2 — all-device artwork, picker/layout previews and styling fidelity
- v0.8.3 — full annotation environment and animation timeline parity
- v0.8.4 — dedicated mobile editor
- v0.8.5 — visual-regression, performance and final parity gate

## Remaining architecture gaps

- direct X URL import still needs an authenticated X API strategy
- Unsplash search is not bundled because a public static client should not expose an application credential
- 35 device presets exist, while premium original artwork is currently implemented for the highest-priority device families and will expand in v0.8.2
- cloud storage/share links remain outside the no-login GitHub Pages scope
