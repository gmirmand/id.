<template>
  <div :class="['user-avatar', big && 'user-avatar--big']">
    <!--- all random :) ---->
    <avataaars v-if="userProfile" />
    <Loading v-else />
  </div>
</template>

<script>
import Avataaars from "vuejs-avataaars";
import Loading from "../Loading";
import { mapState } from "vuex";

export default {
  name: "UserAvatar",
  props: {
    big: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Loading,
    Avataaars,
  },
  computed: {
    ...mapState("account", ["userProfile"]),
  },
};
</script>

<style scoped lang="scss">
.user-avatar {
  width: 5em;

  &--big {
    width: 12em;
  }
}
</style>
