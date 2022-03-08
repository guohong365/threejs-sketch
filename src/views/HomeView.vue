<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="p-4 space-y-4">
    <section>
      <h3>操场</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'Playground' }">操场</router-link>
        </li>
      </ul>
    </section>
    <section>
      <h3>模板</h3>
      <ul>
        <li>
          <router-link :to="{ name: 'Basic' }">基本</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Image' }">图片</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'ScreenQuad' }">全屏幕</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'RayMarching' }">光线步进</router-link>
        </li>
      </ul>
    </section>
  </main>
</template>
