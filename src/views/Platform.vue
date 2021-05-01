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
      <v-divider />
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

    <div class="platform__activity pa-3">
      <div class="text-subtitle-h3 text-center mb-3 mt-6">Activités</div>
      <v-divider />
      <v-list three-line>
        <template>
          <v-subheader key="today" v-text="'Aujourd\'hui'"></v-subheader>

          <v-divider :key="'index'" :inset="'item.inset'"></v-divider>

          <v-list-item>
            <user-avatar small class="mr-3" />
            <v-list-item-content>
              <v-list-item-title>Aujourd'hui à 18h59</v-list-item-title>
              <v-list-item-subtitle>
                {{ userProfile.name }} a réservé le compte pour XXX minutes
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <user-avatar small class="mr-3" />
            <v-list-item-content>
              <v-list-item-title>Aujourd'hui à 18h59</v-list-item-title>
              <v-list-item-subtitle>
                {{ userProfile.name }} a réservé le compte pour XXX minutes
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-subheader
            key="other"
            v-text="'Ultérieurement'"
            class="mt-3"
          ></v-subheader>

          <v-divider :key="'index'" :inset="'item.inset'"></v-divider>

          <v-list-item>
            <user-avatar small class="mr-3" />
            <v-list-item-content>
              <v-list-item-title>Mardi 12 mars à 18h59</v-list-item-title>
              <v-list-item-subtitle>
                {{ userProfile.name }} a réservé le compte pour XXX minutes
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <user-avatar small class="mr-3" />
            <v-list-item-content>
              <v-list-item-title>Mercredi'hui 8 mars à 18h59</v-list-item-title>
              <v-list-item-subtitle>
                {{ userProfile.name }} a réservé le compte pour XXX minutes
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import DashboardPlay from "../components/Dashboard/DashboardPlay";
import PlatformAvatar from "../components/Platform/PlatformAvatar";
import UserAvatar from "../components/Avatar/UserAvatar";

export default {
  components: { UserAvatar, PlatformAvatar, DashboardPlay },
  data() {
    return {
      items: [
        { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
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
