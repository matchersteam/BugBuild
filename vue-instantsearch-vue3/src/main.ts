import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');

// import { ViteSSG } from 'vite-ssg'
// import App from './App.vue';

// export const createApp = ViteSSG(App, {}, ({ app }) => {});