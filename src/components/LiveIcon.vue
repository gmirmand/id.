<template>
  <div
    :class="[
      'live-icon',
      !active && ($vuetify.theme.dark ? 'grey darken-3' : 'grey lighten-2'),
      active && 'live-icon--active red darken-3 red--text lighten-2--text',
    ]"
  ></div>
</template>

<script>
export default {
  name: "LiveIcon",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.live-icon {
  $width: 0.75em;

  width: $width;
  height: $width;
  border-radius: 50%;
  position: relative;
  margin: 0.5em;

  &--active {
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 currentColor;
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 0.5em rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
