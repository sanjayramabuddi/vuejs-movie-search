import { createStore } from 'vuex';

const store = createStore({
  state: {
    searchResults: [],
    favorites: [],
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results;
    },
    addToFavorites(state, movie) {
      console.log(movie)
      state.favorites.push(movie);
    },
    removeFromFavorites(state, movie) {
      state.favorites = state.favorites.filter((m) => m.imdbID !== movie.imdbID);
    }
  },
  actions: {
    async searchMovies({ commit }, query) {
      try {
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=23e44f27`);
        const data = await response.json();
        // console.log(data);
        commit('setSearchResults', data.Search || []);
        console.log(this.state.searchResults)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  getters: {
    getFavorites: (state) => state.favorites,
  },
});

export default store;