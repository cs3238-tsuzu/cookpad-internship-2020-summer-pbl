<template>

</template>

<script lang="ts">
import Vue from 'vue'
import {auth, login} from "~/firebase";
export default Vue.extend({
  async created() {
    await login()
  }
})
</script>
