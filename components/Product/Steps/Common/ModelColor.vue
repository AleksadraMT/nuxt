<template lang="pug">
  div
    ValidationProvider(v-slot="{ errors }" name="modelColor" rules="required")
      .color-check.m-t-10
        template(v-for="(modelColor, index) in modelColors")
          input.color-check-input(
            type="radio"
            v-model="modelColorId"
            :checked="modelColorId === modelColor.id"
            :id="`radioColor${index}`"
            :value="modelColor.id"
            :title="modelColor.name"
            @change="setModelColor(modelColor)"
          )
          label.color-check-item(
            :for="`radioColor${index}`"
            :title="modelColor.name"
          )
            .model-color(
              :class="{'model-color-met' : modelColor.metallic}"
              :style="`background: ${modelColor.hex}`"
            )
              i.fas.fa-check
      span {{ modelColor.name }}
      span.red-text &nbsp;+&nbsp;{{ formatPrice(modelColor.calculated_price) }}&nbsp;kr/mån
        span(v-if="deliveryTime && modelColor.delivery_days_from !== null && modelColor.delivery_days_to !== null")
          |  (OBS!
          | {{getDays(modelColor.delivery_days_from, false)}} - {{getDays(modelColor.delivery_days_to, 'short')}}
          | leveranstid på vald färg)
      small.text-danger {{ errors[0] }}
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { ValidationProvider } from 'vee-validate'

import Helper from '~/mixins/Helper'

export default {
  name: 'ModelColors',
  components: {
    ValidationProvider
  },
  mixins: [Helper],
  computed: {
    ...mapState('product', ['vehicle', 'modelColor']),
    ...mapState('order', ['vehicleCostId']),
    ...mapState('settings', ['deliveryTime']),
    modelColors() {
      if (!this.vehicleCostId) return []

      return this.vehicle.costs.data
        .find((item) => item.id === this.vehicleCostId)
        .modelColors.data.filter((item) => {
          return !!item.image.url
        })
    },
    modelColorId: {
      get() {
        return this.$store.state.order.modelColorId
      },
      set(value) {
        this.SET({ mutation: 'setModelColorId', value })
      }
    }
  },
  methods: {
    ...mapActions('order', ['SET']),
    ...mapMutations('product', ['setModelColor'])
  }
}
</script>
