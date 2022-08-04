<script lang="ts" setup>
import createSketch from "@/sketches/entries/distortHover";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div
    id="sketch"
    class="fixed z-0 bg-black w-screen h-screen overflow-hidden"
  ></div>
  <div class="relative z-1 w-screen h-screen overflow-hidden">
    <img
      class="absolute top-0 left-0 w-100 cursor-pointer"
      src="@/sketches/entries/distortHover/assets/1.jpg"
      alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
img {
  opacity: 0;
}
</style>
