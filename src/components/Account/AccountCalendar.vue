<template>
  <div class="account-calendar">
    <v-calendar
      ref="calendar"
      color="primary"
      type="4day"
      :events="formattedEvents"
      :event-ripple="false"
      @change="getEvents"
      @mousedown:event="onMouseDownEvent"
      @mousedown:time="triggAddDate"
    >
      <template v-slot:event="{ event, timed, eventSummary }">
        <div class="v-event-draggable" v-html="eventSummary()"></div>
        <div
          v-if="timed"
          class="v-event-drag-bottom"
          @mousedown.stop="extendBottom(event)"
        ></div>
      </template>
    </v-calendar>
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
    events: [],
    colors: [
      "#2196F3",
      "#3F51B5",
      "#673AB7",
      "#00BCD4",
      "#4CAF50",
      "#FF9800",
      "#757575",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    dragEvent: null,
    dragStart: null,
    createEvent: null,
    extendOriginal: null,
  }),
  computed: {
    ...mapState("user", ["userProfile"]),
    formattedEvents() {
      return this.events?.map((event) => {
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
    onMouseDownEvent({ event, timed }) {
      if (event && timed) {
        this.dragEvent = event;
        this.dragTime = null;
        this.extendOriginal = null;
      }
    },
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

      this.events.push(this.createEvent);
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
          .circleColors.hex || this.userProfile.avatar.circleColors.hex;
      const rgb = parseInt(color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      return event === this.createEvent ? `rgba(${r}, ${g}, ${b}, 0.7)` : color;
    },
    getEventName(event) {
      return (
        this.members.find((member) => member.uid === event.userUid)?.name ||
        this.userProfile.name
      );
    },
    getEvents({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`).getTime();
      const max = new Date(`${end.date}T23:59:59`).getTime();
      const days = (max - min) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const timed = this.rnd(0, 3) !== 0;
        const firstTimestamp = this.rnd(min, max);
        const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000;
        const start = firstTimestamp - (firstTimestamp % 900000);
        const end = start + secondTimestamp;

        events.push({
          userUid: "jc3ldMVQGqSNi3WKFwvVNK2z6Gl1",
          start,
          end,
          timed,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    rndElement(arr) {
      return arr[this.rnd(0, arr.length - 1)];
    },
  },
};
</script>

<style scoped lang="scss"></style>
