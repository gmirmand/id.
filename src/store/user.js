import Vue from "vue";
import Vuex from "vuex";
import * as fb from "../firebase";
import router from "../router/index";
import { sendError } from "../helpers/errors";

Vue.use(Vuex);

const user = {
  namespaced: true,
  state: {
    userProfile: null,
    usersList: null,
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
    setUpdateProfilLoading(state, val) {
      state.updateProfilLoading = val;
    },
    setUsers(state, val) {
      state.usersList = val;
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
      let userProfile = await fb.usersCollection
        .doc(user.uid)
        .onSnapshot((querySnapshot) => {
          userProfile = querySnapshot.data();

          // set user profile in state
          commit("setUserProfile", { uid: user.uid, ...userProfile });

          // change route to dashboard
          if (router.currentRoute.path === "/login") {
            router.push(
              userProfile?.avatar
                ? { name: "Dashboard" }
                : { name: "Settings", hash: "#avatar" }
            );
          }
        });
    },
    async signup({ dispatch, commit }, form) {
      // sign user up
      commit("setLoginLoading", true);
      await fb.auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(async ({ user }) => {
          // create user profile object in userCollections
          await fb.usersCollection.doc(user.uid).set({
            name: form.name,
            email: form.email,
            uid: user.uid,
          });

          // fetch user profile and set in state
          dispatch("fetchUserProfile", user);
        })
        .catch((err) => {
          sendError(err);
        });
      commit("setLoginLoading", false);
    },
    async logout({ commit }) {
      await fb.auth.signOut();

      // clear userProfile and redirect to /login
      commit("setUserProfile", null);
      router.push("/login");
    },
    async updateProfile({ dispatch, commit }, user) {
      const userUid = fb.auth.currentUser.uid;
      // update user object
      commit("setUpdateProfilLoading", true);
      await fb.usersCollection
        .doc(userUid)
        .update({
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        })
        .then(() => {
          dispatch(
            "alerts/pushSuccessAlert",
            {
              message: "Profil mis à jour avec succès ! Bien joué bg",
            },
            { root: true }
          );
        })
        .catch((err) => {
          sendError(err);

          dispatch(
            "alerts/pushErrorAlert",
            {
              message: err.message,
            },
            { root: true }
          );
        });
      commit("setUpdateProfilLoading", false);
    },
    async updateAvatar({ commit, state }, asset) {
      const userUid = fb.auth.currentUser.uid;
      const user = state.userProfile;
      user.avatar[asset.id] = asset.value;

      commit("setUpdateProfilLoading", true);
      await fb.usersCollection.doc(userUid).update(user);
      commit("setUpdateProfilLoading", false);
    },
    async fetchUsers({ commit, state }) {
      await fb.usersCollection
        .where("uid", "!=", state.userProfile.uid)
        .get()
        .then((query) => {
          let users = [];
          query.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
          });
          commit("setUsers", users);
        });
    },
  },
};

export default user;
