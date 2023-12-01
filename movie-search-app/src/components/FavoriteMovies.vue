<template>
  <div class="favorites-container">
    <h2 class="favorites-heading">Favorites</h2>
    <div class="favorites-cards">
      <div v-for="movie in favorites" :key="movie.imdbID" class="favorite-card">
        <img :src="movie.Poster" :alt="`Poster for ${movie.Title}`" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ movie.Title }}</h5>
          <p class="card-text">{{ movie.Year }}</p>
          <button @click="removeFromFavorites(movie)" class="btn btn-danger">Remove from Favorites</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    favorites() {
      return this.$store.getters.getFavorites;
    },
  },
  methods: {
    removeFromFavorites(movie) {
      this.$store.commit('removeFromFavorites', movie);
    },
  },
};
</script>

<style>
.favorites-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorites-heading {
  margin: 20px 0;
  color: white;
}

.favorites-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.favorite-card {
  width: 250px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #dc3545;
  border-radius: 8px;
  text-align: center;
  background-color: #f8d7da;
  transition: transform 0.3s ease-in-out;
}

.favorite-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.favorite-card img {
  max-width: 100%;
  border-radius: 6px;
  margin-bottom: 10px;
}

.favorite-card .card-title {
  font-size: 1.2rem;
  margin-bottom: 5px;
}

.favorite-card .btn {
  font-size: 0.9rem;
  width: 100%;
}

@media screen and (max-width: 576px) {
  .favorite-card {
    width: 100%;
  }
}
</style>
