<template lang="pug">
  //- remove slot scope
  header#order-status.order-status
    .container.d-none.d-lg-block
      .row
        .col-md-6
          ul.order-steps
            li.order-steps-item(
              v-for="step in steps" 
              :key="step.index + 1"
              :class="{'active': activeStep.index === step.index}"
              @click="goTo(step.index - 1)"
            )
              .num {{ step.index }}
              span {{ step.title }}
        .col-md-6
          .order-info
            .order-info-cell(v-if="deliveryTime")
              span.order-info-text Leveranstid
              span.order-info-text-big {{ daysFrom.number }}
              span.order-info-text {{ daysFrom.text.trim() === daysTo.text.trim() ? '' : daysFrom.text }} - 
              span.order-info-text-big {{ daysTo.number }}
              span.order-info-text {{ daysTo.text }}
            .order-info-cell
              span.order-info-text Pris
              span.order-info-text-big {{ totalMonthlyPrice }}
              span.order-info-text(:class="{'text-value': !isVatIncluded}")
                | kr/mån
                span(v-if="!isVatIncluded") 
                  br 
                  | ex. moms
            .order-info-btn
                button.btn.btn.btn-og.btn-hover {{ activeStep.buttonLabel }}
                  i.fas.fa-chevron-right
    .d-block.d-lg-none
      .order-status-mobile
        .mobile-row
          .order-info.justify-content-start
            .order-info-cell.order-info-mobile-steps
              span.order-info-text.self-centre Steg {{ activeStep.index + 1 }} av {{ steps.length }}
            .order-info-cell.order-info-mobile-price
              span.order-info-text Pris
              span.order-info-text-big {{ totalMonthlyPrice }}
              span.order-info-text(:class="{'text-value': !isVatIncluded}")
                | kr/mån
                span(v-if="!isVatIncluded")
                  br
                  | ex. moms
        .mobile-row
          .order-info(v-if="activeStep.index < steps.length - 1")
            .order-info-btn.order-info-btn-back(v-if="activeStep.index > 0")
              button.btn.btn-grey.btn-hover
                i.fas.fa-chevron-left
                span Tillbaka

            .order-info-btn
              button.btn.btn-og.f-w-500.btn-hover
                span {{ activeStep.buttonLabel }}
                i.fas.fa-chevron-right
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Helper from '~/mixins/Helper'

export default {
  name: 'OrderStatus',
  mixins: [Helper],
  props: {
    activeStep: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState('product', ['steps']),
    ...mapState('settings', ['deliveryTime']),
    ...mapGetters('product', [
      'deliveryDaysCountFrom',
      'deliveryDaysCountTo',
      'calculatePrice',
      'isVatIncluded'
    ]),
    ...mapState('order', ['totalMonthlyPrice']),
    daysFrom() {
      // this.deliveryDaysCountFrom
      return this.getDaysOrWeeks(14, 'short')
    },
    daysTo() {
      // this.deliveryDaysCountTo
      return this.getDaysOrWeeks(28, 'short')
    }
  },
  methods: {
    goTo(index) {
      this.$emit('goTo', index)
    }
  }
}
</script>
