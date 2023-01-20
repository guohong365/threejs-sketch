<script lang="ts" setup>
import createSketch from "@/sketches/entries/genshinDice";

import { onMounted } from "vue";

onMounted(() => {
  createSketch();
});
</script>

<template>
  <div id="sketch" class="bg-black w-screen h-screen overflow-hidden"></div>
  <div class="absolute top-6 h-center text-sm whitespace-no-wrap">
    Hint: Click "throw" button to throw dices.
  </div>
</template>
