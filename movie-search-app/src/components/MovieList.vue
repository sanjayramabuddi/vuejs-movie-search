<template>
  <div>
    <h2>Search Results</h2>
    <div v-if="searchResults.length === 0" class="alert">No results found</div>
    <div v-else>
      <div class="card-deck">
        <div v-for="movie in paginatedResults" :key="movie.imdbID" class="col-md-4 mb-4">
          <div class="card movie-card">
            <img :src="movie.Poster || defaultPosterUrl" :alt="`Poster for ${movie.Title}`" class="card-img-top movie-img"
              @click="viewMovieDetails(movie.imdbID)" />
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
      </div>
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultPosterUrl: 'https://via.placeholder.com/200x300',
      currentPage: 1,
      itemsPerPage: 9,
    };
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResults;
    },
    favorites() {
      return this.$store.getters.getFavorites;
    },
    paginatedResults() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.searchResults.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.searchResults.length / this.itemsPerPage);
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
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
};
</script>

<style scoped>
.card {
  width: 300px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #dc3545;
  border-radius: 8px;
  text-align: center;
  background-color: #f8d7da;
  transition: transform 0.3s ease-in-out;
}

.card-deck {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20px;
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
  overflow: hidden;
}

.card-body {
  padding: 1rem;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.text-success {
  color: #28a745;
}

.small {
  font-size: 0.8rem;
}

.alert {
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  margin: 0 auto;
}

h2 {
  color: #fff;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: #fff;
}

.pagination-btn {
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
}

.pagination-btn:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>