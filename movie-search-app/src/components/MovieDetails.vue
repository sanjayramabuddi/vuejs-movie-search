<template>
  <div v-if="movieDetails" class="movie-details">
    <h2>{{ movieDetails.Title }}</h2>
    <img :src="movieDetails.Poster" alt="Movie Poster" class="img-fluid" />
    <p>{{ movieDetails.Plot }}</p>
    <p><strong>Genre:</strong> {{ movieDetails.Genre }}</p>
    <p><strong>Cast:</strong> {{ movieDetails.Actors }}</p>
    <button @click="addToFavorites" class="btn btn-success">Add to Favorites</button>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      movieDetails: null,
    };
  },
  methods: {
    addToFavorites() {
      this.$store.commit('addToFavorites', this.movieDetails);
    },
  },
  mounted() {
    // Fetch detailed information about the movie using the movie ID from the route params
    const movieId = this.$route.params.id;

    // Make an API call to fetch movie details using the ID
    axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=23e44f27`)
      .then(response => {
        // Update the movieDetails data property with the fetched data
        this.movieDetails = response.data;
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        // Handle error gracefully
      });
  },
};
</script>
  
<style scoped>
/* Add your styles here if needed */
.movie-details {
  text-align: center;
  margin: 20px;
}

.movie-details img {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
}

.movie-details button {
  margin-top: 10px;
}

h2, p{
  color: white;
}
</style>