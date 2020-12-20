import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible';
import './common/less/index.less'
import './common/font/iconfont.css'
import './common/css/reset.css'
import router from './router'
import store from './store'
import format from './filtes/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  filters:{
    format
  },
  render: h => h(App)
}).$mount('#app')
