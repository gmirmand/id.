<template>
  <v-list class="dashboard-list">
    <v-subheader :class="['white--text primary']">
      {{ !shared ? "Vos comptes" : "Comptes partagés" }}
    </v-subheader>

    <v-list-item link :key="'file.title'" class="dashboard-list__item">
      <LiveIcon class="dashboard-list__item-status" />

      <v-list-item-avatar class="mr-3 ml-1">
        <vue-initials-img name="Youtube" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="'file.title'"></v-list-item-title>

        <v-list-item-subtitle
          v-text="'file.description'"
        ></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1" small>mdi-comment</v-icon>
        </v-btn>
      </v-list-item-action>

      <v-list-item-action>
        <DashboardPlay accound-id="accound-id" />
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import DashboardPlay from "./DashboardPlay";
import LiveIcon from "../LiveIcon";

export default {
  name: "DashboardList",
  components: { LiveIcon, DashboardPlay },
  props: {
    personal: {
      type: Boolean,
      default: true,
    },
    shared: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard-list {
  &__item {
    position: relative;
  }

  &__item-status {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
