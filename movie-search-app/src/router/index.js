import { createRouter, createWebHistory } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import MovieList from '@/components/MovieList.vue';
import MovieDetails from '@/components/MovieDetails.vue';
import FavoriteMovies from '@/components/FavoriteMovies.vue';

const routes = [
  { path: '/', component: SearchBar },
  { path: '/search', component: MovieList },
  { path: '/movie/:id', name: 'movie-details', component: MovieDetails },
  { path: '/favorites', component: FavoriteMovies },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
