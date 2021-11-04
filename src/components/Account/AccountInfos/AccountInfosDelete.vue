<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn plain color="red" v-bind="attrs" v-on="on"> Supprimer </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5 red lighten-2">
        Supprimer "{{ account.name }}"
      </v-card-title>

      <v-card-text class="mt-6">
        Confirmez-vous la suppression de ce compte ? Les membres ajoutées
        n'auront plus accès aux identifiants partagés.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="deleteAccount"> Confirmer </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AccountInfosDelete",
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    deleteAccount() {
      this.dialog = false;
      this.$emit("delete");
    },
  },
};
</script>

<style lang="scss" scoped></style>
