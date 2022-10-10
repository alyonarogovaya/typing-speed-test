import { createApp } from 'vue';
import App from './App.vue';

require('vue-ionicons/ionicons.css');

import BaseSpinner from './components/BaseSpinner.vue';

const app = createApp(App);
app.component('base-spinner', BaseSpinner);
app.mount('#app');
