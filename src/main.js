import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/styles.css'
import './styles/iconfont.css'
import 'lib-flexible'
import axios from 'axios'

import { PullRefresh, Tab, Tabs, Toast, Button, Dialog, Field, RadioGroup, Radio, Cell, CellGroup, Uploader, Pagination, List, Icon } from 'vant'
import HmInput from './components/HmInput.vue'
import HmNav from './components/HmNav'
import moment from 'moment'
import HmHeader from './components/HmHeader.vue'
import Hmcommonts from './components/Hmcommonts.vue'
Vue.use(Hmcommonts)
Vue.use(PullRefresh)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Pagination)
Vue.use(List)
Vue.use(Icon)
/* import HmBtn from './components/HmBtn.vue' */
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* Vue.component('HmBtn ', HmBtn) */
Vue.component('HmInput', HmInput)
Vue.component('HmNav', HmNav)
Vue.component('HmHeader', HmHeader)
axios.defaults.baseURL = 'http://localhost:3000'

Vue.filter('time', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

axios.interceptors.response.use(function (response) {
  /*  console.log(response) */
  if (response.data.message === '用户信息验证失败' && response.data.statusCode === 401) {
    router.push('/login')
    localStorage.removeItem('router')
    localStorage.removeItem('userId')
    Toast.fail('用户信息验证失败')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.request.use(function (config) {
  // config指的就是请求的配置参数
  // console.log('我拦截到了请求', config)
  // 通过config.headers来设置请求头

  // 如果有token，我们就给接口携带上token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
