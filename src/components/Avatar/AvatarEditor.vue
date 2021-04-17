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
        <Avataaars
          :clotheType="'GraphicShirt'"
          :topType="'Hat'"
          :eyebrowType="'Angry'"
          :eyeType="'Cry'"
          :mouthType="'Eating'"
          :facialHairColor="'Blonde'"
          :graphicType="'Cumbia'"
          class="avatar-editor__avatar mb-4"
        />

        <v-expansion-panels class="avatar-editor__items" popout>
          <v-expansion-panel
            v-for="(asset, index) of assetsTypes"
            :key="`asset-${index}`"
            class="avatar-editor__accessories"
          >
            <v-expansion-panel-header>
              {{ asset.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content color="primary">
              <div class="d-flex flex-wrap">
                <button
                  v-for="(type, typeKey) of asset.types"
                  :key="`avatar-editor-item-${typeKey}`"
                  :class="`avatar-editor__item avatar-editor__item--${asset.id}`"
                  @click="update({ asset: asset.id, typeKey })"
                >
                  <svg v-html="type" />
                </button>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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

import Avataaars from "vuejs-avataaars";

export default {
  name: "AvatarEditor",
  components: { Loading, UserAvatar, Avataaars },
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
      assetsTypes: [
        { name: "Bouche", id: "mouth", types: mouthTypes },
        { name: "Yeux", id: "eye", types: eyeTypes },
        { name: "Cheveux", id: "top", types: topTypes },
        { name: "Sourcil", id: "eyebrow", types: eyebrowTypes },
        { name: "Barbe", id: "facialHair", types: facialHairTypes },
        { name: "Accessoire", id: "accessories", types: accessoriesTypes },
        { name: "Tenue", id: "clothe", types: clothesType },
        { name: "Motif tenue", id: "GraphicShirt", types: GraphicShirtTypes },
      ],
    };
  },
  computed: {
    ...mapState("account", ["userProfile"]),
  },
  methods: {
    update(asset) {
      console.log(asset);
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-editor {
  &__avatar {
    width: 200px;
  }
  &__items {
    ::v-deep svg > g {
      transform: inherit;
    }
  }

  &__item {
    width: 33%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &--top {
      width: 50%;

      svg {
        width: 100%;
        transform: scale(0.6);
      }
    }
  }
}
</style>
