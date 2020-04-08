<template lang="pug">
  .page.page-model
    .container
      .row
        .col-md-6.order-md-1.order-2
          .m-b-15
            Gallery(
              :main-image-url="mainImageUrl"
              :images="vehicle.images ? vehicle.images.data : []"
              :alt="`${vehicle.brand} ${vehicle.model}`"
            )
            .d-md-none.d-lg-none
              .step-subtitle.m-t-20 Färgval
              .step-subtitle-container
                ModelColor

        .col-md-6.order-md-2.order-1
          VehicleDescription(
            :title="`${vehicle.brand} ${vehicle.model}`" 
            :description="`${vehicle.grade} ${vehicle.name}`"
          )
      .row
        .col-md-6.order-md-1.order-2
          .d-none.d-md-block
            .step-title.m-t-10 1. {{ siteStyle.headline }}
            .step-text.m-t-10 {{ siteStyle.intro }}
      .row
        .col-md-6.order-md-1.order-2
          .d-sm-none.d-xs-none.d-md-block.d-lg-block.d-none
            .step-subtitle.m-t-20 Färgval
            .step-subtitle-container
              ModelColor

            .step-subtitle.m-t-20 Välj finanslösning
            .step-subtitle-container
              Costs

            div(v-if="homeDelivery && vehicle.home_delivery")
            .step-subtitle.m-t-20 
              strong Leveransalternativ

</template>

<script>
import { mapState } from 'vuex'
import Gallery from '~/components/Common/Galery.vue'

import ModelColor from '~/components/Product/Steps/Common/ModelColor.vue'
import VehicleDescription from '~/components/Product/Steps/Common/VehicleDescription.vue'
import Costs from '~/components/Product/Steps/Costs/Costs.vue'

export default {
  name: 'StepGeneral',
  components: {
    Gallery,
    ModelColor,
    VehicleDescription,
    Costs
  },
  computed: {
    ...mapState('product', ['modelColor', 'vehicle']),
    ...mapState('reseller', ['siteStyle']),
    ...mapState('settings', ['homeDelivery']),
    mainImageUrl() {
      return this.modelColor && this.modelColor.image
        ? this.modelColor.image.url
        : ''
    }
  }
}
</script>
