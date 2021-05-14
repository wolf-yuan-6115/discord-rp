const { ipcRenderer } = require("electron");
const RPC = require("discord-rpc");
const rpc = new RPC.Client({
  transport: "ipc"
});

window.addEventListener("connect", function () {
  try {
    rpc.connect();
    ipcRenderer.send("connectEvent", "connected");
  } catch {
    ipcRenderer.send("connectEvent", "connectError");
  }
});

ipcRenderer.on("init", (event) => {
  window.dispatchEvent(new CustomEvent("rec", { detail: rpc.user }));
})