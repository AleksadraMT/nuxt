<template lang="pug">
  div
    .costs-list-title(
       @click="setActive('Corporate leasing')"
    )
      span
        i.fas.fa-chevron-right.costs-list-chevron
        span.costs-list-title-text Finansiell leasing
      span.costs-list-price
       span.big {{ costPrice }}
       | &nbsp;&nbsp;kr/mån
      
    .costs-list-content

      .costs-list-prices
        div
          .costs-list-subtitle.m-t-20
            strong Totalpris {{ !isVatIncluded ? '(ex. moms)' : '' }}
          .m-t-15.big 
           | {{ formatPrice(totalPrice) }} kr
        div
          .costs-list-subtitle.m-t-20
            strong Finansierat belopp
          .m-t-15.big {{ formatPrice(totalPrice - calculatedCashPaymentPrice) }} kr
        div
          .costs-list-subtitle.m-t-20
            strong Ränta
          .m-t-15.big {{ rate }} %

      .costs-list-subtitle.m-t-20 
        strong Restvärde, kr{{ !isVatIncluded ? ' ex. moms' : '' }}:
      .row.m-t-40
        .costs-list-slider.col-md-12
          vue-slider(
            :min="minResidual"
            :max="maxResidual"
            v-model="residual"
            :dotSize="slider.dotSize"
            :height="slider.height"
            :silent="true"
            :contained="true"
            :drag-on-click="true"
            :tooltip="'always'"
            @drag-end="sliderChange($event)"
          )
            <template #tooltip="{ index }">
              <div><strong>{{formatPrice(calculatedResidualPrice)}} <span class="tooltip-text-small">kr</span> ({{ residual }}%)</strong></div>
            </template>

      .costs-list-subtitle.m-t-20 
        strong Första förhöjd leasingavgift, kr{{ !isVatIncluded ? ' ex. moms' : '' }}:
      .row.m-t-40
        .costs-list-slider.col-md-12
          vue-slider(
            :min="minCashPayment"
            :max="maxCashPayment"
            v-model="cashPayment"
            :dotSize="slider.dotSize"
            :height="slider.height"
            :silent="true"
            :contained="true"
            :drag-on-click="true"
            :tooltip="'always'"
            @drag-end="sliderChange($event)"
          )
            <template #tooltip="{ index }">
              <div><strong>{{formatPrice(calculatedCashPaymentPrice)}} <span class="tooltip-text-small">kr</span> ({{ cashPayment }}%)</strong></div>
            </template>

      MonthChoiser(
        :fixedCostsBy="fixedCostsByDistance"
        :showPices="false"
      )
</template>

<script>
import CostsMixin from '~/components/Product/Steps/Costs/mixins/CostsMixin.js'
import CostsSliderMixin from '~/components/Product/Steps/Costs/mixins/CostsSliderMixin.js'

export default {
  components: {
    MonthChoiser: () =>
      import('~/components/Product/Steps/Costs/costs-parts/month.vue')
  },
  mixins: [CostsMixin, CostsSliderMixin],
  computed: {
    costPrice() {
      return this.getFormCostPrice('Corporate leasing')
    }
  }
}
</script>
