<template lang="pug">
  .faq-links.static-page-wrapper
    .content-block
      h3.title-l FAQ - Vanliga frågor och svar
      .link-list
        FaqLink(
          v-for="(article, index) in articlesList"
          :key="index"
          :article="article"
        )
      .text-center
        router-link(
          class="faq-links-btn btn btn-og invert btn-hover"
          :to="{ name: 'base-faq', params: {collectionType: $route.params.collectionType}}"
        ) SE FLER FRÅGR & SVAR

</template>

<script>
import { mapState } from 'vuex'

import FaqLink from './FaqLink'

export default {
  name: 'FaqList',
  components: {
    FaqLink
  },
  data: () => ({
    zendeskArticles: []
  }),
  computed: {
    ...mapState('reseller', ['financeFormCollectionName']),
    articlesList() {
      return this.zendeskArticles.length
        ? this.zendeskArticles.filter((item) =>
            item.label_names.includes(this.financeFormCollectionName)
          )
        : []
    }
  },
  async mounted() {
    const response = await fetch(
      'https://leaseonline.zendesk.com/api/v2/help_center/sv/articles.json?&per_page=100',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    this.zendeskArticles = data.articles
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/FaqList.sass'
</style>
