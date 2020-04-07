<template lang="pug">
  div
    .costs-list-subtitle.m-t-20 
        strong {{ customStyle.period_title }}:
    .preloader-behind
      .preloader-behind-row.row.m-t-15
        .col-md-4.col-6(v-for="(fixedCost, index) in fixedCostsBy" :key="index")
          input.radio-block-input(
            type="radio"
            data-vv-name="month"
            v-validate="'required'"
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

      small.text-danger {{ errors.first('getDefaults[getPriceForm][month]:required') }}
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
    ...mapState('order', ['residual', 'cash_payment']),
    ...mapState('reseller', {
      customStyle: (state) =>
        state.customStyle.firstStep ? state.customStyle.firstStep : {}
    }),
    ...mapGetters('product', ['getDefaults', 'getPriceForm']),
    ...mapGetters('order', ['vehicleCostId']),
    vehicleCostId: {
      get() {
        return this.$store.state.order.vehicleCostId
      },
      set(value) {
        this.$store.commit('order/setVehicleCostId', value)
      }
    },
    month() {
      return this.getDefaults[this.getPriceForm].months
    },
    distance() {
      return this.getDefaults[this.getPriceForm].distance
    }
  },
  methods: {
    ...mapActions('product', [
      'getFixedCostByMonthAndDistance',
      'updateDefaults'
    ]),
    setVehicleCostId(fixedCost) {
      const { id, months, residual } = fixedCost
      const _this = this

      this.vehicleCostId = id

      this.getFixedCostByMonthAndDistance([
        months,
        this.getDefaults[this.getPriceForm].distance
      ]).then((cost) => {
        this.$store.dispatch('order/saveAllFields', {
          vehicleCostId: cost.id,
          totalMonthlyPrice: cost.general_price,
          residual
        })

        this.$store.dispatch('product/updateVehicle', {
          vehicleCostId: cost.id,
          residual
        })

        _this.updateDefaults({
          form: _this.getPriceForm,
          months,
          id: cost.id,
          residual
        })
      })
    }
  }
}
</script>
