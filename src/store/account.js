import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

const account = {
  namespaced: true,
  state: {
    userProfile: null,
    loginLoading: false,
    signupLoading: false,
    updateProfilLoading: false,
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setLoginLoading(state, val) {
      state.loginLoading = val;
    },
    setSignupLoading(state, val) {
      state.signupLoading = val;
    },
    setUpdateProfilLoading(state, val) {
      state.updateProfilLoading = val;
    },
  },
  actions: {
    async login({ dispatch, commit }, form) {
      // sign user in
      commit("setLoginLoading", true);
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      commit("setLoginLoading", false);

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      let userProfile = await fb.usersCollection.doc(user.uid).get();
      userProfile = userProfile.data();

      await fb.usersCollection
        .doc(user.uid)
        .collection("accounts")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            !userProfile.accounts
              ? (userProfile.accounts = [{ ...doc.data(), id: doc.id }])
              : userProfile.accounts.push({ ...doc.data(), id: doc.id });
          });
        });
      // set user profile in state
      commit("setUserProfile", { uid: user.uid, ...userProfile });

      // change route to dashboard
      if (router.currentRoute.path === "/login") {
        router.push("/");
      }
    },
    async signup({ dispatch, commit }, form) {
      // sign user up
      commit("setLoginLoading", true);
      const { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );
      commit("setLoginLoading", false);

      // create user profile object in userCollections
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email,
        avatar: {},
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", null);
      router.push("/login");
    },
    async updateProfile({ dispatch, commit }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      commit("setUpdateProfilLoading", true);
      await fb.usersCollection.doc(userId).update({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
      commit("setUpdateProfilLoading", false);

      dispatch("fetchUserProfile", { uid: userId });
    },
    async updateAvatar({ dispatch, commit, state }, asset) {
      const userId = fb.auth.currentUser.uid;
      const user = state.userProfile;
      user.avatar[asset.id] = asset.value;

      commit("setUpdateProfilLoading", true);
      await fb.usersCollection.doc(userId).update(user);
      commit("setUpdateProfilLoading", false);

      dispatch("fetchUserProfile", { uid: userId });
    },
  },
  getters: {
    accounts: (state) => {
      return state.userProfile?.accounts;
    },
  },
};

export default account;
