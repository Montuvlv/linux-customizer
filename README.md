# LinuxForge 🐧

LinuxForge is a desktop customization tool for Linux, specifically built for **KDE Plasma**. Instead of digging through system settings, config files, and terminal commands to customize your desktop, LinuxForge gives you a single, clean, modern app where you can change everything visually — wallpapers, dock, themes, fonts, cursor, and effects — all in one place.

## Features

- 🖼 **Wallpaper Manager**: One-click wallpaper apply via `plasma-apply-wallpaperimage`.
- ⬜ **Dock Manager**: Visual dock preview and pin/unpin apps from `.desktop` files.
- 🎨 **Themes**: Switch between built-in color schemes and accent colors.
- 🔤 **Fonts**: Pick system-wide font from a live preview list.
- 🖱 **Cursor**: Choose from cursor themes and sizes.
- ✨ **Effects**: Toggle individual window effects like Blur, Fade, and Wobbly Windows.

## Tech Stack

- **UI**: HTML, CSS, JavaScript (React-ready)
- **App shell**: Electron
- **Backend**: Node.js
- **KDE integration**: `plasma-apply-wallpaperimage`, `kwriteconfig5`, D-Bus

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Montuvlv/linux-customizer.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm start
   ```

## 🏗 Build for ARM

LinuxForge supports ARM64 (e.g., Raspberry Pi, Apple Silicon) and ARMv7l. To build for these architectures:

```bash
# Build for ARM64 (64-bit)
npm run build:arm64

# Build for ARMv7l (32-bit)
npm run build:armv7
```

## License

MIT
