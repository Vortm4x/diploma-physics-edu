<template>
  <div id="header">
    <div class="header-item">
      <a class="header-link" href="#">Scenarios</a>
    </div>
    <div class="header-item">
      <a class="header-link" href="#">Groups</a>
    </div>
    <div class="header-item">
      <a class="header-link" href="#">My Profile</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<style scoped>
#header {
  height: 5em;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.header-item {
  vertical-align: middle;
  flex: 2;
}

.header-link {
  font-size: xx-large;
  color: bisque;
  text-decoration: none;
}

.header-link:hover {
  text-decoration: underline;
}
</style>
