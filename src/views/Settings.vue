<template>
  <section class="d-flex flex-grow-1">
    <div class="d-flex flex-column">
      <h3>Paramètre</h3>
      <p>Modifie ton profil bg</p>

      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="updateProfile">
          <validation-provider v-slot="{ errors }" name="Name" rules="max:10">
            <v-text-field
              v-model="name"
              :counter="10"
              :error-messages="errors"
              :placeholder="userProfile.name"
              label="Name"
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

          <v-btn :disabled="invalid" class="mr-4" type="submit">
            Mettre à jour
          </v-btn>
        </form>
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
  extend,
  setInteractionMode,
  ValidationObserver,
  ValidationProvider,
} from "vee-validate";

import { email, max } from "vee-validate/dist/rules";

extend("max", {
  ...max,
  message: "{_field_} a gavé trop de caractères... atta t'en a mis {length} ???",
});

extend("email", {
  ...email,
  message: "Wesh c'est un email ça ? Fait un effort",
});

setInteractionMode("eager");

export default {
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      name: "",
      email: "",
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        email: this.email !== "" ? this.email : this.userProfile.email,
      });

      this.name = "";
      this.email = "";

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
  },
};
</script>
