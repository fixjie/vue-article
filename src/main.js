import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import './assets/css/global.css'
// 引入axios配置
import './utils/request'
// import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.prototype.axios = axios
// axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/244346'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
