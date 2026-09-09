# Mockup Studio Capture v0.6

Chrome / Edge Manifest V3 extension for Mockup Studio.

## Install unpacked
1. Extract the ZIP.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable Developer mode.
4. Choose Load unpacked and select this folder.
5. Pin Mockup Studio Capture.

The extension captures the visible viewport, stitches a full page, or lets you click one visible element. The result is stored temporarily in extension-local storage and handed to https://equilibriumpress.github.io/mockup-studio/. No screenshot server is used.

Full-page capture is capped at 20,000 CSS pixels in height and scales down extremely large pages to keep browser memory use bounded.
