import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuetify from './plugins/vuetify'

import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
