import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'

const formatPrice = (num) => {
  if (!num || num === 0) return num

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const isFormsWithResidual = (form) => {
  return ['down payment', 'corporate leasing'].includes(form.toLowerCase())
}

const isHasValue = (value) => {
  return value !== undefined && value !== null && value !== ''
}

let call = true

export default {
  data: () => ({
    slider: {
      dotSize: 18,
      height: 7
    },
    formatter: '{value}%'
  }),
  components: {
    VueSlider
  },
  computed: {
    ...mapState('product', ['vehicle', 'modelColor', 'residualVisibility']),
    ...mapState('filters', ['finance_form_name']),
    ...mapGetters('product', ['getDefaults', 'isVatIncluded']),
    minResidual() {
      return this.isHasPriceData('min_residual')
    },
    maxResidual() {
      return this.isHasPriceData('max_residual')
    },
    minCashPayment() {
      return this.isHasPriceData('min_cash_payment')
    },
    maxCashPayment() {
      return this.isHasPriceData('max_cash_payment')
    },
    netPrice() {
      return this.isHasPriceData('net')
    },
    rspPrice() {
      return this.isHasPriceData('rsp')
    },
    rate() {
      return Number.parseFloat(this.isHasPriceData('rate')).toFixed(2)
    },
    effectiveRate() {
      return this.vehicle.effectiveInterest
    },
    residual: {
      get() {
        if (isFormsWithResidual(this.finance_form_name) && this.isHasDefault) {
          const storeResidual = this.$store.state.order.residual
          const defaultsResidual = this.getDefaults[this.finance_form_name]
            .residual
          const vehicleResidual =
            this.isHasDefault && defaultsResidual === null
              ? this.isHasPriceData('default_residual')
              : defaultsResidual

          if (isHasValue(storeResidual)) {
            return storeResidual
          } else {
            this.residual = vehicleResidual

            return vehicleResidual
          }
        }
      },
      set(value) {
        this.$store.commit('order/setResidual', value)
      }
    },
    cashPayment: {
      get() {
        const storeCashPayment = this.$store.state.order.cash_payment
        const defaultCashPayment = this.isHasPriceData('default_cash_payment')

        if (isHasValue(storeCashPayment)) {
          return storeCashPayment
        } else {
          this.cashPayment = defaultCashPayment

          return defaultCashPayment
        }
      },
      set(value) {
        this.$store.commit('order/setCashPayment', value)
      }
    },
    calculatedResidualPrice() {
      const price = this.rspPrice * (this.residual / 100)

      this.getTooltipsAndSetPosition()

      return isNaN(price)
        ? 0
        : Math.round(price)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    calculatedCashPaymentPrice() {
      const price = (this.totalPrice / 100) * this.cashPayment

      this.getTooltipsAndSetPosition()

      return isNaN(price) ? 0 : Math.round(price)
    },
    totalPrice() {
      return (
        this.netPrice + this.totalAccessoriesPrice + this.modelColor.total_price
      )
    },
    vehicleCostId: {
      get() {
        return this.$store.state.order.vehicleCostId
      },
      set(value) {
        this.$store.commit('order/setVehicleCostId', value)
      }
    }
  },
  methods: {
    formatPrice,
    ...mapMutations('order', ['setResidual', 'setCashPayment']),
    ...mapActions('product', ['FETCH_CALC_DEPENDENCIES', 'updateDefaults']),
    async sliderChange() {
      this.updateDefaults({
        form: this.finance_form_name,
        residual: this.residual,
        id: this.vehicleCostId
      })

      await this.FETCH_CALC_DEPENDENCIES()
    },
    setActive(value) {
      this.$emit('click', value)
    },
    isHasPriceData(key) {
      if (!(this.vehicle.prices && this.vehicle.prices.data.length)) return

      const pricesObj = this.vehicle.prices.data.find(
        (item) => item.finance_form === this.finance_form_name
      )

      return pricesObj ? pricesObj[key] : 0
    },
    getTooltipsAndSetPosition() {
      const slidersTooltips = document.querySelectorAll(
        '.vue-slider-dot-tooltip'
      )

      if (slidersTooltips.length) {
        slidersTooltips.forEach((item) => {
          this.tooltipPosition(item)
        })
      }
    },
    tooltipPosition(event) {
      const wrapper = event.target
        ? event.target.closest('.vue-slider')
        : event.closest('.vue-slider')
      const process = wrapper.querySelector('.vue-slider-process')
      const tooltip = wrapper.querySelector('.vue-slider-dot-tooltip')
      const dot = wrapper.querySelector('.vue-slider-dot')
      const defaultPadding = 20

      const sliderWidth = wrapper.offsetWidth
      const processWidth = process.offsetWidth
      const processOffset = processWidth + defaultPadding
      const tooltipHalfWidth = tooltip.offsetWidth / 2
      const dotOffsetLeft = dot.offsetLeft

      if (tooltipHalfWidth > processOffset) {
        tooltip.style.left = `${tooltipHalfWidth - 18}px`
      } else if (sliderWidth < dotOffsetLeft + tooltipHalfWidth) {
        tooltip.style.left = `-${tooltipHalfWidth - 25}px`
      } else {
        tooltip.style.left = `50%`
      }
    }
  },
  watch: {
    residual(n) {
      if (
        (n || n === 0) &&
        (this.cashPayment || this.cashPayment === 0) &&
        this.vehicleCostId &&
        call
      ) {
        this.FETCH_CALC_DEPENDENCIES()

        call = false
      }
    },
    cashPayment(n) {
      if (
        (this.residual || this.residual === 0) &&
        (n || n === 0) &&
        this.vehicleCostId &&
        call
      ) {
        this.FETCH_CALC_DEPENDENCIES()

        call = false
      }
    }
  }
}
