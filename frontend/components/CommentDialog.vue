<template>
  <v-dialog v-model="$props.dialog" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">コメント</span>
      </v-card-title>
      <v-card-text class="ma-0 pt-0 pb-0 px-1">
        <v-container>
          <v-row>
            <v-col cols="12" class="mt-0">
              <v-textarea class="pt-0" auto-grow label="本文" v-model="text" required></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        <v-btn color="blue darken-1" text @click="save">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      text: "",
    }
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    }
  },
  created() {
    console.log(this.$props.dialog);
  },
  methods: {
    close() {
      this.text = "";
      this.$nuxt.$emit(`comment-${this.$props.id}`, null);
    },
    save() {
      const text = this.text;
      this.text = "";
      console.log(this.$props.id);
      this.$nuxt.$emit(`comment-${this.$props.id}`, text);
    }
  }
})
</script>
