<template>
  <v-app>
    <v-main class="app">
      <v-container fluid class="pa-0 app__container d-flex flex-column">
        <v-app-bar ligth class="flex-grow-0">
          <v-container fluid class="d-flex justify-space-between">
            <router-link to="/">
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
        <v-container>
          <router-view />
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import logo from "@/assets/img/svg/logo.svg";
import logoDark from "@/assets/img/svg/logo-dark.svg";

import { mapState } from "vuex";

export default {
  data() {
    return {
      logo,
      logoDark,
    };
  },
  components: {},
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return this.userProfile && Object.keys(this.userProfile).length > 0;
    },
  },
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style scoped lang="scss">
.app {
  &__container {
    min-height: 100vh;
  }
}
</style>
