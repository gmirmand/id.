<template>
  <v-list class="dashboard-list" elevation="4">
    <v-subheader :class="['white--text primary']">
      {{ personal ? "Vos comptes" : "Comptes partagés" }}
    </v-subheader>

    <template v-if="accounts.length && accounts.length > 0">
      <v-list-item
        v-for="account of accounts"
        :key="account.id"
        class="dashboard-list__item"
      >
        <v-list-item-avatar class="mr-5 ml-1 overflow-visible">
          <router-link
            :to="{ name: 'Account', params: { id: account.id } }"
            class="text-decoration-none"
          >
            <AccountAvatar :account="account" />
          </router-link>
        </v-list-item-avatar>

        <v-list-item-content>
          <router-link
            :to="{ name: 'Account', params: { id: account.id } }"
            class="text-decoration-none"
          >
            <v-list-item-title v-text="account.name"></v-list-item-title>
            <v-list-item-subtitle
              v-if="account.owner || personal"
              v-text="
                personal
                  ? account.members && account.members.length > 0
                    ? `Partagé avec ${account.members.length} personne${
                        account.members.length > 1 ? 's' : ''
                      }`
                    : 'Non partagé'
                  : getFullUser(account.owner)
              "
            ></v-list-item-subtitle>
          </router-link>
        </v-list-item-content>

        <v-list-item-action>
          <AccountPlay :account="account" />
        </v-list-item-action>
      </v-list-item>
    </template>
    <div
      v-else
      class="pa-3 pb-1 grey--text darken-3--text text-caption text-center"
    >
      Aucun compte
    </div>
  </v-list>
</template>

<script>
import AccountPlay from "@/components/Account/AccountPlay";
import LiveIcon from "../LiveIcon";
import AccountAvatar from "../Account/AccountAvatar";
import { mapState } from "vuex";
import Loading from "../Loading";
import { getFullUser } from "../../helpers/user";

export default {
  name: "DashboardList",
  components: { Loading, AccountAvatar, LiveIcon, AccountPlay },
  computed: {
    ...mapState("platforms", ["platformsList"]),
  },
  props: {
    accounts: {
      type: Array,
      default: () => [],
    },
    personal: {
      type: Boolean,
      default: false,
    },
    shared: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getFullUser,
  },
};
</script>

<style scoped lang="scss">
.dashboard-list {
}
</style>
