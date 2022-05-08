const { app, BrowserWindow } = require('electron')  
var path = require('path')  
  
  
let win;  
function createWindow() {  
    // Create the browser window.  
    win = new BrowserWindow({  
        width: 600,  
        height: 600,  
        backgroundColor: '#ffffff',  
    })  
    win.setMenu(null);  
  
    win.loadURL(`file://${__dirname}/dist/local-entertainment-system/index.html`)  
  
    // uncomment below to open the DevTools.  
    //win.webContents.openDevTools()  
  
    // Event when the window is closed.  
    win.on('closed', function () {  
        win = null  
    })  
}  
  
// Create window on electron intialization  
app.on('ready', createWindow)  
  
// Quit when all windows are closed.  
app.on('window-all-closed', function () {  
  
    // On macOS specific close process  
    if (process.platform !== 'darwin') {  
        app.quit()  
    }  
})  
  
app.on('activate', function () {  
    // macOS specific close process  
    if (win === null) {  
        createWindow()  
    }  
}) 