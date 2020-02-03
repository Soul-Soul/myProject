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
              name: '主页',
              component:() => import('../views/home'),
              children:[]
          },
          {
              path: '/about',
              name: '关于页',
              component: () => import( '../views/about'),
              children:[]
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
