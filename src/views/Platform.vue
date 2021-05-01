<template>
  <section class="platform"></section>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  computed: {
    ...mapState("account", ["userProfile"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
