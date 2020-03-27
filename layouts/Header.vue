<template lang="pug">
  header.header(:class="{'home-page': isHomePage}")
    #header-wrapper.header-wrapper.onTop
      .header-top
        .col-custom-padding
          nav.navbar
            //- Site logo
            Logo
            //- Global finance form switcher
            CollectionsSwitcher
</template>

<style lang="sass" scoped>
@import '~/assets/sass/layout/Header.sass'
</style>

<script>
import Logo from '~/components/Header/Logo.vue'
import CollectionsSwitcher from '~/components/Header/CollectionsSwitcher.vue'

export default {
  name: 'Header',
  components: {
    Logo,
    CollectionsSwitcher
  },
  data: () => ({
    isHomePage: true
  })
}
</script>
