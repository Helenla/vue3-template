import { createApp, ComponentPublicInstance } from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router.interceptor'
import SetVantPlugins from './plugins/vant' // vant按需引入
import vconsole from 'vconsole'
import './assets/scss/main.scss' // 全局样式

// window属性接口定义
declare global {
  interface Window {
    vm: ComponentPublicInstance,
    LOCAL_CONFIG: any
  }
}

if (window.LOCAL_CONFIG.IS_OPEN_VCONSOLE) {
  new vconsole()
}

const app = createApp(App)
// 设置路由
app.use(router)
// 设置store
app.use(store)
// 设置vant
SetVantPlugins(app)
// 全局引用this
window.vm = app.mount('#app')
