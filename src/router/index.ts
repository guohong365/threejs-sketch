import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Template from "../views/Template.vue";
import Image from "../views/Image.vue";
import Component from "../views/Component.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/template",
      name: "Template",
      component: Template,
    },
    {
      path: "/component",
      name: "Component",
      component: Component,
    },
    {
      path: "/image",
      name: "Image",
      component: Image,
    },
  ],
});

export default router;
