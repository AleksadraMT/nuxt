<template lang="pug">
  div
    .costs-list-subtitle.m-t-20 
        strong {{ customStyle.distance_title }}:
    .preloader-behind
      .preloader-behind-row.row.m-t-15
        .col-md-4.col-6(v-for="(fixedCost, index) in fixedCostsBy" :key="index")
          input.radio-block-input(
            type="radio"
            data-vv-name="distance"
            v-validate="'required'"
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

      small.text-danger {{ errors.first('getDefaults[getPriceForm][distance]:required') }}
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
    distance() {
      return this.getDefaults[this.getPriceForm].distance
    },
    distanceTitle() {
      return ['Private rental', 'Corporate rental'].includes(this.getPriceForm)
        ? 'mil/mån'
        : 'mil/år'
    }
  },
  methods: {
    ...mapActions('product', [
      'getFixedCostByMonthAndDistance',
      'updateDefaults'
    ]),
    setVehicleCostId(fixedCost) {
      const { id, distance } = fixedCost
      const _this = this

      this.vehicleCostId = id

      this.getFixedCostByMonthAndDistance([
        this.getDefaults[this.getPriceForm].months,
        distance
      ]).then((cost) => {
        this.$store.dispatch('order/saveAllFields', { vehicleCostId: cost.id })

        this.$store.dispatch('order/saveAllFields', {
          totalMonthlyPrice: cost.general_price
        })

        this.$store.dispatch('product/updateVehicle', {
          vehicleCostId: cost.id
        })

        _this.updateDefaults({
          form: _this.getPriceForm,
          distance,
          id: cost.id
        })
      })
    }
  }
}
</script>
