<script lang="ts" setup>
import createSketch from "@/sketches/entries/interweaveShape";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-white w-screen h-screen overflow-hidden"></div>
</template>
