import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/details/goods.vue'
import seller from '../components/details/seller.vue'
import commet from '../components/details/commet.vue'
// @是webpack规定的 @代表src目录
// 后缀名写不写都可以
// 机制 如果没有后缀名的话 会自动去寻找Hello.vue  Hello.js


Vue.use(Router)
export default new Router({
  routes: [
    {path: '/', redirect: '/goods'},
    {path:'/goods',component: goods},
    {path:'/seller',component: seller},
    {path:'/commet',component: commet}
  ]
})
