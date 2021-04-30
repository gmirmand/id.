<template>
  <section class="dashboard">
    <v-list>
      <DashboardList personal />

      <v-divider inset></v-divider>

      <DashboardList shared />
    </v-list>
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
