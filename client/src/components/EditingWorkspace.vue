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
import LaserPointer from "./engine/LaserPointer";
import Mirror from "./engine/Mirror";
import LightSensor from "./engine/LightSensor";
import Vector from "./engine/Vector";

export default defineComponent({
  name: "EditingWorkspace",
  mounted() {
    const scene = new Scene("editing-canvas", 800, 500);

    const pointer = new LaserPointer();
    const mirrorA = new Mirror();
    const mirrorB = new Mirror();
    const sensor = new LightSensor();

    pointer.pos = new Vector(50, 250);
    pointer.degrees = -36;

    mirrorA.pos = new Vector(290, 70);
    mirrorA.degrees = -15;

    mirrorB.pos = new Vector(400, 100);
    mirrorB.degrees = 90;

    sensor.pos = new Vector(600, 400);
    sensor.lockMovementX = true;
    sensor.lockMovementY = true;

    scene.addObject(pointer);
    scene.addObject(mirrorA);
    scene.addObject(mirrorB);
    scene.addObject(sensor);
  },
});
</script>

<style scoped>
.editing-workspace {
  height: 100%;
  background-color: aqua;
}
</style>
