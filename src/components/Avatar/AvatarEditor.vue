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
            <div class="d-flex">
              <v-expansion-panel-header>
                {{ asset.name }}
              </v-expansion-panel-header>
              <v-swatches
                v-if="asset.colors"
                class="avatar-editor__swatche"
                :trigger-style="{ width: '32px', height: '32px' }"
                row-length="6"
                shapes="circles"
                popover-x="left"
                :swatches="asset.colors.list"
                @input="updateColor({ id: asset.colors.id, $event })"
              />
            </div>
            <v-expansion-panel-content color="primary">
              <div class="d-flex flex-wrap">
                <button
                  v-for="(type, typeKey) of asset.types"
                  :key="`avatar-editor-item-${typeKey}`"
                  :class="`avatar-editor__item avatar-editor__item--${asset.id}`"
                  @click="updateAsset({ asset: asset.id, typeKey })"
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
import VSwatches from "vue-swatches";

// Import the styles too, typically in App.vue or main.js
import "vue-swatches/dist/vue-swatches.css";

import Avataaars from "vuejs-avataaars";

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
  components: { Loading, UserAvatar, Avataaars, VSwatches },
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
      hatAndShirtColors: Object.values(hatAndShirtColors),
      hairColors: Object.values(hairColors),
      skinColors: Object.values(skinColors),
      assetsTypes: [
        {
          name: "Bouche",
          id: "mouthTypes",
          types: mouthTypes,
          colors: {
            id: "skinColors",
            list: Object.values(skinColors),
          },
        },
        { name: "Yeux", id: "eyeTypes", types: eyeTypes },
        {
          name: "Cheveux",
          id: "topTypes",
          types: topTypes,
          colors: {
            id: "hairColors",
            list: Object.values(hairColors),
          },
        },
        { name: "Sourcil", id: "eyebrowTypes", types: eyebrowTypes },
        { name: "Barbe", id: "facialHairTypes", types: facialHairTypes },
        { name: "Accessoire", id: "accessoriesTypes", types: accessoriesTypes },
        {
          name: "Tenue",
          id: "clothesType",
          types: clothesType,
          colors: {
            id: "hatAndShirtColors",
            list: Object.values(hatAndShirtColors),
          },
        },
        {
          name: "Motif tenue",
          id: "GraphicShirtTypes",
          types: GraphicShirtTypes,
        },
      ],
    };
  },
  computed: {
    ...mapState("account", ["userProfile"]),
  },
  methods: {
    updateAsset(asset) {
      console.log(asset);
    },
    updateColor(asset) {
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

  &__swatche {
    position: absolute;
    right: -16px;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
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
