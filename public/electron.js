const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
// const url = require('url');
// 206cef943c0c48168e49bb1d98dccd5fc9c11509
const isDev = require('electron-is-dev');
const { autoUpdater } = require("electron-updater");


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680, fullscreen: true });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', function() {
  autoUpdater.checkForUpdatesAndNotify();
  createWindow()
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
