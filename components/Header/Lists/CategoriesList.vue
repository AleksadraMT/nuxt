<template lang="pug">
  #bodies.bodies(v-show="categoriesListVisible")
    .bodies-inner
      div
        h2 Våra biltyper
      .bodies-row
        .columns
          ul
            li(v-for="(type, index) in categoriesLandings" :key="index")
              router-link(
                :to="`/${$route.params.base}/biltyper${type.url}`"
                ) {{ type.title }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CategoriesList',
  computed: {
    ...mapState('settings', ['categoriesListVisible']),
    ...mapState('landings', ['categoriesLandings'])
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/sass/components/Header/CategoriesList.sass'
</style>
