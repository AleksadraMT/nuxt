<template lang="pug">
  .page-filter.text-sm-right
    span.custom-select-title.m-r-10  Sortera bilarna
    //- @change="getVehicles(false)"
    select.custom-select.w-a.d-inline-block(
      v-model="selectedTypeOfSort"
    )
      option(
        v-for="option in sortedBy" 
        :value="option.value" 
        :selected="selectedTypeOfSort === option.value"
      ) {{option.label}}
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'VHeaderSort',
  computed: {
    ...mapState('reseller', {
      hasDeliveryTime: (state) =>
        state.resellerInfo.settings
          ? state.resellerInfo.settings.deliveryTime
          : true
    }),
    ...mapState('filters', ['sortOptions']),
    selectedTypeOfSort: {
      get() {
        return this.$store.state.filters.selectedTypeOfSort
      },
      set(value) {
        this.$store.commit('filters/setSelectedTypeOfSort', value)
      }
    },
    sortedBy() {
      return this.hasDeliveryTime
        ? this.sortOptions
        : this.sortOptions.filter((item) => item.type !== 'delivery')
    }
  },
  methods: {
    ...mapActions('product', ['FETCH_ALL'])
  }
}
</script>
