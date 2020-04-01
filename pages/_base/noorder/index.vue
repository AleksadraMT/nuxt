<template lang="pug">
  div.error
    h1 Oops! Something went wrong with your order!
    p Go back to the&nbsp;
      a(href="/") main page&nbsp;
      | and try again
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
    this.setIsHomePage(false)
  },
  methods: {
    ...mapMutations('settings', ['setIsHomePage'])
  }
}
</script>

<style lang="sass">
.error
  text-align: center
  padding: 10% 0 10vh
</style>
