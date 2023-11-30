<template>
  <div>
    <div class="search-bar">
      <input v-model="searchQuery" class="form-control" placeholder="Enter movie name" />
      <button @click="handleSearch" class="btn btn-primary-dark">Search</button>
    </div>
    <div class="movie-list">
      <component :is="showMovieList ? 'MovieList' : 'div'"></component>
    </div>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue';

export default {
  data() {
    return {
      searchQuery: '',
      showMovieList: false,
    };
  },
  methods: {
    handleSearch() {
      this.$store.dispatch('searchMovies', this.searchQuery);
      this.showMovieList = true;
    },
  },
  components: {
    MovieList,
  },
};
</script>

<style scoped>
/* Search bar styles */
.search-bar {
  margin: 20px;
  display: flex;
  justify-content: center;
  /* Center items horizontally */
  align-items: center;
}

/* Input styles */
.form-control {
  width: 50%;
  /* Adjust the width as needed */
  margin-right: 10px;
  border-radius: 5px;
}

/* Button styles */
.btn-primary-dark {
  background-color: #265481;
  /* Dark background color */
  border-color: #343a40;
  /* Matching border color */
  color: #ffffff;
  /* White text color */
  border-radius: 5px;
}

.btn-primary-dark:hover {
  background-color: #555d66;
  /* Darker color on hover */
  border-color: #555d66;
}

/* Responsive styles (example) */
@media screen and (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .form-control {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
