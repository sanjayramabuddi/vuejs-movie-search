<template>
  <div v-if="movieDetails" class="movie-details">
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
    };
  },
  computed: {
    truncatedPlot() {
      const plotWords = this.movieDetails.Plot.split(' ');
      const maxWords = this.showFullPlot ? plotWords.length : 20; // Adjust the number of words to show
      return plotWords.slice(0, maxWords).join(' ') + (plotWords.length > maxWords ? ' ...' : '');
    },
    showViewMoreButton() {
      return this.movieDetails.Plot.split(' ').length > 20; // Adjust the number of words to trigger the "View More" button
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
    // Fetch detailed information about the movie using the movie ID from the route params
    const movieId = this.$route.params.id;

    // API call to fetch movie details using the ID
    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=23e44f27`)
      .then(response => {
        // Update the movieDetails data property with the fetched data
        this.movieDetails = response.data;
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
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
</style>
