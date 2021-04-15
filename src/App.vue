<template>
  <v-app>
    <v-main class="app">
      <v-app-bar color="yellow darken-1 font-weight-bold">
        <v-toolbar-title> GetGet Streaming </v-toolbar-title>
      </v-app-bar>
      <SiteNav v-if="showNav"></SiteNav>
      <div class="d-flex ma-4 align-self-start flex-grow-1">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import SiteNav from "./components/SiteNav";

import { mapState } from "vuex";

export default {
  components: { SiteNav },
  computed: {
    ...mapState(["userProfile"]),
    showNav() {
      return this.userProfile && Object.keys(this.userProfile).length > 0;
    },
  },
};
</script>
