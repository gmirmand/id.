<template>
  <div v-if="userProfile" id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  computed: {
    ...mapState(["userProfile", "posts"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
