<template>
  <v-app dark>
    <v-app-bar fixed app>
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
export default {
  data() {
    return {
      title: "タイムライン",
    }
  },
  created() {
    this.$nuxt.$on('title', this.setHeader);
  },
  methods: {
    setHeader(title: string) {
      this.title = title || '';
    },
  }
}
</script>
