<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
        <v-img
          class="white--text align-end"
          height="200px"
          :src=post.imageURL
        >
        </v-img>
        <parahraph class="mt-3" v-bind:text=post.description></parahraph>

        <v-divider></v-divider>

        <v-container fluid>
          <v-row justify="space-around">
            <v-col md="4">
              <div align="center">
                <v-btn large icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <div style="display: inline" class="text-subtitle-1">{{post.liked}}</div>
              </div>
            </v-col>
            <v-divider v-bind:vertical="true"></v-divider>
            <v-col md="4">
              <div align="center">
                <v-btn large icon>
                  <v-icon>mdi-silverware-fork-knife</v-icon>
                </v-btn>
                <div style="display: inline" class="text-subtitle-1">{{post.cooked}}</div>
              </div>
            </v-col>
            <v-divider v-bind:vertical="true"></v-divider>
            <v-col md="4">
              <div align="center">
                <v-btn large v-bind:depressed="true" v-bind:ripple="false" icon>
                  <v-icon>mdi-comment</v-icon>
                </v-btn>
                <div style="display: inline" class="text-subtitle-1">{{post.comments}}</div>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>
        <div class="text-h6 mt-2">コメント一覧</div>

        <div>
          <v-list-item two-line v-for="comment in comments" :key="comment.id">
            <v-list-item-content>
              <v-list-item-title>{{comment.author}}</v-list-item-title>
              <v-list-item-subtitle>{{comment.comment}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
        <comment-dialog v-bind:dialog="dialog" v-bind:id="this.post.id"></comment-dialog>
    </v-flex>
    <v-fab-transition>
      <v-btn
        fab
        large
        dark
        bottom
        left
        class="v-btn--example"
        @click="open"
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
import { Comment, seed as commentSeed } from "~/model/comment";
import Paragraph from "~/components/Paragraph.vue";
import CommentDialog from "~/components/CommentDialog.vue";

export default Vue.extend({
  components: {
    "parahraph": Paragraph,
    "comment-dialog": CommentDialog,
  },
  data() {
    return {
      post: seed[0],
      comments: commentSeed,
      dialog: false,
    } as {
      post: Post;
      comments: Comment[];
      dialog: Boolean;
    }
  },
  created() {
    this.$nuxt.$emit("title", `${this.post.title} (${this.post.author})`);
    this.$nuxt.$emit("back", "/");
    this.$nuxt.$on(`comment-${this.post.id}`, this.comment);
  },
  validate({ params: {id: string} }) {
    return true
  },
  methods: {
    open() {
      this.dialog = true
    },
    comment(comment: string | null) {
      this.dialog = false;

      if (comment) {
        console.log(`Posting ${comment}`)
      }
    }
  }
})
</script>
