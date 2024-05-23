<template>
  <registration-header />
  <div class="container">
    <list-panel title="Groups" class="panel"> {{ groups }} </list-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { onMounted } from "vue";
import RegistrationHeader from "./RegistrationHeader.vue";
import ListPanel from "./ListPanel.vue";
import GroupsService from "@/services/GroupsService";

export default defineComponent({
  name: "",
  components: {
    RegistrationHeader,
    ListPanel,
  },
  data() {
    return {
      groups: undefined,
    };
  },
  mounted() {
    GroupsService.getGroups(this.$store.state.token).then((groups: any) => {
      console.log(groups);
      this.$data.groups = groups;
    });
    console.log("mounted");
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
