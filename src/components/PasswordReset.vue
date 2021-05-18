<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="primary" v-bind="attrs" v-on="on">
        J'ai perdu mon mot de passe
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Réinialiser ton mot de passe</span>
      </v-card-title>
      <v-card-text>
        <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model="email"
            :error-messages="errors"
            label="E-mail"
            placeholder="you@email.com"
            required
            autocomplete="username"
          ></v-text-field>
        </validation-provider>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Fermer
        </v-btn>
        <v-btn color="blue darken-1" dark @click="resetPassword">
          Envoyer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { auth } from "@/firebase";
import veeValidate from "@/mixins/veeValidate";
import { sendError } from "../helpers/errors";

export default {
  mixins: [veeValidate],
  data() {
    return {
      dialog: false,
      email: "",
      showSuccess: false,
    };
  },
  methods: {
    async resetPassword() {
      try {
        await auth.sendPasswordResetEmail(this.email);
        this.dialog = false;
      } catch (err) {
        sendError(err);
      }
    },
  },
};
</script>
