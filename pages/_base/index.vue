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
    .container
      Reco
    .home-brandlist.in-stream
      .container
        BrandsList(
          :visibility="true"
        )
    .container    
      FaqList
    Seo
</template>

<script>
import { mapMutations } from 'vuex'

import Maintenance from '~/components/Common/Maintenance'
import CarouselFull from '~/components/Carousel/CarouselFull'
import UserFilter from '~/components/Filter/Filter'
import List from '~/components/ProductsList/List.vue'
import Reco from '~/components/Reco/Reco.vue'
import BrandsList from '~/components/Lists/BrandsList.vue'
import FaqList from '~/components/FaqBlock/FaqList.vue'
import Seo from '~/components/Seo/Seo.vue'

export default {
  components: {
    Maintenance,
    CarouselFull,
    UserFilter,
    List,
    Reco,
    BrandsList,
    FaqList,
    Seo
  },
  mounted() {
    this.setIsHomePage(true)
  },
  methods: {
    ...mapMutations('settings', ['setIsHomePage'])
  },
  middleware: 'vehiclesList'
}
</script>

<style lang="sass">
.home-brandlist
  background: #F2F2F2
  margin-top: 100px
  padding: 60px 0 50px
  .brands
    background: transparent
</style>
