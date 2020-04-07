<template lang="pug">
  div
    .costs-list-title(
      @click="setActive('Corporate rental')"
    )
      span
        i.fas.fa-chevron-right.costs-list-chevron
        span.costs-list-title-text Långtidshyra
      span.costs-list-price
       span.big {{ costPrice }}
       | &nbsp;&nbsp;kr/mån

    .costs-list-content
      MonthChoiser(
        :fixedCostsBy="fixedCostsByDistance"
        :showPices="true"
      )
      DistanceChoiser(
        :fixedCostsBy="fixedCostsByMonth"
        :showPices="true"
      )

</template>

<script>
import CostsMixin from '~/components/Product/Steps/Costs/mixins/CostsMixin.js'

export default {
  components: {
    MonthChoiser: () =>
      import('~/components/Product/Steps/Costs/costs-parts/month.vue'),
    DistanceChoiser: () =>
      import('~/components/Product/Steps/Costs/costs-parts/distance.vue')
  },
  mixins: [CostsMixin],
  computed: {
    costPrice() {
      return this.getFormCostPrice('Corporate rental')
    }
  },
  methods: {
    setActive(value) {
      this.$emit('click', value)
    }
  }
}
</script>
