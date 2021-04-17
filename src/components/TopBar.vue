<template>
  <v-app-bar ligth class="flex-grow-0">
    <v-container fluid class="d-flex justify-space-between align-center">
      <v-app-bar-nav-icon
        v-if="userProfile"
        @click="toggle"
      ></v-app-bar-nav-icon>
      <router-link to="/" class="self">
        <v-toolbar-title>
          <v-img
            :src="this.$vuetify.theme.dark ? logoDark : logo"
            max-width="50"
            max-height="50"
          />
        </v-toolbar-title>
      </router-link>
      <div>
        <v-tooltip v-if="!$vuetify.theme.dark" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" small fab @click="darkMode">
              <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode On</span>
        </v-tooltip>

        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" small fab @click="darkMode">
              <v-icon>mdi-white-balance-sunny</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode Off</span>
        </v-tooltip>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import logo from "@/assets/img/svg/logo.svg";
import logoDark from "@/assets/img/svg/logo-dark.svg";
import { mapState } from "vuex";
export default {
  name: "TopBar",
  data() {
    return {
      logo,
      logoDark,
    };
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  computed: {
    ...mapState("account", ["userProfile"]),
  },
};
</script>

<style scoped></style>
