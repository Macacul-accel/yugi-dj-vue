import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import { useAuthStore } from '../stores/auth'

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
      meta: { alreadyLogin: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('../views/LoginView.vue'),
      meta: { alreadyLogin: true },
    },
    {
      path: '/features',
      name: 'features',
      component: () => import ('../views/FeaturesView.vue'),
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import ('../views/CardsView.vue'),
    },
    {
      path: '/decks',
      name: 'decks',
      component: () => import ('../views/DecksView.vue'),
      meta: { requireLogin: true },
    },
    {
      path: '/decks/:deckName',
      name: 'My deck',
      component: () => import ('../views/BuildDeckView.vue'),
      meta: { requireLogin: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.alreadyLogin && authStore.isAuthenticated) {
    next('/')
  } else if (to.meta.requireLogin && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
