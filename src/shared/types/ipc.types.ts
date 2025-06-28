/**
 * 主进程事件枚举
 * 主进程负责创建浏览器窗口、加载应用内容、与渲染进程通信等
 * 主进程可以使用Node.js的API，例如文件系统、网络、数据库等
 * 主进程不应该访问DOM，因为它在渲染进程的沙箱中运行
 * author: yuanjun
 * date: 2025-06-20
 * */ 

export enum IPCChannel {
    // 窗口事件
    WINDOW_MINIMIZE = 'window-minimize',
    WINDOW_TOGGLE_MAXIMIZE = 'window-toggle-maximize',
    WINDOW_CLOSE = 'window-close',
    GET_WIN_ID = 'get-win-id',
    // 系统托盘事件
    SYS_TRAY_CREATE = 'sys-tray-create',
    SYS_TRAY_DESTROY = 'sys-tray-destroy',
    SYS_TRAY_SHOW = 'sys-tray-show',
    SYS_TRAY_HIDE = 'sys-tray-hide',
    // 其他事件
    APP_READY = 'app-ready',
    APP_QUIT = 'app-quit',
    // 渲染进程事件
    TIME_UPDATE = 'time-update',
    // 文件事件
    FILE_READ = 'file-read',
    FILE_WRITE = 'file-write',
    CUSTOM_EVENT = 'custom-event'
}

export interface IPCTypings {
    [IPCChannel.WINDOW_MINIMIZE]: {
        params: [],
        return: { success: boolean, error?: string }
    }
    [IPCChannel.WINDOW_TOGGLE_MAXIMIZE]: {
        params: [],
        return: { success: boolean, error?: string }
    }
    [IPCChannel.WINDOW_CLOSE]: {
        params: [],
        return: { success: boolean, error?: string }
    }
    [IPCChannel.GET_WIN_ID]: {
        params: [],
        return: number
    }
    // 文件事件
    [IPCChannel.FILE_READ]: {
        params: [filePath: string],
        return: { success: boolean, data?: string, error?: string }
    }
    [IPCChannel.FILE_WRITE]: {
        params: [filePath: string, content: string],
        return: { success: boolean, error?: string }
    }
    [IPCChannel.TIME_UPDATE]: {
        params: [time: string],
        return: void
    }
    [IPCChannel.CUSTOM_EVENT]: {
        params: [message: string],
        return: void
    }
    
}

// 主进程事件接口
export interface IPCAPI {
    minimize(): Promise<IPCTypings[IPCChannel.WINDOW_MINIMIZE]['return']>
    toggleMaximize(): Promise<IPCTypings[IPCChannel.WINDOW_TOGGLE_MAXIMIZE]['return']>
    close(): Promise<IPCTypings[IPCChannel.WINDOW_CLOSE]['return']>
    invoke<T extends keyof IPCTypings>(
        channel: T, 
        ...args: IPCTypings[T]['params']
    ): Promise<IPCTypings[T]['return']>

    // invokeAsync<T extends keyof IPCTypings>(
    //     channel: T, 
    //     ...args: IPCTypings[T]['params']
    // ): Promise<IPCTypings[T]['return']>

    on<T extends keyof IPCTypings>(
        channel: T,
        callback: (...args: IPCTypings[T]['params']) => any
    ): any

    send<T extends keyof IPCTypings>(
        channel: T,
        ...args: IPCTypings[T]['params']
    ): any

    getCurrentWindowId(): number
}