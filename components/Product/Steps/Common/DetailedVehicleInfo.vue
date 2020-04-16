<template lang="pug">
  div
    .step-subtitle.m-t-20 Finansform, avtalslängd & körsträcka
    ul.model-char-list.m-t-10
      li.model-char-list-item
        span Finansform
        span {{ translate('sv', finance_form_name) }}
      li.model-char-list-item
        span Avtalslängd
        span {{ month }} Månader
      li.model-char-list-item(v-if="distance > 0")
        span Körsträcka
        span {{ distance }} {{distanceTitle}}
    .step-subtitle.m-t-20 Service / Vägassistans
    ul.model-char-list.m-t-10
      li.model-char-list-item
        span Service
        span {{ vehicle.service ? 'Ingår' : 'Ingår ej' }}
      li.model-char-list-item(v-if="vehicle.roadsideAssist && Object.keys(vehicle.roadsideAssist).length")
        span Vägassistans
        span {{ vehicle.roadsideAssist.name }}
    .step-subtitle.m-t-20 Leverans
    ul.model-char-list.m-t-10
      li.model-char-list-item(v-if="isRental")
        span Uthämtningsdatum & klockslag
        span {{ pickUpDate }} {{ pickUpTime }}
      li.model-char-list-item
        span Uthämtningsplats
        span {{ location.name || '-'}}
      li.model-char-list-item(v-if="deliveryTime")
        span Leveranstid
        span 
          | {{ daysfrom.number }}&nbsp;
          | {{ daysfrom.text.trim() === daysto.text.trim() ? '' : daysfrom.text }} - 
          | {{ daysto.number }}&nbsp;
          | {{ daysto.text }}
    template(v-if="accessories.length")
      .step-subtitle.m-t-20 Tillval
      ul.model-char-list.m-t-10
        li.model-char-list-item(v-for="(orAccess, index) in accessories")
          span {{ accessor(orAccess).name }}
          span {{ accessor(orAccess).calculated_price }} kr/mån

    template(v-if="hasNetPrices")
      .step-subtitle.m-t-20 Finansupplägg
      ul.model-char-list.m-t-10
        li.model-char-list-item
          span Totalpris inklusive tillval
          span {{ formatPrice(totalPrice) }} kr
        li.model-char-list-item
          span Kontantinsats
          span {{ formatPrice(calculatedCashPaymentPrice) }} kr
        li.model-char-list-item
          span Finansierat belopp
          span {{ formatPrice(totalPrice - calculatedCashPaymentPrice) }} kr
        li.model-char-list-item
          span Restvärde
          span {{ formatPrice(calculatedResidualPrice) }} kr
        li.model-char-list-item
          span Ränta, rörlig
          span {{ rate }} %

</template>

<script>
import { mapState, mapGetters } from 'vuex'

import moment from 'moment'
import Helper from '~/mixins/Helper'
import translate from '~/lang/lang'

export default {
  mixins: [Helper],
  computed: {
    ...mapState('product', ['vehicle', 'modelColor']),
    ...mapState('filters', ['finance_form_name']),
    ...mapState('order', [
      'accessories',
      'locationId',
      'cash_payment',
      'residual',
      'pickUpTime'
    ]),
    ...mapState('order', {
      pickUpDate: (state) => moment(state.pickUpDate).format('DD MMM Y')
    }),
    ...mapGetters('product', [
      'getDefaults',
      'deliveryDaysCountFrom',
      'deliveryDaysCountTo'
    ]),
    ...mapState('settings', ['deliveryTime']),
    month() {
      return this.getDefaults[this.finance_form_name].months
    },
    distance() {
      return this.getDefaults[this.finance_form_name].distance
    },
    fullVehicleName() {
      return `${this.vehicle.brand} ${this.vehicle.model} ${this.vehicle.grade} ${this.vehicle.name}`
    },
    localAccessories() {
      if (!this.vehicle.accessories) return []

      return this.vehicle.accessories.data
    },
    totalPrice() {
      return (
        this.netPrice + this.totalAccessoriesPrice + this.modelColor.total_price
      )
    },
    totalAccessoriesPrice() {
      const totalPrice = this.vehicle.accessories.data.reduce((sum, next) => {
        if (this.accessories.includes(next.id)) {
          return sum + next.total_price
        } else {
          return sum
        }
      }, 0)

      return totalPrice
    },
    location() {
      return this.vehicle.locations
        ? this.vehicle.locations.data.find(
            (item) => item.id === this.locationId
          ) || {}
        : {}
    },
    hasNetPrices() {
      return ['Down payment', 'Corporate leasing'].includes(
        this.finance_form_name
      )
    },
    rate() {
      return Number.parseFloat(this.isHasPriceData('rate')).toFixed(2)
    },
    calculatedCashPaymentPrice() {
      const price = this.totalPrice * (this.cash_payment / 100)

      return Math.round(price)
    },
    calculatedResidualPrice() {
      const price = this.rspPrice * (this.residual / 100)

      return Math.round(price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    netPrice() {
      return this.isHasPriceData('net')
    },
    rspPrice() {
      return this.isHasPriceData('rsp')
    },
    distanceTitle() {
      return ['Private rental', 'Corporate rental'].includes(
        this.finance_form_name
      )
        ? 'mil/mån'
        : 'mil/år'
    },
    daysfrom() {
      return this.getDaysOrWeeks(this.deliveryDaysCountFrom, 'short')
    },
    daysto() {
      return this.getDaysOrWeeks(this.deliveryDaysCountTo, 'short')
    }
  },
  methods: {
    translate,
    accessor(item) {
      return (
        this.localAccessories.find((accessor) => accessor.id === item) || {}
      )
    },
    isHasPriceData(key) {
      if (!(this.vehicle.prices && this.vehicle.prices.data.length)) return

      const pricesObj = this.vehicle.prices.data.find(
        (item) => item.finance_form === this.finance_form_name
      )

      return pricesObj ? pricesObj[key] : 0
    }
  }
}
</script>
