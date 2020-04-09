<template lang="pug">
  div
    .step-subtitle {{ fullVehicleName }}
    ul.model-char-list.m-t-10
      li.model-char-list-item
        span Modell
        span {{ vehicle.model }}
      li.model-char-list-item(
        v-if="vehicle.configuration && (passengers !== null || seats !== null)"
      )
        span Passagerare inklusive förare
        span {{ seats !== null ? seats : (passengers !== null) ? passengers : ''  }}
      li.model-char-list-item(v-if="vehicle.configuration && vehicle.configuration.gear !== null")
        span Växellåda
        span {{ vehicle.configuration.gear }}
      li.model-char-list-item
        span Drivmedel
        span {{ vehicle.engine }}
      li.model-char-list-item
        span Färg
        span {{ modelColor ? modelColor.name : '' }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('product', ['vehicle', 'modelColor']),
    fullVehicleName() {
      return `${this.vehicle.brand} ${this.vehicle.model} ${this.vehicle.grade} ${this.vehicle.name}`
    },
    passengers() {
      return this.vehicle.configuration.passengers
    },
    seats() {
      return this.vehicle.configuration.seats
    }
  }
}
</script>
