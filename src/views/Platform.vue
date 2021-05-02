<template>
  <section v-if="loaded" class="platform">
    <v-card outlined shaped class="pa-3 platform__card">
      <v-card-subtitle class="d-flex">
        <div class="mr-3">
          <PlatformAvatar :platform="platform" />
        </div>
        <div v-if="!editMode">
          <div class="text-h3">{{ platform }}</div>
          <div class="text-subtitle">{{ platformInformations }}</div>
        </div>
        <div v-else>
          <v-form name="platformForm" @submit.prevent="updatePlatformInfos">
            <v-combobox
              v-model="platform"
              :items="platforms"
              label="Plateforme"
              class="mb-3"
            />
            <v-textarea
              dense
              auto-grow
              rows="1"
              name="platform-informations"
              label="Informations"
              :value="platformInformations"
            ></v-textarea>

            <v-btn type="submit"> Mettre à jour </v-btn>
          </v-form>
        </div>
        <div class="platform__play align-self-center ml-auto">
          <DashboardPlay :platform-id="1" button />
        </div>
      </v-card-subtitle>
      <v-divider />

      <div class="platform__ids pt-4 pb-2">
        <div v-if="editMode" class="platform__ids-editor">
          <v-form @submit.prevent="updatePlatformIds">
            <v-text-field
              v-model="login"
              type="text"
              name="input-login"
              label="Identifiant"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="input-password"
              label="Mot de passe"
              counter
              @click:append="show = !show"
            ></v-text-field>
            <v-btn type="submit" class="mb-3"> Mettre à jour </v-btn>
          </v-form>
        </div>
        <div v-else class="platform__ids-infos">
          <v-btn
            class="pa-3 mb-3 mr-3"
            rounded
            small
            v-clipboard:copy="login"
            v-clipboard:success="() => copySuccess('Identifiant')"
          >
            <v-icon dark small class="mr-2"> mdi-content-copy </v-icon>
            Identifiant
          </v-btn>
          <v-btn
            class="pa-3 mb-3"
            rounded
            small
            v-clipboard:copy="password"
            v-clipboard:success="() => copySuccess('Mot de passe')"
          >
            <v-icon dark small class="mr-2"> mdi-content-copy </v-icon>
            Mot de passe
          </v-btn>
        </div>
        <span class="platform__edited text-caption">
          Dernière modification Mardi 02 Mai 2021 à 18h59
        </span>
      </div>

      <v-divider />
      <v-card-text>
        <div class="platform__member-title mb-3">Membres</div>
        <div class="platform__member-list d-flex flex-wrap">
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
  <section v-else class="platform d-flex align-center justify-center">
    <Loading />
  </section>
</template>

<script>
import { mapState } from "vuex";
import DashboardPlay from "../components/Dashboard/DashboardPlay";
import PlatformAvatar from "../components/Platform/PlatformAvatar";
import UserAvatar from "../components/Avatar/UserAvatar";
import Loading from "../components/Loading";

export default {
  components: { Loading, UserAvatar, PlatformAvatar, DashboardPlay },
  data() {
    return {
      platform: "Netflix",
      platforms: [
        "Netflix",
        "Amazon prime",
        "Apple TV",
        "Disney +",
        "Hulu",
        "OCS",
        "YouTube",
        "Rakuten TV",
        "MyCANAL",
        "SFR Play VOD",
        "Warner Bros",
        "Salto",
        "Crunchyroll",
        "ADN",
        "Wakanim",
      ],
      platformInformations: "blablabl",
      login: "identifiant@identifiant.com",
      password: "1234",
      show: false,
    };
  },
  computed: {
    ...mapState("account", ["userProfile"]),
    editMode() {
      return this.userProfile.uid === this.userProfile.uid;
    },
    loaded() {
      return this.userProfile;
    },
  },
  methods: {
    updatePlatformIds() {
      console.log(this.login);
      console.log(this.password);
    },
    updatePlatformInfos() {
      console.log(this.platform);
      console.log(this.platformInformations);
    },
    copySuccess(field) {
      this.$store.dispatch("alerts/pushSuccessAlert", {
        message: `${field} copié !`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.platform {
  &__card {
    position: relative;
  }

  &__play {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(50%, -50%);
  }
}
</style>
