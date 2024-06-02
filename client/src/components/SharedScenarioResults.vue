<template>
  <registration-header />
  <div class="container">
    <list-panel :title="'Results for ' + sharedScenario.name" class="panel">
      <v-list lines="one">
        <v-col>
          <v-list-item
            v-for="(mark, index) in sharedScenario.marks"
            :key="index"
            :title="mark"
            :subtitle="index"
          ></v-list-item>
        </v-col>
      </v-list>
    </list-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegistrationHeader from "./RegistrationHeader.vue";
import ListPanel from "./ListPanel.vue";
import ScenariosService from "@/services/ScenariosService";

export default defineComponent({
  name: "",
  components: {
    RegistrationHeader,
    ListPanel,
  },
  data() {
    return {
      updateMarksInterval: -1,
      sharedScenario: { name: "--", marks: [] },
    };
  },
  methods: {},
  mounted() {
    // this.$data.sharedScenario = await ScenariosService.getSharedScenario(
    //   this.$store.state.token as string,
    //   this.$route.params.id as string
    // );
    console.log(this.$data.sharedScenario);

    this.$data.updateMarksInterval = setInterval(async () => {
      this.$data.sharedScenario = (
        await ScenariosService.getSharedScenario(
          this.$store.state.token as string,
          this.$route.params.id as string
        )
      ).scenario;
      console.log(this.$data.sharedScenario);
      console.log(this.$data.sharedScenario.marks);
    }, 5000);
  },
  unmounted() {
    clearInterval(this.$data.updateMarksInterval);
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
