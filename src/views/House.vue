<script lang="ts" setup>
import PanoramaScene from "@/components/PanoramaScene.vue";
import createSketch from "@/sketches/entries/house";
import dummyConfig from "@/sketches/entries/house/config";
</script>

<template>
  <panorama-scene
    :sketch-creator="createSketch"
    :panorama-config="dummyConfig"
  ></panorama-scene>
</template>
