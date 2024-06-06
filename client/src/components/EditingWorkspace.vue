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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scene from "./engine/Scene";
import ScenariosService from "@/services/ScenariosService";

let scene: any;

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
  },

  mounted() {
    setTimeout(async () => {
      const sceneData = (
        await ScenariosService.getScenario(
          this.$store.state.token as string,
          this.$route.params.id as string
        )
      ).data;
      console.log(sceneData);

      if (sceneData !== undefined) {
        scene = Scene.restore(JSON.parse(sceneData));
      } else {
        scene = Scene.restore({
          width: 800,
          height: 500,
          entries: [
            {
              type: "LaserPointer",
              x: 250,
              y: 70,
              degrees: 70,
              lockMovementX: false,
              lockMovementY: false,
            },
            {
              type: "Mirror",
              x: 400,
              y: 85,
              degrees: -15,
              lockMovementX: false,
              lockMovementY: false,
            },
            {
              type: "TransparentObstacle",
              x: 300,
              y: 300,
              degrees: 15,
              lockMovementX: false,
              lockMovementY: false,
              width: 200,
              height: 150,
              color: "yellow",
              refractionCoef: 1.5,
            },
            {
              type: "LightSensor",
              x: 250,
              y: 450,
              degrees: 15,
              lockMovementX: false,
              lockMovementY: false,
            },
          ],
        });
      }

      const updateCallback = () => {
        scene.update();
      };

      const saveCallback = () => {
        const exportJson = JSON.stringify(this.$data.export);
        ScenariosService.saveScenario(
          this.$store.state.token as string,
          this.$route.params.id as string,
          exportJson
        );
      };

      this.$data.updateInterval = setInterval(updateCallback, 1000 / 60);
      this.$data.saveInterval = setInterval(saveCallback, 1000 * 3);
    }, 10);
  },
  unmounted() {
    clearInterval(this.$data.updateInterval);
    clearInterval(this.$data.saveInterval);
  },
});
</script>

<style scoped>
.editing-workspace {
  height: 100%;
  /* background-color: aqua; */
}
</style>
