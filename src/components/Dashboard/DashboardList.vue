<template>
  <v-list class="dashboard-list">
    <v-subheader :class="['white--text primary']">
      {{ !shared ? "Vos comptes" : "Comptes partagés" }}
    </v-subheader>

    <v-list-item
      :to="`/platform/${1}`"
      link
      :key="'file.title'"
      class="dashboard-list__item"
    >
      <v-list-item-avatar class="mr-5 ml-1 overflow-visible">
        <PlatformAvatar platform="Netflix" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="'Netflix'"></v-list-item-title>

        <v-list-item-subtitle v-text="'de Getget'"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <DashboardPlay :platform-id="1" />
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import DashboardPlay from "./DashboardPlay";
import LiveIcon from "../LiveIcon";
import PlatformAvatar from "../Platform/PlatformAvatar";

export default {
  name: "DashboardList",
  components: { PlatformAvatar, LiveIcon, DashboardPlay },
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
}
</style>
