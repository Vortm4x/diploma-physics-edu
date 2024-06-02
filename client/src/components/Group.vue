<template>
  <registration-header />
  <div class="container">
    <list-panel :title="groupName" class="panel">
      <p v-if="errorMessage !== ''" class="error">Error: {{ errorMessage }}</p>
      <v-dialog max-width="500" v-if="$store.state.email == owner">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Add member"
            variant="flat"
          ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
            <v-card-text>Specify an email.</v-card-text>
            <v-text-field
              label="Email"
              variant="outlined"
              name="email"
              placeholder="Email"
              v-model="newMemberEmail"
            ></v-text-field>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="
                  addMember();
                  isActive.value = false;
                "
                class="pr-4"
                >Add member</v-btn
              >
              <v-btn text="Close" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

      <p>Owner: {{ owner }}</p>
      <div class="double-column-container">
        <list-panel title="Members" class="members-column">
          <v-list lines="one">
            <v-list-item
              v-for="(member, index) in members"
              :key="index"
              :title="member"
            ></v-list-item>
          </v-list>
        </list-panel>
        <list-panel title="Scenarios" class="scenarios-column">
          <v-list lines="one">
            <v-list-item
              v-for="(sharedScenario, index) in sharedScenarios"
              :key="index"
              :title="sharedScenario.name"
              :subtitle="
                sharedScenario.owner +
                ', date: ' +
                new Date(sharedScenario.dateShared).toUTCString()
              "
              @click="navigateToSharedScenario(sharedScenario._id)"
              ><v-btn
                v-if="sharedScenario.owner === $store.state.email"
                @click.stop="navigateToResults(sharedScenario._id)"
                theme="light"
                class="results-btn"
                >To results</v-btn
              ></v-list-item
            >
          </v-list>
          <!-- <p>{{ sharedScenarios }}</p> -->
        </list-panel>
      </div>
    </list-panel>
  </div>
</template>

<script lang="ts">
import GroupsService from "@/services/GroupsService";
import { defineComponent } from "vue";
import RegistrationHeader from "./RegistrationHeader.vue";
import ListPanel from "./ListPanel.vue";
import store from "@/store";

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
  component.$data.sharedScenarios = group.sharedScenarios;
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
      newMemberEmail: "",
      members: [],
      sharedScenarios: [],
    };
  },
  methods: {
    addMember() {
      GroupsService.addMember(
        this.$store.state.token as string,
        this.$data.newMemberEmail,
        this.$data.groupName
      ).then(() =>
        setTimeout(
          () => getGroup(this.$route.params.groupName as string, this),
          3000
        )
      );
    },
    navigateToSharedScenario(id: string) {
      this.$router.push({ name: "sharedScenario", params: { id: id } });
    },
    navigateToResults(id: string) {
      this.$router.push({ name: "sharedScenarioResults", params: { id: id } });
    },
  },
  async mounted() {
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
.double-column-container {
  display: flex;
  flex-direction: row;
}
.members-column {
  /* flex-basis: 10px; */
  flex-grow: 1;
}
.scenarios-column {
  margin-left: 10px;
  flex-grow: 2;
}
.results-btn {
  margin-bottom: 5px;
}
</style>
