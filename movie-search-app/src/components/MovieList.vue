<template>
  <div>
    <h1>Search Results</h1>
    <div v-if="searchResults.length === 0" class="alert alert-info">No results found</div>
    <div v-else>
      <div class="card-deck">
        <transition-group name="fade" tag="div" class="row">
          <div v-for="movie in searchResults" :key="movie.imdbID" class="col-md-4 mb-4">
            <div class="card movie-card">
              <img :src="movie.Poster || defaultPosterUrl" :alt="`Poster for ${movie.Title}`"
                class="card-img-top movie-img" @click="viewMovieDetails(movie.imdbID)" />
              <div class="card-body">
                <h5 class="card-title">{{ movie.Title }}</h5>
                <p class="card-text">{{ movie.Year }}</p>
                <button v-if="!isInFavorites(movie)" @click="addToFavorites(movie)" class="btn btn-primary btn-sm">
                  Add to Favorites
                </button>
                <p v-else class="text-success small">Added to Favorites</p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultPosterUrl: 'https://via.placeholder.com/200x300',
    };
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults;
    },
    favorites() {
      return this.$store.getters.getFavorites;
    },
  },
  methods: {
    addToFavorites(movie) {
      this.$store.commit('addToFavorites', movie);
    },
    viewMovieDetails(movieId) {
      this.$router.push({ name: 'movie-details', params: { id: movieId } });
    },
    isInFavorites(movie) {
      return this.favorites.some(fav => fav.imdbID === movie.imdbID);
    },
  },
};
</script>

<style scoped>
/* Add styling for movie cards */
.card {
  width: 250px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #dc3545;
  border-radius: 8px;
  text-align: center;
  background-color: #f8d7da;
  transition: transform 0.3s ease-in-out;
  justify-content: space-evenly;
}

.card-deck {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover {
  transform: scale(1.05);
}

.movie-img {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.movie-card {
  background-color: #fff;
  /* Card background color */
  overflow: hidden;
  /* Hide overflow content */
}

.card-body {
  padding: 1rem;
  /* Adjust padding as needed */
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  /* Button primary color */
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  /* Darker color on hover */
  border-color: #0056b3;
}

.text-success {
  color: #28a745;
  /* Text color for success */
}

.small {
  font-size: 0.8rem;
}

.alert-info {
  background-color: #d1ecf1;
  /* Alert info background color */
  border-color: #bee5eb;
  color: #0c5460;
}
</style>
