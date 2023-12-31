import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

import BluePlanet from "@/views/BluePlanet.vue";
import GenshinDice from "@/views/GenshinDice.vue";

import Playground from "@/views/Playground.vue";

import Basic from "@/views/Basic.vue";
import AssetManage from "@/views/AssetManage.vue";
import Image from "@/views/Image.vue";
import ScreenQuad from "@/views/ScreenQuad.vue";
import RayMarching from "@/views/RayMarching.vue";
import Particle from "@/views/Particle.vue";
import CustomMesh from "@/views/CustomMesh.vue";
import HtmlWebGL from "@/views/HtmlWebGL.vue";

import Physics from "@/views/Physics.vue";

import PanoramaImage from "@/views/PanoramaImage.vue";
import PanoramaCube from "@/views/PanoramaCube.vue";
import PanoramaMultiple from "@/views/PanoramaMultiple.vue";
import PanoramaInfospot from "@/views/PanoramaInfospot.vue";
import PanoramaMultipleSpot from "@/views/PanoramaMultipleSpot.vue";
import FromConfig from "@/views/FromConfig.vue";
import House from "@/views/House.vue";

import SmashHit1 from "@/views/SmashHit1.vue";
import SmashHit2 from "@/views/SmashHit2.vue";
import SmashHit3 from "@/views/SmashHit3.vue";
import SmashHit4 from "@/views/SmashHit4.vue";
import SmashHit5 from "@/views/SmashHit5.vue";

import RayMarchingBasic from "@/views/RayMarchingBasic.vue";
import RayMarchingPrimitive from "@/views/RayMarchingPrimitive.vue";
import RayMarchingBoolean from "@/views/RayMarchingBoolean.vue";
import RaymarchingCubemap from "@/views/RaymarchingCubemap.vue";
import RayMarchingShadowbox from "@/views/RayMarchingShadowbox.vue";
import RayMarchingSdfVolume from "@/views/RayMarchingSdfVolume.vue";
import RayMarchingSdfVolumeCompare from "@/views/RayMarchingSdfVolumeCompare.vue";
import RayMarchingPrimitives from "@/views/RayMarchingPrimitives.vue";

import RayMarchingJsBasic from "@/views/RayMarchingJsBasic.vue";
import RayMarchingJsPrimitive from "@/views/RayMarchingJsPrimitive.vue";
import RayMarchingJsBoolean from "@/views/RayMarchingJsBoolean.vue";
import RayMarchingJsBezier from "@/views/RayMarchingJsBezier.vue";
import RayMarchingJsUberprim from "@/views/RayMarchingJsUberprim.vue";
import RayMarchingJsMagicaCSG from "@/views/RayMarchingJsMagicaCSG.vue";
import RayMarchingJsPolygon from "@/views/RayMarchingJsPolygon.vue";
import RayMarchingJsTriangle from "@/views/RayMarchingJsTriangle.vue";
import RayMarchingJsGyroid from "@/views/RayMarchingJsGyroid.vue";
import CSG from "@/views/CSG.vue";
import PokeBall from "@/views/PokeBall.vue";
import MultiGyroid from "@/views/MultiGyroid.vue";

import ShaderToyScene from "@/views/ShaderToyScene.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/blue-planet",
      name: "BluePlanet",
      component: BluePlanet,
    },
    {
      path: "/genshin-dice",
      name: "GenshinDice",
      component: GenshinDice,
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
      path: "/physics",
      name: "Physics",
      component: Physics,
    },
    {
      path: "/ray-marching",
      name: "RayMarching",
      component: RayMarching,
    },
    {
      path: "/particle",
      name: "Particle",
      component: Particle,
    },
    {
      path: "/custom-mesh",
      name: "CustomMesh",
      component: CustomMesh,
    },
    {
      path: "/html-webgl",
      name: "HTMLWebGL",
      component: HtmlWebGL,
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
      path: "/house",
      name: "House",
      component: House,
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
    {
      path: "/ray-marching/basic",
      name: "RayMarchingBasic",
      component: RayMarchingBasic,
    },
    {
      path: "/ray-marching/primitive",
      name: "RayMarchingPrimitive",
      component: RayMarchingPrimitive,
    },
    {
      path: "/ray-marching/boolean",
      name: "RayMarchingBoolean",
      component: RayMarchingBoolean,
    },
    {
      path: "/ray-marching/cubemap",
      name: "RayMarchingCubemap",
      component: RaymarchingCubemap,
    },
    {
      path: "/ray-marching/shadowbox",
      name: "RayMarchingShadowbox",
      component: RayMarchingShadowbox,
    },
    {
      path: "/ray-marching/sdf-volume",
      name: "RayMarchingSdfVolume",
      component: RayMarchingSdfVolume,
    },
    {
      path: "/ray-marching/sdf-volume-compare",
      name: "RayMarchingSdfVolumeCompare",
      component: RayMarchingSdfVolumeCompare,
    },
    {
      path: "/ray-marching/primitives",
      name: "RayMarchingPrimitives",
      component: RayMarchingPrimitives,
    },
    {
      path: "/ray-marching/js/basic",
      name: "RayMarchingJsBasic",
      component: RayMarchingJsBasic,
    },
    {
      path: "/ray-marching/js/primitive",
      name: "RayMarchingJsPrimitive",
      component: RayMarchingJsPrimitive,
    },
    {
      path: "/ray-marching/js/boolean",
      name: "RayMarchingJsBoolean",
      component: RayMarchingJsBoolean,
    },
    {
      path: "/ray-marching/js/bezier",
      name: "RayMarchingJsBezier",
      component: RayMarchingJsBezier,
    },
    {
      path: "/ray-marching/js/uberprim",
      name: "RayMarchingJsUberprim",
      component: RayMarchingJsUberprim,
    },
    {
      path: "/ray-marching/js/magicaCSG",
      name: "RayMarchingJsMagicaCSG",
      component: RayMarchingJsMagicaCSG,
    },
    {
      path: "/ray-marching/js/polygon",
      name: "RayMarchingJsPolygon",
      component: RayMarchingJsPolygon,
    },
    {
      path: "/ray-marching/js/triangle",
      name: "RayMarchingJsTriangle",
      component: RayMarchingJsTriangle,
    },
    {
      path: "/ray-marching/js/gyroid",
      name: "RayMarchingJsGyroid",
      component: RayMarchingJsGyroid,
    },
    {
      path: "/csg",
      name: "CSG",
      component: CSG,
    },
    {
      path: "/poke-ball",
      name: "PokeBall",
      component: PokeBall,
    },
    {
      path: "/multi-gyroid",
      name: "MultiGyroid",
      component: MultiGyroid,
    },
    {
      path: "/shader-toy-scene",
      name: "ShaderToyScene",
      component: ShaderToyScene,
    },
  ],
});

export default router;
