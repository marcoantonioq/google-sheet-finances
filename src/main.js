import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
// import store from "./store";

import { Moment } from "./helpers/moment.js";

const app = createApp(App);

app.use(router);

app.mixin(Moment);

app.mount("#app");
