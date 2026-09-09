# Project schema v1

A project is stored as JSON and remains intentionally portable.

```json
{
  "version": 1,
  "name": "Untitled Mockup",
  "canvas": {
    "width": 1080,
    "height": 1350,
    "background": "#f4f1ea"
  },
  "elements": []
}
```

Image assets are embedded as data URLs so an exported `.mockupstudio` file is self-contained.

## Image element

```json
{
  "id": "uuid",
  "type": "image",
  "name": "screen.png",
  "src": "data:image/png;base64,...",
  "x": 100,
  "y": 120,
  "width": 520,
  "height": 1120,
  "rotation": 0,
  "opacity": 1,
  "frame": "iphone",
  "radius": 32,
  "shadow": true,
  "z": 1
}
```

## Text element

```json
{
  "id": "uuid",
  "type": "text",
  "text": "Your headline",
  "x": 120,
  "y": 100,
  "width": 820,
  "height": 180,
  "fontSize": 72,
  "color": "#111827",
  "bold": true,
  "rotation": 0,
  "opacity": 1,
  "z": 2
}
```
