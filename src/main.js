import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";

import { Materialize } from "./helpers/materialize.js";

const app = createApp(App);

app.use(router);

app.mixin(Materialize);

app.mount("#app");
