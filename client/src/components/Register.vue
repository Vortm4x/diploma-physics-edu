<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <div id="register" class="mt-10 pt-0 pl-4 pr-4 pb-2 elevation-2">
        <v-layout column>
          <v-flex xs6 offset-xs3>
            <h1 class="cyan">Register</h1>
            <v-divider></v-divider>
            <v-text-field
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              placeholder="email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              placeholder="password"
              v-model="password"
            ></v-text-field>
            <v-divider></v-divider>
            <div v-html="error" style="color: red"></div>
            <v-btn variant="outlined" @click="register">Register</v-btn>
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
