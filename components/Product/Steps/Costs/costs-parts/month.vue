<template lang="pug">
  div
    .costs-list-subtitle.m-t-20 
        strong {{ siteStyle.period_title }}:
    .preloader-behind
      .preloader-behind-row.row.m-t-15
        .col-md-4.col-6(v-for="(fixedCost, index) in fixedCostsBy" :key="index")
          input.radio-block-input(
            type="radio"
            :checked="month === fixedCost.months"
            :id="`month${index}`"
            :value="fixedCost.months"
            @change.stop="setVehicleCostId(fixedCost)"
          )
          label.radio-block(:for="`month${index}`")
            .radio-block-title {{fixedCost.months}} månader
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
    ...mapState('product', ['vehicle', 'priceForm']),
    ...mapState('order', ['residual', 'cash_payment', 'vehicleCostId']),
    ...mapState('filters', ['finance_form_name']),
    ...mapState('reseller', {
      siteStyle: (state) =>
        state.siteStyle.firstStep ? state.siteStyle.firstStep : {}
    }),
    ...mapGetters('product', ['getDefaults', 'getFixedCostByMonthAndDistance']),
    month() {
      return this.getDefaults[this.finance_form_name].months
    },
    distance() {
      return this.getDefaults[this.finance_form_name].distance
    }
  },
  methods: {
    ...mapActions('product', ['updateDefaults', 'FETCH_CALC_DEPENDENCIES']),
    ...mapActions('order', ['SET']),
    async setVehicleCostId(fixedCost) {
      const { id, months, residual } = fixedCost

      const cost = this.getFixedCostByMonthAndDistance([
        months,
        this.getDefaults[this.finance_form_name].distance
      ])

      this.SET({ mutation: 'setVehicleCostId', value: id })
      this.SET({
        mutation: 'setTotalMonthlyPrice',
        value: cost.general_price
      })
      this.SET({ mutation: 'setResidual', value: residual })

      await this.FETCH_CALC_DEPENDENCIES()

      await this.updateDefaults({
        form: this.finance_form_name,
        price: cost.general_price,
        months,
        id,
        residual
      })
    }
  }
}
</script>
