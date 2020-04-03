<template>
  <div class="steps">
    <slot
      name="header"
      :goToNext="goToNext"
      :goToPrev="goToPrev"
      :steps="shortSteps"
      :activeStep="activeStep"
      :goTo="goTo"
    />
    <slot
      name="steps"
      :goToNext="goToNext"
      :goToPrev="goToPrev"
      :addStep="addStep"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import {googleAccount} from '@/config/defaultValues'

export default {
  props: {
    isConfirmed: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    steps: [],
    activeStep: {},
    leadId: null
  }),
  computed: {
    ...mapState('product', ['vehicle']),
    ...mapState('reseller', ['resellerInfo']),
    ...mapState('settings', ['bankId']),
    currentIndex() {
      return this.activeStep.index
    },
    shortSteps() {
      return this.steps.map((step) => {
        return {
          index: step.index,
          title: step.title,
          active: step.active
        }
      })
    }
  },
  mounted() {
    this.activeStep = this.steps[this.isConfirmed ? 3 : 0]
    this.activeStep.active = true

    if (!this.isConfirmed) this.changeStepRouter(0)
  },
  beforeDestroy() {
    // TODO clear all dat when going away prom the vehicle on the main page
    // this.clearAll()
  },
  methods: {
    ...mapMutations('order', ['setStatus']),
    beforeChangeStep() {
      this.$emit('beforeChangeStep', this.activeStep)
    },
    afterChangeStep() {
      this.$emit('afterChangeStep', this.activeStep)
    },
    goToNext() {
      const index = this.currentIndex + 1

      if (this.activeStep.validate())
        if (index < this.steps.length - 1) {
          // eslint-disable-next-line no-unused-expressions
          index === 1 ? this.setFormStepsDataLayer() : null

          this.changeActiveStep(this.activeStep, this.steps[index])
          this.changeStepRouter(index)
        } else {
          const unconfirmedStatus =
            this.bankId && this.bankId.active
              ? this.bankId.unconfirmed_status
              : 1

          this.setStatus(unconfirmedStatus)
          this.setFormCompletionsDataLayer()
          this.confirmed()
        }
    },
    goToPrev() {
      const index = this.currentIndex - 1
      if (index >= 0 && this.currentIndex < 3) {
        this.changeStepRouter(index)

        this.changeActiveStep(this.activeStep, this.steps[index])
      }
    },
    goTo(index) {
      if (
        !(index > 2 && this.activeStep.index < 3) &&
        !(this.activeStep.index === 3)
      ) {
        this.changeStepRouter(index)
        if (index < this.activeStep.index) {
          this.changeActiveStep(this.activeStep, this.steps[index])
        } else if (this.activeStep.validate()) {
          // eslint-disable-next-line no-unused-expressions
          index === 1 ? this.setFormStepsDataLayer() : null

          if (index >= 0 && index < this.steps.length) {
            this.changeActiveStep(this.activeStep, this.steps[index])
          }
        }
      }
    },
    changeStepRouter(currentStep) {
      const searchHistoryParams = window.location.search
        .replace('?', '')
        .split('&')

      let newSearch = searchHistoryParams.reduce((url, next, index) => {
        if (!next.includes('step=')) {
          return `${url}${index === 1 ? '&' : ''}${next}`
        } else if (next.includes('step=')) {
          return `${url}&step=step-${currentStep + 1}`
        } else {
          return url
        }
      }, '?')

      if (!newSearch.includes('step=')) {
        newSearch += `&step=step-${currentStep + 1}`
      }

      history.replaceState({}, null, newSearch)
    },
    addStep(step) {
      step.index = this.steps.length
      this.steps.push(step)
    },
    changeActiveStep(from, to) {
      this.beforeChangeStep()
      from.active = false
      this.activeStep = to
      to.active = true
      this.afterChangeStep()

      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    },
    confirmed() {
      this.$emit('confirmed')
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
