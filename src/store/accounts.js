import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";

Vue.use(Vuex);

const accounts = {
  namespaced: true,
  state: {
    accountsList: undefined,
    accountsLoading: false,
  },
  mutations: {
    setAccounts(state, val) {
      state.accountsList = val;
    },
    setAccountsLoading(state, val) {
      state.accountsLoading = val;
    },
  },
  actions: {
    async fetchAccounts({ commit }, user) {
      // fetch accounts
      commit("setAccountsLoading", true);
      await fb.accountsCollection
        .where("ownerUid", "==", user?.uid)
        .onSnapshot((querySnapshot) => {
          let accounts = [];
          querySnapshot.forEach((doc) => {
            accounts.push({ ...doc.data(), id: doc.id });
          });
          commit("setAccounts", accounts);
        });
      commit("setAccountsLoading", false);
    },
  },
  getters: {
    personalAccounts: (state, getters, rootState) => {
      return state.accountsList?.filter(
        (account) => account.ownerUid === rootState.account.userProfile.uid
      );
    },
    account: (state) => (id) => {
      return state.accountsList?.find((account) => account.id === id);
    },
  },
};

export default accounts;
