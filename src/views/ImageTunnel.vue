<script lang="ts" setup>
import LoadingBlur from "@/components/LoadingBlur.vue";

import createSketch from "@/sketches/entries/imageTunnel";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <loading-blur></loading-blur>
</template>
