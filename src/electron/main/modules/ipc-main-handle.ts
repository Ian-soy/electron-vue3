import { BrowserWindow } from 'electron'

export const ipcMainHandlers = [{
    channel: 'window-minimize',
    handler:  (mainWindow: BrowserWindow) => {
      console.log(1111);
      mainWindow.minimize();
    }
  }]
  