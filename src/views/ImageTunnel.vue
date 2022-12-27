<script lang="ts" setup>
import LoadingBlur from "@/components/LoadingBlur.vue";

import createSketch from "@/sketches/entries/imageTunnel";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="image-tunnel w-screen h-screen overflow-hidden"></div>
  <loading-blur></loading-blur>
</template>

<style lang="scss" scoped>
.image-tunnel {
  background: radial-gradient(at 50% 0%, #343299 0%, transparent 100%),
    linear-gradient(#0e1242 0%, #0e1242 100%);
}
</style>
