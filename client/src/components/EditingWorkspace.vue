<template>
  <div class="editing-workspace">
    <canvas id="editing-canvas"></canvas>
    <img
      id="laser-pointer"
      src="../assets/laser-pointer.png"
      style="display: none"
    />
    <img id="mirror" src="../assets/mirror.png" style="display: none" />
    <img id="sensor" src="../assets/sensor-fail.png" style="display: none" />
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
    return scene.export();
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
          width: 20,
          height: 100,
          color: "green",
        },
        {
          type: "TransparentObstacle",
          x: 300,
          y: 300,
          degrees: 15,
          lockMovementX: false,
          lockMovementY: false,
          width: 20,
          height: 100,
          color: "red",
          refractionCoef: 1.8,
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
    /*
    scene = new Scene(800, 500);

    const pointer = new LaserPointer();
    const mirrorA = new Mirror();
    const mirrorB = new Mirror();
    const mirrorC = new Mirror();
    const mirrorD = new Mirror();
    const sensor = new LightSensor();

    pointer.pos = new Vector(250, 70);
    pointer.degrees = 70;

    mirrorA.pos = new Vector(290, 70);
    mirrorA.degrees = -15;

    mirrorB.pos = new Vector(400, 100);
    mirrorB.degrees = 90;

    mirrorC.pos = new Vector(200, 100);
    mirrorC.degrees = 70;

    mirrorD.pos = new Vector(20, 100);
    mirrorD.degrees = -20;

    sensor.pos = new Vector(600, 400);
    sensor.lockMovementX = true;
    sensor.lockMovementY = true;

    scene.addObject(pointer);
    scene.addObject(mirrorA);
    scene.addObject(mirrorB);
    scene.addObject(mirrorC);
    scene.addObject(mirrorD);
    scene.addObject(sensor);

    const rect = new TransparentObstacle(100, 240, "grey", 1.8);
    rect.pos = new Vector(250, 300);
    rect.degrees = 90;
    scene.addObject(rect);

    */
    const updateCallback = () => {
      scene.update();
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
