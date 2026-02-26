#!/bin/bash

echo "🐧 LinuxForge Setup — Preparing your environment..."

# Check if npm is installed
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed. Please install Node.js and npm first.' >&2
  exit 1
fi

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Check for KDE tools
echo "🔍 Checking for KDE Plasma tools..."
if ! [ -x "$(command -v plasma-apply-wallpaperimage)" ]; then
  echo "⚠️ Warning: plasma-apply-wallpaperimage not found. Wallpaper switching may not work."
fi

if ! [ -x "$(command -v kwriteconfig5)" ]; then
  echo "⚠️ Warning: kwriteconfig5 not found. System config modification may not work."
fi

echo "✅ Setup complete! You can now start LinuxForge with: npm start"
