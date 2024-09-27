import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'about',
      component: () => import('../pages/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login/LoginView.vue')
    }
  ]
})

export default router
