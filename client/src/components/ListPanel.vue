<template>
  <v-card class="white elevation-2">
    <v-toolbar flat dense class="grey">
      <v-toolbar-title
        ><h3>{{ title }}</h3></v-toolbar-title
      >
    </v-toolbar>
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot>No slot provided</slot>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListPanel",
  //   data() {
  //     return {
  //       title: "No title provided",
  //     };
  //   },
  props: ["title"],
});
</script>

<style scoped></style>
