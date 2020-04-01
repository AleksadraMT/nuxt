<template lang="pug">
  div.error
    h1 404
    h2 Sidan hittades inte
    h4 Sidan du sökte har antingen tagits bort eller flyttats!
    br
    br
    p
      nuxt-link(
        class="faq-links-btn btn btn-og invert btn-hover"
        :to="{name: 'base', params: {base: $route.params.base}}"
      ) Till startsidan
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
