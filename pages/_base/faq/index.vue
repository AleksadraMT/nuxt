<template lang="pug">
  div(
    id="faq"
    class="faq static-page-wrapper"
  )
    .container
      h1.subpage-heading Vanliga frågor och svar
      .faq-subtitle
        | Här får du svar på våra vanligaste frågor.
        br
        | Du hittar fler frågor och svar under respektive kategori. Hittar du inte svaret på din fråga eller om något verkar oklart så tveka inte att kontakta oss så hjälper vi dig!

      .faq-categories-list
        .faq-categories-item
          ul.anchor-list
            li(
              v-for="section in filteredSections"
              :key="section.id"
            )
              span(
                :data-id="section.id"
                @click="scrollToBlock"
              ) {{ section.name }}

      .faq-categories
        .row(
          v-for="(generalSection, index) in filteredArticles"
          :key="index + 1"
        )
          .large-12.columns
            h2(
              class="generalSection-title"
              :id="generalSection.id"
            ) {{generalSection.name}}
          
          .large-12.columns.faq-columns
            .faq-question-wrapper(
              v-for="article in generalSection.articles"
              :key="article.id"
            )
              a(
                :id="article.id"
                :title="article.title"
                href="javascript: void 0"
                class="faq-question js-faq-question"
                @click="toggleActive($event)"
              )
                span {{article.title}}
                span.faq-show-more
                  span.faq-show-more-plus
                    AddSvg(
                      customClass="faq-links-icon"
                    )
                  span.faq-show-more-minus
                    RemoveSvg(
                      customClass="faq-links-icon"
                    )
              .faq-answer.js-faq-answer(v-html="article.body")
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

import Helper from '~/mixins/Helper'

export default {
  name: 'Faq',
  components: {
    AddSvg: () => import('~/components/svg/add'),
    RemoveSvg: () => import('~/components/svg/remove')
  },
  mixins: [Helper],
  data: () => ({
    metaDescription:
      'Ingår service? Kostar det något när man lämnar tillbaka bilen? Här får du svar på våra vanligaste frågor om privatleasing genom Leaseonline.',
    metaTitle: 'Vanliga frågor och svar om privatleasing - Leaseonline',
    categories: [],
    sections: [],
    articles: []
  }),
  computed: {
    ...mapState('reseller', ['financeFormCollectionName']),
    ...mapGetters({
      style: 'reseller/getSiteStyle'
    }),
    isPrivate() {
      return this.financeFormCollectionName === 'private'
    },
    isCorporate() {
      return this.financeFormCollectionName === 'corporate'
    },
    privateCategories() {
      if (!this.categories) return []

      return [this.categories.allmant, this.categories.privat]
    },
    corporateCategories() {
      if (!this.categories) return []

      return [this.categories.allmant, this.categories.foretag]
    },
    filteredSections() {
      if (!this.sections) return []

      const ids = this.isPrivate
        ? this.privateCategories
        : this.corporateCategories

      return this.sections.filter((item) => ids.includes(item.category_id))
    },
    filteredSectionsIds() {
      if (!this.filteredSections) return []

      return this.filteredSections.reduce((sum, next) => {
        sum.push(next.id)

        return sum
      }, [])
    },
    filteredArticles() {
      if (!this.articles || !this.filteredSections || !this.filteredSectionsIds)
        return []

      const getSectionName = (id) =>
        this.filteredSections.find((item) => Number(item.id) === Number(id))
          .name

      return this.articles.reduce((sum, next) => {
        if (!this.filteredSectionsIds.includes(next.section_id)) return sum

        if (!sum[next.section_id]) {
          sum[next.section_id] = {
            id: next.section_id,
            name: getSectionName(next.section_id),
            articles: []
          }
        }

        sum[next.section_id].articles.push(next)

        return sum
      }, {})
    }
  },
  async mounted() {
    this.setIsHomePage(false)
    await this.getCategoriesIds()
    await this.getSections()
    await this.getArticles()
  },
  methods: {
    ...mapMutations('settings', ['setIsHomePage']),
    toggleActive(e) {
      if (e.currentTarget.classList.contains('active')) {
        e.currentTarget.classList.remove('active')
      } else {
        e.currentTarget.classList.add('active')
      }
    },
    scrollToBlock(e) {
      if (process.client) {
        const toTheBlock = e.target.attributes['data-id'].value

        document.getElementById(toTheBlock).scrollIntoView(true)

        window.scrollBy(0, -70)
      }
    },
    async getCategoriesIds() {
      // privat, foretag or allmant

      const categoriesRequest = await fetch(
        'https://leaseonline.zendesk.com/api/v2/help_center/sv/categories.json',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const categories = await categoriesRequest.json()

      const categoriesIds = categories.categories.reduce((sum, next) => {
        const name = next.name
          .replace(/[åäÅÄA]/g, 'a')
          .replace(/[öÖ]/g, 'o')
          .toLowerCase()

        sum[name] = next.id

        return sum
      }, {})

      this.$set(this.$data, 'categories', categoriesIds)
    },
    async getSections() {
      const sectionsRequest = await fetch(
        'https://leaseonline.zendesk.com/api/v2/help_center/sv/sections.json',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const sections = await sectionsRequest.json()

      this.$set(this.$data, 'sections', sections.sections)
    },
    async getArticles() {
      const articlesRequest = await fetch(
        'https://leaseonline.zendesk.com/api/v2/help_center/sv/articles.json?&per_page=100',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const articles = await articlesRequest.json()

      this.$set(this.$data, 'articles', articles.articles)
    }
  },
  head() {
    return this.metaData({
      title: this.metaTitle,
      logo: this.style.logoFont.favicon,
      description: this.metaDescription
    })
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/pages/Faq.sass'
</style>
