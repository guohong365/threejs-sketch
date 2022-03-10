import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Playground from "../views/Playground.vue";
import Basic from "../views/Basic.vue";
import Image from "../views/Image.vue";
import ScreenQuad from "../views/ScreenQuad.vue";
import RayMarching from "../views/RayMarching.vue";
import AssetManage from "../views/AssetManage.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/playground",
      name: "Playground",
      component: Playground,
    },
    {
      path: "/basic",
      name: "Basic",
      component: Basic,
    },
    {
      path: "/image",
      name: "Image",
      component: Image,
    },
    {
      path: "/screen-quad",
      name: "ScreenQuad",
      component: ScreenQuad,
    },
    {
      path: "/ray-marching",
      name: "RayMarching",
      component: RayMarching,
    },
    {
      path: "/asset-manage",
      name: "AssetManage",
      component: AssetManage,
    },
  ],
});

export default router;
