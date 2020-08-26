<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
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
        <parahraph class="mt-3" v-bind:text=post.description></parahraph>

        <v-divider></v-divider>
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
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
    </v-fab-transition>

  </v-layout>
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
import { Post, seed } from "~/model/post";
import Paragraph from "~/components/Paragraph.vue";


export default Vue.extend({
  components: {
    "parahraph": Paragraph,
  },
  data() {
    return {
      post: seed[0],
    } as {
      post: Post;
    }
  },
  validate({ params: {id: string} }) {
    return true
  }
})
</script>
