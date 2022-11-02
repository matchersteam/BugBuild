import { createApp } from 'vue';
import InstantSearch from 'vue-instantsearch/vue3/es/index.js';
import App from './App.vue';

const app = createApp(App);
app.use(InstantSearch);
app.mount('#app');
// import { ViteSSG } from 'vite-ssg'
// import App from './App.vue';

// export const createApp = ViteSSG(App, {InstantSearch}, ({ app }) => {});