<script setup lang="ts">
    import { ref } from 'vue'
    const isMaximized = ref(false)
    const minimize = () => {
        (window as any).electronAPI.minimize()
    }
    const toggleMaximize = () => {
        (window as any).electronAPI.toggleMaximize()
        isMaximized.value = !isMaximized.value
    }
    const close = () => {
        (window as any).electronAPI.close()
    }
</script>

<template>
  <div class="title-bar">
    <div class="title">Electron Vue</div>
    <div class="controls">
        <button @click="minimize" title="最小化" id="min-btn">－</button>
        <button @click="toggleMaximize" title="最大化" id="max-btn">{{ isMaximized ? '❐' : '□' }}</button>
        <button @click="close" title="关闭" id="close-btn">×</button>
    </div>
    </div>
</template>

<style scoped>
/* 关键样式 */
.title-bar {
  -webkit-app-region: drag; /* 允许拖拽区域:ml-citation{ref="3,5" data="citationList"} */
  height: 42px;
  background: #242424;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
    padding-left: 20px;
  }
.controls button {
  -webkit-app-region: no-drag; /* 禁止按钮拖拽:ml-citation{ref="3" data="citationList"} */
  border: none;
  cursor: auto;
  border-radius: 0;
  width: 50px;
}

.controls button:hover {
  border: none;
}

.controls #close-btn:hover{
    background-color: red;
}

.controls #min-btn:hover, .controls #max-btn:hover{
    background-color: #838181;
}

.controls button:focus, .controls button:focus-visible{
  outline: none;
}

</style>
