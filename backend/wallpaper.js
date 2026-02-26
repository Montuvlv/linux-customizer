const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

async function setWallpaper(imagePath) {
  try {
    await execAsync(`plasma-apply-wallpaperimage "${imagePath}"`);
    return { success: true };
  } catch (e) {
    return { success: false, message: e.message };
  }
}
module.exports = { setWallpaper };
