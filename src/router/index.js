import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PastaDetailView from '@/views/PastaDetailView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const router = createRouter({
  // createWebHashHistory : URLs en #/... — fonctionne sans config serveur
  // createWebHistory : URLs propres — nécessite config serveur (production)
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/film/:id',
      name: 'film-detail',
      component: PastaDetailView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    }
  ]
})

export default router