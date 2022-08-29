<script lang="ts" setup>
import createSketch from "@/sketches/entries/handTracker";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="w-screen h-screen overflow-hidden"></div>
</template>
