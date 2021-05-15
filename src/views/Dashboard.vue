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
export default {
  components: { DashboardList },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
