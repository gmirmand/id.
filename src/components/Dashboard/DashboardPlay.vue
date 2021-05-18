<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-2" fab color="primary" v-bind="attrs" v-on="on">
        <v-icon dark large>mdi-play</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="d-flex flex-column align-start">
        <span class="headline"
          >Désactiver au bout <br />
          de {{ duration }}
        </span>
        <span v-if="timer > 40" class="font-weight-light text-subtitle-1">
          ( {{ timer }}min )
        </span>
      </v-card-title>
      <v-card-text class="mt-10">
        <v-slider
          v-model="timer"
          track-color="grey"
          always-dirty
          :min="min"
          :step="interval"
          :max="max"
          color="primary"
        >
          <template v-slot:prepend>
            <v-icon @click="decrement" color="primary"> mdi-minus </v-icon>
          </template>

          <template v-slot:append>
            <v-icon @click="increment" color="primary"> mdi-plus </v-icon>
          </template>

          <template v-slot:thumb-label="{ value }">
            {{
              satisfactionEmojis[
                Math.max(
                  Math.round(value / (max / satisfactionEmojis.length) - 1),
                  0
                )
              ]
            }}
          </template>
        </v-slider>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey darken-1" text @click="dialog = false">
          Annuler
        </v-btn>
        <v-spacer />
        <v-btn x-large text @click="submit">
          <v-icon color="primary" x-large> mdi-play </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import formatDistance from "date-fns/formatDistance";
import dateFnsConfig from "../../helpers/dateFnsConfig";
import { mapState } from "vuex";

export default {
  name: "DashboardPlay",
  data: () => ({
    dialog: false,
    timer: 30,
    interval: 5,
    min: 5,
    max: 360,
    isPlaying: false,
    satisfactionEmojis: [
      "🤨",
      "🙂",
      "😮",
      "🤔",
      "😐",
      "😬",
      "🤪",
      "🥵",
      "😱",
      "💀",
    ],
  }),
  props: {
    platformId: {
      type: Number,
      required: true,
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("user", ["userProfile"]),
    duration() {
      return formatDistance(0, this.timer * 60 * 1000, dateFnsConfig);
    },
  },
  methods: {
    decrement() {
      this.timer = this.timer - this.interval;
    },
    increment() {
      this.timer = this.timer + this.interval;
    },
    submit() {
      this.dialog = false;
      console.log(
        `submit ${this.timer} sur ${this.platformId} par ${this.userProfile}`
      );
    },
  },
};
</script>

<style scoped></style>
