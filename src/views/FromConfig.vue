<script lang="ts" setup>
import PanoramaScene from "@/components/PanoramaScene.vue";
import dummyConfig from "@/sketches/panorama/fromConfig/config";
</script>

<template>
  <panorama-scene :panorama-config="dummyConfig"></panorama-scene>
</template>
