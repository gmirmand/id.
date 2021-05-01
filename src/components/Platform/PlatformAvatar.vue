<template>
  <div :class="['platform-avatar', big && 'platform-avatar--big']">
    <LiveIcon class="platform-avatar__status" active />
    <div class="platform-avatar__avatar">
      <vue-initials-img class="platform-avatar__generated-img" name="Youtube" />
    </div>
  </div>
</template>

<script>
import LiveIcon from "../LiveIcon";
export default {
  name: "PlatformAvatar",
  components: { LiveIcon },
  props: {
    platformId: {
      type: Number,
      required: true,
    },
    big: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.platform-avatar {
  width: 2.5em;
  max-height: 2.5em;
  position: relative;

  &--big {
    font-size: 2em;
  }

  &__img {
    width: 100%;
    height: 100%;
  }

  &__status {
    position: absolute;
    top: -0.5em;
    left: -0.5em;
  }

  &__generated-img {
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}
</style>
