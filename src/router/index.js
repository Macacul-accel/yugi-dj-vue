import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('../views/LoginView.vue'),
    },
    {
      path: '/features',
      name: 'features',
      component: () => import ('../views/FeaturesView.vue'),
    },
  ],
})

export default router
