import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: "#500472",
        secondary: "#79cbb8",
      },
      dark: {
        primary: "#79cbb8",
        secondary: "#500472",
      },
    },
  },
});
