const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 960, height: 680,
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
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
ipcMain.on('win:minimize', () => win.minimize());
ipcMain.on('win:close', () => win.close());
