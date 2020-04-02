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
    List
    div SEO text
    div RECO
    div Brands List
    div Zendesk FAQ
    div SEO big block
</template>

<script>
import Maintenance from '~/components/Common/Maintenance'
import CarouselFull from '~/components/Carousel/CarouselFull'
import UserFilter from '~/components/Filter/Filter'
import List from '~/components/ProductsList/List.vue'

export default {
  components: {
    Maintenance,
    CarouselFull,
    UserFilter,
    List
  },
  middleware: 'vehiclesList'
}
</script>
