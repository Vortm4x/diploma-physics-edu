<template>
  <div id="register">
    <h1>Register</h1>

    <input type="email" name="email" placeholder="email" v-model="email" />
    <br />
    <input
      type="password"
      name="password"
      placeholder="password"
      v-model="password"
    />
    <br />
    <div v-html="error"></div>
    <button @click="register">Register</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";
import { log } from "fabric/fabric-impl";

export default defineComponent({
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  watch: {
    email(value) {
      console.log("TODO validate email");
    },
  },
  methods: {
    async register() {
      this.error = null;
      try {
        const response = await AuthService.register({
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
      } catch (error: any) {
        this.error = error.response.data.error;
        console.log(error.response);
      }
    },
  },
});
</script>

<style scoped>
.class {
  color: black;
}
</style>
