<script lang="ts" setup>
import PanoramaScene from "@/components/PanoramaScene.vue";
import dummyConfig from "@/sketches/panorama/fromConfig/config";
</script>

<template>
  <div class="relative">
    <panorama-scene :panorama-config="dummyConfig"></panorama-scene>
  </div>
</template>
