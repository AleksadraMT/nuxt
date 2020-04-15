<template lang="pug">
  .home(v-cloak)
    #brand-detail.brand-detail
      .brand-model-img(
        :style="`background-image: url(${modelData.title_image})`"
      )
      h2.brand-title {{ modelData.headline }}
      .brand-info(
        :class="{'brand-cut-info': !textVisibility}"
      ) {{ modelData.info }}
      .brand-description(
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
  name: 'ModelDetails',
  components: {
    UserFilter,
    List
  },
  mixins: [Helper],
  data: () => ({
    textVisibility: false
  }),
  computed: {
    ...mapState('reseller', ['siteStyle']),
    ...mapState('landing', ['modelData']),
    metaTitle() {
      return this.modelData.metaData ? this.modelData.metaData.title : ''
    },
    metaDescription() {
      return this.modelData.metaData ? this.modelData.metaData.description : ''
    },
    metaKeywords() {
      return this.modelData.metaData ? this.modelData.metaData.keywords : ''
    },
    rightColumn() {
      if (!this.modelData.contents) return ''

      const data = this.modelData.contents.data.filter(
        (item) => item.column === 'right'
      )

      return this.getHTML(data)
    },
    leftColumn() {
      if (!this.modelData.contents) return ''

      const data = this.modelData.contents.data.filter(
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
      url: this.$route.fullPath
    })
  },
  middleware: 'modelLanding'
}
</script>
