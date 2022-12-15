<script lang="ts" setup>
import { ref, reactive } from "vue";

import type createSketch from "@/sketches/templates/htmlWebGL";

import { environ } from "@/consts";

let sketch: Awaited<ReturnType<typeof createSketch>> = (window as any).sketch;

const scrollContainer = ref<HTMLElement | null>(null);

const state = reactive({
  currentScroll: 0,
  scrollHeight: 0,
});

const syncScroll = () => {
  sketch = (window as any).sketch;

  if (environ.isIOS) {
    if (sketch.scroller) {
      sketch.scroller.scroll.ease = 0.5;
    }
  }

  if (scrollContainer.value) {
    state.scrollHeight = scrollContainer.value.scrollHeight;
  }

  sketch.update(() => {
    if (sketch.scroller) {
      state.currentScroll = -sketch.scroller.scroll.current;
    }
  });
};

defineExpose({
  syncScroll,
});
</script>

<template>
  <div :style="{ height: `${state.scrollHeight}px` }"></div>
  <div class="scroll-container" ref="scrollContainer">
    <div :style="`transform: translateY(${state.currentScroll}px);`">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
