const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const path = require('path')
const url = require('url')
const shell = require('electron').shell

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createMenu() {
  var template = [
    {
      label: 'Google Keep',
      submenu: [
        { label: 'About Google Keep', role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:'
        },
      ]
    },
  ];

  var menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu); // Must be called within app.on('ready', function(){ ... });
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    title: 'Google Keep',
    icon: __dirname + '/icon.png'
  })

  function loadInjectedURL(url) {
    mainWindow.loadURL(url);
    mainWindow.webContents.executeJavaScript(`var iDiv = document.createElement('div')`);
    mainWindow.webContents.executeJavaScript(`iDiv.id = 'titleBar'`)
    mainWindow.webContents.executeJavaScript(`iDiv.setAttribute('style', 'top: 0; left: 0;width: 100%; height: 1.5em; -webkit-app-region: drag; position: absolute;')`)
    mainWindow.webContents.executeJavaScript("document.getElementsByTagName('body')[0].appendChild(iDiv);")
    console.log("Injected " + url + " with title bar successfully")
  }

  loadInjectedURL("https://keep.google.com/")

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.setMenu(null);
}

app.on('ready', function () {
  createWindow();
  createMenu();
})

app.on('web-contents-created', (e, contents) => {

  function loadInjectedURL(url) {
    mainWindow.loadURL(url);
    mainWindow.webContents.executeJavaScript(`var iDiv = document.createElement('div')`);
    mainWindow.webContents.executeJavaScript(`iDiv.id = 'titleBar'`)
    mainWindow.webContents.executeJavaScript(`iDiv.setAttribute('style', 'top: 0; left: 0;width: 100%; height: 1.5em; -webkit-app-region: drag; position: absolute;')`)
    mainWindow.webContents.executeJavaScript("document.getElementsByTagName('body')[0].appendChild(iDiv);")
    console.log("Injected " + url + " with title bar successfully")
  }

  if (contents.getType() == 'window') {
    // Opening a new *window*
    contents.on('new-window', (e, url) => {
      e.preventDefault();
      if (url.indexOf("google") >= 0) {
        loadInjectedURL(url)
      }
      else {
        shell.openExternal(url)
      }
    });
  }

  if (contents.getType() == 'webview') {
    // Opening a new *window*
    contents.on('new-window', (e, url) => {
      e.preventDefault()
      if (url.indexOf("google") >= 0) {
        loadInjectedURL(url)
      }
      else {
        shell.openExternal(url)
      }
    });
    // Opening a new *link*
    contents.on('will-navigate', (e, url) => {
      e.preventDefault()
      if (url.indexOf("google") >= 0) {
        loadInjectedURL(url)
      }
      else {
        shell.openExternal(url)
      }
    });
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})