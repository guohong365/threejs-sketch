<script lang="ts" setup>
import PanoramaScene from "@/components/PanoramaScene.vue";
import createSketch from "@/sketches/panorama/fromConfig";
import dummyConfig from "@/sketches/panorama/fromConfig/config";
</script>

<template>
  <panorama-scene
    :sketch-creator="createSketch"
    :panorama-config="dummyConfig"
  ></panorama-scene>
</template>
