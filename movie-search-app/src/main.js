import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';
import router from './router';  // Import the router
import store from './store';   // Import the store

const app = createApp(App);
app.use(router);  // Use the router
app.use(store);   // Use the store
app.mount('#app');
