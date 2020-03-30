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
</template>

<style lang="sass" scoped>
@import '~/assets/sass/layout/Header.sass'
</style>

<script>
import Logo from '~/components/Header/Logo.vue'
import CollectionsSwitcher from '~/components/Header/CollectionsSwitcher.vue'
import Navigation from '~/components/Header/Navigation.vue'
import SubNavigation from '~/components/Header/SubNavigation.vue'
import BrandsList from '~/components/Header/Lists/BrandsList.vue'
import CategoriesList from '~/components/Header/Lists/CategoriesList.vue'

export default {
  name: 'Header',
  components: {
    Logo,
    CollectionsSwitcher,
    Navigation,
    SubNavigation,
    BrandsList,
    CategoriesList
  },
  data: () => ({
    isHomePage: true
  })
}
</script>
