<template>
  <div class="dashboard-list">
    <v-subheader inset>
      {{ !shared ? "Vos comptes" : "Comptes partagés" }}
    </v-subheader>

    <v-list-item link :key="'file.title'">
      <v-list-item-avatar> logo </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-text="'file.title'"></v-list-item-title>

        <v-list-item-subtitle
          v-text="'file.description'"
        ></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1">mdi-comment</v-icon>
        </v-btn>
      </v-list-item-action>

      <v-list-item-action>
        <DashboardPlay accound-id="accound-id" />
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
import DashboardPlay from "./DashboardPlay";
export default {
  name: "DashboardList",
  components: { DashboardPlay },
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

<style scoped></style>
