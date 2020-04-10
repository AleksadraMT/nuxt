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
          //- @click.prevent="scrollToBlock($event)" data-id="footer-block"
          a.sub-menu-link.scroll-item( 
            href="#"
          )  Kundtjänst
          nuxt-link.sub-menu-link(
            v-if="isPrivate"
            :to="{ name: 'base-omleaseonline', params: {base: $route.params.base}}"
            ) Om Leaseonline
          //- @click.prevent="scrollToBlock($event, 'home')" data-id="seo-block"
          a.sub-menu-link.scroll-item(
            v-if="isPrivate"
            href="#"
          ) Om Privatleasing
          a.sub-menu-link.j-brand-list(
            :href="`/${$route.params.base}/bilmarken`"
            @click.prevent="SET({mutation: 'setBrandListVisible', value: !brandListVisible})"
          ) Bilmärken
          nuxt-link.sub-menu-link( 
            :to="{ name: 'base-faq', params: {base: $route.params.base}}"
            ) Vanliga frågor och svar
          //- @click.prevent="scrollToBlock($event, 'home')"
          a.sub-menu-link.scroll-item( 
            v-if="isPrivate"
            href="#"
            data-open-seo-block
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
    ...mapActions('settings', ['SET'])
  }
}
</script>
