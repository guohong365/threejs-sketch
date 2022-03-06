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
      <router-link :to="{ name: 'ScreenQuad' }">全屏幕</router-link>
    </li>
  </ul>
</template>
