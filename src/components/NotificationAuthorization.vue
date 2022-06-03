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
import { sendNotification } from "@/helpers/notification";

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
      if (
        Notification.permission === "granted" &&
        !localStorage.getItem("notificationGranded")
      ) {
        // If it's okay let's create a notification
        this.isAllowed = true;

        sendNotification(
          "COUCOU",
          "C'est super top d'avoir activé les notifs ! Je vais pouvoir te spam (blague). (en vrai je rigole ça marche pas encore lol)",
          {
            image: "https://i.imgflip.com/1hx5mc.jpg",
          }
        );
        localStorage.setItem("notificationGranded", true);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            this.isAllowed = true;
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
