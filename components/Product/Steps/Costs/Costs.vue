<template lang="pug">
  div
    div.m-t-20
      div.costs-list(
        v-for="(item, key, index) in getSortedCosts"
        :key="item.id"
        :class="{'active': key === finance_form_name }"
        :data-tab-name="key"
      )
        component(
          :is="formatName(key)"
          @click="setActive(key)"
        )
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    privaterental: () => import('./costs-components/privaterental'),
    privateleasing: () => import('./costs-components/privateleasing'),
    downpayment: () => import('./costs-components/downpayment'),
    corporaterental: () => import('./costs-components/corporaterental'),
    corporateleasing: () => import('./costs-components/corporateleasing')
  },
  data: () => ({
    sortedCosts: {},
    sendCosts: true
  }),
  computed: {
    ...mapState('product', ['vehicle', 'residualVisibility']),
    ...mapState('reseller', {
      financeForms: (state) =>
        state.resellerInfo.financeForms &&
        !!state.resellerInfo.financeForms.data.length
          ? state.resellerInfo.financeForms.data
          : []
    }),
    ...mapState('order', ['residual', 'cash_payment', 'vehicleCostId']),
    ...mapState('filters', ['finance_form_name']),
    ...mapGetters('product', [
      'getDefaults',
      'fixedCostByDistanceAndMonth',
      'getSortedCosts'
    ]),
    ...mapGetters('reseller', ['getFinanceFormName', 'getFinanceFormIdByName'])
  },
  watch: {
    vehicle() {
      if (!this.finance_form_name) {
        this.setFinanceFormName(this.getFinanceFormName)
      }

      if (typeof this.isHasPriceData('allow_residual') === 'boolean')
        this.setResidualVisibility(this.isHasPriceData('allow_residual'))

      this.getCostsObj()
    }
  },
  created() {
    if (!this.finance_form_name)
      this.setFinanceFormName(this.getFinanceFormName)

    this.getCostsObj()
  },
  methods: {
    ...mapActions('product', ['updateSortedCosts']),
    ...mapActions('reseller', ['FETCH_STYLE']),
    ...mapMutations('product', ['setResidualVisibility']),
    ...mapMutations('filters', ['setFinanceFormName', 'setFinanceFormId']),
    ...mapActions('order', ['SET']),
    getCostsObj() {
      const availableForms = this.financeForms.length
        ? this.financeForms.reduce((arr, next) => arr.concat(next.name), [])
        : []

      if (this.vehicle.costs) {
        const sortedCosts = {}

        this.vehicle.costs.data.forEach((item) => {
          const name = item.finance_form

          if (availableForms.includes(name)) {
            // eslint-disable-next-line no-prototype-builtins
            if (!sortedCosts.hasOwnProperty(name)) sortedCosts[name] = []

            sortedCosts[name].push(item)
          }
        })

        this.updateSortedCosts(sortedCosts)
      }
    },
    async setActive(tabName) {
      this.setFinanceFormName(tabName)
      this.SET({ mutation: 'setAccessories', value: [] })

      const financeFormId = this.financeForms.find(
        (item) => item.name === tabName
      ).id

      this.setFinanceFormId(financeFormId)

      await this.FETCH_STYLE()

      if (typeof this.isHasPriceData('allow_residual') === 'boolean')
        this.setResidualVisibility(this.isHasPriceData('allow_residual'))

      this.sendCosts = true
    },
    formatName(name) {
      return name.toLowerCase().replace(' ', '')
    },
    isHasPriceData(key) {
      if (!(this.vehicle.prices && this.vehicle.prices.data.length)) return

      const pricesObj = this.vehicle.prices.data.find(
        (item) => item.finance_form === this.finance_form_name
      )

      return pricesObj ? pricesObj[key] : 0
    },
    getResidual() {
      const storeResidual = this.residual
      const vehicleResidual = this.isHasPriceData('default_residual')

      const fixedCostResidual =
        this.fixedCostByDistanceAndMonth &&
        this.fixedCostByDistanceAndMonth.residual
          ? this.fixedCostByDistanceAndMonth.residual
          : vehicleResidual

      return storeResidual || fixedCostResidual
    },
    getCashPayment() {
      const storeCashPayment = this.cash_payment
      const defaultCashPayment = this.isHasPriceData('default_cash_payment')

      return storeCashPayment || defaultCashPayment
    },
    getVehicleId() {
      if (!Object.keys(this.getDefaults).length) return false

      const cost = this.vehicle.costs.data
        .filter((item) => item.finance_form === this.finance_form_name)
        .filter(
          (item) =>
            item.finance_form === this.finance_form_name &&
            item.months === this.getDefaults[this.finance_form_name].months &&
            item.distance === this.getDefaults[this.finance_form_name].distance
        )
        .sort((a, b) => b.months - a.months)
        .reduce((accum, value) =>
          accum.calculated_price < value.calculated_price ? accum : value
        )

      return cost.id
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/Common/Costs.sass'
</style>
