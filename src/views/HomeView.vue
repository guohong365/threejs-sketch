<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <ul>
    <li>
      <router-link :to="{ name: 'Template' }">模板</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'Image' }">图片</router-link>
    </li>
    <li>
      <router-link :to="{ name: 'RayMarching' }">光线步进</router-link>
    </li>
  </ul>
</template>
