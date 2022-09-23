<script lang="ts" setup>
import PanoramaScene from "@/components/PanoramaScene.vue";
import createSketch from "@/sketches/panorama/house";
import dummyConfig from "@/sketches/panorama/house/config";
</script>

<template>
  <panorama-scene
    :sketch-creator="createSketch"
    :panorama-config="dummyConfig"
  ></panorama-scene>
</template>
