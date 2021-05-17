import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase";
import "./assets/scss/app.scss";
import vuetify from "./plugins/vuetify";
import VueClipboard from "vue-clipboard2";

Vue.use(VueClipboard);

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }

  if (user) {
    store.dispatch("account/fetchUserProfile", user);
    store.dispatch("accounts/fetchAccounts", user);
  }

  store.dispatch("platforms/fetchPlatforms");
});
