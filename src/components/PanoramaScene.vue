<script lang="ts" setup>
import createSketch from "@/sketches/panorama/fromConfig";

import {
  nextTick,
  onMounted,
  reactive,
  computed,
  watch,
  type PropType,
} from "vue";

import type * as THREE from "three";
import type * as kokomi from "kokomi.js";
import { useRoute } from "vue-router";

const props = defineProps({
  sketchCreator: {
    type: Object as PropType<ReturnType<typeof createSketch>>,
    default() {
      return createSketch;
    },
  },
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

const route = useRoute();

const isEditPanelShown = computed(() => route.query.edit);

let sketch: ReturnType<typeof createSketch> | null = null;

const currentInfospot = computed(() => {
  return state.currentInfospot;
});

// 初始化
const init = () => {
  return new Promise((resolve) => {
    sketch = props.sketchCreator();

    const generator = sketch.generator;
    const panoramaConfig = props.panoramaConfig;
    if (panoramaConfig) {
      generator.generateByConfig(panoramaConfig);
      generator.on("generate", (generator: kokomi.PanoramaGenerator) => {
        state.infospotsConfig = generator.allInfospotConfig;
        nextTick(() => {
          generator.generateInfospotsWithSceneJump();
          resolve(true);
        });
      });
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
  generator.on("click-scene", (point: THREE.Vector3) => {
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

// 修改点时
const onEditPoint = (item: kokomi.InfospotConfig) => {
  if (!state.isEditEnabled) {
    return;
  }

  if (!props.panoramaConfig) {
    return null;
  }

  const currentSceneConfig = getCurrentSceneConfig();
  if (currentSceneConfig && currentSceneConfig.infospots) {
    let target = currentSceneConfig.infospots.find((e) => e.id === item.id);
    if (target) {
      target.name = item.name;
      target.jump = item.jump;
      updateConfig(props.panoramaConfig);
    }
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

onMounted(async () => {
  await init();
  listenForPointEditEvent();
});
</script>

<template>
  <!-- 全景图 -->
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <!-- 点位 -->
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
          <div class="hotspot-wrapper">
            <div class="hotspot-container">
              <div class="hotspot-arrow hotspot-arrow-down"></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <!-- UI -->
  <!-- 编辑面板 -->
  <div class="absolute top-4 left-4" style="z-index: 999999999">
    <div class="flex flex-col space-y-3">
      <template v-if="isEditPanelShown">
        <div class="card shadow">
          <div class="flex flex-col space-y-3">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-switch"
                id="is-edit-enabled"
                v-model="state.isEditEnabled"
              />
              <label class="form-check-label" for="is-edit-enabled">
                开启编辑
              </label>
            </div>
          </div>
        </div>
      </template>
      <template v-if="currentInfospot">
        <div class="card shadow">
          <div class="flex flex-col space-y-3">
            <div>当前选中点：</div>
            <div>
              <div class="form-group">
                <div>名称：</div>
                <div class="flex-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="currentInfospot.name"
                    @input="onEditPoint(currentInfospot!)"
                  />
                </div>
              </div>
            </div>
            <div>位置：</div>
            <div>x: {{ currentInfospot.point.x.toFixed(2) }}</div>
            <div>y: {{ currentInfospot.point.y.toFixed(2) }}</div>
            <div>z: {{ currentInfospot.point.z.toFixed(2) }}</div>
            <div>
              <div class="form-group">
                <div>跳转场景：</div>
                <div class="flex-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="currentInfospot.jump"
                    @input="onEditPoint(currentInfospot!)"
                  />
                </div>
              </div>
            </div>
            <div>
              <div
                class="btn btn-danger btn-round text-center"
                @click="onDeletePoint(currentInfospot!)"
              >
                删除
              </div>
            </div>
          </div>
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

    .hotspot-wrapper {
      .hotspot-container {
        background: #00000077;
      }
    }
  }

  .label {
    position: relative;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    background: #00000077;
    border: 1px solid #ffffff77;
    border-radius: 1rem;
  }

  .hotspot-wrapper {
    position: relative;
    transform: translate(-50%, -50%);

    .hotspot-container {
      position: relative;
      background: #00000000;
      border-radius: 1rem;
      transition: 0.3s;
    }
  }
}

.hotspot-arrow {
  --arrow-width: 4rem;

  position: relative;
  width: var(--arrow-width);
  height: var(--arrow-width);
  animation: hotspot-step 1s infinite steps(25);

  &-down {
    background: url("@/assets/hotspot/down.png") 0 0 / 100% no-repeat;
  }

  &-up {
    background: url("@/assets/hotspot/up.png") 0 0 / 100% no-repeat;
  }

  &-left {
    background: url("@/assets/hotspot/left.png") 0 0 / 100% no-repeat;
  }

  &-right {
    background: url("@/assets/hotspot/right.png") 0 0 / 100% no-repeat;
  }

  &-right-2 {
    background: url("@/assets/hotspot/right-2.png") 0 0 / 100% no-repeat;
  }

  &-point {
    background: url("@/assets/hotspot/point.png") 0 0 / 100% no-repeat;
  }
}

@keyframes hotspot-step {
  to {
    background-position: 0 -1600px;
  }
}
</style>
