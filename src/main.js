import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/global.css'; // Load CSS Native kita

const app = createApp(App);
app.use(router);
app.mount('#app');