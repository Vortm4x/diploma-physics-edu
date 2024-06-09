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

    <v-btn class="mr-4" @click="saveScene">Save</v-btn>
    <v-btn class="mr-4" @click="addLaser">Add laser</v-btn>
    <v-btn class="mr-4" @click="addSensor">Add sensor</v-btn>
    <v-btn class="mr-4" @click="addMirror">Add mirror</v-btn>
    <v-btn class="mr-4" @click="addBrick">Add brick</v-btn>
    <v-btn class="mr-4" @click="addGlass">Add glass</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Scene from "./engine/Scene";
import ScenariosService from "@/services/ScenariosService";
import LightSensor from "./engine/LightSensor";
import LaserPointer from "./engine/LaserPointer";
import Mirror from "./engine/Mirror";
import OpaqueObstacle from "./engine/OpaqueObstacle";
import TransparentObstacle from "./engine/TransparentObstacle";
import Actor from "./engine/Actor";
import Vector from "./engine/Vector";

let scene: any;

const saveScene = (component: any) => {
  const exportJson = JSON.stringify(component.$data.export);
  ScenariosService.saveScenario(
    component.$store.state.token as string,
    component.$route.params.id as string,
    exportJson
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
    getActorRandPos(actor: Actor): Vector {
      const maxDim = Math.max(actor.width, actor.height);

      return new Vector(
        Math.random() * (scene.width - 2 * maxDim) + maxDim,
        Math.random() * (scene.height - 2 * maxDim) + maxDim
      );
    },
    addLaser() {
      const laser = new LaserPointer();

      laser.pos = this.getActorRandPos(laser);
      laser.degrees = Math.random() * 360;

      (scene as Scene).addObject(laser, true);
    },
    addSensor() {
      const sensor = new LightSensor();

      sensor.pos = this.getActorRandPos(sensor);
      sensor.degrees = Math.random() * 360;

      (scene as Scene).addObject(sensor, true);
    },
    addMirror() {
      const mirror = new Mirror();

      mirror.pos = this.getActorRandPos(mirror);
      mirror.degrees = Math.random() * 360;

      (scene as Scene).addObject(mirror, true);
    },
    addBrick() {
      const brick = new OpaqueObstacle(50, 50, "orange");

      brick.pos = this.getActorRandPos(brick);
      brick.degrees = Math.random() * 360;
      brick.resizeControlsEnabled = true;

      (scene as Scene).addObject(brick, true);
    },
    addGlass() {
      const glass = new TransparentObstacle(100, 20, "blue", 1.666);

      glass.pos = this.getActorRandPos(glass);
      glass.degrees = Math.random() * 360;
      glass.resizeControlsEnabled = true;

      (scene as Scene).addObject(glass, true);
    },
    saveScene() {
      saveScene(this);
    },
  },

  mounted() {
    setTimeout(async () => {
      // const sceneData = undefined;
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
        scene = new Scene(800, 500);
      }

      const updateCallback = () => {
        scene.update();
      };

      this.$data.updateInterval = setInterval(updateCallback, 1000 / 60);
      this.$data.saveInterval = setInterval(saveScene, 1000 * 30, this);
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
