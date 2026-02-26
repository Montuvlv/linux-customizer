const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('win:minimize'),
    close: () => ipcRenderer.send('win:close'),
    applyWallpaper: (path) => ipcRenderer.invoke('wallpaper:apply', path),
    setWallpaperScale: (scale) => ipcRenderer.invoke('wallpaper:scale', scale),
    getApps: () => ipcRenderer.invoke('dock:getApps'),
    updateDock: (pos, size) => ipcRenderer.invoke('dock:update', { pos, size }),
});
