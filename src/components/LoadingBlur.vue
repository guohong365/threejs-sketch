<script lang="ts" setup></script>

<template>
  <div
    class="fixed z-5 top-0 left-0 loader-screen w-screen h-screen transition-all duration-300 bg-black"
  >
    <div class="absolute hv-center">
      <div class="loading text-white text-3xl tracking-widest">
        <span style="--i: 0">努</span>
        <span style="--i: 1">力</span>
        <span style="--i: 2">加</span>
        <span style="--i: 3">载</span>
        <span style="--i: 4">中</span>
        <span style="--i: 5">.</span>
        <span style="--i: 6">.</span>
        <span style="--i: 7">.</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  span {
    animation: blur 1.5s calc(var(--i) / 5 * 1s) alternate infinite;
  }
}

@keyframes blur {
  to {
    filter: blur(2px);
  }
}
</style>
