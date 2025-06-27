/**
 * preload脚本
 * 用于渲染进程与主进程之间的通信
 * 可以使用node.js的模块
 * 可以使用electron的模块
 * 可以使用自定义的模块
 * author: yuanjun
 * date: 2025-06-20
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  toggleMaximize: () => ipcRenderer.send('window-toggle-maximize'),
  close: () => ipcRenderer.send('window-close')
})
