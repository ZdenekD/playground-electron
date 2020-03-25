// Modules
const {app, BrowserWindow} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let secondaryWindow;

// Create a new BrowserWindow when `app` is ready
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        backgroundColor: '#2c9',
        webPreferences: {nodeIntegration: true},
    });

    secondaryWindow = new BrowserWindow({
        width: 300,
        height: 300,
        parent: mainWindow,
        show: false,
    });

    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('src/index.html');
    secondaryWindow.loadFile('src/index.html');

    // Open DevTools - Remove for PRODUCTION!
    // mainWindow.webContents.openDevTools();

    // secondaryWindow.once('ready-to-show', secondaryWindow.show);

    // Listen for window being closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    secondaryWindow.on('closed', () => {
        secondaryWindow = null;
    });
}

// Electron `app` is ready
app.on('ready', createWindow);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
