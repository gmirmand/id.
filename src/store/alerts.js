import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const account = {
  namespaced: true,
  state: {
    successAlert: [],
  },
  mutations: {
    pushSucessAlert(state, payload) {
      state.successAlert.push(payload);
    },
    popLastSuccessAlert(state) {
      state.successAlert.pop();
    },
  },
  actions: {
    pushSuccessAlert({ commit }, payload) {
      commit("pushSucessAlert", { message: payload.message || "Succés" });
      setTimeout(() => {
        commit("popLastSuccessAlert");
      }, payload.duration || 8000);
    },
  },
};

export default account;
