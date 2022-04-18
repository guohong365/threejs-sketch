<script lang="ts" setup>
import createSketch from "@/sketches/ray-marching-js/pokeBall";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
</template>
