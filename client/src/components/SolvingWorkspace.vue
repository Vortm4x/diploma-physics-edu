<template>
  <div class="editing-workspace">
    <canvas id="editing-canvas"></canvas>
    <img
      @load="createScene"
      id="laser-pointer"
      src="../assets/laser-pointer.png"
      style="display: none"
    />
    <img id="mirror" src="../assets/mirror.png" style="display: none" />
    <img
      id="sensor-inactive"
      src="../assets/sensor-inactive.png"
      style="display: none"
    />
    <img
      id="sensor-active"
      src="../assets/sensor-active.png"
      style="display: none"
    />
    <img
      id="delete-control"
      src="../assets/delete-control.png"
      style="display: none"
    />
    <img
      id="move-x-allow-control"
      src="../assets/move-x-allow-control.png"
      style="display: none"
    />
    <img
      id="move-x-deny-control"
      src="../assets/move-x-deny-control.png"
      style="display: none"
    />
    <img
      id="move-y-allow-control"
      src="../assets/move-y-allow-control.png"
      style="display: none"
    />
    <img
      id="move-y-deny-control"
      src="../assets/move-y-deny-control.png"
      style="display: none"
    />
    <img
      id="rotate-allow-control"
      src="../assets/rotate-allow-control.png"
      style="display: none"
    />
    <img
      id="rotate-deny-control"
      src="../assets/rotate-deny-control.png"
      style="display: none"
    />
    <v-btn class="mr-4" @click="shareResult">Share result</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scene from "./engine/Scene";
import ScenariosService from "@/services/ScenariosService";

let scene: any;

const shareResult = (component: any) => {
  ScenariosService.updateMark(
    component.$store.state.token as string,
    component.$route.params.id as string,
    component.$data.score
  );
};

export default defineComponent({
  name: "EditingWorkspace",

  data() {
    return {
      get export(): object {
        return scene.export;
      },
      get score(): number {
        return scene.score;
      },
      updateInterval: -1,
      saveInterval: -1,
    };
  },

  methods: {
    createScene() {
      scene = new Scene(1, 1);
    },
    shareResult() {
      shareResult(this);
    },
  },

  mounted() {
    setTimeout(async () => {
      const scenario = await ScenariosService.getSharedScenario(
        this.$store.state.token as string,
        this.$route.params.id as string
      );
      const sceneData = scenario.scenario.data;
      console.log(sceneData);

      if (sceneData !== undefined) {
        scene = Scene.restore(JSON.parse(sceneData), false);
      } else {
        scene = Scene.restore(
          {
            width: 800,
            height: 500,
            entries: [],
          },
          false
        );
      }

      const updateCallback = () => {
        scene.update();
      };

      this.$data.updateInterval = setInterval(updateCallback, 1000 / 60);
    }, 10);
  },
  unmounted() {
    (scene as Scene).destroy();
    clearInterval(this.$data.updateInterval);
  },
});
</script>

<style scoped>
.editing-workspace {
  height: 100%;
  /* background-color: aqua; */
}
</style>
