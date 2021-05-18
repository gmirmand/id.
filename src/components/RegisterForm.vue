<template>
  <validation-observer
    ref="observer"
    tag="form"
    v-slot="{ invalid }"
    @submit.prevent="signup"
    class="container"
  >
    <v-row justify="center">
      <h2>Créer ton compte</h2>
    </v-row>
    <v-row justify="center">
      <validation-provider
        v-slot="{ errors }"
        name="Pseudo"
        rules="required|max:10"
      >
        <v-text-field
          v-model="name"
          :error-messages="errors"
          label="Pseudo"
          placeholder="Fait en sorte d'être reconnaissable"
          required
        ></v-text-field>
      </validation-provider>
    </v-row>
    <v-row justify="center">
      <validation-provider
        v-slot="{ errors }"
        name="E-mail"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          placeholder="you@gmail.com"
          required
          autocomplete="username"
        ></v-text-field>
      </validation-provider>
    </v-row>
    <v-row justify="center">
      <ValidationProvider
        name="Mot de passe"
        rules="required|min:8|verify_password|confirmed:confirm"
        v-slot="{ errors }"
      >
        <v-text-field
          label="Mot de passe"
          v-model="password"
          type="password"
          placeholder="Genre '1234' tqt (je plaisante)"
          autocomplete="current-password"
          :error-messages="errors"
          required
        />
      </ValidationProvider>
    </v-row>
    <v-row justify="center">
      <ValidationProvider
        name="Confirmation de mot de passe"
        vid="confirm"
        rules="required|min:8|verify_password"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="passwordConfirm"
          type="password"
          label="Confirmation mot de passe"
          placeholder="Genre tu remets '1234' (lol)"
          autocomplete="current-password"
          :error-messages="errors"
          required
        />
      </ValidationProvider>
    </v-row>
    <v-row justify="center">
      <v-btn
        :loading="signupLoading"
        color="primary"
        :disabled="invalid || signupLoading"
        class="mb-8"
        type="submit"
      >
        Créé mon compte !
      </v-btn>
    </v-row>
    <v-row justify="center" class="mb-8"> ou </v-row>
    <v-row justify="center">
      <v-btn @click="$emit('toggleForm')">Revenir à la connexion</v-btn>
    </v-row>
  </validation-observer>
</template>

<script>
import veeValidate from "@/mixins/veeValidate";
import { mapState } from "vuex";

export default {
  name: "RegisterForm",
  mixins: [veeValidate],
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  computed: mapState({
    signupLoading: (state) => state.signupLoading,
  }),
  methods: {
    signup() {
      this.$store.dispatch("user/signup", {
        email: this.email,
        password: this.password,
        name: this.name,
      });
    },
  },
};
</script>
