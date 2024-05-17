<template>
  <div class="editing-workspace">
    <canvas id="editing-canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scene from "@/components/engine/Scene";

export default defineComponent({
  name: "EditingWorkspace",
  mounted() {
    let scene = new Scene("editing-canvas", 800, 500);
  },
});
</script>

<style scoped>
.editing-workspace {
  height: 100%;
  background-color: aqua;
}
</style>
