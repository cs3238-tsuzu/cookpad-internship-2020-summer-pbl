<template>
  <v-layout column justify-center align-center>
    <v-flex v-if="post !== null" xs12 sm8 md6>
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
                <v-btn @click="like" large icon>
                  <v-icon v-bind:color="heartColor">mdi-heart</v-icon>
                </v-btn>
                <div style="display: inline" class="text-subtitle-1">{{post.liked}}</div>
              </div>
            </v-col>
            <v-divider v-bind:vertical="true"></v-divider>
            <v-col md="4">
              <div align="center">
                <v-btn @click="cook" large icon>
                  <v-icon>mdi-silverware-fork-knife</v-icon>
                </v-btn>
                <div style="display: inline" class="text-subtitle-1" v-if="linked">{{linked.cooked}}</div>
                <div style="display: inline" class="text-subtitle-1" v-else>{{post.cooked}}</div>
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


    <v-speed-dial
      v-model="fab"
      right
      bottom
      dark
      direction="top"
      transition='slide-y-reverse-transition'
      class="v-btn--example"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          dark
          large
          fab
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        small
        @click="newLinked"
      >
        <v-icon>mdi-silverware-fork-knife</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        @click="open"
      >
        <v-icon>mdi-comment</v-icon>
      </v-btn>
    </v-speed-dial>

  </v-layout>
</template>

<style scoped>
.v-btn--example {
    bottom: 0;
    right: 0;
    position: fixed;
    margin: 0 16px 48px 0;
}
.v-btn--floating {
  position: relative;
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Post, seed, PostClient } from "~/model/post";
import { Like, LikeClient } from "~/model/like";
import { Comment, seed as commentSeed, CommentClient } from "~/model/comment";
import Paragraph from "~/components/Paragraph.vue";
import CommentDialog from "~/components/CommentDialog.vue";
import { auth, login } from '~/firebase';

export default Vue.extend({
  components: {
    "parahraph": Paragraph,
    "comment-dialog": CommentDialog,
  },
  data() {
    return {
      fab: false,
      post: null,
      comments: [],
      dialog: false,
      liked: [],
      linked: null,
    } as {
      fab: Boolean;
      post: Post | null;
      comments: Comment[];
      dialog: Boolean;
      liked: Like[];
      linked: Post | null;
    }
  },
  async created() {
    const post = await PostClient.get(this.$nuxt.$route.params.id);
    this.post = post;

    this.$nuxt.$emit("title", `${post.title} (${post.author})`);
    this.$nuxt.$emit("back", true);
    this.$nuxt.$on(`comment-${post.id}`, this.comment);

    console.log("current user: ", auth.currentUser?.uid);

    console.log("size", (await LikeClient.get(this.$nuxt.$route.params.id).get()).size);

    if(post.linked !== post.id) {
      this.$bind("linked", PostClient.getRaw(post.linked));
    }
  },
  beforeDestroy() {
    this.$nuxt.$off(`comment-${this.$nuxt.$route.params.id}`);
  },
  firestore() {
    return {
      post: PostClient.getRaw(this.$nuxt.$route.params.id),
      comments: CommentClient.list(this.$nuxt.$route.params.id),
      liked: LikeClient.get(this.$nuxt.$route.params.id),
    }
  },
  validate({ params: {id: string} }) {
    return true
  },
  methods: {
    open() {
      this.dialog = true
    },
    async comment(comment: string | null) {
      this.dialog = false;

      if (comment) {
        console.log(`Posting ${comment}`)

        await CommentClient.upload({
          comment,
          postID: this.$nuxt.$route.params.id,
        })
      }
    },
    like() {
      LikeClient.upload(this.$nuxt.$route.params.id, this.liked.length ? "remove" : "add");
    },
    cook() {
      this.$nuxt.$router.push(`/list/${this.post.linked}`);
    },
    newLinked() {
      this.$nuxt.$router.push(`/new?linked=${this.post?.linked}`);
    }
  },
  computed: {
    heartColor() {
      return this.liked.length ? "pink" : undefined
    }
  }
})
</script>
