<template>
  <v-container>
    <validation-observer
      ref="observer"
      tag="form"
      v-slot="{ invalid }"
      @submit.prevent="login"
    >
      <v-row justify="center">
        <h2>Connexion</h2>
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
            placeholder="you@email.com"
            required
            autocomplete="username"
          ></v-text-field>
        </validation-provider>
      </v-row>
      <v-row justify="center" class="mb-4">
        <validation-provider
          v-slot="{ errors }"
          name="Mot de passe"
          rules="required|min:8|verify_password"
        >
          <v-text-field
            v-model="password"
            :error-messages="errors"
            label="Mot de passe"
            placeholder="Genre '1234' tqt"
            type="password"
            autocomplete="current-password"
            required
          ></v-text-field>
        </validation-provider>
      </v-row>
      <v-row justify="center">
        <v-btn
          :loading="loginLoading"
          type="submit"
          :disabled="invalid || loginLoading"
          class="button"
        >
          Connexion
        </v-btn>
      </v-row>
      <v-row justify="center" class="mb-8">
        <PasswordReset />
      </v-row>
      <v-row justify="center" class="mb-8"> ou </v-row>
      <v-row justify="center">
        <v-btn color="primary" @click="$emit('toggleForm')">
          Créer un compte
        </v-btn>
      </v-row>
    </validation-observer>
  </v-container>
</template>

<script>
import veeValidate from "@/mixins/veeValidate";
import PasswordReset from "@/components/PasswordReset";
import { mapState } from "vuex";

export default {
  name: "LoginForm",
  components: { PasswordReset },
  mixins: [veeValidate],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: mapState({
    loginLoading: (state) => state.loginLoading,
  }),
  methods: {
    login() {
      this.$store.dispatch("user/login", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
