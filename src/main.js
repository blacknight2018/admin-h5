import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import User from './components/User'
import Summary from './components/Summary'
import Goods from './components/Goods'
import SubGoods from './components/SubGoods'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.prototype.server = "http://127.0.0.1:45678"
console.log(Vue.prototype)
let router = new VueRouter({
    routes: [
        {
            path: '/user', component: User,
        }, {
            path: '/summary', component: Summary
        }, {
            path: '/goods', component: Goods
        }, {
            path: '/subGoods', component: SubGoods
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
