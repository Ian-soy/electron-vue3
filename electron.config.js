/**
 * electron-builder打包配置
 * 打包配置
 * productName: 产品名称
 * copyright: 版权信息
 * directories: 打包目录
 * files: 打包文件
 * asar: 是否启用asar打包
 * compression: 压缩级别
 * win: 打包windows安装包
 * nsis: 打包nsis安装包
 * h5: 打包h5安装包
 * mac: 打包mac安装包
 * linux: 打包linux安装包
 * author: yuanjun
 * date: 2025-06-20
 */ 

const currentTime = new Date().getTime().toString();
module.exports = {
    productName: "Electron Vue",
    copyright: "Copyright©2025 Electron Vue",
    directories: {
        output: `release/${currentTime}`
    },
    files: [
        "dist/**/*",
        "dist-electron/**/*",
        "!node_modules"
    ],
    asar: true,
    compression: 'maximum',
    win: {
        target: [
            {
                target: 'nsis',
                arch: ['x64']
            }
        ]
    },
    h5: {
        target: [
            {
                target: 'zip',
                arch: ['x64']
            }
        ]
    },
    mac: {
        target: [
            {
                target: 'zip',
                arch: ['x64']
            }
        ]
    },
    linux: {
        target: [
            {
                target: 'zip',
                arch: ['x64']
            }
        ]
    },
    nsis: {
        oneClick: false, // 不使用一键安装
        allowElevation: true, // 允许管理员权限安装
        allowToChangeInstallationDirectory: true, // 允许用户更改安装路径
        createDesktopShortcut: true, // 创建桌面快捷方式
        createStartMenuShortcut: true, // 创建开始菜单快捷方式
        shortcutName: 'Electron Vue', // 自定义快捷方式名称
        runAfterFinish: false, // 不自动运行安装程序
        include: 'build/installer.nsh', // 自定义nsis安装脚本
        // installerIcon: 'build/icon.ico', // 自定义安装图标
        // uninstallerIcon: 'build/icon.ico', // 自定义卸载图标
        // installerHeaderIcon: 'build/icon.ico' // 自定义安装器头部图标
    }
}
