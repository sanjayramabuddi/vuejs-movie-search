import { createStore } from 'vuex';

const store = createStore({
  state: {
    // Initial state of the store
    searchResults: [],
    favorites: [],
  },
  mutations: {
    setSearchResults(state, results) {
      // Only update searchResults if results are provided
      if (results) {
        state.searchResults = results;
      }
    },
    addToFavorites(state, movie) {
      state.favorites.push(movie);
    },
    removeFromFavorites(state, movie) {
      state.favorites = state.favorites.filter((m) => m.imdbID !== movie.imdbID);
    }
  },
  actions: {
    async searchMovies({ commit, state }, query) {
      // Only fetch new results if query is provided
      if (query) {
        try {
          const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=23e44f27`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            const data = await response.json();
            commit('setSearchResults', data.Search || []);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        // If no query is provided, commit existing searchResults
        commit('setSearchResults', state.searchResults);
      }
    },
  },
  getters: {
    getFavorites: (state) => state.favorites,
  },
});

export default store;
