<template>
  <v-dialog
    v-if="userProfile && userProfile.avatar"
    v-model="avatarEditorDialog"
    fullscreen
    hide-overlay
    transition="avatar-editor"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" text :elevation="0" class="mb-3">
        <UserAvatar big />
        <v-icon class="avatar-editor__edit primary white--text">
          mdi-pencil-outline
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Edition de ton avatar</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn dark text @click="avatarEditorDialog = false"> Fermer </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container v-if="userProfile" class="d-flex flex-column align-center">
        <UserAvatar big class="avatar-editor__avatar mb-4" />

        <v-swatches
          class="avatar-editor__swatche"
          :trigger-style="{ width: '32px', height: '32px' }"
          row-length="4"
          shapes="circles"
          popover-x="right"
          :swatches="Object.values(circleColors)"
          :value="userProfile.avatar.circleColors.hex"
          @input="updateColor({ id: 'circleColors', value: $event })"
        />

        <v-expansion-panels class="avatar-editor__items" popout>
          <v-expansion-panel
            v-for="(asset, index) of assetsTypes"
            :key="`asset-${index}`"
            class="avatar-editor__accessories"
          >
            <div class="d-flex">
              <v-expansion-panel-header hide-actions>
                {{ asset.name }}
              </v-expansion-panel-header>
              <div class="avatar-editor__swatches">
                <v-swatches
                  v-if="asset.colors"
                  class="avatar-editor__swatche"
                  :trigger-style="{ width: '32px', height: '32px' }"
                  row-length="4"
                  shapes="circles"
                  popover-x="right"
                  :swatches="asset.colors.list"
                  :value="
                    userProfile.avatar[asset.colors.id] &&
                    userProfile.avatar[asset.colors.id].hex
                  "
                  @input="updateColor({ id: asset.colors.id, value: $event })"
                />
                <v-swatches
                  v-if="asset.colors2"
                  class="avatar-editor__swatche"
                  :trigger-style="{ width: '32px', height: '32px' }"
                  row-length="4"
                  shapes="circles"
                  popover-x="right"
                  :swatches="asset.colors2.list"
                  :value="
                    userProfile.avatar[asset.colors2.id] &&
                    userProfile.avatar[asset.colors2.id].hex
                  "
                  @input="updateColor({ id: asset.colors2.id, value: $event })"
                />
              </div>
            </div>
            <v-expansion-panel-content color="primary">
              <div class="d-flex flex-wrap">
                <button
                  v-for="(type, typeKey) of asset.types"
                  :key="`avatar-editor-item-${typeKey}`"
                  :class="`avatar-editor__item avatar-editor__item--${asset.id}`"
                  @click="update({ id: asset.id, value: typeKey })"
                >
                  <svg
                    v-if="typeKey !== 'Blank' && typeKey !== 'NoHair'"
                    v-html="type"
                  />
                  <v-icon
                    v-else
                    color="black"
                    x-large
                    class="avatar-editor__icon-blank"
                  >
                    mdi-circle-off-outline
                  </v-icon>
                </button>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
      <Loading v-else />
    </v-card>
  </v-dialog>
  <section v-else class="platform d-flex align-center justify-center">
    <Loading />
  </section>
</template>

<script>
import UserAvatar from "@/components/Avatar/UserAvatar";
import VSwatches from "vue-swatches";

// Import the styles too, typically in App.vue or main.js
import "vue-swatches/dist/vue-swatches.css";

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
  circleColors,
} from "./assetsTypes/colors";
import Loading from "../Loading";
import { mapState } from "vuex";
import { randomProperty } from "../../helpers/objects";

const clotheColors = hatAndShirtColors;
const topColors = hatAndShirtColors;
const facialHairColors = hairColors;

export default {
  name: "AvatarEditor",
  components: { Loading, UserAvatar, VSwatches },
  data() {
    return {
      avatarEditorDialog: false,
      mouthTypes: mouthTypes,
      eyeTypes: eyeTypes,
      topTypes: topTypes,
      clotheTypes: clothesType,
      eyebrowTypes: eyebrowTypes,
      facialHairTypes: facialHairTypes,
      accessoriesTypes: accessoriesTypes,
      GraphicShirtTypes: GraphicShirtTypes,
      clotheColors: hatAndShirtColors,
      skinColors,
      hairColors,
      facialHairColors,
      topColors,
      circleColors,
      assetsTypes: [
        {
          name: "Bouche",
          id: "mouthTypes",
          types: mouthTypes,
          colors: {
            id: "skinColors",
            list: Object.values(skinColors),
            objList: skinColors,
          },
        },
        { name: "Yeux", id: "eyeTypes", types: eyeTypes },
        {
          name: "Cheveux / Chapeau",
          id: "topTypes",
          types: topTypes,
          colors: {
            id: "hairColors",
            list: Object.values(hairColors),
            objList: hairColors,
          },
          colors2: {
            id: "topColors",
            list: Object.values(topColors),
            objList: topColors,
          },
        },
        { name: "Sourcil", id: "eyebrowTypes", types: eyebrowTypes },
        {
          name: "Barbe",
          id: "facialHairTypes",
          types: facialHairTypes,
          colors: {
            id: "facialHairColors",
            list: Object.values(facialHairColors),
            objList: facialHairColors,
          },
        },
        {
          name: "Accessoire",
          id: "accessoriesTypes",
          types: accessoriesTypes,
        },
        {
          name: "Tenue",
          id: "clotheTypes",
          types: clothesType,
          colors: {
            id: "clotheColors",
            list: Object.values(clotheColors),
            objList: clotheColors,
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
  mounted() {
    if (this.$route.hash === "#avatar") {
      this.avatarEditorDialog = true;
    }
  },
  watch: {
    userProfile(val) {
      if (val && !val.avatar) {
        this.$store.dispatch("user/updateProfile", {
          ...val,
          avatar: this.generateRandomAvatar(),
        });
      }
    },
  },
  computed: {
    ...mapState("user", ["userProfile"]),
  },
  methods: {
    update(asset) {
      this.$store.dispatch("user/updateAvatar", asset);
    },
    updateColor(asset) {
      const assets = this[asset.id];
      const assetEntrie = Object.entries(assets).find(
        (a) => a[1] === asset.value
      );

      this.update({
        ...asset,
        value: { id: assetEntrie[0], hex: assetEntrie[1] },
      });
    },
    generateRandomAvatar() {
      const randomAvatar = {};
      this.assetsTypes.forEach((asset) => {
        randomAvatar[asset.id] = randomProperty(asset.types);
      });
      this.assetsTypes
        .filter((asset) => asset.colors)
        .map((asset) => asset.colors)
        .forEach((color) => {
          const randColorProperty = randomProperty(color.objList);
          randomAvatar[color.id] = {
            hex: color.objList[randColorProperty],
            id: randColorProperty,
          };
        });
      this.assetsTypes
        .filter((asset) => asset.colors2)
        .map((asset) => asset.colors2)
        .forEach((color) => {
          const randColorProperty = randomProperty(color.objList);
          randomAvatar[color.id] = {
            hex: color.objList[randColorProperty],
            id: randColorProperty,
          };
        });
      randomAvatar;
      return randomAvatar;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-editor {
  $this: &;

  &__avatar {
    width: 200px;
  }

  &__edit {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: scale(0.75);
    transform-origin: right bottom;
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 0.75em;
  }

  &__swatches {
    position: absolute;
    right: 1em;
    height: 48px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__swatche {
    + #{$this} {
      &__swatche {
        margin-left: 0.5em;
      }
    }
  }

  &__items {
    ::v-deep svg > g {
      transform: inherit;
    }
  }

  &__item {
    width: 33%;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
    max-height: 110px;

    &--topTypes,
    &--clotheTypes,
    &--GraphicShirtTypes {
      width: 50%;

      svg {
        transform: scale(0.6);
      }
    }

    &--facialHairTypes,
    &--accessoriesTypes {
      width: 50%;

      svg {
        transform: scale(0.8);
      }
    }
  }

  &__icon-blank {
    opacity: 0.5;
  }
}
</style>
