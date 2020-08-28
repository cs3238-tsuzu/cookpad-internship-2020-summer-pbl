<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card v-bind:ripple="false" class="mb-3" v-for="post in posts" :key="post.id" @click="showDetail(`/post/${post.id}`)">
        <v-img
          class="white--text align-end"
          height="200px"
          :src=post.imageURL
        >
        </v-img>

        <v-card-text class="text--primary">
          <div class="text-h5 font-weight-bold">
            {{post.title}}
          </div>
          <div class="font-weight-bold">by {{post.author}}</div>
          <div>{{post.description}}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn icon @click.stop="like(post.id)">
            <v-icon v-if="likedMap.hasOwnProperty(post.id)" color="pink">mdi-heart</v-icon>
            <v-icon v-else>mdi-heart</v-icon>
          </v-btn>
          {{post.liked}}

          <v-btn icon @click.stop="cook(post.linked)">
            <v-icon>mdi-silverware-fork-knife</v-icon>
          </v-btn>
          {{postsMap[post.linked].cooked}}

          <v-btn icon>
            <v-icon>mdi-comment</v-icon>
          </v-btn>
          {{post.comments}}
        </v-card-actions>
      </v-card>
    </v-flex>
    <nuxt-link to="/new">
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
    </nuxt-link>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Post, seed, PostClient } from "~/model/post";
import { LikeClient } from "~/model/like";
import { firestore } from "~/firebase";

export default Vue.extend({
  data() {
    return ({
      posts: [],
      liked: [],
    }) as {
      posts: Post[];
      liked: {postID: string}[];
    };
  },
  async created() {
    this.$nuxt.$emit('title', "フィルター中...");
    this.$nuxt.$emit("back", true);

    this.$nuxt.$emit('title', (await PostClient.get(this.$nuxt.$route.params.id)).title);
  },
  firestore() {
    return {
      posts: PostClient.filter(this.$nuxt.$route.params.id),
      liked: LikeClient.list(),
    }
  },
  methods: {
    showDetail(page: string) {
      this.$nuxt.$router.push(page);
    },
    like(id: string) {
      LikeClient.upload(id, this.likedMap.hasOwnProperty(id))
    },
    cook(id: string) {
      this.$nuxt.$router.push(`/list/${id}`);
    },
  },
  computed: {
    likedMap() {
      const obj: {[key: string]: unknown} = {};

      this.liked.forEach((element: {postID: string}) => {
        obj[element.postID] = {};
      });

      return obj
    },
    postsMap() {
      const obj: {[key: string]: Post} = {};

      this.posts.forEach((post: Post) => {
        obj[post.id] = post;
      });

      return obj;
    }
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
