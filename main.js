const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { setWallpaper, setWallpaperScaling } = require('./backend/wallpaper');
const { getInstalledApps, updateDockSettings } = require('./backend/dock');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 700,
        frame: false,
        backgroundColor: '#f5f5f3',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile('renderer/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('win:minimize', () => win.minimize());
ipcMain.on('win:close', () => win.close());

// Wallpaper handlers
ipcMain.handle('wallpaper:apply', async (event, imagePath) => {
    if (!imagePath) {
        const { canceled, filePaths } = await dialog.showOpenDialog(win, {
            title: 'Select Wallpaper',
            properties: ['openFile'],
            filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }]
        });
        if (canceled) return { success: false, message: 'Canceled' };
        imagePath = filePaths[0];
    }
    return await setWallpaper(imagePath);
});

ipcMain.handle('wallpaper:scale', async (event, scale) => {
    return await setWallpaperScaling(scale);
});

// Dock handlers
ipcMain.handle('dock:getApps', async () => {
    return await getInstalledApps();
});

ipcMain.handle('dock:update', async (event, { pos, size }) => {
    return await updateDockSettings(pos, size);
});
