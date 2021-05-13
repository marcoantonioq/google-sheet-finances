import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import mitt from "mitt";

import { Moment } from "./helpers/moment.js";
import { Materialize } from "./helpers/materialize.js";

const app = createApp(App);

app.use(router);

const emitter = mitt();
app.config.globalProperties.emitter = emitter;

app.mixin(Moment).mixin(Materialize);

app.mount("#app");
