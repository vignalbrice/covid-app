import Vue from "vue";
import App from "./App.vue";
import VueApexCharts from 'vue-apexcharts'
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
Vue.config.productionTip = false;

Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
