<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card v-bind:ripple="false" class="mb-3" v-for="post in posts" :key="post.id" @click="showDetail(`/post/${post.id}`)">
        <v-img
          class="white--text align-end"
          height="200px"
          :src=post.imageURL
        >
          <v-card-title>
            {{post.title}}
            <v-spacer></v-spacer>
            by {{post.author}}
          </v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div>{{post.description}}</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn icon @click.stop="like(post.id)">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          {{post.liked}}

          <v-btn icon @click.stop="cook(post.id)">
            <v-icon>mdi-silverware-fork-knife</v-icon>
          </v-btn>
          {{post.cooked}}

          <v-btn icon @click.stop="comment(post.id)">
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          {{post.comments}}

          <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-fab-transition>
      <v-btn
        fab
        large
        dark
        bottom
        left
        class="v-btn--example"
      >
        <v-icon>mdi-camera</v-icon>
      </v-btn>
    </v-fab-transition>

  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Post, seed } from "~/model/post";

export default Vue.extend({
  data() {
    return ({
      posts: seed,
    }) as {
      posts: Post[];
    };
  },
  created() {
    this.$nuxt.$emit('title', "タイムライン");
    this.$nuxt.$emit("back", null);
  },
  methods: {
    showDetail(page: string) {
      this.$nuxt.$router.push(page);
    },
    like(id: string) {

    },
    comment(id: string) {

    },
    cook(id: string) {

    },
  }
})
</script>

<style scoped>
.v-btn--example {
    bottom: 0;
    right: 0;
    position: fixed;
    margin: 0 16px 48px 0;
}
</style>
