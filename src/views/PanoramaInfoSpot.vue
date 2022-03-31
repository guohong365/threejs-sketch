<script lang="ts" setup>
import createSketch from "@/sketches/panorama/info-spot";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <div class="absolute cover overflow-hidden pointer-events-none">
    <div class="pointer-events-auto">
      <div class="point point-1">
        <div class="label">1</div>
      </div>
      <div class="point point-2">
        <div class="label">2</div>
      </div>
      <div class="point point-3">
        <div class="label">3</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.point {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: translate(var(--x), var(--y));
  cursor: pointer;

  &.visible {
    opacity: 1;
  }

  .label {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    border-radius: 50%;
    background: #00000077;
    border: 1px solid #ffffff77;
  }
}
</style>
