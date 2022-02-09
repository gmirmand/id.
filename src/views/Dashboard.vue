<template>
  <section class="dashboard">
    <NotificationAuthorization />

    <DashboardList personal class="mb-6" :accounts="personalAccountsList" />

    <div class="d-flex justify-center mt-2 mb-6">
      <v-btn :to="{ name: 'AddAccount' }" class="mx-2" fab elevation="6">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </div>

    <DashboardList shared :accounts="sharedAccountsList" />
  </section>
</template>

<script>
import DashboardList from "@/components/Dashboard/DashboardList";
import NotificationAuthorization from "@/components/NotificationAuthorization";
import { mapState } from "vuex";

export default {
  components: { NotificationAuthorization, DashboardList },
  computed: {
    ...mapState("accounts", ["personalAccountsList", "sharedAccountsList"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
