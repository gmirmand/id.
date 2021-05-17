<template>
  <v-list class="dashboard-list" elevation="4">
    <v-subheader :class="['white--text primary']">
      {{ !shared ? "Vos comptes" : "Comptes partagés" }}
    </v-subheader>

    <v-list-item
      v-for="account of accounts"
      :to="`/platform/${account.id}`"
      link
      :key="account.id"
      class="dashboard-list__item"
    >
      <v-list-item-avatar class="mr-5 ml-1 overflow-visible">
        <PlatformAvatar :platform="account" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="account.name"></v-list-item-title>

        <v-list-item-subtitle
          v-text="personal ? 'Vous' : account.owner.name"
        ></v-list-item-subtitle>
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
import { mapState } from "vuex";
import Loading from "../Loading";

export default {
  name: "DashboardList",
  components: { Loading, PlatformAvatar, LiveIcon, DashboardPlay },
  computed: {
    ...mapState("platforms", ["platformsList"]),
  },
  props: {
    accounts: {
      type: Array,
      default: () => [],
    },
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
