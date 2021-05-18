import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";
import { sendError } from "../helpers/errors";

Vue.use(Vuex);

const accounts = {
  namespaced: true,
  state: {
    personalAccountsList: undefined,
    sharedAccountsList: undefined,
    accountsLoading: false,
  },
  mutations: {
    setPersonalAccounts(state, val) {
      state.personalAccountsList = val;
    },
    setSharedAccounts(state, val) {
      state.sharedAccountsList = val;
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
          commit("setPersonalAccounts", accounts);
        });
      await fb.accountsCollection
        .where("members", "array-contains", user?.uid)
        .onSnapshot((querySnapshot) => {
          let accounts = [];
          querySnapshot.forEach((doc) => {
            accounts.push({ ...doc.data(), id: doc.id });
          });
          commit("setSharedAccounts", accounts);
        });

      commit("setAccountsLoading", false);
    },
    async updateAccount({ dispatch, commit }, account) {
      commit("setAccountsLoading", true);

      const doc = fb.accountsCollection.doc(account.id);
      await doc
        .update(account)
        .then(() => {
          dispatch(
            "alerts/pushSuccessAlert",
            {
              message: "Compte mis à jour avec succès ! Bien joué bg",
            },
            { root: true }
          );
        })
        .catch((err) => {
          sendError(err);
        });
      commit("setAccountsLoading", false);
    },
    async createAccount({ dispatch, commit }, account) {
      commit("setAccountsLoading", true);

      const doc = fb.accountsCollection.doc();
      await doc
        .set({ ...account, id: doc.id })
        .then(() => {
          router.push({ name: "Account", params: { id: doc.id } });

          dispatch(
            "alerts/pushSuccessAlert",
            {
              message: "Compte créé avec succès ! Bien joué bg",
            },
            { root: true }
          );
        })
        .catch((err) => {
          sendError(err);
        });
      commit("setAccountsLoading", false);
    },
  },
  getters: {
    allAccounts: (state) => {
      return state.personalAccountsList?.concat(state.sharedAccountsList);
    },
    account: (state, getters) => (id) => {
      return getters.allAccounts?.find((account) => account.id === id);
    },
  },
};

export default accounts;
