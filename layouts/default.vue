<template lang="pug">
  div
    Header
    nuxt
    Footer
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import Header from './Header'
import Footer from './Footer'

import Helper from '~/mixins/Helper'

export default {
  components: {
    Header,
    Footer
  },
  mixins: [Helper],
  computed: {
    ...mapState('reseller', ['metaDescription', 'resellerInfo', 'token']),
    ...mapGetters({
      style: 'reseller/getSiteStyle'
    })
  },
  mounted() {
    this.$siteStyle(this.style)
  },
  head() {
    return this.metaData({
      title: this.style.logoFont.title,
      logo: this.style.logoFont.favicon,
      description: this.metaDescription,
      url: this.resellerInfo.url
    })
  },
  middleware: 'auth'
}
</script>
