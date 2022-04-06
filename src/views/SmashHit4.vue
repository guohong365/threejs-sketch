<script lang="ts" setup>
import createSketch from "@/sketches/smash-hit/4";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <div class="fixed z-5 top-4 h-center">
    <div class="score text-white text-3xl">0</div>
  </div>
</template>
