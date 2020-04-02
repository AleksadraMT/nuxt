<template lang="pug">
  #list-sort.list
    template(v-if="vehicles.length")
      .container
        transition-group(name="list" tag="div" class="row")
          .col-xl-4.col-lg-4.col-md-6(
            v-for="(product, index) in vehicles"
            :key="index + 0"
          )
            Product(:vehicle="product")
        div
          .row(v-if="hasMore")
            .col-md-12.m-t-20.m-b-30.text-center
              div.list-load-more(@click="FETCH_ALL({toNextPage: true})") Visa fler bilar
                i.fas.fa-chevron-down.arrow
      .legal-block(v-if="terms")
        .container
          .legal-block-text(v-html="terms")
    template(v-else)
      .container
        .col-md-12.empty.text-center
          p.title Din sökning gav inget resultat.
          p.text Ändra filterinställningarna och försök igen.
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Product from './Product'

export default {
  name: 'List',
  components: {
    Product
  },
  computed: {
    ...mapState('product', ['vehicles', 'pagination']),
    ...mapState('filters', ['finance_form_id']),
    ...mapState('reseller', ['resellerInfo']),
    hasMore() {
      return this.pagination.current_page < this.pagination.total_pages
    },
    terms() {
      const termsObj = this.resellerInfo.defaults.data.find(
        (item) => item.finance_form_id === this.finance_form_id
      )

      return termsObj ? termsObj.terms_desc : ''
    }
  },
  methods: {
    ...mapActions('product', ['FETCH_ALL'])
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/ProductList/List.sass'
</style>
