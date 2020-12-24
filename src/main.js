import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import User from './components/User'
import Summary from './components/Summary'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
let router = new VueRouter({
    routes: [
        {
            path: '/user', component: User,
        }, {
            path: '/summary', component: Summary
        }
    ]
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)

}
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
