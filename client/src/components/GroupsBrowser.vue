<template>
  <registration-header />
  <div class="container">
    <list-panel title="Groups" class="panel">
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Create group"
            variant="flat"
          ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
            <v-card-text>Specify a name to create a group.</v-card-text>
            <v-text-field
              label="Group name"
              variant="outlined"
              name="groupName"
              placeholder="Group name"
              v-model="groupName"
            ></v-text-field>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="
                  addGroup();
                  isActive.value = false;
                "
                class="pr-4"
                >Create Group</v-btn
              >
              <v-btn text="Close" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-list lines="one">
        <v-list-item
          v-for="(group, index) in groups"
          @click="navigateToGroup(group.name)"
          :key="index"
          :title="group.name"
          :subtitle="group.owner"
        ></v-list-item>
      </v-list>
    </list-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegistrationHeader from "./RegistrationHeader.vue";
import ListPanel from "./ListPanel.vue";
import GroupsService from "@/services/GroupsService";

function getGroups(component: any) {
  GroupsService.getGroups(component.$store.state.token as string).then(
    (groups: any) => {
      console.log(groups);
      component.$data.groups = groups;
    }
  );
}

export default defineComponent({
  name: "",
  components: {
    RegistrationHeader,
    ListPanel,
  },
  data() {
    return {
      groups: undefined,
      groupName: "",
    };
  },
  methods: {
    addGroup() {
      GroupsService.addGroup(
        this.$store.state.token as string,
        this.$data.groupName
      )
        .then((group: any) => {
          console.log(group);
        })
        .then(() => setTimeout(() => getGroups(this), 3000));
    },
    navigateToGroup(groupName: string) {
      this.$router.push({ name: "group", params: { groupName: groupName } });
    },
  },
  mounted() {
    // GroupsService.getGroups(this.$store.state.token).then((groups: any) => {
    //   console.log(groups);
    //   this.$data.groups = groups;
    // });
    getGroups(this);
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
