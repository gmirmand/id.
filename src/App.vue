<template>
  <v-app>
    <v-main class="app">
      <Navigation :drawer="drawer" @close="drawer = !drawer" />
      <TopBar @toggle="drawer = !drawer" />
      <v-container fluid class="pa-0 app__container d-flex flex-column">
        <v-container>
          <router-view />
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "@/components/Navigation";
import TopBar from "@/components/TopBar";

export default {
  data() {
    return {
      drawer: false,
    };
  },
  components: { TopBar, Navigation },
  computed: {
    ...mapState(["userProfile"]),
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
