const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

/**
 * Applies wallpaper using KDE's command line tool.
 * @param {string} imagePath 
 */
async function setWallpaper(imagePath) {
    try {
        // Official KDE command to apply wallpaper
        await execAsync(`plasma-apply-wallpaperimage "${imagePath}"`);
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

/**
 * Sets wallpaper scaling (Fill, Fit, Stretch, etc.)
 * Note: This usually requires kwriteconfig5 for more granular control.
 */
async function setWallpaperScaling(scalingType) {
    try {
        // Example: kwriteconfig5 --group "Wallpaper" --key "FillMode" 2
        // FillMode values: 0=Stretch, 1=Tiled, 2=Crop, 3=Fit, 4=Tiled (Fit), 5=Tiled (Max)
        const modes = { 'stretch': 0, 'tile': 1, 'fill': 2, 'fit': 3 };
        const mode = modes[scalingType] || 2;
        await execAsync(`kwriteconfig5 --file plasmarc --group "Wallpaper" --key "FillMode" ${mode}`);
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

module.exports = { setWallpaper, setWallpaperScaling };
