<template>
  <section class="dashboard">
    <DashboardList personal class="mb-6" />

    <div class="d-flex justify-center mt-2 mb-6">
      <v-btn class="mx-2" fab elevation="6">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </div>

    <DashboardList shared />
  </section>
</template>

<script>
import DashboardList from "../components/Dashboard/DashboardList";
import { mapGetters } from "vuex";

export default {
  components: { DashboardList },
  computed: {
    ...mapGetters("account", ["accounts"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
