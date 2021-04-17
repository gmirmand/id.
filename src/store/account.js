import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";

Vue.use(Vuex);

const account = {
  namespaced: true,
  state: {
    userProfile: {},
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
      const userProfile = await fb.usersCollection.doc(user.uid).get();

      // set user profile in state
      commit("setUserProfile", userProfile.data());

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
      });

      // fetch user profile and set in state
      dispatch("fetchUserProfile", user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", {});
      router.push("/login");
    },
    async updateProfile({ dispatch, commit }, user) {
      const userId = fb.auth.currentUser.uid;
      // update user object
      commit("setUpdateProfilLoading", true);
      await fb.usersCollection.doc(userId).update({
        name: user.name,
        email: user.email,
      });
      commit("setUpdateProfilLoading", false);

      dispatch("fetchUserProfile", { uid: userId });

      // example to update all posts by user
      // const postDocs = await fb.postsCollection
      //   .where("userId", "==", userId)
      //   .get();
      // postDocs.forEach((doc) => {
      //   fb.postsCollection.doc(doc.id).update({
      //     userName: user.name,
      //   });
      // });
    },
  },
};

export default account;
