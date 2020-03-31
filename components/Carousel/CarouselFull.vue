<template lang="pug">
  div(v-if="isHasItems")
    carousel.slider(
      :loop="loop"
      :navigationEnabled="navigationEnabled"
      :navigationNextLabel="navigationNextLabel"
      :navigationPrevLabel="navigationPrevLabel"
      :perPageCustom="perPageCustom"
      :paginationPadding="paginationPadding"
      :perPage="perPage"
      :autoplay="isAutoplay"
      :autoplayTimeout="3000"
    )
      slide(
        v-for="(item, key) in carouselItems"
        :key="key"
      )
        CarouselItem(
          :data="item"
        )
</template>

<script>
/* eslint-disable vue/require-default-prop */
import { mapState } from 'vuex'

import { Carousel, Slide } from 'vue-carousel'
import CarouselItem from './CarouselItem'

export default {
  name: 'CarouselFull',
  components: {
    CarouselItem,
    Carousel,
    Slide
  },
  props: {
    loop: Boolean,
    navigationEnabled: Boolean,
    perPageCustom: Array,
    paginationPadding: {
      type: Number,
      default: 5
    },
    perPage: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    navigationNextLabel: '<div class="left-chevron"></div>',
    navigationPrevLabel: '<div class="right-chevron"></div>'
  }),
  computed: {
    ...mapState('reseller', {
      carouselItems: (state) =>
        state.siteStyle.ads ? state.siteStyle.ads.data : null,
      isHasItems: (state) =>
        state.siteStyle.ads && !!state.siteStyle.ads.data.length
    }),
    isAutoplay() {
      return this.carouselItems.length > 2
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/carousel/CarouselFull.sass'
</style>
