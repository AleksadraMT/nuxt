<template lang="pug">
  header.header(:class="{'home-page': isHomePage}")
    #header-wrapper.header-wrapper.onTop
      .header-top
        .col-custom-padding
          nav.navbar
            //- Site logo
            Logo
            //- Global finance form switcher
            CollectionsSwitcher(
              :customClass="'abstract-forms hide-on-small'"
            )
            //- Main navigation
            Navigation
      //- Sub Navigation
      SubNavigation

      transition(name="slide")
        BrandsList

      transition(name="slide")
        CategoriesList
    HeaderBottom
</template>

<style lang="sass">
@import '~/assets/sass/layout/Header.sass'
</style>

<script>
/* eslint-disable nuxt/no-globals-in-created */

import { mapActions, mapState } from 'vuex'

import Logo from '~/components/Header/Logo.vue'
import CollectionsSwitcher from '~/components/Header/CollectionsSwitcher.vue'
import Navigation from '~/components/Header/Navigation.vue'
import SubNavigation from '~/components/Header/SubNavigation.vue'
import BrandsList from '~/components/Header/Lists/BrandsList.vue'
import CategoriesList from '~/components/Header/Lists/CategoriesList.vue'
import HeaderBottom from '~/components/Header/HeaderBottom.vue'

export default {
  name: 'Header',
  components: {
    Logo,
    CollectionsSwitcher,
    Navigation,
    SubNavigation,
    BrandsList,
    CategoriesList,
    HeaderBottom
  },
  computed: {
    ...mapState('settings', ['isHomePage'])
  },
  mounted() {
    const _this = this

    document.addEventListener('click', function(e) {
      if (
        e.target.closest('.j-sub-menu') === null ||
        e.target.closest('.sub-menu-link')
      ) {
        _this.SET({ mutation: 'setSubMenuVisibility', value: false })
      }

      if (!e.target.closest('.j-brand-list')) {
        _this.SET({ mutation: 'setBrandListVisible', value: false })
      }

      if (!e.target.closest('.j-bodies-list')) {
        _this.SET({ mutation: 'setCategoriesListVisible', value: false })
      }
    })

    window.addEventListener('scroll', function() {
      const header = document.getElementById('header-wrapper')

      window.scrollY < 10
        ? header.classList.add('onTop')
        : header.classList.remove('onTop')
    })
  },
  methods: {
    ...mapActions('settings', ['SET'])
  }
}
</script>
