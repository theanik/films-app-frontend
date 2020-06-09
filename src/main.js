// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import VueAxios from 'vue-axios'
import store from "./store";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import VueProgressBar from 'vue-progressbar'
// css, scss
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Loading from 'vue-loading-overlay';
    // Import stylesheet
  import 'vue-loading-overlay/dist/vue-loading.css';
  // Init plugin
  Vue.use(Loading);

Vue.use(VueAxios, axios)

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '4px'
})

Vue.config.productionTip = false

Vue.prototype.$baseUrl = 'http://localhost:8000'
Vue.prototype.$baseApiUrl = 'http://localhost:8000/api/v1'

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token
}

var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};
Vue.filter('truncate', filter);
Vue.filter('mydate',function(createAt){
  return moment(createAt).format('MMMM Do YYYY');
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App,PulseLoader },
  template: '<App/>'
})
