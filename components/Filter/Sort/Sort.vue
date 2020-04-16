<template lang="pug">
  .page-filter.text-sm-right
    span.custom-select-title.m-r-10  Sortera bilarna
    select.custom-select.w-a.d-inline-block(
      v-model="selectedTypeOfSort"
      @change="FETCH_ALL({ toNextPage: false })"
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
    ...mapState('settings', {
      hasDeliveryTime: (state) => state.deliveryTime
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
