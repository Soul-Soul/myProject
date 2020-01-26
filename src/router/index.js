import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from '../views/dashboard'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: dashboard,
        children:[
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/dashboard/Home.vue')
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('../views/dashboard/About.vue')
            }
        ]
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
