<template>
  <div class="account-calendar">
    <v-calendar
      ref="calendar"
      color="primary"
      type="4day"
      :events="formattedEvents"
      :event-ripple="false"
      @click:time="triggAddDate"
      @click:event="showEvent"
    >
      <template v-slot:event="{ event, timed, eventSummary }">
        <div class="v-event-draggable" v-html="eventSummary()"></div>
        <div v-if="timed" class="v-event-drag-bottom"></div>
      </template>
    </v-calendar>
    <v-menu
      v-if="selectedEvent"
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
    >
      <v-card color="grey lighten-4" min-width="350px" flat>
        <v-toolbar :color="selectedEvent.color" dark>
          <v-toolbar-title v-html="'Supprimer ce crénau ?'"></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="deleteEvent(selectedEvent)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-actions>
          <v-btn text color="secondary" @click="selectedOpen = false">
            Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    <AccountPlay
      :account="account"
      no-button
      :displayDialog="dialog"
      @onSubmit="addDate($event)"
      @onClose="dialog = false"
    />
  </div>
</template>

<script>
import AccountPlay from "./AccountPlay";
import { add, getTime } from "date-fns";
import { mapState } from "vuex";

export default {
  name: "AccountCalendar",
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  components: { AccountPlay },
  data: () => ({
    dialog: false,
    newDate: "",
    dragStart: null,
    createEvent: null,
    selectedOpen: false,
    selectedElement: null,
    selectedEvent: {},
  }),
  computed: {
    ...mapState("user", ["userProfile"]),
    formattedEvents() {
      return this.account.events?.map((event) => {
        event.name = this.getEventName(event);
        event.color = this.getEventColor(event);
        return event;
      });
    },
    members() {
      return this.account.members;
    },
  },
  methods: {
    triggAddDate(date) {
      this.newDate = date;
      this.dialog = true;
    },
    addDate(duration) {
      const startTime = this.roundTime(this.toTime(this.newDate));
      const endTime = getTime(add(new Date(startTime), { minutes: duration }));
      this.createEvent = {
        userUid: this.userProfile.uid,
        start: startTime,
        end: endTime,
        timed: true,
      };

      const eventList = this.account.events || [];

      this.$store.dispatch("accounts/updateAccount", {
        id: this.account.id,
        events: eventList.concat(this.createEvent),
      });

      this.dialog = false;
    },
    roundTime(time, down = true) {
      const roundTo = 15; // minutes
      const roundDownTime = roundTo * 60 * 1000;

      return down
        ? time - (time % roundDownTime)
        : time + (roundDownTime - (time % roundDownTime));
    },
    toTime(tms) {
      return new Date(
        tms.year,
        tms.month - 1,
        tms.day,
        tms.hour,
        tms.minute
      ).getTime();
    },
    getEventColor(event) {
      const color =
        this.members.find((member) => member.uid === event.userUid)?.avatar
          .circleColors.hex || this.account.owner.avatar.circleColors.hex;
      const rgb = parseInt(color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return event === this.createEvent ? `rgba(${r}, ${g}, ${b}, 0.7)` : color;
    },
    getEventName(event) {
      return (
        this.members.find((member) => {
          return member.uid === event.userUid;
        })?.name || this.account.owner.name
      );
    },
    showEvent({ nativeEvent, event }) {
      if (this.selectedOpen || event.userUid !== this.userProfile.uid) {
        this.selectedEvent = this.selectedElement = null;
        this.selectedOpen = false;
      } else {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        this.selectedOpen = true;
      }

      nativeEvent.stopPropagation();
    },
    deleteEvent(eventToDelete) {
      let eventList = this.account.events || [];

      this.$store.dispatch("accounts/updateAccount", {
        id: this.account.id,
        events: eventList.filter((event) => event !== eventToDelete),
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
