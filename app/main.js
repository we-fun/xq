const app = require('electron').app
const BrowserWindow = require('electron').BrowserWindow
const join = require('path').join

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false
    },
    width: 700,
    height: 700
  })

  const index = join(__dirname, 'index.html')
  win.loadURL(`file://${index}`)
})
