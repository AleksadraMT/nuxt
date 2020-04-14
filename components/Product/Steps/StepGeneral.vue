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

            Delivery

            Pickup

          .m-b-20
            a.step-btn.btn-hover(
              href="!#"
              @click.prevent="goTo"
            ) {{ firstStepButton }}
              i.fas.fa-chevron-right

        .col-md-6.order-md-2.order-1.m-t-20
          MainVehicleInfo

          a.pdf-link.m-t-10(
            :href="vehicle.pdf"
            target="_blank"
            v-if="vehicle.pdf"
            @click="setDataLayerForDownloadBrochure()"
          )
            img(src="~/assets/img/pdf.svg" alt="pdf")
            | Ladda ner broschyr
          .step-text.m-t-10(v-html="vehicle.description")
          .step-subtitle.m-t-20 Exempel på utrustning
          collapse-box.custom-style-box(:min-height="183" :overflow="true")
            div.text-left(v-html="vehicle.specs")

</template>

<script>
import { mapState } from 'vuex'
import Gallery from '~/components/Common/Galery.vue'

import ModelColor from '~/components/Product/Steps/Common/ModelColor.vue'
import VehicleDescription from '~/components/Product/Steps/Common/VehicleDescription.vue'
import Costs from '~/components/Product/Steps/Costs/Costs.vue'
import Delivery from '~/components/Product/Steps/Common/Delivery.vue'
import MainVehicleInfo from '~/components/Product/Steps/Common/MainVehicleInfo.vue'
import CollapseBox from '~/components/Common/CollapseBox.vue'
import Pickup from '~/components/Product/Steps/Common/Pickup.vue'

export default {
  name: 'StepGeneral',
  components: {
    Gallery,
    ModelColor,
    VehicleDescription,
    Costs,
    Delivery,
    MainVehicleInfo,
    CollapseBox,
    Pickup
  },
  computed: {
    ...mapState('product', ['modelColor', 'vehicle']),
    ...mapState('reseller', {
      siteStyle: (state) => state.siteStyle,
      firstStepButton: (state) =>
        state.siteStyle.firstStep
          ? state.siteStyle.firstStep.submit_btn_text
          : 'Vidare till tillval'
    }),
    mainImageUrl() {
      return this.modelColor && this.modelColor.image
        ? this.modelColor.image.url
        : ''
    }
  },
  methods: {
    goTo() {
      this.$emit('goTo', 1)
    },
    setDataLayerForDownloadBrochure() {
      // if (Object.keys(this.vehicle).length !== 0 && this.vehicle) {
      //   dataLayer.push({
      //     brand: this.vehicle.brand,
      //     googleAccount: googleAccount,
      //     pageName: this.$route.name,
      //     languageCode: 'sv',
      //     countryCode: 'SE',
      //     brochureName: this.downloadDocName,
      //     brochureType: this.downloadDocType,
      //     vehicleCategory: this.vehicle.type,
      //     vehicleModel: this.vehicle.model,
      //     vehicleId: this.vehicle.id,
      //     dealerName: this.resellerInfo.name,
      //     dealerId: this.resellerInfo.id,
      //     event: 'download',
      //   });
      // }
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/steps.sass'
</style>
