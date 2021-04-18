<template>
  <section class="d-flex flex-grow-1 justify-center">
    <div class="d-flex flex-column align-center">
      <h3>Paramètre</h3>
      <p class="mb-16">Modifie ton profil</p>

      <div class="mb-6">
        <AvatarEditor />
      </div>

      <validation-observer
        ref="observer"
        v-slot="{ invalid }"
        v-if="userProfile"
      >
        <v-form
          @submit.prevent="updateProfile"
          class="d-flex justify-center flex-column"
        >
          <validation-provider v-slot="{ errors }" name="Name" rules="max:10">
            <v-text-field
              v-model="name"
              :counter="10"
              :error-messages="errors"
              :placeholder="userProfile.name"
              label="Pseudo"
            ></v-text-field>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="email" rules="email">
            <v-text-field
              v-model="email"
              :error-messages="errors"
              :placeholder="userProfile.email"
              label="E-mail"
            ></v-text-field>
          </validation-provider>

          <v-btn
            :disabled="invalid || updateProfilLoading || (!name && !email)"
            :loading="updateProfilLoading"
            type="submit"
          >
            Mettre à jour
          </v-btn>
        </v-form>
      </validation-observer>
      <Loading v-else />
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import {
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";
import veeValidate from "@/mixins/veeValidate";

import UserAvatar from "@/components/Avatar/UserAvatar";
import AvatarEditor from "@/components/Avatar/AvatarEditor";
import Loading from "../components/Loading";

setInteractionMode("eager");

export default {
  components: {
    Loading,
    AvatarEditor,
    ValidationObserver,
    ValidationProvider,
    UserAvatar,
  },
  mixins: [veeValidate],
  data() {
    return {
      name: "",
      email: "",
      avatar: {},
    };
  },
  computed: {
    ...mapState("account", ["userProfile", "updateProfilLoading"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("account/updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        email: this.email !== "" ? this.email : this.userProfile.email,
        avatar: this.avatar !== {} ? this.avatar : this.userProfile.avatar,
      });

      this.name = "";
      this.email = "";

      this.$store.dispatch("alerts/pushSuccessAlert", {
        message: "Profil mis à jour avec succès ! Bien joué bg",
      });
    },
  },
};
</script>
