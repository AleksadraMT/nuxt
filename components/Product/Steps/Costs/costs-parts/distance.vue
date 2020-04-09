<template lang="pug">
  div
    .costs-list-subtitle.m-t-20 
        strong {{ siteStyle.distance_title }}:
    .preloader-behind
      .preloader-behind-row.row.m-t-15
        .col-md-4.col-6(v-for="(fixedCost, index) in fixedCostsBy" :key="index")
          input.radio-block-input(
            type="radio"
            :checked="fixedCost.distance === distance"
            :id="`distance${index}`"
            :value="fixedCost.distance"
            @change.stop="setVehicleCostId(fixedCost)"
          )
          label.radio-block(:for="`distance${index}`")
            .radio-block-title {{fixedCost.distance}} {{ distanceTitle }}
            div(v-if="showPices")
              .radio-block-info(v-if="index === 0") Standard
              .radio-block-info.red-text(v-else)
                | + {{fixedCost.general_price - fixedCostsBy[0].general_price}} kr/mån <br>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  props: {
    fixedCostsBy: {
      type: Array,
      default: () => []
    },
    showPices: Boolean
  },
  computed: {
    ...mapState('product', ['vehicle']),
    ...mapState('reseller', {
      siteStyle: (state) =>
        state.siteStyle.firstStep ? state.siteStyle.firstStep : {}
    }),
    ...mapState('filters', ['finance_form_name']),
    ...mapGetters('product', ['getDefaults', 'getFixedCostByMonthAndDistance']),
    ...mapGetters('order', ['vehicleCostId']),
    distance() {
      return this.getDefaults[this.finance_form_name].distance
    },
    distanceTitle() {
      return ['Private rental', 'Corporate rental'].includes(
        this.finance_form_name
      )
        ? 'mil/mån'
        : 'mil/år'
    }
  },
  methods: {
    ...mapActions('product', ['updateDefaults', 'FETCH_CALC_DEPENDENCIES']),
    ...mapActions('order', ['SET']),
    async setVehicleCostId(fixedCost) {
      const { id, distance } = fixedCost

      const cost = this.getFixedCostByMonthAndDistance([
        this.getDefaults[this.finance_form_name].months,
        distance
      ])

      this.SET({ mutation: 'setVehicleCostId', value: id })
      this.SET({
        mutation: 'setTotalMonthlyPrice',
        value: cost.general_price
      })

      await this.FETCH_CALC_DEPENDENCIES()

      await this.updateDefaults({
        form: this.finance_form_name,
        price: cost.general_price,
        distance,
        id
      })
    }
  }
}
</script>
