<template>
  <v-container>
    <v-row v-if="showLoginForm">
      <LoginForm @toggleForm="toggleForm" />
    </v-row>
    <v-row v-else>
      <RegisterForm @toggleForm="toggleForm" />
    </v-row>
  </v-container>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default {
  components: {
    RegisterForm,
    LoginForm,
    PasswordReset,
  },
  data() {
    return {
      showLoginForm: true,
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
  },
};
</script>
