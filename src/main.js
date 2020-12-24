import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import User from './components/User'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(ElementUI)
let router = new VueRouter({
    routes: [
        {path: '/user', component: User}
    ]
})
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
