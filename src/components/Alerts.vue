<template>
  <transition-group name="slide-right" tag="div" class="alerts">
    <v-alert
      :value="true"
      dense
      text
      transition="scroll-x-transition"
      type="success"
      class="mt-4"
      v-for="(alert, index) of successAlert"
      :key="`alert-sucess-${index}`"
    >
      {{ alert.message }}
    </v-alert>
  </transition-group>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Alerts",
  computed: mapState("alerts", ["successAlert"]),
};
</script>

<style scoped lang="scss">
.alerts {
  position: fixed;
  bottom: 0;
  left: 1em;
  right: 1em;
}
</style>
