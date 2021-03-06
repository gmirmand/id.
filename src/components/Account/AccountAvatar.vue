<template>
  <div :class="['account-avatar']">
    <LiveIcon :active="active" class="account-avatar__status" />
    <div class="account-avatar__avatar elevation-6">
      <transition name="fade">
        <avatar
          v-if="!accountLogo"
          :fullname="account && account.name ? account.name : 'ツ'"
          class="account-avatar__generated-img"
        />
        <img v-else :src="accountLogo" alt="" class="account-avatar__logo" />
      </transition>
    </div>
  </div>
</template>

<script>
import LiveIcon from "../LiveIcon";
import Avatar from "vue-avatar-component";
import { storagePlatformsLogos } from "../../firebase";
import { isBefore } from "date-fns";

export default {
  name: "AccountAvatar",
  data() {
    return {
      accountLogo: undefined,
    };
  },
  components: { LiveIcon, Avatar },
  props: {
    account: {
      type: Object,
      default: undefined,
    },
  },
  mounted() {
    this.getLogo();
  },
  computed: {
    active() {
      const now = new Date();
      const isActive = (event) => {
        return (
          isBefore(new Date(event.start), now) &&
          isBefore(now, new Date(event.end))
        );
      };
      return this.account?.events?.some(isActive);
    },
  },
  watch: {
    account() {
      this.accountLogo = undefined;
      this.getLogo();
    },
  },
  methods: {
    getLogo() {
      if (this.account?.logo) {
        storagePlatformsLogos
          .child(this.account.logo)
          .getDownloadURL()
          .then((url) => {
            this.accountLogo = url;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.account-avatar {
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
    border-radius: 50%;
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
