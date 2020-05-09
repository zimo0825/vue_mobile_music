import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import api from './api/index.js'

import './vant/vant.js'
import './assets/css/iconfont.css'
import './assets/css/reset.css'

// Vue.prototype.$api = api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
