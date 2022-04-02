<script lang="ts" setup>
import createSketch from "@/sketches/entries/sphereWordCloud";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <div class="absolute cover overflow-hidden pointer-events-none">
    <template v-for="n in 18" :key="n">
      <div class="point" :class="`point-${n}`">
        <div class="label">114514</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.point {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  transform: translate(var(--x), var(--y));
  z-index: var(--z-index);

  .label {
    position: absolute;
    color: white;
    transform: translate(-50%, -50%);
    user-select: none;
  }
}
</style>
