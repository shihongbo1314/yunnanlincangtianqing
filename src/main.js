import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Icon from 'vue-svg-icon/Icon.vue'
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);
Vue.component('icon', Icon)
Vue.config.productionTip = false // 以阻止 vue 在启动时生成生产提示。

import store from './vuex/index'

// 引入echarts
import * as Echarts from 'echarts';
Vue.prototype.$echarts = Echarts

// md5密码加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
import 'leaflet-velocity/dist/leaflet-velocity.css'
import 'leaflet-velocity/dist/leaflet-velocity'


router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('lcqxfzjz'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
document.title = "临沧气象业务服务天擎应用平台"