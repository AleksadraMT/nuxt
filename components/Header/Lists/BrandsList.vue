<template lang="pug">
  #brands.brands(v-show="brandListVisible")
    .brands-outer
      div
        h2.subpage-heading Våra varumärken
      div
        ul.brands-list
          li.brands-item(v-for="(link, index) in brandsList" :key="index")
            router-link.brand.brand-icon( 
              :to="{ name: 'brandlanding', params: {base: $route.params.base, landingUrl: getBrandParam(link), brand: getBrandParam(link)}}"
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
  computed: {
    ...mapState('settings', ['brandListVisible']),
    ...mapState('landings', ['allLandings'])
  },
  methods: {
    getBrandParam(obj) {
      const brand = obj.brand.name

      return brand.toLocaleLowerCase().replace(/ /g, '-')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/components/Header/BrandsList.sass'
</style>
