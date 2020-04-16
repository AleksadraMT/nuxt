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

import Helper from '~/mixins/Helper'
import CostsMixin from '~/components/Product/Steps/Costs/mixins/CostsMixin.js'

export default {
  components: {
    privaterental: () => import('./costs-components/privaterental'),
    privateleasing: () => import('./costs-components/privateleasing'),
    downpayment: () => import('./costs-components/downpayment'),
    corporaterental: () => import('./costs-components/corporaterental'),
    corporateleasing: () => import('./costs-components/corporateleasing')
  },
  mixins: [Helper, CostsMixin],
  data: () => ({
    sortedCosts: {},
    sendCosts: true
  }),
  computed: {
    ...mapState('product', ['vehicle', 'residualVisibility', 'modelColor']),
    ...mapState('reseller', {
      financeForms: (state) =>
        state.resellerInfo.financeForms &&
        !!state.resellerInfo.financeForms.data.length
          ? state.resellerInfo.financeForms.data
          : [],
      financeFormCollectionName: (state) => state.financeFormCollectionName
    }),
    ...mapState('order', ['residual', 'cash_payment', 'vehicleCostId']),
    ...mapState('filters', ['finance_form_name']),
    ...mapGetters('product', [
      'getDefaults',
      'fixedCostByDistanceAndMonth',
      'getSortedCosts',
      'calculatePrice'
    ])
  },
  mounted() {
    this.getCostsObj()
  },
  methods: {
    ...mapActions('product', ['updateSortedCosts', 'FETCH_CALC_DEPENDENCIES']),
    ...mapActions('reseller', ['FETCH_STYLE']),
    ...mapMutations('product', ['setResidualVisibility']),
    ...mapMutations('filters', ['setFinanceFormName', 'setFinanceFormId']),
    ...mapActions('order', ['SET']),
    getCostsObj() {
      const availableForms = this.financeForms.length
        ? this.financeForms.reduce((arr, next) => {
            if (this.financeFormCollectionName === next.type.toLowerCase()) {
              return arr.concat(next.name)
            }

            return arr
          }, [])
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
      const financeFormId = this.financeForms.find(
        (item) => item.name === tabName
      ).id

      this.setFinanceFormName(tabName)
      this.setFinanceFormId(financeFormId)
      this.SET({ mutation: 'setAccessories', value: [] })

      await this.FETCH_STYLE()

      if (typeof this.isHasPriceData('allow_residual') === 'boolean')
        this.setResidualVisibility(this.isHasPriceData('allow_residual'))

      this.SET({
        mutation: 'setVehicleCostId',
        value: this.getDefaults[tabName].id
      })

      this.SET({
        mutation: 'setTotalMonthlyPrice',
        value: this.includeColorAndAccessories(
          this.getDefaults[tabName].price,
          tabName
        )
      })

      await this.FETCH_CALC_DEPENDENCIES()

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
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/Common/Costs.sass'
</style>
