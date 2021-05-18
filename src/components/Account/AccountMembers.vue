<template>
  <v-card-text>
    <div class="account-members__title mb-3">Membres</div>
    <div class="account-members__list d-flex flex-wrap">
      <UserAvatar
        small
        live
        show-name
        :user-id="1"
        class="mr-2 mb-2"
        highlight
      />
      <UserAvatar small live show-name :user-id="1" class="mr-2 mb-2" />
      <UserAvatar small show-name :user-id="1" class="mr-2 mb-2" />
      <UserAvatar small show-name :user-id="1" class="mr-2 mb-2" />

      <div class="account-members__add">
        <v-avatar color="grey darken-3" class="account-members__add">
          <v-icon dark> mdi-account-circle </v-icon>
        </v-avatar>
        <v-icon color="grey darken-1" dark class="account-members__plus-icon">
          mdi-plus-circle
        </v-icon>
      </div>
    </div>
  </v-card-text>
</template>

<script>
import UserAvatar from "@/components/Avatar/UserAvatar";
export default {
  name: "AccountMembers",
  components: { UserAvatar },
};
</script>

<style scoped lang="scss">
.account-members {
  &__add {
    position: relative;
  }

  &__plus-icon {
    position: absolute;
    top: -0.25em;
    right: -0.25em;
  }
}
</style>
