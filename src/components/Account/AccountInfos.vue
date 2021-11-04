<template>
  <v-card outlined shaped class="pa-3 account__card" elevation="4">
    <v-form name="accountForm" @submit.prevent="updatePlatformInfos">
      <v-card-subtitle class="d-flex">
        <div class="mr-3 d-flex flex-column align-center">
          <AccountAvatar :account="accountNotSaved" />
          <div
            class="account__play align-self-center ml-auto mt-6"
            v-if="editMode"
          >
            <AccountPlay :account="accountSaved" />
          </div>
        </div>
        <div v-if="!editMode && !createMode">
          <div class="text-h3">{{ accountSaved.name }}</div>
          <div class="text-subtitle">{{ accountDescription }}</div>
        </div>
        <div v-else>
          <v-combobox
            v-model="accountValue"
            :items="platformsMap"
            label="Plateforme"
            class="mb-3"
          />
          <v-textarea
            dense
            auto-grow
            rows="1"
            name="account-informations"
            label="Informations"
            v-model="accountDescription"
          ></v-textarea>

          <div class="d-flex align-center">
            <v-btn v-if="!createMode" type="submit"> Mettre à jour</v-btn>
            <AccountInfosDelete
              v-if="!createMode"
              :account="accountSaved"
              @delete="deleteAccount"
            />
          </div>
        </div>
        <div
          class="account__play align-self-center ml-auto"
          v-if="!createMode && !editMode"
        >
          <AccountPlay :account="accountSaved" />
        </div>
      </v-card-subtitle>
      <v-divider />

      <div class="account__ids pt-4 pb-2">
        <div v-if="editMode || createMode" class="account__ids-editor">
          <v-text-field
            v-model="accountLogin"
            type="text"
            name="input-login"
            label="Identifiant"
          ></v-text-field>
          <v-text-field
            v-model="accountSubLogin"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="input-sub-login"
            label="Mot de passe"
            counter
            autocomplete="new-password"
            @click:append="show = !show"
          ></v-text-field>
          <v-btn type="submit" class="mb-3" v-if="!createMode">
            Mettre à jour
          </v-btn>
        </div>
        <div v-else class="account__ids-infos">
          <v-btn
            class="pa-3 mb-3 mr-3"
            rounded
            small
            v-clipboard:copy="accountLogin"
            v-clipboard:success="() => copySuccess('Identifiant')"
          >
            <v-icon dark small class="mr-2"> mdi-content-copy</v-icon>
            Identifiant
          </v-btn>
          <v-btn
            class="pa-3 mb-3"
            rounded
            small
            v-clipboard:copy="accountSubLogin"
            v-clipboard:success="() => copySuccess('Mot de passe')"
          >
            <v-icon dark small class="mr-2"> mdi-content-copy</v-icon>
            Mot de passe
          </v-btn>
        </div>
        <span class="account__edited text-caption" v-if="!createMode">
          Dernière modification Mardi 02 Mai 2021 à 18h59
        </span>
      </div>

      <div class="d-flex justify-center">
        <v-btn type="submit" class="mb-3" color="primary" v-if="createMode">
          Ajouter la plateforme
        </v-btn>
      </div>
    </v-form>

    <v-divider v-if="!createMode" />

    <AccountMembers v-if="!createMode" :account="accountSaved" />
  </v-card>
</template>

<script>
import {
  i18nTranslateEn,
  i18nTranslateFr,
} from "../../helpers/i18nTranslation";
import AccountMembers from "./AccountMembers";
import AccountAvatar from "./AccountAvatar";
import AccountPlay from "./AccountPlay";
import AccountInfosDelete from "@/components/Account/AccountInfos/AccountInfosDelete";

export default {
  name: "AccountInfos",
  components: {
    AccountInfosDelete,
    AccountPlay,
    AccountAvatar,
    AccountMembers,
  },
  data() {
    return {
      show: false,
      accountValue: undefined,
      accountDescription: undefined,
      accountLogin: undefined,
      accountSubLogin: undefined,
    };
  },
  computed: {
    platformsMap() {
      return this.platformsList?.map((platform) => platform.name);
    },
    createMode() {
      return this.$route.name === "AddAccount";
    },
    accountNotSaved() {
      const predefinedPlatform = this.platformsList?.find((platform) => {
        return platform.name === this.accountValue;
      });

      return predefinedPlatform || { name: this.accountValue };
    },
    editMode() {
      return (
        this.accountSaved &&
        this.userProfile.uid === this.accountSaved.owner.uid
      );
    },
  },
  mounted() {
    this.autocompleteValues();
  },
  watch: {
    accountSaved() {
      this.autocompleteValues();
    },
  },
  props: {
    accountSaved: {
      type: Object,
      required: true,
    },
    userProfile: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updatePlatformInfos() {
      const subLogin = i18nTranslateFr(
        this.accountSubLogin,
        this.userProfile.uid
      );

      const account = this.accountSaved || {};
      account.owner = this.userReference;
      account.name = this.accountNotSaved.name;
      account.description = this.accountDescription;
      account.login = this.accountLogin;
      account.pwuid = subLogin;

      if (this.accountNotSaved.logo) {
        account.logo = this.accountNotSaved.logo;
      }

      this.$store.dispatch(
        this.createMode ? "accounts/createAccount" : "accounts/updateAccount",
        account
      );
    },
    copySuccess(field) {
      this.$store.dispatch("alerts/pushSuccessAlert", {
        message: `${field} copié !`,
      });
    },
    autocompleteValues() {
      if (!this.createMode && this.accountSaved) {
        this.accountValue = this.accountSaved.name;
        this.accountDescription = this.accountSaved.description;
        this.accountLogin = this.accountSaved.login;
        this.accountSubLogin = i18nTranslateEn(
          this.accountSaved.pwuid,
          this.editMode ? this.userProfile.uid : this.accountSaved.owner.uid
        );
      }
    },
    deleteAccount() {
      this.$store.dispatch("accounts/deleteAccount", this.accountSaved);
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  &__card {
    position: relative;
  }
}
</style>
