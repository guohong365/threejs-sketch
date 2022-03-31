<script lang="ts" setup>
import createSketch from "@/sketches/panorama/multiple-spot";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div class="relative overflow-hidden">
    <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
    <div class="point point-1">
      <div class="label">1</div>
    </div>
    <div class="point point-2">
      <div class="label">S2</div>
    </div>
    <div class="point point-3">
      <div class="label">S1</div>
    </div>
  </div>
</template>

<style>
.point {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.point .label {
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
  cursor: pointer;
}
</style>
