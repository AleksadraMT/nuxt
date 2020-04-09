<template lang="pug">
  div(
    v-if="finance_form_name === 'Private rental'"
  )
    .step-subtitle.m-t-20 {{ siteStyle.delivery_title }}
    .row.row-date-time.m-b-20
      .col-md-6
        .input-group.m-t-15
          .input-group-prepend(style="width: 100%")
            span.input-group-text
              i.far.fa-calendar-alt
            ValidationProvider(v-slot="{ errors }" name="pickUpDate" rules="required")
              datepicker(
                ref="datePicker"
                :class="{'is-invalid': errors[0]}"
                placeholder="Välj ett datum"
                data-vv-name="pickUpDate"
                :disabled-dates="disabledDates"
                v-model="pickUpDate"
                :monday-first="true"
                input-class="form-control date-picker"
                :language="sv"
              )
      .col-md-6
        .input-group.m-t-15
          .input-group-prepend
            span.input-group-text
              i.far.fa-clock
          ValidationProvider(v-slot="{ errors }" name="pickUpTime" rules="required")
            select#step-time.custom-select(
              v-model="pickUpTime"
              :class="{'is-invalid': errors[0]}"
            )
              option(selected="" disabled="" value="") Välj en tid
              option(
                v-for="(item, index) in times"
                :value="item.time" 
                :key="index"
              ) {{ item.time }}
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

import Datepicker from 'vuejs-datepicker'
import { ValidationProvider } from 'vee-validate'

import { sv } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'Pickup',
  components: {
    Datepicker,
    ValidationProvider
  },
  data: () => ({
    sv
  }),
  computed: {
    ...mapState('filter', ['finance_form_name']),
    ...mapState('reseller', {
      firstStep: (state) =>
        state.siteStyle.firstStep ? state.siteStyle.firstStep : {}
    })
  },
  pickUpTime: {
    get() {
      return this.$store.state.order.pickUpTime
    },
    set(value) {
      this.$store.commit('order/setPickUpTime', value)
    }
  },
  pickUpDate: {
    get() {
      return this.$store.state.order.pickUpDate
    },
    set(value) {
      this.$store.commit('order/setPickUpDate', moment(value).format('Y-MM-DD'))
    }
  }
}
</script>
