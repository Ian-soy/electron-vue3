/**
 * 环境变量声明 src/env.d.ts
 * author: yuanjun
 * date: 2025-06-20
 * */ 

import { IPCAPI } from '../shared/types/ipc.types'
// // 定义electronAPI
declare global {
  interface Window {
    electronAPI: IPCAPI
  }
}