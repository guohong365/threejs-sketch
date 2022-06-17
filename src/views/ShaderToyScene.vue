<script lang="ts" setup>
import * as kokomi from "kokomi.js";

kokomi.ShaderToyElement.register();
</script>

<template>
  <shader-toy>
    <component :is="`script`" type="frag"> </component>
  </shader-toy>
</template>

<style lang="scss">
shader-toy {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
