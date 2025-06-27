/**
 * 主进程配置
 * 主进程负责创建浏览器窗口、加载应用内容、与渲染进程通信等
 * 主进程可以使用Node.js的API，例如文件系统、网络、数据库等
 * 主进程不应该访问DOM，因为它在渲染进程的沙箱中运行
 * author: yuanjun
 * date: 2025-06-20
*/
import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL as string)
  } else {
    // 生产环境下，加载打包后的文件
    win.loadFile('dist/index.html')
  }
})