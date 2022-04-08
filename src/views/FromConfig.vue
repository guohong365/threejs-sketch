<script lang="ts" setup>
import createSketch from "@/sketches/panorama/fromConfig";
import dummyConfig from "@/sketches/panorama/fromConfig/config";

import { onMounted, computed } from "vue";

// 获取所有点位配置
const getPointConfig = (config: any) => {
  const points = config
    .map((item: any) => {
      const infospots = item.infospots.map((infospot: any) => {
        return {
          id: infospot.id,
          name: infospot.name || infospot.id,
        };
      });
      return infospots;
    })
    .flat();
  return points;
};

const pointsConfig = computed(() => getPointConfig(dummyConfig));

let sketch: ReturnType<typeof createSketch> | null = null;

onMounted(() => {
  sketch = createSketch();
  sketch.generateByConfig(dummyConfig);
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <div class="absolute cover overflow-hidden pointer-events-none">
    <div class="pointer-events-auto">
      <template v-for="(item, i) in pointsConfig" :key="i">
        <div class="point" :class="`point-${item.id}`">
          <div class="label">{{ item.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.point {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transform: translate(var(--x), var(--y));
  z-index: var(--z-index);

  &.visible {
    opacity: 1;
    cursor: pointer;
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
