<script lang="ts" setup>
import createSketch from "@/sketches/template";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-black"></div>
</template>
