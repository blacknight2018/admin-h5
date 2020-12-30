import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import User from './components/User'
import Summary from './components/Summary'
import Goods from './components/Goods'
import SubGoods from './components/SubGoods'
import VueResource from 'vue-resource'
import Order from './components/Order'
import Banner from './components/Banner'
import JsonViewer from 'vue-json-viewer'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(JsonViewer)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.prototype.server = "http://127.0.0.1:45678"
Vue.prototype.upload_server = "http://m.bybyte.cn:1234"
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
        }, {
            path: '/order', component: Order
        }, {
            path: '/banner', component: Banner
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
