import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue')
      },
      {
        path: '/interview',
        name: 'interview',
        component: () => import('@/views/InterviewView.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 1. 如果是登录页，直接放行
  if (to.name === 'login') return next()
  // 2. 从vuex中获取token
  const token = store.state.user.token
  // 3. 如果没有token，强制跳转到登录页
  if (!token) return next({ name: 'login' })
  // 4. 如果有token，放行
  next()
})


export default router
