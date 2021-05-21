<template>
  <v-card-text class="px-0 account-members">
    <div class="account-members__title mb-3">Membres</div>
    <div class="account-members__list d-flex flex-wrap" v-if="usersList">
      <v-autocomplete
        v-if="userProfile.uid === account.owner.uid"
        v-bind:value="membersObj"
        v-on:input="updateMembers"
        :items="usersList"
        filled
        chips
        multiple
        hide-details
        item-text="users"
        item-value="users"
        no-data-text="Aucun compte trouvé"
      >
        <template v-slot:prepend-inner>
          <v-chip class="mt-3 mb-2 ml-0 mr-3">
            <v-avatar left>
              <UserAvatar :user="userProfile" xSmall />
            </v-avatar>
            {{ userProfile.name }}
          </v-chip>
        </template>
        <template v-slot:selection="data">
          <v-chip
            :input-value="data.selected"
            @click:close="remove(data.item)"
            class="mt-3 mb-2 ml-0 mr-3"
            close
          >
            <v-avatar left>
              <UserAvatar :user="data.item" xSmall />
            </v-avatar>
            {{ data.item.name }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template>
            <v-list-item-avatar class="ma-0">
              <UserAvatar :user="data.item" xSmall />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle
                v-html="getUserId(data.item)"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </div>
  </v-card-text>
</template>

<script>
import UserAvatar from "@/components/Avatar/UserAvatar";
import { getUserId } from "../../helpers/user";
import { mapGetters, mapState } from "vuex";
import { accountsCollection, usersCollection } from "../../firebase";
import { sendError } from "../../helpers/errors";

export default {
  name: "AccountMembers",
  components: { UserAvatar },
  data() {
    return {
      members: undefined,
    };
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$store.dispatch("user/fetchUsers");

    if (this.account && this.account.members && !this.members) {
      this.members = this.account.members;
    }
  },
  methods: {
    getUserId,
    remove(user) {
      this.updateMembers(
        this.members.filter((member) => member.uid !== user.uid)
      );
    },
    updateMembers(members) {
      accountsCollection
        .doc(this.account.id)
        .update({
          members: members.map((member) => usersCollection.doc(member.uid)),
        })
        .catch((err) => sendError(err));
    },
  },
  watch: {
    account(account) {
      this.members = account.members;
    },
  },
  computed: {
    ...mapState("user", ["usersList", "userProfile"]),
    ...mapGetters("user", ["userReference"]),
    membersObj() {
      return this.usersList.filter((item) =>
        this.members
          ? this.members.map((member) => member.uid).indexOf(item.uid) !== -1
          : false
      );
    },
  },
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

  ::v-deep .v-input__prepend-inner {
    margin-top: 0;
  }
}
</style>
