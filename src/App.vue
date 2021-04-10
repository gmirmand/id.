<template>
  <v-app>
    <v-main class="app">
      <v-container fill-height fluid>
        <SiteNav v-if="showNav"></SiteNav>
        <div class="d-flex ma-4 align-self-start flex-grow-1">
          <router-view />
        </div>
      </v-container>
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
      return Object.keys(this.userProfile).length > 0;
    },
  },
};
</script>
