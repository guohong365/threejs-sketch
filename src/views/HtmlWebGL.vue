<script lang="ts" setup>
import LoadingScreen from "@/components/LoadingScreen.vue";

import createSketch from "@/sketches/templates/htmlWebGL";

import { onMounted, reactive, ref } from "vue";

const state = reactive({
  loading: false,
  currentScroll: 0,
  scrollHeight: 0,
});

let sketch: Awaited<ReturnType<typeof createSketch>> | null = null;

const scrollContainer = ref<HTMLElement | null>(null);

onMounted(async () => {
  state.loading = true;
  sketch = await createSketch();
  state.loading = false;

  if (scrollContainer.value) {
    state.scrollHeight = scrollContainer.value.scrollHeight;
  }

  sketch.update(() => {
    if (sketch?.scroller) {
      state.currentScroll = -sketch.scroller.scroll.current;
    }
  });
});
</script>

<template>
  <loading-screen v-if="state.loading"></loading-screen>
  <div :class="{ 'opacity-0': state.loading }">
    <div :style="{ height: `${state.scrollHeight}px` }"></div>
    <div
      id="sketch"
      class="fixed z-0 top-0 left-0 w-screen h-screen overflow-hidden"
    ></div>
    <div class="scroll-container" ref="scrollContainer">
      <div :style="`transform: translateY(${state.currentScroll}px);`">
        <div class="p-4">
          <div class="space-y-4">
            <template v-for="n in 4" :key="n">
              <div class="space-y-4">
                <img
                  src="@/sketches/templates/htmlWebGL/assets/1.jpg"
                  class="webgl-img w-full block"
                  alt=""
                />
                <div class="space-y-4">
                  <div class="webgl-text text-xl">我是标题</div>
                  <div class="space-y-2">
                    <div class="webgl-text text-sm">我是段落1段落1段落1</div>
                    <div class="webgl-text text-sm">我是段落2段落2段落2</div>
                  </div>
                  <div class="btn btn-primary text-center">我是按钮</div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.webgl-img {
  opacity: 0;
}

.webgl-text {
  opacity: 0;
}

.scroll-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
