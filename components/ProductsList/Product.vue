<template lang="pug">
  nuxt-link.product-card(
    :to="{ name: 'base-product-type-brand-model-name', params: {base: $route.params.base, type: replaceSpaces(vehicle.type), brand: replaceSpaces(vehicle.brand), model: replaceSpaces(vehicle.model), name: replaceSpaces(vehicle.name),} , query: {id: vehicle.id, financeform: replaceSpaces(finance_form_name), } }"
  )
    .product-card-image(:class="{'campaign-offset': isCampaign }")
      ImageBuilder.image(:image-source="image")
      template(v-if="isCampaign")
        .product-card-price-symbol
          .product-card-price-symbol-text {{ vehicle.campaign.text }}
    .product-card-info
      .product-card-title
        .product-card-title-name {{ vehicle.brand }} {{ vehicle.model }}
      .product-card-description
        strong Version:&nbsp;
        span(v-html="separatedName")
        .product-card-title-delivery-days(v-if="hasDeliveryTime")
          strong Leveranstid:&nbsp;
          span {{ deliveryDaysCountFrom() }} 
          span(v-if="!isRental") - {{ deliveryDaysCountTo() }}
      .product-card-price
        .product-card-price-text
          span.num {{ formatPrice(this.vehicle.standard_price) }}
          span.mes kr/mån
        .btn.btn-og.invert.btn-hover {{ chooseBtnText }}
</template>

<script>
import { mapState } from 'vuex'

import Helper from '~/mixins/Helper.js'

import ImageBuilder from '~/components/Common/ImageBuilder.vue'

export default {
  name: 'Product',
  components: {
    ImageBuilder
  },
  mixins: [Helper],
  props: {
    vehicle: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('reseller', {
      resellerInfo: (state) => state.resellerInfo,
      chooseBtnText: (state) =>
        state.siteStyle.listItem
          ? state.siteStyle.listItem.choose_btn_text
          : 'Beställ'
    }),
    ...mapState('settings', {
      hasDeliveryTime: (state) => state.deliveryTime,
      minDaysFromOrder: (state) => state.calendar.min_days_from_order || 0
    }),
    ...mapState('filters', ['finance_form_name']),
    image() {
      let image = ''

      if (this.vehicle.modelColors) {
        const defaultModelColor = this.vehicle.modelColors.data.find(
          (modelColor) => modelColor.thumbnail
        )

        image =
          defaultModelColor && defaultModelColor.image.url
            ? defaultModelColor.image.url
            : this.vehicle.images && this.vehicle.images.data[0]
            ? this.vehicle.images.data[0].url
            : ''
      }

      return image
    },
    isCampaign() {
      const { campaign } = this.vehicle

      return campaign && !!Object.keys(campaign).length && campaign.ongoing
    },
    separatedName() {
      return (
        this.vehicle.grade + ' ' + this.vehicle.name.split('(').join('<br>(')
      )
    }
  },
  methods: {
    replaceSpaces(text) {
      return text.replace(/ /g, '-').toLowerCase()
    },
    getDays(days, flag) {
      const daysParam = this.getDaysOrWeeks(days, flag)

      return `${daysParam.number} ${daysParam.text}`
    },
    deliveryDaysCountFrom() {
      let daysFrom = null

      if (this.vehicle.modelColors && this.vehicle.modelColors.data.length) {
        const getDefaultModelColor = this.vehicle.modelColors.data.find(
          (item) => item.default
        )

        daysFrom = getDefaultModelColor
          ? getDefaultModelColor.delivery_days_from
          : this.vehicle.modelColors.data[0].delivery_days_from
      } else if (
        ['Private rental', 'Corporate rental'].includes(this.finance_form_name)
      ) {
        daysFrom =
          this.vehicle.deliveryTime.days_count &&
          this.vehicle.deliveryTime.days_count !== null
            ? this.vehicle.deliveryTime.days_count
            : this.minDaysFromOrder
      } else {
        daysFrom =
          this.vehicle.deliveryTime.from &&
          this.vehicle.deliveryTime.from !== null
            ? this.vehicle.deliveryTime.from
            : this.vehicle.deliveryTime.days_count
      }

      return !['Private rental', 'Corporate rental'].includes(
        this.finance_form_name
      )
        ? this.getDays(daysFrom, false)
        : `från ${this.getDays(daysFrom, 'short')}`
    },
    deliveryDaysCountTo() {
      let daysTo = null

      if (this.vehicle.modelColors && this.vehicle.modelColors.data.length) {
        daysTo = this.vehicle.modelColors.data.find((item) => item.default)
          .delivery_days_to
      } else {
        daysTo = this.vehicle.deliveryTime.to
      }

      return this.getDays(daysTo, 'short')
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/ProductList/Product.sass'
</style>
