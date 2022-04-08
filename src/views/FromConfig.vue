<script lang="ts" setup>
import PanoramaScene from "@/components/PanoramaScene.vue";
import dummyConfig from "@/sketches/panorama/fromConfig/config";

import { reactive, ref } from "vue";

const panoramaScene = ref<InstanceType<typeof PanoramaScene> | null>(null);

const state = reactive({
  isEditEnabled: false,
});

const onIsEditEnabledChange = () => {
  if (state.isEditEnabled) {
    panoramaScene.value?.enableEdit();
  } else {
    panoramaScene.value?.disableEdit();
  }
};
</script>

<template>
  <div class="relative">
    <panorama-scene
      ref="panoramaScene"
      :panorama-config="dummyConfig"
    ></panorama-scene>
    <div class="absolute top-4 left-4" style="z-index: 999999999">
      <div class="card shadow">
        <div class="flex flex-col space-y-3">
          <div class="form-check">
            <input
              type="checkbox"
              class="form-switch"
              id="is-edit-enabled"
              v-model="state.isEditEnabled"
              @change="onIsEditEnabledChange"
            />
            <label class="form-check-label" for="is-edit-enabled">
              开启编辑
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
