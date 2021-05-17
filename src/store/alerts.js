import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const account = {
  namespaced: true,
  state: {
    alertsList: [],
  },
  mutations: {
    pushAlert(state, payload) {
      state.alertsList.push(payload);
    },
    popLastAlert(state) {
      state.alertsList.pop();
    },
  },
  actions: {
    pushSuccessAlert({ commit }, payload) {
      commit("pushAlert", {
        message: payload.message || "Succés",
        type: "success",
      });
      setTimeout(() => {
        commit("popLastAlert");
      }, payload.duration || 8000);
    },
    pushErrorAlert({ commit }, payload) {
      commit("pushAlert", {
        message: payload.message || "Une erreur est survenue",
        type: "error",
      });
      setTimeout(() => {
        commit("popLastAlert");
      }, payload.duration || 8000);
    },
    pushInfoAlert({ commit }, payload) {
      commit("pushAlert", { message: payload.message, type: "info" });
      setTimeout(() => {
        commit("popLastAlert");
      }, payload.duration || 8000);
    },
    pushWarningAlert({ commit }, payload) {
      commit("pushAlert", { message: payload.message, type: "warning" });
      setTimeout(() => {
        commit("popLastAlert");
      }, payload.duration || 8000);
    },
  },
};

export default account;
