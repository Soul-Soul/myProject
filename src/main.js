import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'

// 引入 ViewUI 框架
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI)

// 引入Echart
import Echarts from 'echarts'; // 引入echarts
Vue.prototype.$echarts = Echarts;//把echarts绑定在vue的原型上 这样在组件里面就可以通过this.$echarts来访问了

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
