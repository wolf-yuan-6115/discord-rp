const {
  app,
  BrowserWindow,
  ipcMain
} = require("electron");
const path = require("path");

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 600,
    height: 250,
    maximizable: false,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false
    }
  });

  win.loadFile("./view/loading.html");
  win.setMenuBarVisibility(false);
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("connectEvent", (event, args) => {
  if (args === "connected") {
    // win.loadFile("./view/index.html");
    win.webContents.send("init");
  } else if (args === "connectError") {
   // win.loadFile("./view/index.html");
    win.webContents.send("init");
  }
});
