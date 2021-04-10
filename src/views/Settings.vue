<template>
  <section id="settings">
    <div class="col1">
      <h3>Paramètre</h3>
      <p>Modifie ton profil bg</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

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
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from "vee-validate";

import { email, max } from "vee-validate/dist/rules";

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

extend("email", {
  ...email,
  message: "Email invalid"
});

setInteractionMode("eager");

export default {
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      name: "",
      email: "",
      showSuccess: false
    };
  },
  computed: {
    ...mapState(["userProfile"])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        email: this.email !== "" ? this.email : this.userProfile.email
      });

      this.name = "";
      this.email = "";

      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    }
  }
};
</script>
