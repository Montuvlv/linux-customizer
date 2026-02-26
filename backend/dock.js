const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');
const execAsync = promisify(exec);

/**
 * Reads common Linux desktop file locations to list installed apps.
 */
async function getInstalledApps() {
    const appDirs = ['/usr/share/applications', `${process.env.HOME}/.local/share/applications`];
    const apps = [];

    for (const dir of appDirs) {
        try {
            const files = await fs.readdir(dir);
            for (const file of files) {
                if (file.endsWith('.desktop')) {
                    const content = await fs.readFile(path.join(dir, file), 'utf8');
                    const nameMatch = content.match(/^Name=(.+)$/m);
                    const iconMatch = content.match(/^Icon=(.+)$/m);
                    if (nameMatch) {
                        apps.push({
                            name: nameMatch[1],
                            icon: iconMatch ? iconMatch[1] : 'application-x-executable',
                            path: path.join(dir, file)
                        });
                    }
                }
            }
        } catch (e) {
            // Directory might not exist
        }
    }
    return apps.slice(0, 50); // Limit to 50 for now
}

/**
 * Updates dock configuration in KDE.
 * @param {string} position (bottom, top, left, right)
 * @param {number} iconSize (32, 48, 64, etc.)
 */
async function updateDockSettings(position, iconSize) {
    try {
        // KDE Plasma dock (Latte or Plasma Panel) usually requires D-Bus or kwriteconfig5
        // This is a simplified example for KDE Plasma panel
        await execAsync(`kwriteconfig5 --file plasmashellrc --group "Panels" --key "location" ${position}`);
        await execAsync(`kwriteconfig5 --file plasmashellrc --group "Panels" --key "iconSize" ${iconSize}`);
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

module.exports = { getInstalledApps, updateDockSettings };
