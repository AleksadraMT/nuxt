<template lang="pug">
  .v-galery#lightgallery
    .main-img
      div(:data-url="mainImageUrl || firstImage.url" :data-caption="alt")
        ImageBuilder(:image-source="mainImageUrl || ''" :alt="alt")
    .img-row.m-t-15
      div.img-row-item(
        v-for="(image, index) in images"
        :key="index"
        :data-caption='standardDisclaimer'
      )
        ImageBuilder(
          :image-source="image.url || ''" 
          :loading-image="image.url" 
          :error-image="image.url"
        )
</template>

<script>
import ImageBuilder from './ImageBuilder'

export default {
  components: {
    ImageBuilder
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
    mainImageUrl: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    standardDisclaimer:
      'Bilar på bilderna kan vara extrautrustade och skilja sig från vald modell'
  }),
  computed: {
    firstImage() {
      return this.images.length ? this.images[0] : {}
    }
  },
  mounted() {
    const _this = this
    const gallery = document.getElementById('lightgallery')
    let isOnce = false

    gallery.addEventListener('mouseenter', function() {
      if (isOnce) return

      _this.initGallery()

      isOnce = true
    })
  },
  methods: {
    initGallery() {
      // eslint-disable-next-line
        window.lightGallery(document.getElementById('lightgallery'), {
        thumbnail: true,
        selector: '.gallery-item'
      })
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/Common/Galery.sass'
</style>
