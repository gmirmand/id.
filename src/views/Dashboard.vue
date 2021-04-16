<template>
  <section v-if="userProfile" id="dashboard">
    <div class="col1">
      <div class="profile">
        <h5>{{ userProfile.name }}</h5>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
