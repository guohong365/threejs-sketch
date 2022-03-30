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
          <router-link :to="{ name: 'RayMarching' }">RayMarching</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Physics' }">Physics</router-link>
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
      </ul>
    </section>
  </main>
</template>
