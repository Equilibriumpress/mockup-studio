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

## Remaining parity gaps

- direct X URL import still needs an authenticated X API strategy
- Unsplash search is not bundled because a public static client should not expose an application credential
- device artwork uses original Mockup Studio frame rendering rather than PostSpark proprietary artwork
- cloud storage/share links remain outside the no-login GitHub Pages scope
