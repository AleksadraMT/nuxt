<template lang="pug">
  #brands.brands(v-show="brandListVisible || visibility")
    .brands-outer
      div
        h2.subpage-heading Våra varumärken
      div
        ul.brands-list
          li.brands-item(v-for="(link, index) in allLandings" :key="index")
            nuxt-link.brand.brand-icon( 
              :to="{ name: 'base-brandLanding', params: {base: $route.params.base, brandLanding: getBrandParam(link)} }"
            )
              .inner
                img(
                  :src="link.logo"
                  :alt="link.headline"
                )
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BrandsList',
  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('settings', ['brandListVisible']),
    ...mapState('landing', ['allLandings'])
  },
  methods: {
    getBrandParam(obj) {
      const brand = obj.brand.name

      return brand.toLocaleLowerCase().replace(/ /g, '-')
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/Header/BrandsList.sass'
</style>
