<script lang="ts" setup>
import createSketch from "@/sketches/entries/rayMarchingPrimitives";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
</template>
