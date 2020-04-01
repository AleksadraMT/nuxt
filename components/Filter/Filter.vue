<template lang="pug">
  div
    TypeSelect
    FinanceFormsMobile

    //- (v-if="filters.length > 0")
    #filter.filter

    .finance-forms-wrapper(v-if="showFormsFilter")
      FinanceForms

    .filter-sort-block.bordered.m-b-30
      .container.display-flex.content-flex-end
        Sort
</template>

<script>
import { mapGetters } from 'vuex'

import TypeSelect from '~/components/Filter/TypeSelect/TypeSelect.vue'
import FinanceFormsMobile from '~/components/Filter/FinanceForms/FinanceFormsMobile.vue'
import FinanceForms from '~/components/Filter/FinanceForms/FinanceForms.vue'
import Sort from '~/components/Filter/Sort/Sort.vue'

export default {
  name: 'UserFilter',
  components: {
    TypeSelect,
    FinanceFormsMobile,
    FinanceForms,
    Sort
  },
  props: {
    showFormsFilter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('filter', ['getSelectedFilters'])
  }
}
</script>
