import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      name: 'login',
      component: () => import ('../views/Login')
  },
  {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import ('../views/dashboard'),
      meta:{title: '首页',icon: 'ios-home'},
      children: [
          {
              path: '/home',
              name: 'home',
              component:() => import('../views/home'),
              meta:{title: '主页', icon: 'ios-home'},
              children:[]
          },
          {
              path: '/about',
              name: 'about',
              component: () => import( '../views/about'),
              meta:{title: '关于页', icon: 'ios-navigate'},
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
