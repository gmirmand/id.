<template>
  <section class="platform">
    <v-card outlined shaped class="pa-3">
      <v-card-subtitle class="d-flex">
        <div class="mr-3">
          <PlatformAvatar :platform-id="1" big />
        </div>
        <div>
          <div class="text-h3">title</div>
          <div class="text-subtitle">subtitle</div>
        </div>
        <div class="align-self-center ml-auto">
          <DashboardPlay :platform-id="1" />
        </div>
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <div class="platform__member-title mb-3">Membres</div>
        <div class="platform__member-list d-flex flex-wrap">
          <UserAvatar small live show-name :user-id="1" class="mr-2 mb-2" />
          <UserAvatar small show-name :user-id="1" class="mr-2 mb-2" />
          <UserAvatar small show-name :user-id="1" class="mr-2 mb-2" />
          <UserAvatar small show-name :user-id="1" class="mr-2 mb-2" />
          <UserAvatar small show-name :user-id="1" class="mr-2 mb-2" />
        </div>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import { mapState } from "vuex";
import DashboardPlay from "../components/Dashboard/DashboardPlay";
import PlatformAvatar from "../components/Platform/PlatformAvatar";
import UserAvatar from "../components/Avatar/UserAvatar";

export default {
  components: { UserAvatar, PlatformAvatar, DashboardPlay },
  computed: {
    ...mapState("account", ["userProfile"]),
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.platform {
}
</style>
