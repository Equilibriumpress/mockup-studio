# Mockup Studio

A browser-first screenshot, device mockup and App Store asset editor. The app runs fully client-side and is designed for GitHub Pages.

## Current v0.1 features

- Image upload and clipboard paste
- Drag, resize, rotate and opacity controls
- Generic iPhone and browser frames
- Text overlays
- Background colors and gradients
- Canvas presets for social, landscape and App Store output
- Layout presets
- Layers list
- Undo and redo
- Local project persistence with IndexedDB
- Project import and export as `.mockupstudio`
- PNG export at native canvas size
- Keyboard shortcuts
- Responsive editor shell for desktop and iPad

## Hosting

GitHub Pages serves the `/docs` folder from `main`.

## Privacy

Images stay in the browser. The editor has no login, analytics, server upload or API key.

## Development

The current release intentionally has no runtime dependencies. Open `docs/index.html` through any static web server.

```bash
python3 -m http.server 8000 -d docs
```

Then open `http://localhost:8000`.

## Roadmap

See [ROADMAP.md](ROADMAP.md).
