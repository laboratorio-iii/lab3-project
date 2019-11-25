import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import moment from 'moment'
// import VueSweetalert2 from 'vue-sweetalert2';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

// import { sync } from 'vuex-router-sync'

// sync(store, router)

moment.locale('es')
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('LL')
  }
});

Vue.filter('formatAgo', function(value) {
  if (value) {
    return moment(String(value)).fromNow()
  }
});

// Vue.use(VueSweetalert2)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
