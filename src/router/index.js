import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/goods'
  },
  {
    path: '/goods',
    name: 'EleGoods',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EleGoods/EleGoods')
  },
  {
    path: '/ratings',
    name:'EleRatings',
    component:() => import('../views/EleRatings/EleRatings')
  },
  {
    path: '/seller',
    name:'EleSeller',
    component:() => import('../views/EleSeller/EleSeller')
  }
]

const router = new VueRouter({
  routes
})

export default router
