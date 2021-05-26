import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Entrada from "../views/Entrada.vue";
import Saida from "../views/Saida.vue";
import Transferir from "../views/Transferir.vue";
import Cheque from "../views/Cheque.vue";
import save from "../components/Values/save.vue";
import view from "../components/Values/view.vue";
// import show from "../components/Values/show.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/entrada",
    name: "Entrada",
    component: Entrada,
  },
  {
    path: "/saida",
    component: Saida,
    name: "Saída",
  },
  {
    path: "/create/:es_pass",
    component: save,
    name: "Create",
    props: true,
  },
  {
    path: "/update/:id_pass",
    component: save,
    name: "Update",
    props: true,
  },
  {
    path: "/view/:id_pass",
    component: view,
    name: "View",
    props: true,
  },
  {
    path: "/transferir",
    name: "Transferir",
    component: Transferir,
  },
  {
    path: "/cheque",
    name: "Cheque",
    component: Cheque,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-route",
  linkExactActiveClass: "active-route-exact",
});

export default router;
