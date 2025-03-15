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
      meta: { title: 'Yugi-django'},
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { 
        alreadyLogin: true,
        title: 'Inscription | Yugi-django',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('../views/LoginView.vue'),
      meta: { 
        alreadyLogin: true,
        title: 'Connexion | Yugi-django',
      },
    },
    {
      path: '/features',
      name: 'features',
      component: () => import ('../views/FeaturesView.vue'),
      meta: { title: 'Fonctionnalités | Yugi-django'},
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import ('../views/CardsView.vue'),
      meta: { title: 'Liste des cartes | Yugi-django'},
    },
    {
      path: '/decks',
      name: 'decks',
      component: () => import ('../views/DecksView.vue'),
      meta: { 
        requireLogin: true,
        title: 'Mes decks | Yugi-django',
      },
    },
    {
      path: '/decks/:deckName',
      name: 'My deck',
      component: () => import ('../views/BuildDeckView.vue'),
      meta: { 
        requireLogin: true,
        title: 'Mon deck | Yugi-django',
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  document.title = to.meta.title || 'Yugi-django'

  if (to.meta.alreadyLogin && authStore.isAuthenticated) {
    next('/')
  } else if (to.meta.requireLogin && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
