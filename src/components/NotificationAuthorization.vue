<template>
  <v-btn
    v-if="isCompatible && !isAllowed"
    class="notification-authorization"
    @click="authorize"
  >
    {{
      isAllowed === false
        ? "Vous avez bloqué les notifications"
        : "Autoriser les notifications"
    }}
  </v-btn>
</template>

<script>
export default {
  name: "NotificationAuthorization",
  data() {
    return {
      isCompatible: false,
      isAllowed: undefined,
    };
  },
  mounted() {
    if ("Notification" in window) {
      this.isCompatible = true;
    }

    this.authorize();
  },
  methods: {
    authorize() {
      // Let's check whether notification permissions have already been granted
      if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        this.isAllowed = true;
        new Notification("Hi there!");
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            this.isAllowed = true;
            new Notification("Hi there!");
          } else {
            this.isAllowed = false;
          }
        });
      } else {
        this.isAllowed = false;
      }
    },
  },
};
</script>

<style scoped></style>
