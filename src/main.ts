import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@alphardex/aqua.css/dist/aqua.min.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
