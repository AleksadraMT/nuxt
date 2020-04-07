import { mapState, mapGetters } from 'vuex'

const getPrice = (costs) => {
  let extraPrice = 0
  const serviceCost = costs.service_cost !== null ? costs.service_cost : 0

  if (costs.extraFields.data.length) {
    extraPrice = costs.extraFields.data.reduce((sum, item) => {
      return sum + item.price
    }, 0)
  }

  return costs.calculated_price + serviceCost + extraPrice
}

const formatPrice = (num) => {
  if (!num || num === 0) return num

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default {
  data: () => ({
    fixedCostsByDistance: [],
    fixedCostsByMonth: []
  }),
  mounted() {
    if (this.finance_form_name) {
      this.getFixedCostsByDistance()
      this.getFixedCostsByMonth()
    }
  },
  computed: {
    ...mapState('product', ['vehicle', 'modelColor']),
    ...mapState('filters', ['finance_form_name']),
    ...mapState('order', ['accessories', 'vehicleCostId']),
    ...mapGetters('product', ['getDefaults']),
    totalAccessoriesMonthlyPrice() {
      const totalPrice = this.vehicle.accessories
        ? this.vehicle.accessories.data.reduce((sum, next) => {
            if (this.accessories.includes(next.id)) {
              return sum + next.calculated_price
            } else {
              return sum
            }
          }, 0)
        : 0

      return totalPrice
    },
    totalAccessoriesPrice() {
      const totalPrice = this.vehicle.accessories
        ? this.vehicle.accessories.data.reduce((sum, next) => {
            if (this.accessories.includes(next.id)) {
              return sum + next.calculated_price
            } else {
              return sum
            }
          }, 0)
        : 0

      return totalPrice
    },
    isHasDefault() {
      return Object.keys(this.getDefaults).length
    }
  },
  methods: {
    getFixedCostsByDistance() {
      const fixedCostsByDistance = this.vehicle.costs
        ? this.vehicle.costs.data
            .filter((item) => item.finance_form === this.finance_form_name)
            .filter((item) => {
              item.general_price = getPrice(item)

              if (
                typeof this.getDefaults[this.finance_form_name] === 'undefined'
              )
                return

              return (
                item.distance ===
                this.getDefaults[this.finance_form_name].distance
              )
            })
            .sort((a, b) => a.months - b.months)
            .sort((a, b) => getPrice(a) - getPrice(b))
        : []

      this.$set(this.$data, 'fixedCostsByDistance', fixedCostsByDistance)
    },
    getFixedCostsByMonth() {
      const fixedCostsByMonth = this.vehicle.costs
        ? this.vehicle.costs.data
            .filter((item) => item.finance_form === this.finance_form_name)
            .filter((item) => {
              item.general_price = getPrice(item)

              if (
                typeof this.getDefaults[this.finance_form_name] === 'undefined'
              )
                return

              return (
                item.months === this.getDefaults[this.finance_form_name].months
              )
            })
            .sort((a, b) => getPrice(a) - getPrice(b))
        : []

      this.$set(this.$data, 'fixedCostsByMonth', fixedCostsByMonth)
    },
    includeColorAndAccessories(basicPrice, form) {
      const activeColor = this.modelColor ? this.modelColor.id : ''
      const activeCostId = this.getDefaults[form].id
      const formModelColors = this.vehicle.costs.data.find(
        (item) => item.id === activeCostId
      )
      const formModelColorPrice = formModelColors.modelColors.data.find(
        (item) => item.id === activeColor
      )

      const modelColorPrice = formModelColorPrice
        ? formModelColorPrice.calculated_price
        : 0
      const accessoriesMonthlyPrice =
        this.finance_form_name === form ? this.totalAccessoriesMonthlyPrice : 0

      return basicPrice + modelColorPrice + accessoriesMonthlyPrice
    },
    getFormCostPrice(form) {
      if (!this.isHasDefault) return 0

      const price = this.includeColorAndAccessories(
        this.getDefaults[form].price,
        form
      )

      return isNaN(price) ? 0 : formatPrice(price)
    }
  }
}
