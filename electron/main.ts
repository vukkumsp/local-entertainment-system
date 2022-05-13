import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';


let win: BrowserWindow;

app.on('ready', createWindow)

app.on('activate', () => {
    // macOS specific close process
    if (win === null) {
        createWindow()
    }
})

// Quit when all windows are closed.  
app.on('window-all-closed', function () {

    // On macOS specific close process  
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
    })
    win.setMenu(null);
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/local-entertainment-system/index.html`),
            protocol: 'file:',
            slashes: true,
        })
    )
    // uncomment below to open the DevTools.
    // win.webContents.openDevTools();

    // Event when the window is closed.
    win.on('closed', () => {
        win = null
    })
}