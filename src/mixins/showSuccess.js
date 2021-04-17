export default {
  data() {
    return {
      showSuccess: false,
    };
  },
  methods: {
    triggSuccess() {
      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 2000);
    },
  },
};
