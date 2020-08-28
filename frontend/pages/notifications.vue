<template>
  <v-layout column justify-center>
    <v-flex xs12 sm8 md6>
        <div>
          <v-list-item three-line @click="go(notification.postID)" v-for="notification in notifications" :key="notification.id">
            <v-list-item-avatar>
              <v-img v-if="notification.imageURL.length !== 0" :src="notification.imageURL"></v-img>
              <v-icon>mdi-assignment</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle>{{notification.text}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>
</style>

<script lang="ts">
import Vue from 'vue'
import { Notification, NotificationClient } from "~/model/notification";
import { auth, login } from '~/firebase';

export default Vue.extend({
  data() {
    return {
      notifications: [],
    } as {
      notifications: Notification[];
    }
  },
  async mounted() {
    this.$nuxt.$emit("back", true);

    this.$nuxt.$emit("title", `通知`);
  },
  beforeDestroy() {
  },
  firestore() {
    return {
      notifications: NotificationClient.list(),
    }
  },
  methods: {
    go(id: string) {
      this.$nuxt.$router.push(`/post/${id}`)
    }
  },
  computed: {
  }
})
</script>
