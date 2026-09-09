# Mockup Studio UI parity plan

Target: bring Mockup Studio's editor experience as close as practical to the current PostSpark interaction architecture while keeping Mockup Studio branding, original device artwork and the static GitHub Pages architecture.

Reference date: 2026-09-09.

## Definition of done

UI parity is not considered complete because the same feature exists. A surface is complete only when:

1. information hierarchy matches the reference workflow;
2. controls appear in the same contextual stage of the task;
3. common actions require roughly the same number of interactions;
4. canvas behavior feels equivalent for drag, resize, crop, position, zoom and selection;
5. desktop and mobile layouts are separately designed;
6. preview and exported output match;
7. reference screenshots at agreed desktop and mobile sizes show no major structural differences.

We do not copy PostSpark proprietary assets, source code, icons or branding. Visual assets are created specifically for Mockup Studio.

## Current baseline: v0.7.1

Already present:

- Screenshot and Mockup entry points
- Image / Frame / Annotate / Auto workflow
- Backdrop / Overlay Effects / Pattern / Portrait sections
- 35 device presets and 18 layouts
- crop presets, device colors and orientation
- original premium SVG artwork for key device families
- annotations, backgrounds, bulk mode, App Store mode, animation, video, code, post and capture modes
- GitHub Pages hosting without login or backend

## Phase 1 — reference capture and design tokens

Goal: stop approximating UI values independently.

Tasks:

- capture the current PostSpark editor at 1440×1000, 1280×800, 1024×768, 390×844 and 430×932
- capture Screenshot, Mockup, Frame, Annotate, Auto, Backdrop, Pattern, Portrait, animation timeline and export states
- document panel widths, toolbar heights, canvas gutters, radii, typography scale and control heights
- create `docs/ui-tokens.css` for spacing, typography, radii, borders, panel surfaces, control states and focus states
- replace v0.5/v0.6/v0.7 one-off visual values with tokens

Acceptance:

- no new editor component contains hard-coded spacing or radius values outside the token file unless documented
- main editor shell aligns structurally with the reference at desktop and mobile sizes

## Phase 2 — editor shell parity

Goal: make the application hierarchy feel like the reference before adding more visual polish.

Tasks:

- rebuild the top navigation around Screenshot / Mockup / Tweet / Post / Code / View All
- make Export a persistent primary action
- move project/reset/settings actions into secondary utility controls
- replace the current mode-heavy shell with contextual editor states
- keep Image / Frame / Annotate / Auto as the primary in-editor tool row
- keep Backdrop / Overlay Effects / Pattern / Portrait as the secondary property row
- collapse irrelevant controls when no media is selected
- reduce the visual weight of permanent sidebars
- create compact popovers/drawers for secondary choices
- add a true empty-state drop zone that matches the final editor hierarchy

Acceptance:

- Screenshot and Mockup editing no longer feels like switching between separate applications
- a new user can reproduce the reference click path for upload → frame → backdrop → shadow → export

## Phase 3 — canvas interaction parity

Goal: make manipulation feel equivalent, not merely provide equivalent inputs.

Tasks:

- position picker with X/Y axis locking and active guideline
- canvas zoom controls and zoom-to-fit
- hand/pan mode on desktop
- direct resize handles on all editable nodes
- rotation handle
- crop overlay with visible crop bounds
- scrollable website screenshot crop behavior
- element alignment guides for edges, centers and equal spacing
- keyboard nudging and 10px accelerated nudging
- direct double-click edit for text
- multi-select bounding box and group resize
- better touch targets for iPad/mobile

Acceptance:

- all common positioning work can be completed on-canvas without opening numeric property fields
- axis lock and center/edge snapping have visible feedback

## Phase 4 — device picker and layout parity

Goal: turn the current list of 35 presets into a high-quality visual picker.

Tasks:

- finish original SVG artwork for all 35 device presets
- add thumbnail previews generated from the same artwork engine used by the canvas
- show family, recommended media dimensions and supported orientation in the picker
- show color swatches inline
- one-click recommended-device suggestion after image upload
- Replace selected / Replace all mode inside the picker
- rebuild all 18 layout cards as live mini-previews rather than generic placeholders
- preserve unused media when switching to layouts with fewer devices
- tune spacing/proportions per layout

Acceptance:

- every device shown in the picker uses its own original artwork or an explicitly shared same-family artwork definition
- picker thumbnail, editor preview and export use the same geometry

## Phase 5 — backdrop, effects and background browser parity

Goal: match the depth of the screenshot styling workflow.

Tasks:

- built-in background browser with curated packs
- texture and refracted-glass packs created for Mockup Studio
- searchable local background library
- gradient editor with angle and stop controls
- automatic color suggestions from uploaded media
- backdrop blur, grayscale and opacity filters
- border position controls
- shadow position and intensity controls
- pattern scale, opacity, position and redesigned pattern controls
- portrait lens blur with adjustable focal area
- dynamic video gradients sampled per frame
- parallax enable/disable control for animated backgrounds

Optional external integration:

- Unsplash only after a compliant credential/proxy strategy is selected

Acceptance:

- backdrop/effect output is deterministic at 1×, 2×, 4K and 6K image export
- preview/export visual differences are covered by regression tests

## Phase 6 — annotation parity

Goal: make Annotate a real editing environment.

Tasks:

- freehand draw tool
- editable annotation text
- arrow variants including hand-drawn arrows
- underlines and highlight strokes
- sticker/icon browser
- custom SVG/icon upload
- draggable/resizable auto-number steps
- lettered step sequences
- blur brush and rectangle redaction modes
- annotation multi-select and duplicate

Acceptance:

- annotations remain fully editable after save/reopen
- annotation tools share the same transform handles as other nodes

## Phase 7 — animation and video UI parity

Goal: align the editing experience, not only rendering capability.

Tasks:

- move animation controls to a bottom toolbar/timeline
- timeline zoom and horizontal scroll
- snap keyframes to seconds with temporary override
- jump-cut tool next to playback controls
- `X` shortcut for cut at playhead
- zoom-focus animation presets
- 3D device transforms
- hover-preview easing picker
- backdrop animation/parallax mode
- dynamic video background preview
- playback range and loop handles
- clear selected layer track states

Acceptance:

- keyframes, jump cuts and easing can be edited without leaving the timeline area
- 30/60 fps preview and export use identical timing math

## Phase 8 — Post, Code and capture surface parity

Tasks:

- richer X rendering if a safe API strategy becomes available
- configurable social-card width
- custom font selection
- replies and quotes as editable sections
- Bluesky quote/reply/gallery edge cases
- Code themes matching the breadth of the reference category
- code formatter for supported languages where browser-safe
- accurate selected-line and diff states
- URL capture aspect-ratio presets
- delayed URL capture reliability for lazy images and animations
- scrollable page screenshot editing after capture

Acceptance:

- generated social/code content passes visual snapshots for representative samples

## Phase 9 — mobile parity

Goal: mobile must be a dedicated editor rather than compressed desktop UI.

Tasks:

- canvas-first mobile shell
- bottom tool bar
- modal bottom sheets for Frame, Backdrop, Layout and Export
- swipeable property groups
- persistent undo/redo
- touch-safe resize/rotate handles
- safe-area support
- installable PWA polish
- no horizontal page overflow at 390px and 430px widths

Acceptance:

- all screenshot/mockup core functions can be completed on a phone without switching to desktop mode

## Phase 10 — visual regression and performance gate

Because GitHub Actions are intentionally not used, these checks run locally before releases.

Create a reference suite for:

- empty editor
- single screenshot
- iPhone Pro mockup
- multi-device layout
- background/effects state
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

- screenshot diff review
- no clipped controls
- no accidental overflow
- preview/export geometry match
- 60fps drag responsiveness on a typical desktop for ordinary projects
- memory guard for large images/video

## Release sequence

### v0.8.0 — Shell and tokens
Reference captures, design tokens, editor shell and navigation hierarchy.

### v0.8.1 — Canvas interaction
Position picker, axis lock, zoom/pan, transform handles, crop and snapping.

### v0.8.2 — Device and styling fidelity
Finish all device artwork, live device/layout previews, background browser and detailed effects.

### v0.8.3 — Annotation and timeline
Full annotation environment and PostSpark-style bottom animation workflow.

### v0.8.4 — Mobile editor
Dedicated phone/tablet interaction model.

### v0.8.5 — Parity gate
Visual-regression pass, export consistency, edge cases, performance and remaining integration differences.

## Known architecture boundaries

With GitHub Pages and no login/backend:

- local drafts and templates are fully supported
- local asset storage is feasible
- browser-extension URL capture is feasible
- public Bluesky reads are feasible
- direct secure X API credentials are not suitable in public client JavaScript
- cloud asset sharing with stable public URLs needs external storage/backend infrastructure

These boundaries should remain explicit rather than hiding server requirements inside the static application.
