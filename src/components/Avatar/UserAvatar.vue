<template>
  <div :class="['user-avatar', big && 'user-avatar--big']">
    <!--- all random :) ---->
    <avataaars></avataaars>
  </div>
</template>

<script>
import Avataaars from "vuejs-avataaars";

export default {
  name: "UserAvatar",
  props: {
    big: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Avataaars,
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
