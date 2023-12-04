import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/components/SearchBar.vue') },
  { path: '/search', component: () => import('@/components/MovieList.vue') },
  { path: '/movie/:id', name: 'movie-details', component: () => import('@/components/MovieDetails.vue') },
  { path: '/favorites', component: () => import('@/components/FavoriteMovies.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
