<template>
  <div id="login">
    <!--    <PasswordReset-->
    <!--      v-if="showPasswordReset"-->
    <!--      @close="togglePasswordReset()"-->
    <!--    ></PasswordReset>-->
    <section>
      <div class="col1">
        <h1>G(et)G(et) Streaming</h1>
        <p>Salut jeune entrepreneur et bienvenu sur GetGet Streaming !</p>
      </div>
      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div>
            <label for="email1">Email</label>
            <input
              id="email1"
              v-model.trim="loginForm.email"
              placeholder="you@email.com"
              type="text"
            />
          </div>
          <div>
            <label for="password1">Password</label>
            <input
              id="password1"
              v-model.trim="loginForm.password"
              placeholder="******"
              type="password"
            />
          </div>
          <button class="button" @click="login()">Log In</button>
          <div class="extras">
            <a @click="togglePasswordReset()">Forgot Password</a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>
        <form v-else @submit.prevent>
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
          <button class="button" @click="signup()">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// import PasswordReset from "@/components/PasswordReset";

export default {
  components: {},
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
