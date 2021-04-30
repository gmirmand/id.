<template>
  <section class="dashboard">
    <DashboardList personal class="mb-6" />
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
