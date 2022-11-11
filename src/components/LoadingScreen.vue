<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: "加载中",
  },
  customStyle: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <teleport to="#dialogs">
    <div class="my-loading-screen backdrop flex-center" :style="customStyle">
      <div class="flex flex-col items-center space-y-2">
        <div class="loader"></div>
        <div class="text-white">{{ text }}</div>
      </div>
    </div>
  </teleport>
</template>
