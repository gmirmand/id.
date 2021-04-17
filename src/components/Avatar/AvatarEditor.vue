<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="avatar-editor">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" text :elevation="0">
        <UserAvatar />
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>Edition de ton avatar</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn dark text @click="dialog = false"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container class="d-flex flex-column align-center">
        <UserAvatar big />
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import UserAvatar from "@/components/Avatar/UserAvatar";

// Import assetsTypes from git repo because npm package not up to date
// https://github.com/orgordin/vuejs-avataaars
import { accessoriesTypes } from "./assetsTypes/accessories";
import { clothesType } from "./assetsTypes/clothes";
import { eyebrowTypes } from "./assetsTypes/eyebrows";
import { eyeTypes } from "./assetsTypes/eyes";
import { facialHairTypes } from "./assetsTypes/facial-hair";
import { GraphicShirtTypes } from "./assetsTypes/graphic-shirt";
import { mouthTypes } from "./assetsTypes/mouth";
import { topTypes } from "./assetsTypes/top";
import {
  hairColors,
  skinColors,
  hatAndShirtColors,
} from "./assetsTypes/colors";
import Loading from "../Loading";
import { mapState } from "vuex";

export default {
  name: "AvatarEditor",
  components: { Loading, UserAvatar },
  data() {
    return {
      dialog: false,
      mouthTypes: mouthTypes,
      eyeTypes: eyeTypes,
      topTypes: topTypes,
      clothesType: clothesType,
      eyebrowTypes: eyebrowTypes,
      facialHairTypes: facialHairTypes,
      accessoriesTypes: accessoriesTypes,
      GraphicShirtTypes: GraphicShirtTypes,
      hatAndShirtColors: hatAndShirtColors,
      hairColors: hairColors,
      skinColors: skinColors,
      circleColor: "#79cbb8",
    };
  },
  computed: {
    ...mapState("account", ["userProfile"]),
  },
};
</script>
