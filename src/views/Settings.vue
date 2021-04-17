<template>
  <section class="d-flex flex-grow-1 justify-center">
    <div class="d-flex flex-column align-center">
      <h3>Paramètre</h3>
      <p>Modifie ton profil</p>

      <validation-observer ref="observer" v-slot="{ invalid }">
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
              label="Nom"
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

      <v-alert
        :value="showSuccess"
        dense
        text
        transition="scroll-x-transition"
        type="success"
        class="mt-4"
      >
        Profil mis à jour avec succès ! Bien joué bg
      </v-alert>
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
import showSuccess from "@/mixins/showSuccess";

setInteractionMode("eager");

export default {
  components: { ValidationObserver, ValidationProvider },
  mixins: [veeValidate, showSuccess],
  data() {
    return {
      name: "",
      email: "",
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
      });

      this.name = "";
      this.email = "";

      this.triggSuccess();
    },
  },
};
</script>
