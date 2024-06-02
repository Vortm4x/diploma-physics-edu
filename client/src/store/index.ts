import { createStore } from "vuex";

export default createStore({
  strict: true,
  state: {
    token: null,
    email: null,
    isUserLoggedIn: false,
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!token;
    },
    setEmail(state, email) {
      state.email = email;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setEmail({ commit }, email) {
      commit("setEmail", email);
    },
  },
  modules: {},
});
