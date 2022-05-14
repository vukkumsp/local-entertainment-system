import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

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

//GetFile
ipcMain.on('getFile', (event, filePath) => {
    //arg is the path to the json file
    const fileData = fs.readFileSync(filePath);
    win.webContents.send('getFileResponse', fileData);
})

//UpdateFile
ipcMain.on('updateJsonFile', (event, path, data) => {
    // const [path, data] = args;
    fs.writeFileSync(path, JSON.stringify(data));
    win.webContents.send('updateJsonFileResponse', path, data);
})

//GetFilesInDir
ipcMain.on('getFilesInDir', (event, dirPath) => {
    // const files = fs.readdirSync(__dirname) "C:\\Users\\vukku\\Documents"
    const files = fs.readdirSync(dirPath)
    win.webContents.send('getFilesInDirResponse', files)
})

function createWindow() {
    win = new BrowserWindow({
        width: 1270,
        height: 720,
        backgroundColor: '#ffffff',
        webPreferences: {
            nodeIntegration: true,
            // enableRemoteModule: true
            contextIsolation: false, //required to make window.require work when in electron window
        }
    })
    // Menu bar
    // win.setMenu(null);
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/../../dist/local-entertainment-system/index.html`),
            protocol: 'file:',
            slashes: true,
        })
    )
    // uncomment below to open the DevTools.
    win.webContents.openDevTools();

    // Event when the window is closed.
    win.on('closed', () => {
        win = null
    })
}