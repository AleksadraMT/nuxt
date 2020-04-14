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
    const siteStyle = localStorage.getItem('siteStyle')

    if (siteStyle === null) {
      this.$siteStyle(this.style)
      localStorage.setItem('siteStyle', JSON.stringify(this.style))
    } else {
      this.$siteStyle(JSON.parse(siteStyle))
    }

    localStorage.setItem('Authorization', this.token)
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
