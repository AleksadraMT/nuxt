<template lang="pug">
  div.steps
    OrderStatus(
      :activeStep="activeStep"
      @goTo="goTo"
    )
    template
      StepGeneral(
        v-show="activeStep.index === 1"
      )
      StepOptions(
        v-show="activeStep.index === 2"
      )
      StepOrder(
        v-show="activeStep.index === 3"
      )
      StepConfirmed(
        v-show="activeStep.index === 4"
      )

</template>

<script>
import { mapState, mapActions } from 'vuex'
// import {googleAccount} from '@/config/defaultValues'

import OrderStatus from '~/components/Product/OrderStatus/OrderStatus.vue'
import StepGeneral from '~/components/Product/Steps/StepGeneral.vue'
import StepOptions from '~/components/Product/Steps/StepOptions.vue'
import StepOrder from '~/components/Product/Steps/StepOrder.vue'
import StepConfirmed from '~/components/Product/Steps/StepConfirmed.vue'

export default {
  components: {
    OrderStatus,
    StepGeneral,
    StepOptions,
    StepOrder,
    StepConfirmed
  },
  data: () => ({
    activeStep: {
      index: 1
    },
    leadId: null
  }),
  computed: {
    ...mapState('product', ['vehicle', 'steps']),
    ...mapState('reseller', ['resellerInfo']),
    ...mapState('settings', ['bankId'])
  },
  mounted() {
    this.setFormStepsDataLayer()

    this.activeStep = this.steps[0]
  },
  methods: {
    ...mapActions('order', ['SET']),
    // goToNext() {
    //   const index = this.currentIndex + 1

    //   if (this.activeStep.validate())
    //     if (index < this.steps.length - 1) {
    //       // eslint-disable-next-line no-unused-expressions
    //       index === 1 ? this.setFormStepsDataLayer() : null

    //       this.changeActiveStep(this.activeStep, this.steps[index])
    //       this.changeStepRouter(index)
    //     } else {
    //       const unconfirmedStatus =
    //         this.bankId && this.bankId.active
    //           ? this.bankId.unconfirmed_status
    //           : 1

    //       this.SET({ mutation: 'setStatus', value: unconfirmedStatus })
    //       this.setFormCompletionsDataLayer()
    //       this.confirmed()
    //     }
    // },
    goTo(index) {
      this.activeStep = index !== 3 ? this.steps[index] : this.activeStep

      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    },
    setFormStepsDataLayer() {
      // eslint-disable-next-line
        // dataLayer.push({
      //   brand: this.vehicle.brand,
      //   googleAccount: googleAccount,
      //   pageName: this.$route.name,
      //   businessType: this.vehicle.new ? 'new-car' : 'used-car',
      //   pageType: 'form',
      //   languageCode: 'sv',
      //   countryCode: 'SE',
      //   formName: 'order',
      //   formType: 'finance_request',
      //   formCategory: this.vehicle.new ? 'lead_newcar' : 'lead_usedcar',
      //   formStepName: 'accessories',
      //   formStepNumber: 'step-1',
      //   vehicleCategory: this.vehicle.type,
      //   vehicleModel: this.vehicle.model,
      //   vehicleId: this.vehicle.id,
      //   dealerName: this.resellerInfo.name,
      //   dealerId: this.resellerInfo.id,
      //   event: 'formSteps',
      // });
    },
    setFormCompletionsDataLayer() {
      // eslint-disable-next-line
        // dataLayer.push({
      //   brand: this.vehicle.brand,
      //   googleAccount: googleAccount,
      //   pageName: this.$route.name,
      //   businessType: this.vehicle.new ? 'new-car' : 'used-car',
      //   pageType: 'form',
      //   languageCode: 'sv',
      //   countryCode: 'SE',
      //   formName: 'order',
      //   formType: 'finance_request',
      //   formCategory: this.vehicle.new ? 'lead_newcar' : 'lead_usedcar',
      //   formStepName: 'complete',
      //   formStepNumber: 'step-2',
      //   leadId: this.leadId,
      //   marketingOptinStatus: null,
      //   vehicleCategory: this.vehicle.type,
      //   vehicleModel: this.vehicle.model,
      //   vehicleId: this.vehicle.id,
      //   dealerName: this.resellerInfo.name,
      //   dealerId: this.resellerInfo.id,
      //   event: 'formValidate',
      // });
    }
  }
}
</script>
