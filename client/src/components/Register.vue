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
    <button @click="register">Register</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthService from "@/services/AuthService";

export default defineComponent({
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  watch: {
    email(value) {
      console.log("TODO validate email");
    },
  },
  methods: {
    async register() {
      const response = await AuthService.register({
        email: this.email,
        password: this.password,
      });
      console.log(response.data);
      console.log("TODO register user");
    },
  },
});
</script>

<style scoped>
.class {
  color: black;
}
</style>
