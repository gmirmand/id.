import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";

Vue.use(Vuex);

const platforms = {
  namespaced: true,
  state: {
    platformsList: undefined,
    platformsLoading: false,
  },
  mutations: {
    setPlatforms(state, val) {
      state.platformsList = val;
    },
    setPlatformsLoading(state, val) {
      state.platformsLoading = val;
    },
  },
  actions: {
    async fetchPlatforms({ commit }) {
      // fetch platforms
      commit("setPlatformsLoading", true);
      await fb.platformsCollection.onSnapshot((querySnapshot) => {
        let platforms = [];
        querySnapshot.forEach((doc) => {
          platforms.push({ ...doc.data(), id: doc.id });
        });
        commit("setPlatforms", platforms);
      });
      commit("setPlatformsLoading", false);
    },
  },
};

export default platforms;
