// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueI18n from 'vue-i18n'
import messages from './locale'
import sView from './components/sview'
import Axios from "axios"

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: navigator.language || 'zh-CN',  // set locale
  messages  // set locale messages
});

//Vue.use(ElementUI);
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})


Vue.use(sView)

Vue.locale = () => {
};
Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Axios.defaults.baseURL = '/api';
//Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n: i18n,
  components: { App },
  template: '<App/>'
})
