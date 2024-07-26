// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')



// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import pinia from '../store'; // Импортируем Pinia

const app = createApp(App);

app.use(pinia); // Подключаем Pinia

app.mount('#app');