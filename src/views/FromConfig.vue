<script lang="ts" setup>
import createSketch from "@/sketches/panorama/fromConfig";
import dummyConfig from "@/sketches/panorama/fromConfig/config";

import { nextTick, onMounted, reactive } from "vue";

import type * as THREE from "three";
import type * as kokomi from "kokomi.js";

interface State {
  panoramaConfig: kokomi.PanoramaConfig;
  infospotsConfig: kokomi.InfospotConfig[];
}

const state: State = reactive({
  panoramaConfig: [],
  infospotsConfig: [],
});

let sketch: ReturnType<typeof createSketch> | null = null;

const init = () => {
  sketch = createSketch();
  sketch.generator.generateByConfig(state.panoramaConfig);
  sketch.generator.emitter.on(
    "generate",
    (generator: kokomi.PanoramaGenerator) => {
      state.infospotsConfig = generator.allInfospotConfig;
      nextTick(() => {
        generator.generateInfospotsWithSceneJump();
        generator.outputCurrentScenePosition();
        generator.emitter.on("click-scene", (point: THREE.Vector3) => {
          const currentSceneConfig = state.panoramaConfig.find(
            (scene: kokomi.SceneConfig) =>
              scene.id === generator.viewer?.currentPanorama?.id
          );
          const infospot = {
            id: `${generator.allInfospotConfig.length}`,
            point,
            name: `${generator.allInfospotConfig.length}`,
          };
          currentSceneConfig?.infospots?.push(infospot);
          sketch?.generator.setConfig(state.panoramaConfig);
          state.infospotsConfig = generator.allInfospotConfig;
          nextTick(() => {
            sketch?.generator.generateInfospotsWithSceneJump();
          });
        });
      });
    }
  );
};

onMounted(() => {
  state.panoramaConfig = dummyConfig;
  init();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <div class="absolute cover overflow-hidden pointer-events-none">
    <div class="pointer-events-auto">
      <template v-for="(item, i) in state.infospotsConfig" :key="i">
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
