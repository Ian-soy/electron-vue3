/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue' // 定义vue组件
  const component: DefineComponent<{}, {}, any> // 定义vue组件的类型
  export default component
}