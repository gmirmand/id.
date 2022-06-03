<template>
  <section v-if="loaded" class="account">
    <AccountInfos :accountSaved="accountSaved" :userProfile="userProfile" />

    <div v-if="!createMode" class="account__calendar">
      <AccountCalendar :account="accountSaved" />
    </div>

    <div class="account__activity pa-3" v-if="false">
      <div class="text-subtitle-h3 text-center mb-3 mt-6">Activités</div>
      <v-divider />
      <v-list three-line>
        <template>
          <v-subheader key="today" v-text="'Aujourd\'hui'"></v-subheader>

          <v-divider />

          <v-list-item>
            <user-avatar small class="mr-3" />
            <v-list-item-content>
              <v-list-item-title>Aujourd'hui à 18h59</v-list-item-title>
              <v-list-item-subtitle>
                {{ userProfile.name }} a réservé le compte pour XXX minutes
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />

          <v-subheader
            key="other"
            v-text="'Ultérieurement'"
            class="mt-3"
          ></v-subheader>

          <v-divider />

          <v-list-item>
            <user-avatar small class="mr-3" />
            <v-list-item-content>
              <v-list-item-title>Mardi 12 mars à 18h59</v-list-item-title>
              <v-list-item-subtitle>
                {{ userProfile.name }} a réservé le compte pour XXX minutes
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </section>
  <section v-else class="account d-flex align-center justify-center">
    <Loading />
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AccountPlay from "@/components/Account/AccountPlay";
import AccountAvatar from "@/components/Account/AccountAvatar";
import Loading from "@/components/Loading";
import AccountMembers from "@/components/Account/AccountMembers";
import UserAvatar from "@/components/Avatar/UserAvatar";
import AccountCalendar from "@/components/Account/AccountCalendar";
import AccountInfos from "@/components/Account/AccountInfos";

export default {
  components: {
    AccountInfos,
    AccountCalendar,
    UserAvatar,
    AccountMembers,
    Loading,
    AccountAvatar,
    AccountPlay,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["userProfile"]),
    ...mapGetters("accounts", ["account"]),
    createMode() {
      return this.$route.name === "AddAccount";
    },
    accountSaved() {
      return this.account(this.$route.params.id);
    },
    loaded() {
      return this.userProfile && (this.accountSaved || this.createMode);
    },
  },
};
</script>

<style lang="scss" scoped></style>
