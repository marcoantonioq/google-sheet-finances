import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Entrada from "../views/Entrada.vue";
import Saida from "../views/Saida.vue";
import Transferir from "../views/Transferir.vue";
import Cheque from "../views/Cheque.vue";

import Form from "../components/Form.vue";

const routes = [
  {
    path: "",
    name: "Home",
    component: Home,
  },
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
    children: [
      {
        name: "form",
        path: "/form",
        component: Form,
      },
    ],
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
