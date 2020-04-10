<template lang="pug">
  div
    .cost-block-header
      .cost-block-title(v-html="monthlyCostTitle")
      .cost-block-price
        span.num {{ calculatedPrice }}
        span.cost-block-values.self-centre
          span kr/mån
          span(v-if="!isVatIncluded") ex. moms
    .cost-block-cont
      .cost-block-text(v-html="monthlyCostDesc")
      .cost-block-title.m-t-10(v-html="creditTitle")
      .cost-block-text.m-t-10(v-html="creditDecs")
      .cost-block-title.m-t-10(v-html="personalDataTitle")
      .cost-block-text.m-t-10(v-html="personalDataDesc")

</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('product', ['calculatePrice', 'isVatIncluded']),
    ...mapState('product', ['vehicle']),
    ...mapState('reseller', ['resellerInfo']),
    ...mapState('filters', ['finance_form_id']),
    calculatedPrice() {
      return this.calculatePrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    monthlyCostTitle() {
      return this.currentDescriptions.length
        ? this.currentDescriptions[0].monthly_cost_title
        : ''
    },
    monthlyCostDesc() {
      return this.vehicle.descriptions.monthly_cost_desc
        ? this.vehicle.descriptions.monthly_cost_desc
        : this.currentDescriptions.length
        ? this.currentDescriptions[0].monthly_cost_desc
        : ''
    },
    creditTitle() {
      return this.currentDescriptions.length
        ? this.currentDescriptions[0].credit_title
        : ''
    },
    creditDecs() {
      return this.vehicle.descriptions.credit_desc
        ? this.vehicle.descriptions.credit_desc
        : this.currentDescriptions.length
        ? this.currentDescriptions[0].credit_desc
        : ''
    },
    personalDataTitle() {
      return this.currentDescriptions.length
        ? this.currentDescriptions[0].personal_data_title
        : ''
    },
    personalDataDesc() {
      return this.vehicle.descriptions.personal_data_desc
        ? this.vehicle.descriptions.personal_data_desc
        : this.currentDescriptions.length
        ? this.currentDescriptions[0].personal_data_desc
        : ''
    },
    currentDescriptions() {
      return this.resellerInfo.defaults.data.filter(
        (item) => item.finance_form_id === this.finance_form_id
      )
    }
  }
}
</script>
