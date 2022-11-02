import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import esmodule from 'vite-plugin-esmodule'
// https://vitejs.dev/config/
export default defineConfig({
plugins: [vue()
, esmodule([
'vue-instantsearch/vue3/es/',
{'file-type': 'vue-instantsearch/vue3/es/index.js'}
])
],
// ssgOptions: {
// format: 'cjs'
// }
});
