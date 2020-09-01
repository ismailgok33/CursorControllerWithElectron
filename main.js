const { app, BrowserWindow, screen } = require('electron')

function createWindow() {
    // Tarayıcı penceresini oluştur.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('index.html')

    // DevTools'u aç.
    win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Bazı API'ler sadece bu olayın gerçekleşmesinin ardından kullanılabilir.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on("btnclick", function (event, arg) {
    //create new window
    var newWindow = new BrowserWindow({
        width: 450, height: 300, show:
            false, webPreferences: {
                webSecurity: false, plugins:
                    true, nodeIntegration: false, webviewTag: true
            }

    });  // create a new window

    newWindow.loadURL(facebookURL);
    newWindow.show();

    // inform the render process that the assigned task finished. Show a message in html
    // event.sender.send in ipcMain will return the reply to renderprocess
    event.sender.send("btnclick-task-finished", "yes");
});

app.allowRendererProcessReuse = false;

