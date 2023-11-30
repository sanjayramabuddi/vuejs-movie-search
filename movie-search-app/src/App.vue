<template>
  <div id="app">
    <header>
      <!-- Navigation bar with favorites icon and badge -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <router-link to="/" class="navbar-brand mx-auto">Movie Search App</router-link>

          <!-- Favorites icon with badge -->
          <router-link to="/favorites" class="navbar-text d-flex align-items-center">
            <div class="position-relative">
              <i class="fas fa-heart mr-1" style="font-size: 1.5rem; color: #e44d26;"></i>
              <span class="badge bg-danger position-absolute top-0 start-100 translate-middle">{{ favoritesCount }}</span>
            </div>
          </router-link>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    favoritesCount() {
      return this.$store.state.favorites.length;
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #2c3e50;
}

/* Navigation bar styling */
.navbar {
  padding: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  /* White text for dark background */
}

/* Favorites icon styling */
.navbar-text i {
  transition: color 0.3s;
}

.navbar-text:hover i {
  color: #e44d26;
  /* Change color on hover */
}

/* Badge styling */
.badge {
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  line-height: 1;
  position: absolute;
  top: -10px;
  right: -10px;
  transform: translate(50%, 50%);
}
</style>
