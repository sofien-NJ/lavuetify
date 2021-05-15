

require('./bootstrap');

window.Vue = require('vue');
import vueRouter from 'vue-router';
import Vuetify from "../plugin/vuetify"
Vue.use(vueRouter);


Vue.component('app-container', require('./components/appContainer.vue').default);
Vue.component('add-task', require('./components/AddTaskComponent.vue').default);


const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/task',
        component: Task,
    }
];
const router = new vueRouter({routes});


const app = new Vue({
    vuetify: Vuetify,
    el: '#app',
    router: router
});
