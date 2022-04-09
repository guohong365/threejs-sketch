import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Playground from "../views/Playground.vue";

import Basic from "../views/Basic.vue";
import AssetManage from "../views/AssetManage.vue";
import Image from "../views/Image.vue";
import ScreenQuad from "../views/ScreenQuad.vue";
import RayMarching from "../views/RayMarching.vue";

import Physics from "../views/Physics.vue";

import PanoramaImage from "../views/PanoramaImage.vue";
import PanoramaCube from "../views/PanoramaCube.vue";
import PanoramaMultiple from "../views/PanoramaMultiple.vue";
import PanoramaInfospot from "../views/PanoramaInfospot.vue";
import PanoramaMultipleSpot from "../views/PanoramaMultipleSpot.vue";
import FromConfig from "../views/FromConfig.vue";

import SphereWordCloud from "../views/SphereWordCloud.vue";

import SmashHit1 from "../views/SmashHit1.vue";
import SmashHit2 from "../views/SmashHit2.vue";
import SmashHit3 from "../views/SmashHit3.vue";
import SmashHit4 from "../views/SmashHit4.vue";
import SmashHit5 from "../views/SmashHit5.vue";

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
      path: "/asset-manage",
      name: "AssetManage",
      component: AssetManage,
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
      path: "/physics",
      name: "Physics",
      component: Physics,
    },
    {
      path: "/panorama-image",
      name: "PanoramaImage",
      component: PanoramaImage,
    },
    {
      path: "/panorama-cube",
      name: "PanoramaCube",
      component: PanoramaCube,
    },
    {
      path: "/panorama-multiple",
      name: "PanoramaMultiple",
      component: PanoramaMultiple,
    },
    {
      path: "/panorama-info-spot",
      name: "PanoramaInfospot",
      component: PanoramaInfospot,
    },
    {
      path: "/panorama-multiple-spot",
      name: "PanoramaMultipleSpot",
      component: PanoramaMultipleSpot,
    },
    {
      path: "/from-config",
      name: "FromConfig",
      component: FromConfig,
    },
    {
      path: "/sphere-word-cloud",
      name: "SphereWordCloud",
      component: SphereWordCloud,
    },
    {
      path: "/smash-hit/1",
      name: "SmashHit1",
      component: SmashHit1,
    },
    {
      path: "/smash-hit/2",
      name: "SmashHit2",
      component: SmashHit2,
    },
    {
      path: "/smash-hit/3",
      name: "SmashHit3",
      component: SmashHit3,
    },
    {
      path: "/smash-hit/4",
      name: "SmashHit4",
      component: SmashHit4,
    },
    {
      path: "/smash-hit/5",
      name: "SmashHit5",
      component: SmashHit5,
    },
  ],
});

export default router;
