const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  const launchUrl = process.env.ELECTRON_LAUNCH_URL || url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  })
  mainWindow.loadURL(launchUrl)

  if (process.env.ELECTRON_LAUNCH_URL) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', _ => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', _ => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', _ => {
  if (mainWindow === null) {
    createWindow()
  }
})