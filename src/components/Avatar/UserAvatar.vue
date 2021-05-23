<template>
  <div
    :class="[
      'user-avatar',
      big && 'user-avatar--big',
      small && 'user-avatar--small',
      xSmall && 'user-avatar--x-small',
    ]"
  >
    <div
      v-if="computedUser"
      class="d-flex flex-column justify-center align-center"
    >
      <v-avatar class="user-avatar__avatar-wrapper mb-1">
        <LiveIcon v-if="live" active class="user-avatar__live" />
        <Avataaars
          class="user-avatar__avatar"
          :accessoriesType="computedUser.avatar.accessoriesTypes"
          :clotheType="computedUser.avatar.clotheTypes"
          :clotheColor="
            computedUser.avatar.clotheColors &&
            computedUser.avatar.clotheColors.id
          "
          :eyebrowType="computedUser.avatar.eyebrowTypes"
          :eyeType="computedUser.avatar.eyeTypes"
          :facialHairColor="
            computedUser.avatar.facialHairColors &&
            computedUser.avatar.facialHairColors.id
          "
          :facialHairType="computedUser.avatar.facialHairTypes"
          :graphicType="computedUser.avatar.GraphicShirtTypes"
          :hairColor="
            computedUser.avatar.hairColors && computedUser.avatar.hairColors.id
          "
          :mouthType="computedUser.avatar.mouthTypes"
          :skinColor="
            computedUser.avatar.skinColors && computedUser.avatar.skinColors.id
          "
          :topType="computedUser.avatar.topTypes"
          :topColor="
            computedUser.avatar.topColors && computedUser.avatar.topColors.id
          "
        />
      </v-avatar>
      <span v-if="showName" class="user-avatar__name text-caption text-center">
        {{ computedUser.name }}
      </span>
      <span
        v-if="isOwner"
        class="user-avatar__owner text-caption text-center yellow--text"
      >
        Propriétaire
      </span>
    </div>
    <Loading v-else />
  </div>
</template>

<script>
import Avataaars from "vuejs-avataaars";
import Loading from "../Loading";
import { mapState } from "vuex";
import LiveIcon from "../LiveIcon";

export default {
  name: "UserAvatar",
  props: {
    user: {
      type: Object,
      default: undefined,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    xSmall: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    big: {
      type: Boolean,
      default: false,
    },
    live: {
      type: Boolean,
      default: false,
    },
    showName: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    LiveIcon,
    Loading,
    Avataaars,
  },
  computed: {
    ...mapState("user", ["userProfile"]),
    computedUser() {
      return this.user || this.userProfile;
    },
  },
};
</script>

<style scoped lang="scss">
.user-avatar {
  $this: &;

  &__avatar-wrapper {
    position: relative;
    overflow: visible;
    width: 5em !important;
    min-width: 5em !important;
    height: 5em !important;
  }

  &__avatar {
    width: 100%;
    height: 100%;
  }

  &__name {
    max-width: 6em;
    line-height: 1;
  }

  &__owner {
    white-space: nowrap;
  }

  &--big {
    #{$this} {
      &__avatar-wrapper {
        width: 9em !important;
        min-width: 9em !important;
        height: 9em !important;
      }
    }
  }

  &--small {
    #{$this} {
      &__avatar-wrapper {
        width: 3em !important;
        min-width: 3em !important;
        height: 3em !important;
      }
    }
  }

  &--x-small {
    #{$this} {
      &__avatar-wrapper {
        width: 2em !important;
        min-width: 2em !important;
        height: 2em !important;
      }
    }
  }

  &__live {
    position: absolute;
    top: -0.25em;
    left: -0.25em;
  }
}
</style>
