<script lang="ts" setup>
import createSketch from "@/sketches/templates/image";

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
  <div class="relative z-1 pointer-events-none">
    <div class="h-20"></div>
    <div class="gallery">
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/1.jpg"
        alt=""
      />
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/2.jpg"
        alt=""
      />
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/3.jpg"
        alt=""
      />
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/4.jpg"
        alt=""
      />
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/5.jpg"
        alt=""
      />
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/6.jpg"
        alt=""
      />
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/7.jpg"
        alt=""
      />
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/8.jpg"
        alt=""
      />
      <img
        class="gallery-item"
        src="@/sketches/templates/image/assets/9.jpg"
        alt=""
      />
    </div>
    <div class="h-20"></div>
  </div>
</template>

<style lang="scss">
img {
  opacity: 0;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45ch, 1fr));
  gap: 12rem 4rem;
  place-items: center;

  &-item {
    display: block;
    width: 25rem;
  }
}
</style>
