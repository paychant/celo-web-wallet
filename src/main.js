import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './core/store/store';
import celoService from './core/service/celo.service';
import accountService from './core/service/account.service';

Vue.config.productionTip = false;

// Event
export const bus = new Vue();

// Initialize celo alfajores environment (https://alfajores-forno.celo-testnet.org | https://forno.celo.org)
celoService.init('https://alfajores-forno.celo-testnet.org');
accountService.init();

// Vue 3rd party plugins
import 'jquery';
import './core/plugins/vuetify';
import './core/plugins/vuelidate';
import './core/plugins/vue-clipboard2';
import './core/plugins/loading-overlay';
import i18n from "@/core/plugins/vue-i18n";


new Vue({
   i18n,
   store,
   router,
   render: h => h(App)
}).$mount('#app');
