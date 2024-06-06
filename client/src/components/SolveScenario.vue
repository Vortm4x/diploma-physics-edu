<template>
  <div id="root">
    <Header id="header"></Header>
    <!-- <h1>{{ msg }}</h1> -->
    <EditingWorkspace id="content"></EditingWorkspace>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./Header.vue";
import EditingWorkspace from "./EditingWorkspace.vue";
import ScenariosService from "@/services/ScenariosService";

export default defineComponent({
  name: "SolveScenario",
  components: {
    Header,
    EditingWorkspace,
  },
  data() {
    return {
      sharedScenario: { data: new Map() },
    };
  },
  async mounted() {
    this.$data.sharedScenario = (
      await ScenariosService.getSharedScenario(
        this.$store.state.token as string,
        this.$route.params.id as string
      )
    ).scenario;
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#root {
  display: flex;
  flex-flow: column;
  height: 100%;
}
#header {
  flex: 0 1 auto;
}
#content {
  flex: 1 1 auto;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
