<template lang="pug">
  .home(v-cloak)
    CarouselFull(
      :loop="true"
      :navigationEnabled="true"
      :perPageCustom="[[768, 2]]"
      :paginationPadding="5"
      :perPage="1"
    )
    UserFilter(
      :showFormsFilter="true"
    )
    div Cars List
    div SEO text
    div RECO
    div Brands List
    div Zendesk FAQ
    div SEO big block
</template>

<script>
import Maintenance from './../../components/Common/Maintenance'
import CarouselFull from './../../components/Carousel/CarouselFull'
import UserFilter from './../../components/Filter/Filter'

export default {
  components: {
    Maintenance,
    CarouselFull,
    UserFilter
  },
  middleware: 'filtersData'
}
</script>
