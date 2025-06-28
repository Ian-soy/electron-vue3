/**
 * 主进程IPC模块
 * author: yuanjun
 * date: 2025-06-20
 * */ 
import { ipcMain, BrowserWindow } from 'electron';

type Handler = (...args: any[]) => any;
type AsyncHandler = (...args: any[]) => Promise<any>;

export class IPCManager {
    private static instance: IPCManager;
    private handlers: Map<string, Handler>;
    private asyncHandlers: Map<string, AsyncHandler>;

    private constructor() {
        this.handlers = new Map();
        this.asyncHandlers = new Map();
        this.initialize();
    }

    public static getInstance(): IPCManager {
        if (!IPCManager.instance) {
            IPCManager.instance = new IPCManager();
        }
        return IPCManager.instance;
    }

    private initialize():void {
        // 注册同步处理器
        ipcMain.on('ipc: invoke', (event, channel, ...args) => {
            try {
                console.log(55555)
                const handler = this.handlers.get(channel);
                if (handler) {
                    event.returnValue = handler(...args);
                } else {
                    event.returnValue = { success: false, error: `No handler for channel: ${channel}` }
                }
            } catch (error) {
                event.returnValue = { success: false, error: (error as Error).message }
            }
        });

        // 注册异步处理器
        ipcMain.on('ipc: invokeAsync', async (event, channel, ...args) => {
            try {
                const handler = this.asyncHandlers.get(channel);
                if (handler) {
                    return await handler(...args);
                }
                throw new Error(`No async handler for channel: ${channel}`);
            } catch (error) {
                throw error;
            }
        });

        ipcMain.on('get-window-id', (event) => {
            event.returnValue = event.sender.id;
        });
    }

    // 注册同步处理器
    public register(channel: string, handler: Handler): any {
        console.log(2222);
        this.handlers.set(channel, handler);
    }

    // 注册异步处理器
    public registerAsync(channel: string, handler: AsyncHandler): any {
        this.asyncHandlers.set(channel, handler);
    }

    // 广播事件
    public broadcast(channel: string, ...args: any[]): void {
        BrowserWindow.getAllWindows().forEach(win => {
            if (!win.isDestroyed()) {
                win.webContents.send(channel, ...args);
            }
        });
    }

    // 发送事件到指定窗口
    public sendToWindow(winId: number, channel: string, ...args: any[]): void {
        const win = BrowserWindow.fromId(winId);
        if (win && !win.isDestroyed()) {
            win.webContents.send(channel, ...args);
        }
    }

    // 清除所有事件监听器
    public clearAllListeners(): void {
        this.handlers.clear();
        this.asyncHandlers.clear();
    }
}

export const ipcManager = IPCManager.getInstance();