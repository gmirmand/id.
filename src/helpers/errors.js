import { errorsCollection } from "../firebase";
import store from "../store/index";

export const sendError = (err) => {
  const { uid, name } = store.state.user.userProfile;
  errorsCollection.doc().set({
    err: err.stack,
    date: new Date().toLocaleString(),
    user: { uid, name },
  });

  store.dispatch(
    "alerts/pushErrorAlert",
    {
      message: err.message,
    },
    { root: true }
  );
};
