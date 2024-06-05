<template>
  <div class="editing-workspace">
    <canvas id="editing-canvas"></canvas>
    <img
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
// import LaserPointer from "./engine/LaserPointer";
// import Mirror from "./engine/Mirror";
// import LightSensor from "./engine/LightSensor";
// import Vector from "./engine/Vector";
// import TransparentObstacle from "./engine/TransparentObstacle";

let scene = new Scene(0, 0);

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
    };
  },

  mounted() {
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
          type: "LaserPointer",
          x: 70,
          y: 300,
          degrees: 130,
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
          type: "OpaqueObstacle",
          x: 400,
          y: 400,
          degrees: -15,
          lockMovementX: false,
          lockMovementY: false,
          width: 70,
          height: 70,
          color: "blue",
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
        {
          type: "LightSensor",
          x: 450,
          y: 250,
          degrees: 60,
          lockMovementX: false,
          lockMovementY: false,
        },
      ],
    });

    const updateCallback = () => {
      scene.update();
      console.log(this.$data.score);
    };

    setInterval(updateCallback, 1000 / 60);
  },
});
</script>

<style scoped>
.editing-workspace {
  height: 100%;
  background-color: aqua;
}
</style>
