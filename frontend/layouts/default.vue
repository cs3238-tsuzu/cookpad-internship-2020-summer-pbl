<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-btn icon @click="goBack" v-if="prevPage !== null">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer v-bind:absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }} Tsuzu</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      title: "タイムライン",
      prevPage: null,
    } as {
      title: string;
      prevPage: string | null;
    };
  },
  created() {
    this.$nuxt.$on('title', this.setHeader);
    this.$nuxt.$on('back', this.setPrev);;
  },
  methods: {
    setHeader(title: string) {
      this.title = title || '';
    },
    setPrev(page: string | null) {
      console.log("prev"+page);
      this.$data.prevPage = page;
    },
    goBack() {
      if (this.prevPage)
        this.$nuxt.$router.push(this.prevPage);
    }
  }
})
</script>
