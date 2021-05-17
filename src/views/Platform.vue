<template>
  <section v-if="loaded" class="platform">
    <v-card outlined shaped class="pa-3 platform__card" elevation="4">
      <v-form
        name="platformForm"
        @submit.prevent="
          isCreateMode ? createPlatform() : updatePlatformInfos()
        "
      >
        <v-card-subtitle class="d-flex">
          <div class="mr-3">
            <PlatformAvatar :platform="platform" />
          </div>
          <div v-if="!editMode">
            <div class="text-h3">{{ platform.name }}</div>
            <div class="text-subtitle">{{ platformDescription }}</div>
          </div>
          <div v-else>
            <v-combobox
              v-model="platformValue"
              :items="platformsMap"
              label="Plateforme"
              class="mb-3"
            />
            <v-textarea
              dense
              auto-grow
              rows="1"
              name="platform-informations"
              label="Informations"
              v-model="platformDescription"
            ></v-textarea>

            <v-btn v-if="!isCreateMode" type="submit"> Mettre à jour </v-btn>
          </div>
          <div
            class="platform__play align-self-center ml-auto"
            v-if="!isCreateMode"
          >
            <DashboardPlay :platform-id="1" button />
          </div>
        </v-card-subtitle>
        <v-divider />

        <div class="platform__ids pt-4 pb-2">
          <div v-if="editMode" class="platform__ids-editor">
            <v-text-field
              v-model="platformLogin"
              type="text"
              name="input-login"
              label="Identifiant"
            ></v-text-field>
            <v-text-field
              v-model="platformPassword"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="input-password"
              label="Mot de passe"
              counter
              @click:append="show = !show"
            ></v-text-field>
            <v-btn type="submit" class="mb-3" v-if="!isCreateMode">
              Mettre à jour
            </v-btn>
          </div>
          <div v-else class="platform__ids-infos">
            <v-btn
              class="pa-3 mb-3 mr-3"
              rounded
              small
              v-clipboard:copy="platformLogin"
              v-clipboard:success="() => copySuccess('Identifiant')"
            >
              <v-icon dark small class="mr-2"> mdi-content-copy </v-icon>
              Identifiant
            </v-btn>
            <v-btn
              class="pa-3 mb-3"
              rounded
              small
              v-clipboard:copy="platformPassword"
              v-clipboard:success="() => copySuccess('Mot de passe')"
            >
              <v-icon dark small class="mr-2"> mdi-content-copy </v-icon>
              Mot de passe
            </v-btn>
          </div>
          <span class="platform__edited text-caption" v-if="!isCreateMode">
            Dernière modification Mardi 02 Mai 2021 à 18h59
          </span>
        </div>

        <div class="d-flex justify-center">
          <v-btn type="submit" class="mb-3" color="primary" v-if="isCreateMode">
            Ajouter la plateforme
          </v-btn>
        </div>
      </v-form>

      <v-divider v-if="!isCreateMode" />

      <PlatformMembers v-if="!isCreateMode" />
    </v-card>

    <div class="platform__activity pa-3" v-if="!isCreateMode">
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
import Loading from "../components/Loading";
import PlatformMembers from "@/components/Platform/PlatformMembers";
import UserAvatar from "../components/Avatar/UserAvatar";
import * as fb from "../firebase";

export default {
  components: {
    UserAvatar,
    PlatformMembers,
    Loading,
    PlatformAvatar,
    DashboardPlay,
  },
  data() {
    return {
      platformValue: undefined,
      platformDescription: undefined,
      platformLogin: undefined,
      platformPassword: undefined,
      show: false,
    };
  },
  computed: {
    ...mapState("account", ["userProfile"]),
    ...mapState("platforms", ["platformsList"]),
    isCreateMode() {
      return this.$route.name === "AddPlatform";
    },
    editMode() {
      return this.userProfile.uid === this.userProfile.uid;
    },
    loaded() {
      return this.userProfile;
    },
    platformsMap() {
      return this.platformsList?.map((platform) => {
        return {
          text: platform.name,
          value: platform.id,
        };
      });
    },
    platform() {
      return this.platformsList?.find((platform) => {
        return platform.id === this.platformValue?.value;
      });
    },
  },
  methods: {
    async updatePlatformInfos() {},
    async createPlatform() {
      await fb.usersCollection
        .doc(this.userProfile.uid)
        .collection("accounts")
        .doc()
        .set({
          name: this.platform.name,
          description: this.platformDescription,
          logo: this.platform.logo,
          login: this.platformLogin,
          password: this.platformPassword,
        });
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
