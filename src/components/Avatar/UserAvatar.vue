<template>
  <div
    :class="[
      'user-avatar',
      big && 'user-avatar--big',
      small && 'user-avatar--small',
    ]"
  >
    <div
      v-if="userProfile"
      class="d-flex flex-column justify-center align-center"
    >
      <div class="user-avatar__avatar-wrapper">
        <LiveIcon v-if="live" active class="user-avatar__live" />
        <Avataaars
          class="user-avatar__avatar"
          :accessoriesType="userProfile.avatar.accessoriesTypes"
          :clotheType="userProfile.avatar.clotheTypes"
          :clotheColor="
            userProfile.avatar.clotheColors &&
            userProfile.avatar.clotheColors.id
          "
          :eyebrowType="userProfile.avatar.eyebrowTypes"
          :eyeType="userProfile.avatar.eyeTypes"
          :facialHairColor="
            userProfile.avatar.facialHairColors &&
            userProfile.avatar.facialHairColors.id
          "
          :facialHairType="userProfile.avatar.facialHairTypes"
          :graphicType="userProfile.avatar.GraphicShirtTypes"
          :hairColor="
            userProfile.avatar.hairColors && userProfile.avatar.hairColors.id
          "
          :mouthType="userProfile.avatar.mouthTypes"
          :skinColor="
            userProfile.avatar.skinColors && userProfile.avatar.skinColors.id
          "
          :topType="userProfile.avatar.topTypes"
          :topColor="
            userProfile.avatar.topColors && userProfile.avatar.topColors.id
          "
        />
      </div>
      <span v-if="showName" class="user-avatar__name text-caption text-center">
        {{ userProfile.name }}
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
    userId: {
      type: Number,
      default: undefined,
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
    ...mapState("account", ["userProfile"]),
  },
};
</script>

<style scoped lang="scss">
.user-avatar {
  $this: &;

  &__avatar-wrapper {
    position: relative;
  }

  &__avatar {
    width: 5em;
  }

  &__name {
    max-width: 6em;
    line-height: 1;
  }

  &--big {
    #{$this} {
      &__avatar {
        width: 12em;
      }
    }
  }

  &--small {
    #{$this} {
      &__avatar {
        width: 3em;
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
