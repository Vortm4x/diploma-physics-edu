<template>
  <registration-header />
  <div class="container">
    <list-panel title="Scenarios" class="panel">
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            color="surface-variant"
            text="Create scenario"
            variant="flat"
          ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
            <v-card-text>Specify a name to create a scenario.</v-card-text>
            <v-text-field
              label="Scenario name"
              variant="outlined"
              name="scenarioName"
              placeholder="Scenario name"
              v-model="scenarioName"
            ></v-text-field>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="
                  addScenario();
                  isActive.value = false;
                "
                class="pr-4"
                >Create Scenario</v-btn
              >
              <v-btn text="Close" @click="isActive.value = false"></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-list lines="one">
        <v-list-item
          v-for="(scenario, index) in scenarios"
          @click="navigateToScenario(scenario._id)"
          :key="index"
          :title="scenario.name"
          :subtitle="scenario.owner"
        >
          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                color="surface-variant"
                text="Share"
                variant="flat"
              ></v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card title="Dialog">
                <v-card-text
                  >Choose a group to share the scenario in</v-card-text
                >
                <v-select
                  v-model="groupName"
                  label="Group"
                  :items="groups"
                ></v-select>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="
                      shareScenario(scenario.name);
                      isActive.value = false;
                    "
                    class="pr-4"
                    >Share</v-btn
                  >
                  <v-btn text="Close" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-list-item>
      </v-list>
    </list-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegistrationHeader from "./RegistrationHeader.vue";
import ListPanel from "./ListPanel.vue";
import ScenariosService from "@/services/ScenariosService";
import GroupsService from "@/services/GroupsService";

function getScenarios(component: any) {
  ScenariosService.getScenarios(component.$store.state.token as string).then(
    (scenarios: any) => {
      console.log(scenarios);
      component.$data.scenarios = scenarios;
    }
  );
}

function getGroupsNames(component: any) {
  GroupsService.getGroups(component.$store.state.token as string).then(
    (groups: any) => {
      console.log(groups);
      component.$data.groups = groups.map((a: any) => a.name);
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
      scenarios: undefined,
      scenarioName: "",
      groupName: undefined,
      groups: [],
    };
  },
  methods: {
    addScenario() {
      ScenariosService.addScenario(
        this.$store.state.token as string,
        this.$data.scenarioName
      )
        .then((scenario: any) => {
          console.log(scenario);
        })
        .then(() => setTimeout(() => getScenarios(this), 3000));
    },
    navigateToScenario(id: string) {
      this.$router.push({
        name: "EditScenario",
        params: { id: id },
      });
    },
    async shareScenario(scenarioName: string) {
      const sharedScenario = await ScenariosService.shareScenario(
        this.$store.state.token,
        this.$data.groupName as unknown as string,
        scenarioName
      );
      console.log(this.$data.groups);
      console.log(this.$data.groupName);
      console.log(sharedScenario);
    },
  },
  mounted() {
    getScenarios(this);
    getGroupsNames(this);
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
