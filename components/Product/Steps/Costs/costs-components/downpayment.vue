<template lang="pug">
  div
    .costs-list-title(
       @click="setActive('Down payment')"
    )
      span
        i.fas.fa-chevron-right.costs-list-chevron
        span.costs-list-title-text Avbetalning
      span.costs-list-price
       span.big {{ costPrice }}
       | &nbsp;&nbsp;kr/mån

    .costs-list-content
      .costs-list-prices
        div
          .costs-list-subtitle.m-t-20
            strong Totalpris {{ !isVatIncluded ? '(ex. moms)' : '' }}
          .m-t-15.big {{ formatPrice(totalPrice) }} kr
        div
          .costs-list-subtitle.m-t-20
            strong Finansierat belopp
          .m-t-15.big {{ formatPrice(totalPrice - calculatedCashPaymentPrice) }} kr
        div
          .costs-list-subtitle.m-t-20
            strong Ränta
          .m-t-15.big {{ rate }} %
        div(v-if="effectiveRate")
          .costs-list-subtitle.m-t-20
            strong Effektiv ränta
          .m-t-15.big {{ effectiveRate }} %

      .costs-list-subtitle.m-t-20 
        strong Kontantinsats, kr{{ !isVatIncluded ? ' ex. moms' : '' }}:
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

      div(v-if="residualVisibility")
        .costs-list-subtitle.m-t-20 
          strong Restvärde, kr{{ !isVatIncluded ? ' ex. moms' : '' }}:
          .infotooltip(@click="showPopup")
            .infotooltip-content.big-text
              | Klicka här för information om avbetalning med restvärde

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

      MonthChoiser(
        :fixedCostsBy="fixedCostsByDistance"
        :showPices="false"
      )

      div(v-if="false")
        .costs-list-subtitle.m-t-20
          strong Effektiv ränta
        .m-t-15
          | default text default text default text default text default text default text default text 

    popup.transparent(:show="isPopup" @click="closePopup")
      .content
        | Avbetalning med restvärde passar dig som köper en ny bil och som vill byta bil relativt ofta. Avbetalning med restvärde tillåter dig att ha kvar en förutbestämd restskuld vid kontraktstidens slut, vilket ger dig en lägre månadskostnad. När kontraktet ska upphöra väljer du om du vill byta till ny bil, förlänga ditt lånekontrakt eller betala kvarstående restskuld/restvärde.
        br
        br
        | Om du vill byta till ny bil, och din bils marknadsvärde vid kontraktstidens slut överstiger restskulden, kan du använda mellanskillnaden som betalning till kontantinsatsen på en ny avbetalning. På så sätt kan du enklare byta till en ny bil t.ex. vartannat eller vart tredje år och behålla ungefär samma månadskostnad hela tiden.
        br
        br
        | Byter du bil vart tredje år eller tidigare kör du alltid en fräsch modell med den senaste tekniken och du har alltid fulla garantier på bilen och billigare försäkring.

</template>

<script>
import CostsMixin from '~/components/Product/Steps/Costs/mixins/CostsMixin.js'
import CostsSliderMixin from '~/components/Product/Steps/Costs/mixins/CostsSliderMixin.js'

export default {
  components: {
    MonthChoiser: () =>
      import('~/components/Product/Steps/Costs/costs-parts/month.vue'),
    Popup: () => import('~/components/Product/Steps/Common/Popup.vue')
  },
  mixins: [CostsMixin, CostsSliderMixin],
  data: () => ({
    isPopup: false
  }),
  computed: {
    costPrice() {
      return this.getFormCostPrice('Down payment')
    }
  },
  methods: {
    showPopup() {
      this.$set(this.$data, 'isPopup', true)
    },
    closePopup() {
      this.$set(this.$data, 'isPopup', false)
    }
  }
}
</script>
