<template lang="pug">
  .product
    div
      Steps
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

import Steps from '~/components/Product/Steps/Steps.vue'

import Helper from '~/mixins/Helper'

export default {
  name: 'ProductPage',
  components: {
    Steps
  },
  mixins: [Helper],
  computed: {
    ...mapGetters({
      style: 'reseller/getSiteStyle'
    }),
    ...mapState('product', {
      vehicleMeta: (state) => state.vehicleMeta
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
      title: this.vehicleMeta.title,
      logo: this.style.logoFont.favicon,
      description: this.vehicleMeta.description,
      keywords: this.vehicleMeta.keywords,
      url: this.vehicleMeta.url
    })
  },
  middleware: 'vehicle'
}
</script>
