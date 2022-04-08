<script lang="ts" setup>
import createSketch from "@/sketches/panorama/fromConfig";

import { nextTick, onMounted, reactive, watch, type PropType } from "vue";

import type * as THREE from "three";
import type * as kokomi from "kokomi.js";
import { computed } from "@vue/reactivity";

const props = defineProps({
  panoramaConfig: {
    type: Object as PropType<kokomi.PanoramaConfig>,
  },
});

interface State {
  infospotsConfig: kokomi.InfospotConfig[];
  isEditEnabled: boolean;
  currentInfospot: kokomi.InfospotConfig | null;
}

const state: State = reactive({
  infospotsConfig: [],
  isEditEnabled: false,
  currentInfospot: null,
});

let sketch: ReturnType<typeof createSketch> | null = null;

const currentInfospot = computed(() => {
  return state.currentInfospot;
});

// 初始化
const init = () => {
  return new Promise((resolve) => {
    sketch = createSketch();

    const generator = sketch.generator;
    const panoramaConfig = props.panoramaConfig;
    if (panoramaConfig) {
      generator.generateByConfig(panoramaConfig);
      generator.emitter.on(
        "generate",
        (generator: kokomi.PanoramaGenerator) => {
          state.infospotsConfig = generator.allInfospotConfig;
          nextTick(() => {
            generator.generateInfospotsWithSceneJump();
            resolve(true);
          });
        }
      );
    }
  });
};

// 监听编辑点事件
const listenForPointEditEvent = () => {
  const generator = sketch?.generator;
  if (!generator) {
    return;
  }

  generator.outputCurrentScenePosition();
  generator.emitter.on("click-scene", (point: THREE.Vector3) => {
    if (!state.isEditEnabled) {
      return;
    }

    addPoint(point);
  });
};

// 获取当前场景配置
const getCurrentSceneConfig = () => {
  const generator = sketch?.generator;
  if (!generator) {
    return null;
  }

  if (!props.panoramaConfig) {
    return null;
  }

  const sceneConfig = props.panoramaConfig.find(
    (scene: kokomi.SceneConfig) =>
      scene.id === generator.viewer?.currentPanorama?.id
  );
  return sceneConfig;
};

// 更新配置
const updateConfig = (config: kokomi.PanoramaConfig) => {
  const generator = sketch?.generator;
  if (!generator) {
    return;
  }

  generator.setConfig(config);
  state.infospotsConfig = generator.allInfospotConfig;
  nextTick(() => {
    sketch?.generator.generateInfospotsWithSceneJump();
  });
};

// 添加点
const addPoint = (point: THREE.Vector3) => {
  const generator = sketch?.generator;
  if (!generator) {
    return;
  }

  if (!props.panoramaConfig) {
    return null;
  }

  const currentSceneConfig = getCurrentSceneConfig();
  const infospot = {
    id: `${generator.allInfospotConfig.length}${(
      Math.random() * 1000000
    ).toFixed(0)}`,
    point,
    name: `点${generator.allInfospotConfig.length}`,
  };
  currentSceneConfig?.infospots?.push(infospot);
  updateConfig(props.panoramaConfig);
};

// 开启编辑
const enableEdit = () => {
  const generator = sketch?.generator;
  if (!generator) {
    return;
  }

  generator.disableSceneJump();
  state.isEditEnabled = true;
};

// 禁用编辑
const disableEdit = () => {
  const generator = sketch?.generator;
  if (!generator) {
    return;
  }

  generator.enableSceneJump();
  state.isEditEnabled = false;
  state.currentInfospot = null;
};

// 选择点时
const onSelectPoint = (item: kokomi.InfospotConfig) => {
  if (!state.isEditEnabled) {
    return;
  }

  state.currentInfospot = item;
};

// 删除点时
const onDeletePoint = (item: kokomi.InfospotConfig) => {
  if (!state.isEditEnabled) {
    return;
  }

  if (!props.panoramaConfig) {
    return null;
  }

  state.currentInfospot = null;
  const currentSceneConfig = getCurrentSceneConfig();
  if (currentSceneConfig && currentSceneConfig.infospots) {
    currentSceneConfig.infospots = currentSceneConfig.infospots.filter(
      (e) => e.id !== item.id
    );
    updateConfig(props.panoramaConfig);
  }
};

watch(
  () => state.isEditEnabled,
  (newVal) => {
    if (newVal) {
      enableEdit();
    } else {
      disableEdit();
    }
  }
);

defineExpose({
  state,
  enableEdit,
  disableEdit,
  currentInfospot,
  onDeletePoint,
});

onMounted(async () => {
  await init();
  listenForPointEditEvent();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <div class="absolute cover overflow-hidden pointer-events-none">
    <div class="pointer-events-auto">
      <template v-for="(item, i) in state.infospotsConfig" :key="i">
        <div
          class="point"
          :class="[
            `point-${item.id}`,
            { active: state.currentInfospot === item },
          ]"
          @click="onSelectPoint(item)"
        >
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
  pointer-events: none;

  &.visible {
    opacity: 1;
    cursor: pointer;
    pointer-events: auto;
  }

  &.active {
    .label {
      box-shadow: 0 0 0 2px white;
    }
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
