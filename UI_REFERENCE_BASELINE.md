# UI reference baseline — 2026-09-09

This file records the structural reference used for the Mockup Studio v0.8 UI-parity program. It is based on the current public PostSpark editor, device-mockup editor, X-post editor, changelog interface images and mobile-editor reference available on 2026-09-09.

Mockup Studio does not copy PostSpark source code, branding, icons or proprietary artwork. The goal is interaction and information-hierarchy parity using Mockup Studio's own visual system.

## Desktop reference structure

Observed hierarchy:

1. compact application header;
2. product-level navigation for Screenshot, Mockup, Tweet, Post, Code and View All;
3. persistent export action in the header;
4. media/template strip on the left;
5. central canvas as the dominant surface;
6. context-specific editor controls close to the canvas;
7. property/style controls in a dedicated side inspector;
8. animation controls and timeline beneath the canvas when animation/video is active.

The v0.8.0 shell implements items 1–7. Timeline parity is intentionally deferred to v0.8.3.

## Editor-context hierarchy

Primary editor tools:

- Image
- Frame
- Annotate
- Auto

Secondary styling context:

- Backdrop
- Overlay Effects
- Pattern
- Portrait

Transform and numeric layer controls are secondary and should not dominate the standard screenshot/mockup workflow.

## Mobile reference structure

The current reference is canvas-first rather than a compressed desktop editor. The public mobile editor imagery shows:

- compact top utilities and export;
- large canvas preview;
- aspect/layout controls below the canvas;
- bottom-oriented editing controls;
- light and dark presentation variants.

Mockup Studio v0.8.0 only establishes safe responsive fallbacks. A dedicated mobile interaction model remains v0.8.4.

## v0.8.0 design-token baseline

Mockup Studio adapts the observed hierarchy into its own token system:

- application header: 54px
- desktop left inspector: 272px
- desktop right inspector: 286px
- standard control height: 34px
- compact control height: 29px
- panel/background levels: four dark elevation levels
- primary accent: Mockup Studio gold, not the reference product accent
- editor shell radius scale: 6 / 8 / 11 / 16 / 22px

These are Mockup Studio values chosen to reproduce the visual density and hierarchy while keeping its own identity. Component-specific geometry that is tied to a particular editor control remains in `docs/v080-shell.css`; shared values live in `docs/ui-tokens.css`.

## Reference breakpoints for later visual regression

- 1440×1000
- 1280×800
- 1024×768
- 430×932
- 390×844

The final screenshot-diff gate is v0.8.5. v0.8.0 establishes the structural baseline; later releases tighten canvas, device, timeline and mobile behavior against it.
