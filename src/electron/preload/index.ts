/**
 * preload脚本
 * 用于渲染进程与主进程之间的通信
 * 可以使用node.js的模块
 * 可以使用electron的模块
 * 可以使用自定义的模块
 * contextBridge 必须在preloadjs中使用
 * 暴露有限api
 * author: yuanjun
 * date: 2025-06-20
 */

import { contextBridge, ipcRenderer } from 'electron'
import { IPCChannel, type IPCAPI } from '../../shared/types/ipc.types'

const api: IPCAPI = {
  minimize: async () => {
    try {
      await ipcRenderer.send('window-minimize');
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  },
  toggleMaximize: async () => {
    try {
      await ipcRenderer.send('window-toggle-maximize');
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  },
  close: async () => {
    try {
      await ipcRenderer.send('window-close');
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  },
  invoke: (channel: IPCChannel, ...args: any[]) => ipcRenderer.invoke(channel, ...args),
  // invokeAsync: async (channel: IPCChannel, ...args: any[]) => {
  //     try {
  //     return await ipcRenderer.invoke('ipc:invokeAsync', channel, ...args)
  //   } catch (error) {
  //     throw error
  //   }
  // },
  on: (channel: IPCChannel, callback: (...args: any[]) => any) => {
    const subscription = (_event: any, ...args: any[]) => callback(...args)
    ipcRenderer.on(channel, subscription)
    return () => ipcRenderer.removeListener(channel, subscription)
  },
  send: (channel: IPCChannel, ...args: any[]) => {
    console.log(3333);
    ipcRenderer.send(channel, ...args)
  },
  getCurrentWindowId: () => ipcRenderer.sendSync(IPCChannel.GET_WIN_ID),
}

contextBridge.exposeInMainWorld('electronAPI', api)
