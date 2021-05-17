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
    addPlatforms(state, val) {
      state.platformsList
        ? state.platformsList.push(val)
        : (state.platformsList = [val]);
    },
    setPlatforms(state, val) {
      state.platforms = val;
    },
    setPlatformsLoading(state, val) {
      state.platformsLoading = val;
    },
  },
  actions: {
    async fetchPlatforms({ commit }) {
      // fetch platforms
      commit("setPlatformsLoading", true);
      await fb.platformsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commit("addPlatforms", { ...doc.data(), id: doc.id });
        });
      });
      commit("setPlatformsLoading", false);
    },
  },
};

export default platforms;
