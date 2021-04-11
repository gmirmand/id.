<template>
  <div id="login">
    <PasswordReset
      v-if="showPasswordReset"
      @close="togglePasswordReset()"
    ></PasswordReset>
    <section>
      <div class="col1">
        <h1>G(et)G(et) Streaming</h1>
        <p>Salut jeune entrepreneur et bienvenu sur GetGet Streaming !</p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <validation-observer
          v-if="showLoginForm"
          ref="observer"
          v-slot="{ invalidLogin }"
        >
          <form @submit.prevent="login">
            <h1>Re-sali-saluuut !</h1>
            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                v-model="loginForm.email"
                :error-messages="errors"
                label="E-mail"
                placeholder="you@email.com"
                required
              ></v-text-field>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="password"
              rules="required|min:8|verify_password"
            >
              <v-text-field
                v-model="loginForm.password"
                :error-messages="errors"
                label="Mot de passe"
                placeholder="Genre '1234' tqt"
                type="password"
                required
              ></v-text-field>
            </validation-provider>
            <button :disabled="invalidLogin" class="button">Log In</button>
            <div class="extras">
              <a @click="togglePasswordReset()">Forgot Password</a>
              <a @click="toggleForm()">Create an Account</a>
            </div>
          </form>
        </validation-observer>
        <validation-observer v-else ref="observer" v-slot="{ invalidSignup }">
          <form @submit.prevent="signup">
            <h1>Get Started</h1>
            <div>
              <label for="name">Name</label>
              <input
                id="name"
                v-model.trim="signupForm.name"
                placeholder="Savvy Apps"
                type="text"
              />
            </div>
            <div>
              <label for="email2">Email</label>
              <input
                id="email2"
                v-model.trim="signupForm.email"
                placeholder="you@email.com"
                type="text"
              />
            </div>
            <div>
              <label for="password2">Password</label>
              <input
                id="password2"
                v-model.trim="signupForm.password"
                placeholder="min 6 characters"
                type="password"
              />
            </div>
            <button :disabled="invalidSignup" class="button">Sign Up</button>
            <div class="extras">
              <a @click="toggleForm()">Back to Log In</a>
            </div>
          </form>
        </validation-observer>
      </div>
    </section>
  </div>
</template>

<script>
import PasswordReset from "@/components/PasswordReset";
import { required, email, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

extend("min", {
  ...min,
  message: "{_field_} may not be lower than {length} characters",
});

extend("verify_password", {
  getMessage: () =>
    `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
  validate: (value) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(value);
  },
});

export default {
  components: {
    PasswordReset,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      signupForm: {
        name: "",
        email: "",
        password: "",
      },
      showLoginForm: true,
      showPasswordReset: false,
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
      });
    },
  },
};
</script>
