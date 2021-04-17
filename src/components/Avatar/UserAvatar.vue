<template>
  <div :class="['user-avatar', big && 'user-avatar--big']">
    <Avataaars
      v-if="userProfile"
      :accessoriesType="userProfile.avatar.accessoriesTypes"
      :clotheType="userProfile.avatar.clothesType"
      :clotheColor="
        userProfile.avatar.clotheColors && userProfile.avatar.clotheColors.id
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
