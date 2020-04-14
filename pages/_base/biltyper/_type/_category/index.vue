<template lang="pug">
  .types(v-cloak)
    Filter(
      :showFormsFilter="false"
    )
    .container
      .type-block
        h2.type-block-title.subpage-heading {{ categorieLanding ? categorieLanding.title : '' }}
        .type-block-description(
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
    List
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

import Filter from '~/components/Filter/Filter.vue'
import List from '~/components/ProductsList/List.vue'

import Helper from '~/mixins/Helper'

export default {
  name: 'Categories',
  components: {
    Filter,
    List
  },
  mixins: [Helper],
  data: () => ({
    textVisibility: false
  }),
  computed: {
    ...mapState('landings', ['categoriesLandings']),
    ...mapState('reseller', ['resellerInfo']),
    ...mapState('filter', ['allTypes']),
    categorieLanding() {
      return this.categoriesLandings.length
        ? this.categoriesLandings.find(
            (item) =>
              item.url ===
              `/${this.$route.params.type}/${this.$route.params.categorie}`
          )
        : {}
    },
    metaTitle() {
      return this.categorieLanding && this.categorieLanding.metaData
        ? this.categorieLanding.metaData.title
        : ''
    },
    metaDescription() {
      return this.categorieLanding && this.categorieLanding.metaData
        ? this.categorieLanding.metaData.description
        : ''
    },
    metaKeywords() {
      return this.categorieLanding && this.categorieLanding.metaData
        ? this.categorieLanding.metaData.keywords
        : ''
    },
    rightColumn() {
      if (
        !(
          this.categoriesLandings &&
          this.categoriesLandings.length &&
          this.categorieLanding
        )
      )
        return ''

      const data = this.categorieLanding.contents.data.filter(
        (item) => item.column === 'right'
      )

      return this.getHTML(data)
    },
    leftColumn() {
      if (
        !(
          this.categoriesLandings &&
          this.categoriesLandings.length &&
          this.categorieLanding
        )
      )
        return ''

      const data = this.categorieLanding.contents.data.filter(
        (item) => item.column === 'left'
      )

      return this.getHTML(data)
    }
  },
  mounted() {
    this.onTheHomePage(false)

    if (this.categoriesLandings.length && this.allTypes.length)
      this.getFilterData()
  },
  methods: {
    ...mapMutations('global', ['onTheHomePage']),
    ...mapMutations('filter', [
      'setSelectedFilters',
      'setDataLoaded',
      'setType',
      'setResellerTypeId'
    ]),
    ...mapActions('filter', ['getAllFilterData']),
    async getFilterData() {
      const landingType = this.$route.params.type
      const typeData = this.allTypes.find((item) => {
        return (
          item.type.name
            .replace(/-/g, ' ')
            .replace(/[åÅ]/g, 'a')
            .replace(/[öÖ]/g, 'o')
            .toLowerCase() === landingType
        )
      })

      if (!typeData) {
        this.$router.push({
          name: 'notfound'
        })
      }

      await this.setType(typeData.type.id)
      await this.setResellerTypeId(typeData.id)

      await this.getAllFilterData({ newResellerId: typeData.id })

      const landing = this.categoriesLandings.find(
        (item) =>
          item.url ===
          `/${this.$route.params.type}/${this.$route.params.categorie}`
      )

      if (!landing) {
        this.$router.push({
          name: 'notfound'
        })

        return
      }

      const id = landing.category.id

      this.setSelectedFilters({ name: 'categories', values: [id] })
    },
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
      logo: this.style.logoFont.favicon,
      description: this.metaDescription,
      keywords: this.metaKeywords,
      url: this.vehicleMeta.url
    })
  }
}
</script>

<style lang="sass">
.type-block
  padding: 60px 0
  color: #000
  width: 100%
  margin: auto

  &-title
    text-align: center

  &-description
    font-size: 16px
    display: none
    flex-direction: row-reverse
    @media screen and (max-width: 480px)
      flex-direction: column-reverse

    > div
      width: 50%
      padding: 0 15px
      &:first-child
        padding-right: 0
      &:last-child
        padding-left: 0

      @media screen and (max-width: 480px)
         width: 100%
         padding: 0

    &.visible
      display: flex

  .seo-show-more
    padding-top: 25px
</style>
