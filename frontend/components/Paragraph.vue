<template>
  <div>
    <p v-for="line in splitted" :key="line">
      {{line}}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: "",
    }
  },
  computed: {
    splitted() {
      return this.$props.text.split("\n");
    }
  }
})
</script>
