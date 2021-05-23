<template>
  <section v-if="loaded" class="account">
    <v-card outlined shaped class="pa-3 account__card" elevation="4">
      <v-form name="accountForm" @submit.prevent="updatePlatformInfos">
        <v-card-subtitle class="d-flex">
          <div class="mr-3 d-flex flex-column align-center">
            <AccountAvatar :account="accountNotSaved" />
            <div
              class="account__play align-self-center ml-auto mt-6"
              v-if="editMode"
            >
              <DashboardPlay :account="accountSaved" />
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
              <v-btn v-if="!createMode" type="submit"> Mettre à jour </v-btn>
            </div>
          </div>
          <div
            class="account__play align-self-center ml-auto"
            v-if="!createMode && !editMode"
          >
            <DashboardPlay :account="accountSaved" />
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
              <v-icon dark small class="mr-2"> mdi-content-copy </v-icon>
              Identifiant
            </v-btn>
            <v-btn
              class="pa-3 mb-3"
              rounded
              small
              v-clipboard:copy="accountSubLogin"
              v-clipboard:success="() => copySuccess('Mot de passe')"
            >
              <v-icon dark small class="mr-2"> mdi-content-copy </v-icon>
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
import DashboardPlay from "@/components/Dashboard/DashboardPlay";
import AccountAvatar from "@/components/Account/AccountAvatar";
import Loading from "@/components/Loading";
import AccountMembers from "@/components/Account/AccountMembers";
import UserAvatar from "@/components/Avatar/UserAvatar";
import { i18nTranslateEn, i18nTranslateFr } from "../helpers/i18nTranslation";

export default {
  components: {
    UserAvatar,
    AccountMembers,
    Loading,
    AccountAvatar,
    DashboardPlay,
  },
  data() {
    return {
      accountValue: undefined,
      accountDescription: undefined,
      accountLogin: undefined,
      accountSubLogin: undefined,
      show: false,
    };
  },
  computed: {
    ...mapState("user", ["userProfile"]),
    ...mapState("platforms", ["platformsList"]),
    ...mapGetters("accounts", ["account"]),
    ...mapGetters("user", ["userReference"]),
    createMode() {
      return this.$route.name === "AddAccount";
    },
    editMode() {
      return (
        this.accountSaved &&
        this.userProfile.uid === this.accountSaved.owner.uid
      );
    },
    loaded() {
      return this.userProfile && (this.accountSaved || this.createMode);
    },
    platformsMap() {
      return this.platformsList?.map((platform) => platform.name);
    },
    accountNotSaved() {
      const predefinedPlatform = this.platformsList?.find((platform) => {
        return platform.name === this.accountValue;
      });

      return predefinedPlatform || { name: this.accountValue };
    },
    accountSaved() {
      return this.account(this.$route.params.id);
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
