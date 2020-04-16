<template lang="pug">
  transition(name="slide")
    .sub-menu.j-sub-menu(
      v-if="subMenuVisibility"
    )
      ul.sub-menu-list
        li
          CollectionsSwitcher(
            :customClass="'leasing-mobile-switcher visible-on-small'"
          )

        li.sub-menu-item
          .sub-menu-link.j-bodies-list(
            @click="SET({mutation: 'setCategoriesListVisible', value: !categoriesListVisible})"
          ) Biltyper
          a.sub-menu-link.scroll-item( 
            href="#"
            @click="UPDATE_VIEW({toThe: 'footer-block'})"
          )  Kundtjänst
          nuxt-link.sub-menu-link(
            v-if="isPrivate"
            :to="{ name: 'base-om-leaseonline', params: {base: $route.params.base}}"
            ) Om Leaseonline
          a.sub-menu-link.scroll-item(
            v-if="isPrivate"
            href="#"
            @click="UPDATE_VIEW({toThe: 'seo-block'})"
          ) Om Privatleasing
          a.sub-menu-link.j-brand-list(
            :href="`/${$route.params.base}/bilmarken`"
            @click.prevent="SET({mutation: 'setBrandListVisible', value: !brandListVisible})"
          ) Bilmärken
          nuxt-link.sub-menu-link( 
            :to="{ name: 'base-faq', params: {base: $route.params.base}}"
            ) Vanliga frågor och svar
          a.sub-menu-link.scroll-item( 
            v-if="isPrivate"
            href="#"
            @click="UPDATE_VIEW({toThe: 'betalning', openSeo: true})"
          ) Betalning och leveransinformation
          a.sub-menu-link(href="http://www.ecarsuite.com/" target="_blank") E-car Suite för återförsäljare
</template>

<script>
import { mapActions, mapState } from 'vuex'

import CollectionsSwitcher from '~/components/Header/CollectionsSwitcher.vue'

export default {
  name: 'SubNavigation',
  components: {
    CollectionsSwitcher
  },
  computed: {
    ...mapState('settings', [
      'subMenuVisibility',
      'brandListVisible',
      'categoriesListVisible'
    ]),
    ...mapState('reseller', ['financeFormCollectionName']),
    isPrivate() {
      return this.financeFormCollectionName === 'private'
    }
  },
  methods: {
    ...mapActions('settings', ['SET']),
    ...mapActions('filters', ['UPDATE_VIEW'])
  }
}
</script>
