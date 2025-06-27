/**
 * 主进程配置
 * 主进程负责创建浏览器窗口、加载应用内容、与渲染进程通信等
 * 主进程可以使用Node.js的API，例如文件系统、网络、数据库等
 * 主进程不应该访问DOM，因为它在渲染进程的沙箱中运行
 * author: yuanjun
 * date: 2025-06-20
*/
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // remove the default titlebar
    titleBarStyle: 'hidden', // 隐藏原生标题栏
    frame: false, // 无边框窗口（可选）
    show: false,
    webPreferences: {
        preload: path.join(__dirname, '..', 'preload/index.js'),
        contextIsolation: true
    }
  })

  console.log(111);
  mainWindow.on('ready-to-show', () => {
    console.log(123)
    mainWindow.show();
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL as string)
  } else {
    // 生产环境下，加载打包后的文件
    mainWindow.loadFile('dist/index.html')
  }

  // 窗口控制IPC监听
  ipcMain.on('window-minimize', () => mainWindow.minimize())
  ipcMain.on('window-toggle-maximize', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  })
  ipcMain.on('window-close', () => mainWindow.close())

})