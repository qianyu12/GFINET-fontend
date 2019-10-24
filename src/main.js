// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入vue框架
import Vue from 'vue'
// 引入根组件
import App from './App'
// 引入路由设置
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui'
// 主题文件
import 'element-ui/lib/theme-chalk/index.css'
// axios使用
import axios from 'axios'
import VueAxios from 'vue-axios'
// 使用Elemengt-ui
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
// 关闭生产模式下给出的提示
Vue.config.productionTip = true

//  拦截器
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (config.method === 'get' && config.url === 'http://47.100.138.62:8080/api/traderDeal') {
      console.log('config', config)
      console.log('token', window.localStorage.getItem('token'))
      if (window.localStorage.getItem('token') === null) {
        alert('会话过期，请重新登陆')
        router.replace({
          path: '/index'
        })
      }
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    console.log('response', response)
    // 对响应数据做点什么
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
