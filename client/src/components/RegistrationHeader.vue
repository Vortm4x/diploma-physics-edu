<template>
  <v-toolbar fixed dark>
    <v-toolbar-title class="mr-4">Optical Sim</v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        @click="navigateTo('EditScenario')"
        >Edit Scenario</v-btn
      >
      <v-btn v-if="$store.state.isUserLoggedIn" @click="navigateTo('groups')"
        >Groups</v-btn
      >
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo('register')"
        >Sign up</v-btn
      >
      <v-btn v-if="!$store.state.isUserLoggedIn" @click="navigateTo('login')"
        >Log in</v-btn
      >
      <v-btn v-if="$store.state.isUserLoggedIn" @click="logOut()"
        >Log Out</v-btn
      >
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RegistrationHeader",
  methods: {
    navigateTo(route: any) {
      this.$router.push({ name: route });
    },
    logOut() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setEmail", null);
      // this.$store.dispatch("setisUserLoggedIn", false);
      this.$router.push({ name: "login" });
    },
  },
});
</script>

<style scoped>
v-toolbar {
  justify-content: left;
  flex-direction: left;
}
a {
  display: flex;
  align-items: center;
}
</style>
