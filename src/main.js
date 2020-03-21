import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/store.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import '@/utils/filter.js'
import {getRequest, postRequest} from "@/utils/http";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(getRequest)
Vue.use(postRequest)
// Vue.prototype.$axios = axios;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
