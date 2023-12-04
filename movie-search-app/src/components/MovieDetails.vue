<template>
  <div v-if="loading" class="loading">Loading...</div>
  <div v-else-if="movieDetails" class="movie-details">
    <div class="card">
      <img :src="movieDetails.Poster" alt="Movie Poster" class="card-img-top img-fluid" />
      <div class="card-body">
        <h2 class="card-title">{{ movieDetails.Title }}</h2>
        <p class="card-text">{{ truncatedPlot }}</p>
        <p class="card-text"><strong>Genre:</strong> {{ movieDetails.Genre }}</p>
        <p class="card-text"><strong>Cast:</strong> {{ movieDetails.Actors }}</p>
        <button @click="addToFavorites" class="btn btn-success">Add to Favorites</button>
        <button v-if="showViewMoreButton" @click="toggleViewMore" class="btn btn-link">{{ showFullPlot ? 'View Less' :
          'View More' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movieDetails: null,
      showFullPlot: false,
      loading: false,
    };
  },
  computed: {
    truncatedPlot() {
      const plotWords = this.movieDetails.Plot.split(' ');
      const maxWords = this.showFullPlot ? plotWords.length : 20;
      return plotWords.slice(0, maxWords).join(' ') + (plotWords.length > maxWords ? ' ...' : '');
    },
    showViewMoreButton() {
      return this.movieDetails.Plot.split(' ').length > 20;
    },
  },
  methods: {
    addToFavorites() {
      this.$store.commit('addToFavorites', this.movieDetails);
    },
    toggleViewMore() {
      this.showFullPlot = !this.showFullPlot;
    },
  },
  mounted() {
    this.loading = true;
    const movieId = this.$route.params.id;
    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=23e44f27`)
      .then(response => {
        this.movieDetails = response.data;
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.movie-details {
  text-align: center;
  margin: 20px;
}

.card {
  max-width: 300px;
  margin: 0 auto;
  border: 1px solid #dc3545;
  border-radius: 8px;
  background-color: #f8d7da;
  color: #343a40;
}

.card-img-top {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.card-body {
  padding: 1rem;
}

.btn-success {
  background-color: #28a745;
  border-color: #218838;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-link {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}

.loading {
  color: #fff;
}
</style>
