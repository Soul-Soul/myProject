import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      name: '登录',
      component: () => import ('../views/Login')
  },
  {
      path: '/dashboard',
      name: '首页',
      component: () => import ('../views/dashboard'),
      children: [
          {
              path: '/home',
              name: 'home',
              component:() => import('../views/home')
          },
          {
              path: '/about',
              name: 'about',
              component: () => import( '../views/about')
          }
      ],
      directive: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
