import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      name: 'dashboard',
      component: () => import ('../views/dashboard'),
      children: [
          {
              path: '/home',
              name: 'home',
              component: Home
          },
          {
              path: '/about',
              name: 'about',
              component: () => import( '../views/About.vue')
          }
      ],
      directive: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
