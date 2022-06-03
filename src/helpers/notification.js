export const sendNotification = (title, text, options) => {
  new Notification(`id.getget.space !!!! -> ${title}`, {
    body: text,
    icon: require("@/assets/img/logo.png"),
    ...options,
  });
};
