import { createApp } from "vue";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/dist/vuetify.min.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App).use(store).use(router).use(vuetify).mount("#app");
