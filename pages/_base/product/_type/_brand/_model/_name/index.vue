<template lang="pug">
  div ProductPage
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import Helper from '~/mixins/Helper'

export default {
  name: 'ProductPage',
  mixins: [Helper],
  props: {
    isConfirmed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      style: 'reseller/getSiteStyle'
    }),
    ...mapState('product', {
      metaData: (state) => state.vehicleMeta
    })
  },
  mounted() {
    this.setIsHomePage(false)
  },
  methods: {
    ...mapMutations('settings', ['setIsHomePage'])
  },
  head() {
    return this.metaData({
      title: this.metaData.title,
      logo: this.style.logoFont.favicon,
      description: this.metaData.description,
      keywords: this.metaData.keywords,
      url: this.metaData.url
    })
  },
  middleware: 'vehicle'
}
</script>
