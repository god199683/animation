const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('updater', {
  check: () => ipcRenderer.invoke('updater:check'),
  apply: () => ipcRenderer.invoke('updater:apply')
});
contextBridge.exposeInMainWorld('desktopClipboard', {
  writeText: (text) => ipcRenderer.invoke('clipboard:write', String(text || ''))
});
