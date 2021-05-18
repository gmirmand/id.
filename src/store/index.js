import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import accounts from "./accounts";
import alerts from "./alerts";
import platforms from "./platforms";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    user,
    accounts,
    alerts,
    platforms,
  },
});
