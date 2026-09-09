# Changelog

## v0.8.1 — 2026-09-09
Added direct canvas interaction parity. Selection now uses a unified single/multi bounding box with eight resize handles and a rotation handle, including proportional group resize and group rotation. Added a Position Picker with dominant-axis locking and live guidelines, canvas zoom/fit, pointer-centered Cmd/Ctrl-wheel zoom, Hand mode and Space-to-pan, edge/center/equal-spacing snapping, Shift-constrained dragging, direct double-click text editing and touch-sized transform controls. Added an interactive crop mode with rule-of-thirds overlay, drag-to-pan, wheel-to-zoom and improved tall/full-page website screenshot positioning. Manual canvas zoom now survives normal document rerenders.

## v0.8.0 — 2026-09-09
Rebuilt the desktop editor shell around the current PostSpark interaction hierarchy while retaining Mockup Studio branding and rendering. Added shared UI design tokens, Screenshot / Mockup / Tweet / Post / Code / View All product navigation, a persistent Export action, compact Reset/Project utilities, a media thumbnail rail, contextual Image / Frame / Annotate / Auto controls above the canvas, Backdrop / Overlay Effects / Pattern / Portrait in a dedicated right-side style inspector, collapsible transform properties, a true empty-state drop zone and responsive shell breakpoints. The existing v0.7.1 device artwork, renderer, local projects and export pipeline remain unchanged beneath the new shell.

## v0.7.1 — 2026-09-09
Added original premium SVG device artwork for the most visible mockup families: iPhone Pro, iPhone Air, iPad Pro, Pixel 9 Pro, Galaxy S25 Ultra, Nothing Phone, MacBook Pro/Air and Studio Display/iMac. Artwork stays color-aware, overlays the editor preview and has matching canvas-export hardware detailing. Added `UI_PARITY_PLAN.md` with the full optimization path toward structural, interaction and responsive UI parity.

## v0.7 — 2026-09-09
Added a PostSpark-parity editor layer with Screenshot/Mockup workflows, Image/Frame/Annotate/Auto inspector tabs, Backdrop/Overlay Effects/Pattern/Portrait controls, automatic image-derived gradients, uploaded backdrop images, 35 device presets with colors and orientation, 18 layouts, single/group device mode, crop presets, text alignment, border styles, Spread/Hug shadows, bulk image replacement/export, configurable export defaults, Start Over, richer Bluesky galleries/quotes/replies and extension-powered URL-to-screenshot capture with delay and dark-mode preference. Projects migrate to schema 7.

## v0.6 — 2026-09-09
Added Code Studio with local syntax-colored cards, line highlighting, diff coloring and reusable generated code layers. Added Social Studio with public Bluesky post import and manual X cards without a client-side API token. Added the Mockup Studio Capture Manifest V3 extension for viewport, stitched full-page and visible-element capture with direct local handoff to the GitHub Pages editor. Projects migrate to schema 6.

## v0.5 — 2026-09-09
Added local video mockups, device-masked screen recordings, trim, jump cuts, speed/mute controls, fps/resolution settings, WebCodecs frame handling, MediaRecorder export and frame-ZIP fallback.

## v0.4 — 2026-09-09
Added timeline keyframes, easing, looping preview and animation presets.

## v0.3 — 2026-09-09
Added App Store Studio with screenshot sets, iPhone/iPad presets, localization, safe areas, ZIP export and SnapFrame import.

## v0.2 — 2026-09-09
Added multi-select, snapping, crop controls, shapes/annotations, blur/redact, more device frames, templates, JPEG/WebP and batch ZIP export.

## v0.1 — 2026-09-09
Initial browser editor and GitHub Pages release.
