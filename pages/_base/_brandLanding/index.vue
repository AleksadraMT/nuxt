<template lang="pug">
  .home(v-cloak)
    #brand-detail.brand-detail( v-if="Object.keys(brandLanding).length" )
      .brand-model-img(
        :style="`background-image: url(${brandLanding.title_image})`"
      )
      h2.brand-title {{ brandLanding.headline }}
      .brand-info(
        :class="{'brand-cut-info': !textVisibility}"
      ) {{ brandLanding.info }}
      .brand-description(
        v-if="rightColumn || leftColumn"
        :class="{'visible': textVisibility}"
      )
        div(v-html="rightColumn")
        div(v-html="leftColumn")
      .seo-show-more(@click="textVisibility = !textVisibility")
        .seo-arrow(:class="{'show': textVisibility}")
          .seo-line-block
            .seo-line.seo-line-left
          .seo-line-block
            .seo-line.seo-line-right
        .seo-show-more-text {{ textVisibility ? 'Stäng' : 'Läs mer' }}

      div.m-t-60(v-if="brandLanding.modelLandings && brandLanding.modelLandings.data.length")
        .brand-title VÅRA {{ brandLanding.brand.name.toUpperCase() }}MODELLER
        .brand-models
          router-link(
            v-for="(model, index) in brandLanding.modelLandings.data"
            :key="index"
            :to="{ name: 'base-brandLanding-modelLanding', params: {collectionType: $route.params.collectionType, brandlanding: $route.params.brandlanding, modelLanding: model.url.split('/').filter(i => !!i)[1], modelData: model}}"
            :title="model.title"
            class="brand brand-icon"
          )
            .brand-models-item
              .brand-models-img-container
                img(
                  :src="model.logo"
                  :alt="model.title"
                )
              .brand-models-details.align-center
                h4 {{ model.title }}
    UserFilter(
      :showFormsFilter="false"
    )
    List
  
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import UserFilter from '~/components/Filter/Filter.vue'
import List from '~/components/ProductsList/List.vue'

import Helper from '~/mixins/Helper'

export default {
  name: 'BrandDetails',
  components: {
    UserFilter,
    List
  },
  mixins: [Helper],
  props: {
    brand: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    textVisibility: false
  }),
  computed: {
    ...mapState('landing', ['allLandings', 'brandLanding']),
    ...mapState('reseller', ['siteStyle']),
    metaTitle() {
      return this.brandLanding.metaData ? this.brandLanding.metaData.title : ''
    },
    metaDescription() {
      return this.brandLanding.metaData
        ? this.brandLanding.metaData.description
        : ''
    },
    metaKeywords() {
      return this.brandLanding.metaData
        ? this.brandLanding.metaData.keywords
        : ''
    },
    rightColumn() {
      const data = this.brandLanding.contents.data.filter(
        (item) => item.column === 'right'
      )

      return this.getHTML(data)
    },
    leftColumn() {
      const data = this.brandLanding.contents.data.filter(
        (item) => item.column === 'left'
      )

      return this.getHTML(data)
    }
  },
  mounted() {
    this.setIsHomePage(false)
  },
  methods: {
    ...mapMutations('settings', ['setIsHomePage']),
    getHTML(data) {
      return data
        .map((item) => {
          if (item.type === 'headline') return `<h3>${item.text}</h3>`
          if (item.type === 'body') return `<p>${item.text}</p>`
          if (item.type === 'list') return `<ul><li>${item.text}</li></ul>`
        })
        .join('')
    }
  },
  head() {
    return this.metaData({
      title: this.metaTitle,
      logo: this.siteStyle.logoFont.favicon,
      description: this.metaDescription,
      keywords: this.metaKeywords,
      url: this.$route.fullPath,
      image: this.brandLanding.title_image
    })
  },
  middleware: 'brandLanding'
}
</script>
