import { createApp } from "vue";
import App from "./App.vue";

import BaseSpinner from "./components/BaseSpinner.vue";

const app = createApp(App);
app.component("base-spinner", BaseSpinner);
app.mount("#app");
