<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <div id="register">
        <v-layout column>
          <v-flex xs6 offset-xs3>
            <h1>Register</h1>
            <v-divider></v-divider>
            <v-chip class="elevation-2">
              <input
                type="email"
                name="email"
                placeholder="email"
                v-model="email"
              />
            </v-chip>
            <br />
            <v-chip class="elevation-2">
              <input
                type="password"
                name="password"
                placeholder="password"
                v-model="password"
              />
            </v-chip>
            <br />
            <v-divider></v-divider>
            <div v-html="error"></div>
            <button @click="register">Register</button>
          </v-flex>
        </v-layout>
      </div>
    </v-row>
  </v-container>
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
#register {
  width: fit-content;
}

.class {
  color: black;
}
</style>
