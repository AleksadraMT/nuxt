<template lang="pug">
  .navbar-wrapper
    ul.navbar-main
      li.nav-item.j-sub-menu
        a.nav-link(
          @click="SET({mutation: 'setSubMenuVisibility', value: !subMenuVisibility})"
        )
          img.nav-link-icon(src="~@/assets/img/header/icon-menu.svg")
          span.nav-link-text Meny
          i.nav-link-angle-down.fas.fa-angle-down.p-l-10.hide-on-small
      li.nav-item.scroll-item(
        @click.prevent="UPDATE_VIEW({toThe: 'filter', sort: 'asc'})"
      )
        nuxt-link.nav-link(:to="{name: 'base', params: {base: $route.params.base}}")
          img.nav-link-icon(src="~@/assets/img/header/icon-search.svg")
          span.nav-link-text Sök bil
      li.nav-item.hide-on-small
        .nav-link.scroll-item(
          @click.prevent="UPDATE_VIEW({toThe: 'list-sort', sort: 'campaign'})"
          data-id="list-sort"
        ) 
          img.nav-link-icon(src="~@/assets/img/header/icon-campaign.svg")
          span.nav-link-text Kampanjer
      li.nav-item.hide-on-small
        .nav-link.scroll-item(
          @click.prevent="UPDATE_VIEW({toThe: 'footer-block'})"
        )
          img.nav-link-icon(src="~@/assets/img/header/icon-mail.svg")
          span.nav-link-text Kontakta oss
      li.nav-item
        a.nav-link(href="tel:0200-210320")
          img.nav-link-icon(src="~@/assets/img/header/icon-phone.svg")
          span.nav-link-text 0200-210320
      li.nav-item.visible-on-small.visible-on-small-flex
        .nav-link.scroll-item(
          @click.prevent="UPDATE_VIEW({toThe: 'footer-block'})"
        )
          img.nav-link-icon(src="~@/assets/img/header/icon-mail.svg")
          span.nav-link-text Kontakta oss
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Navigation',
  computed: {
    ...mapState('settings', ['subMenuVisibility'])
  },
  methods: {
    ...mapActions('settings', ['SET']),
    ...mapActions('filters', ['UPDATE_VIEW'])
  }
}
</script>
