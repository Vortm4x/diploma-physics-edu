<template>
  <registration-header />
  <div class="container">
    <list-panel title="TODO" class="panel">
        
    </list-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "",
  data() {
    return {
      title: "",
    }
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  justify-content: center;
}
.panel {
  width: 75%;
  margin: 0 auto;
  margin-top: 5vh;
}
</style>
