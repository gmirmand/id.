<template>
  <v-app>
    <v-main>
      <SiteNav v-if="showNav"></SiteNav>
      <router-view />
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
