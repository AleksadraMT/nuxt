<template lang="pug">
  a.slide-link( :href="data.link" )
    .slide-item
      .slide-item-image
        img(
          :src="data.image"
          :alt="data.headline"
        )
      .slide-item-data.m-t-15
        .slide-item-data-content
          div
            strong.slide-item-headline {{ data.headline }}
          .slide-item-intro {{ data.intro }}
        .slide-item-data-price
          div 
            strong.slide-item-headline {{ data.delivery_time }}
          .slide-item-price
            .slide-item-price-text
              span.num {{ price }}&nbsp;
              span.mes kr/månad
            a.btn.btn-og.invert.btn-hover.slide-item-price-btn(
              :href="data.link"
            ) Beställ

</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'CarouselItem',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    data: {}
  },
  computed: {
    price() {
      return this.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/carousel/CarouselItem.sass'
</style>
