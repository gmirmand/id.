<template>
  <v-navigation-drawer :value="drawer" @input="toggle" absolute temporary>
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ userProfile.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ userProfile.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-animation-play</v-icon>
        </v-list-item-icon>
        <v-list-item-title> Tableau de bord</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/settings">
        <v-list-item-icon>
          <v-icon>mdi-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-title> Paramètres</v-list-item-title>
      </v-list-item>
      <v-list-item link @click="logout()">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title> Se déconnecter</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navigation",
  data() {
    return {
      group: null,
    };
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle(e) {
      !e && this.$emit("close");
    },
    logout() {
      this.$store.dispatch("account/logout");
    },
  },
  computed: {
    ...mapState("account", ["userProfile"]),
  },
};
</script>

<style scoped></style>
