<template>
  <registration-header />
  <div class="container">
    <list-panel :title="groupName" class="panel">
      <p v-if="errorMessage !== null" class="error">
        Error: {{ errorMessage }}
      </p>
      <p>Owner: {{ owner }}</p>
      <p>Members: {{ members }}</p>
    </list-panel>
  </div>
</template>

<script lang="ts">
import GroupsService from "@/services/GroupsService";
import { defineComponent } from "vue";
import RegistrationHeader from "./RegistrationHeader.vue";
import ListPanel from "./ListPanel.vue";

async function getGroup(groupName: string, component: any) {
  console.log("GroupName", groupName);
  const group = await GroupsService.getGroup(
    groupName,
    component.$store.state.token
  );
  if (group.error) {
    component.$data.errorMessage = group.error;
    return;
  }
  console.log("group", group);
  component.$data.groupName = groupName;
  component.$data.owner = group.owner;
  component.$data.members = group.members;
  // component.$data.sharedScenarios = group.sharedScenarios;
}

export default defineComponent({
  name: "",
  components: {
    RegistrationHeader,
    ListPanel,
  },
  data() {
    return {
      groupName: "",
      owner: "",
      errorMessage: "",
      members: [],
      sharedScenarios: [],
    };
  },
  async mounted() {
    // GroupsService.getGroups(this.$store.state.token).then((groups: any) => {
    //   console.log(groups);
    //   this.$data.groups = groups;
    // });
    console.log(this.$route.params.groupName);
    await getGroup(this.$route.params.groupName as string, this);
    console.log("Group.vue mounted");
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
.error {
  color: red;
}
</style>
