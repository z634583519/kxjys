// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import i18n from './lang' // Internationalization
/* import '@/element-ui/index.js' */
import './router/router-hooks'
/* import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant) */
import './vant/index.js'
import '../static/font_mxhgcpjpmcq/iconfont.css'
/* 复制插件 */
import clipboard from 'clipboard'
Vue.config.productionTip = false
Vue.prototype.clipboard = clipboard
/* 保留两位小数 */
Vue.prototype.$cut = function (num) {
  if (num === 0 || num === '0' || num === '') {
    return 0
  }
  if (!num) {
    return '- -'
  }
  if (num === '- -') {
    return num
  }
  var arr = num.toString().split('.')
  var t1 = arr[0].toString().split('')
  var t2
  if (arr[1]) {
    t2 = arr[1].toString()
  } else {
    t2 = '00'
  }
  // eslint-disable-next-line one-var
  var result = [], counter = 0
  for (var i = t1.length - 1; i >= 0; i--) {
    counter++
    result.unshift(t1[i])
    if ((counter % 3) === 0 && i !== 0) {
      result.unshift(',')
    }
  }
  var t3 = result.join('')
  var t4 = t3 + '.' + t2
  return t4
}
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    eventHub: new Vue()
  }
})
/* 时间格式化 */
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}
