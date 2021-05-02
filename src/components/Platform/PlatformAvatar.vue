<template>
  <div :class="['platform-avatar']">
    <LiveIcon class="platform-avatar__status" active />
    <div class="platform-avatar__avatar">
      <avatar :fullname="platform" class="platform-avatar__generated-img" />
    </div>
  </div>
</template>

<script>
import LiveIcon from "../LiveIcon";
import Avatar from "vue-avatar-component";

export default {
  name: "PlatformAvatar",
  components: { LiveIcon, Avatar },
  props: {
    platform: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.platform-avatar {
  position: relative;

  &__status {
    position: absolute;
    top: -0.5em;
    left: -0.5em;
  }
}
</style>
