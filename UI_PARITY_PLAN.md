# Mockup Studio UI parity plan

Target: bring Mockup Studio's editor experience as close as practical to the current PostSpark interaction architecture while keeping Mockup Studio branding, original device artwork and the static GitHub Pages architecture.

Reference date: 2026-09-09. Structural observations are recorded in `UI_REFERENCE_BASELINE.md`.

## Definition of done

A surface is complete only when:

1. information hierarchy matches the reference workflow;
2. controls appear in the same contextual stage of the task;
3. common actions require roughly the same number of interactions;
4. canvas behavior feels equivalent for drag, resize, crop, position, zoom and selection;
5. desktop and mobile layouts are separately designed;
6. preview and exported output match;
7. reference screenshots at agreed desktop and mobile sizes show no major structural differences.

We do not copy PostSpark proprietary assets, source code, icons or branding. Visual assets are created specifically for Mockup Studio.

## Current baseline: v0.8.0

Completed:

- product navigation: Screenshot / Mockup / Tweet / Post / Code / View All
- persistent Export action plus compact Reset/Project utilities
- shared design-token layer in `docs/ui-tokens.css`
- media thumbnail rail on the left
- dominant central canvas
- contextual Image / Frame / Annotate / Auto tool row
- Backdrop / Overlay Effects / Pattern / Portrait in a right-side style inspector
- transform/layer controls demoted to a collapsible secondary section
- canvas empty state and responsive shell breakpoints
- 35 device presets and 18 layouts from v0.7
- premium original SVG artwork for key device families from v0.7.1
- App Store, animation, video, code, post, bulk and capture modes remain available through View All
- GitHub Pages hosting without login or backend

## Phase 1 — reference baseline and design tokens — completed in v0.8.0

Delivered:

- current public desktop/mobile structural reference documented in `UI_REFERENCE_BASELINE.md`
- shared tokens for shell surfaces, typography, control heights, common radii, spacing and focus states
- new v0.8 shell uses the token system for shared geometry and state styling
- reference breakpoints fixed at 1440×1000, 1280×800, 1024×768, 430×932 and 390×844

Remaining validation is intentionally part of the v0.8.5 visual-regression gate.

## Phase 2 — editor shell parity — completed in v0.8.0

Delivered:

- rebuilt top product hierarchy
- Screenshot and Mockup now share one editor instead of behaving like isolated apps
- persistent Export primary action
- project/reset/settings moved to utility context
- Image / Frame / Annotate / Auto remain the primary in-editor workflow
- Backdrop / Overlay Effects / Pattern / Portrait are separated into the style context
- media thumbnails have their own rail
- transform properties no longer dominate the standard workflow
- true empty-state drop zone

Target workflow now supported from the new shell: upload → Frame → Backdrop → Shadow → Export.

## Phase 3 — v0.8.1 canvas interaction parity

Goal: make manipulation feel equivalent, not merely provide equivalent numeric inputs.

Tasks:

- position picker with X/Y axis locking and active guideline
- canvas zoom controls, zoom-to-fit and hand/pan mode
- direct resize handles and rotation handle
- crop overlay with visible crop bounds
- scrollable website screenshot crop behavior
- edge, center and equal-spacing guides
- keyboard nudging and accelerated nudging
- direct double-click edit for text
- multi-select bounding box and group resize
- better touch targets for iPad/mobile

Acceptance:

- common positioning work can be completed on-canvas without numeric property fields
- axis lock and snapping have visible feedback

## Phase 4 — v0.8.2 device picker and layout parity

Tasks:

- finish original SVG artwork for all 35 device presets
- generate picker thumbnails from the same artwork engine as the canvas
- family, recommended media dimensions and orientation in picker
- inline color swatches
- one-click recommended-device suggestion
- Replace selected / Replace all inside picker
- rebuild 18 layout cards as live previews
- preserve unused media when layouts use fewer devices
- tune spacing/proportions per layout

Acceptance: picker thumbnail, editor preview and export share geometry.

## Phase 5 — v0.8.2 backdrop, effects and background browser parity

Tasks:

- built-in curated background packs created for Mockup Studio
- texture and refracted-glass collections
- searchable local background library
- gradient editor with angle and stop controls
- automatic color suggestions
- backdrop blur, grayscale and opacity filters
- border/shadow positioning controls
- advanced pattern controls
- portrait lens blur with focal area
- dynamic video gradients sampled per frame
- parallax enable/disable for animated backgrounds

Unsplash stays optional until a compliant credential/proxy strategy is selected.

## Phase 6 — v0.8.3 annotation parity

Tasks:

- freehand draw
- editable annotation text
- hand-drawn arrows and underlines
- highlights
- sticker/icon browser and custom SVG upload
- draggable/resizable numbered and lettered steps
- blur brush and rectangle redaction
- annotation multi-select and duplicate

Acceptance: annotations remain fully editable after save/reopen.

## Phase 7 — v0.8.3 animation and video UI parity

Tasks:

- bottom animation toolbar/timeline
- timeline zoom, scroll and second snapping
- jump cuts beside playback controls
- `X` shortcut at playhead
- zoom-focus presets
- 3D device transforms
- hover-preview easing picker
- backdrop animation/parallax mode
- dynamic video background preview
- playback range/loop handles

Acceptance: keyframes, cuts and easing can be edited without leaving timeline context.

## Phase 8 — v0.8.5 Post, Code and capture surface parity

Tasks:

- richer X rendering if a safe API strategy becomes available
- configurable social-card width and custom fonts
- editable replies/quotes and Bluesky edge cases
- broader Code themes and browser-safe formatting
- URL capture aspect-ratio presets
- delayed capture reliability for lazy/animated pages
- scrollable page screenshot editing after capture

## Phase 9 — v0.8.4 mobile parity

Goal: dedicated canvas-first mobile editor rather than compressed desktop UI.

Tasks:

- bottom tool bar
- modal bottom sheets for Frame, Backdrop, Layout and Export
- swipeable property groups
- persistent undo/redo
- touch-safe transform handles
- safe-area support
- installable PWA polish
- no horizontal overflow at 390px and 430px

Acceptance: all core screenshot/mockup functions work on a phone without desktop mode.

## Phase 10 — v0.8.5 visual regression and performance gate

Because GitHub Actions are intentionally not used, checks run locally before release.

Reference suite:

- empty editor
- single screenshot
- iPhone Pro mockup
- multi-device layout
- background/effects
- annotation state
- App Store state
- animation timeline
- Post Studio
- Code Studio
- mobile editor

Breakpoints:

- 1440×1000
- 1280×800
- 1024×768
- 430×932
- 390×844

Checks:

- screenshot-diff review
- no clipped controls or accidental overflow
- preview/export geometry match
- responsive drag behavior for ordinary desktop projects
- memory guards for large images/video

## Release sequence

- v0.8.0 — shell and tokens — completed
- v0.8.1 — canvas interaction
- v0.8.2 — device and styling fidelity
- v0.8.3 — annotation and timeline
- v0.8.4 — dedicated mobile editor
- v0.8.5 — final parity gate

## Known architecture boundaries

With GitHub Pages and no login/backend:

- local drafts/templates and asset storage are supported
- browser-extension URL capture is supported
- public Bluesky reads are supported
- secure X API credentials are not suitable in public client JavaScript
- stable public cloud asset sharing needs external storage/backend infrastructure
