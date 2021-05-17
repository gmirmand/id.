<template>
  <div :class="['platform-avatar']">
    <LiveIcon class="platform-avatar__status" active />
    <div class="platform-avatar__avatar">
      <transition name="fade">
        <avatar
          v-if="!platformLogo"
          :fullname="platform ? platform.name : 'ツ'"
          class="platform-avatar__generated-img"
        />
        <img v-else :src="platformLogo" alt="" class="platform-avatar__logo" />
      </transition>
    </div>
  </div>
</template>

<script>
import LiveIcon from "../LiveIcon";
import Avatar from "vue-avatar-component";
import { storagePlatformsLogos } from "../../firebase";

export default {
  name: "PlatformAvatar",
  data() {
    return {
      platformLogo: undefined,
    };
  },
  components: { LiveIcon, Avatar },
  props: {
    platform: {
      type: Object,
      default: undefined,
    },
  },
  watch: {
    platform(platform) {
      if (platform?.logo) {
        storagePlatformsLogos
          .child(platform.logo)
          .getDownloadURL()
          .then((url) => {
            this.platformLogo = url;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.platform-avatar {
  position: relative;

  &__status {
    position: absolute;
    z-index: 1;
    top: -0.5em;
    left: -0.5em;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    position: relative;
  }

  &__logo {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
