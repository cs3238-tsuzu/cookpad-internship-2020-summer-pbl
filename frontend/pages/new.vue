<template>
  <v-dialog v-model="open" fullscreen="" max-width="600px">
    <v-card>
      <v-toolbar dark color="primary">
        <n-link to="/">
          <v-btn icon dark>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </n-link>
        <v-toolbar-title v-if="linked.length === 0">新規投稿</v-toolbar-title>
        <v-toolbar-title v-else>関連投稿</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="save" :disabled="uploading">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="ma-0 pt-0 pb-0 px-1">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-file-input
                v-model="inputImage"
                accept="image/*"
                show-size
                label="アップロードせず料理の写真を撮ってください"
                prepend-icon="mdi-image"
                @change="imageChanged"
                :error="imageError"
              ></v-file-input>
            </v-col>
            <v-col cols="12">
                <v-text-field :disabled="linked.length !== 0" label="レシピ名" :error="titleError" @change="titleChanged" required v-model="title"></v-text-field>
            </v-col>
            <v-col cols="12" class="mt-0">
              <v-textarea class="pt-0" auto-grow label="説明" v-model="description" required></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-btn--example {
    bottom: 0;
    right: 0;
    position: fixed;
    margin: 0 16px 48px 0;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Post, seed, PostClient } from "~/model/post";
import { storage } from "~/firebase";
import { v4 as uuidv4 } from "uuid";

export default Vue.extend({
  data() {
    return {
      open: true,
      title: "",
      description: "",
      inputImage: null,
      titleError: null,
      imageError: null,
      linked: `${this.$nuxt.$route.query.linked ?? ""}`,
      uploading: false,
    } as {
      title: string;
      description: string;
      inputImage: File | null;
      imageError: string | null;
      titleError: string | null;
      linked: string;
      uploading: boolean;
    }
  },
  validate({ params: {id: string} }) {
    return true
  },
  mounted() {
    if(this.linked !== "") {
      PostClient.get(this.linked).then(p => {
        this.title = p.title
      })
    }
  },
  methods: {
    init() {
      this.title = "";
      this.description = "";
    },
    imageChanged() {
      this.imageError = this.inputImage === null ? "画像がアップロードされていません" : null;
    },
    titleChanged() {
      this.titleError = this.title === "" ? "レシピ名が空です" : null;
    },
    async save() {
      this.uploading = true;
      this.titleChanged();
      this.imageChanged();
      if (this.imageError !== null || this.titleError !== null) {
        return;
      }

      const ext = `.${this.inputImage!.name.split(".").slice(-1)[0]}`;

      const filename = uuidv4() + ext;
      await storage.ref().child(filename).put(this.inputImage!);

      const url: string = await storage.ref().child(filename).getDownloadURL();

      PostClient.upload({
        title: this.title,
        description: this.description,
        imageURL: url,
        linked: this.linked,
      })
      this.$router.push("/");

      this.init();
    }
  }
})
</script>
