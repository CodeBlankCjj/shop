import Vue from 'vue'
import VueRouter from 'vue-router'

const home = () => import('../views/Home/Home.vue')
const categary = () => import('../views/Category/Category.vue')
const cart = () => import('../views/Cart/Cart.vue')
const profile = () => import('../views/Profile/Profile.vue')
const detail = () => import('../views/Detail/Detail.vue')

Vue.use (VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/categary',
    component: categary
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/detail/:iid',
    component: detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router