<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="p-4 space-y-4">
    <section>
      <h3>Playground</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'Playground' }">Playground</router-link>
        </li>
      </ul>
    </section>
    <section>
      <h3>kokomi.js</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'Basic' }">Basic Scene</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AssetManage' }">Asset Manage</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Image' }">WebGL Image</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ScreenQuad' }">Full Screen</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Physics' }">Physics</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'RayMarching' }"> RayMarching </router-link>
        </li>
      </ul>
    </section>
    <section>
      <h3>Panorama</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'PanoramaImage' }">
            Panorama Image
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'PanoramaCube' }">
            Panorama Cube
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'PanoramaMultiple' }">
            Panorama Multiple
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'PanoramaInfospot' }">
            Panorama Infospot
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'PanoramaMultipleSpot' }">
            Panorama Multiple Spot
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'FromConfig' }"> From Config </router-link>
        </li>
      </ul>
    </section>
    <section>
      <h3>Entries</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'SphereWordCloud' }">
            Sphere Word Cloud
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'RayMarchingPrimitives' }">
            RayMarching Primitives
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'House' }"> House </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Juejin' }">Juejin</router-link>
        </li>
      </ul>
    </section>
    <section>
      <h3>Smash Hit</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'SmashHit1' }"> 1 </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'SmashHit2' }"> 2 </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'SmashHit3' }"> 3 </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'SmashHit4' }"> 4 </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'SmashHit5' }"> 5 </router-link>
        </li>
      </ul>
    </section>
    <section>
      <h3>RayMarching</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'RayMarchingBasic' }">
            RayMarching Basic
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'RayMarchingPrimitive' }">
            RayMarching Primitive
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'RayMarchingBoolean' }">
            RayMarching Boolean
          </router-link>
        </li>
      </ul>
    </section>
    <section>
      <h3>RayMarching Js</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'RayMarchingJsBasic' }">
            RayMarchingJs Basic
          </router-link>
        </li>
      </ul>
    </section>
  </main>
</template>
