<script lang="ts" setup>
import createSketch from "@/sketches/smash-hit/5";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div
    id="sketch"
    class="bg-white-grad-1 w-screen h-screen overflow-hidden"
  ></div>
  <div class="fixed z-5 top-4 h-center">
    <div class="score text-black text-3xl">0</div>
  </div>
</template>

<style>
:root {
  --white-grad-1: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
}

.bg-white-grad-1 {
  background: var(--white-grad-1);
}
</style>
