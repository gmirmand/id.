import { required, email, min, max, confirmed } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} est obligatoire",
});

extend("email", {
  ...email,
  message: "Format de l'email invalide",
});

extend("min", {
  ...min,
  message: "{_field_} doit être supérieur à {length} caractères",
});

extend("max", {
  ...max,
  message: "{_field_} doit être inférieur à {length} caractères",
});

extend("confirmed", {
  ...confirmed,
  message: "La confirmation est différente",
});

extend("verify_password", {
  getMessage: () =>
    `Le mot de passe doit contenu au moins: 1 majuscule, 1 minuscule, 1 nombre et 1 caraactère spéciale (E.g. , . _ & ? etc)`,
  validate: (value) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(value);
  },
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
