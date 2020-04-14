<template lang="pug">
  .page.page-model
    .container
      .row
        .col-md-6.order-md-1.order-2
          .m-b-15
            Gallery(
              :main-image-url="modelColor && modelColor.image ? modelColor.image.url : ''"
              :images="vehicle.images ? vehicle.images.data : []"
              :alt="vehicle.name"
            )
        .col-md-6.order-md-2.order-1
           VehicleDescription(
            :title="`${vehicle.brand} ${vehicle.model}`" 
            :description="`${vehicle.grade} ${vehicle.name}`"
          )
      .row.m-t-10
        .col-md-6
          .d-none.d-md-block
            .step-title 2. {{ siteStyle.headline }}
          .d-md-none.d-block
            .step-subtitle {{ siteStyle.headline }}
          .step-text.m-t-10 {{ siteStyle.intro }}
      .row.m-t-10
        .col-md-6
          .step-subtitle.step-subtitle-info.m-t-40 
            strong {{ siteStyle.accessory_title }}
            .infotooltip
              .infotooltip-content Saknar du något tillval? Kontakta oss så försöker vi hitta en lösning!
          label.custom-check.m-t-10.m-b-10(
            v-for="(accessorItem, index) in localAccessories" 
            :for="`accessor${index}`"
          )
            input.custom-check-input(
              type="checkbox"
              :value="accessorItem.id"
              :checked="!accessorItem.opt_in"
              :disabled="!accessorItem.opt_in"
              v-model="accessories"
              :id="`accessor${index}`"
              @change="showPopup($event)"
            )
            .check
              Check

            .custom-check-text.justify-content-between
              span.custom-check-text-block
                span {{ accessorItem.name }}
                span.custom-check-text-description {{ accessorItem.description }}
              span.red-text +&nbsp;{{ accessorItem.calculated_price }}&nbsp;kr/mån

          div.m-t-40.m-b-20.info-block(v-if="siteStyle.popup_text && isPopup " @click="closePopup")  
            EffectiveRanta
            i.close.fa.fa-times-circle(
              aria-hidden="true"
              @click="closePopup"
            )

          .m-t-30.d-none.d-md-block
            .step-title {{ siteStyle.bottom_title }}
            .step-text.m-t-10 {{ siteStyle.bottom_text }}

        .col-md-6
          .step-title Sammanställning
          MainVehicleInfo
          DetailedVehicleInfo

          .cost-block.m-t-20
            CostDescription

          .step-btns.m-t-20.d-none.d-lg-block
            a.step-btn.btn-hover(href="#" @click.prevent="goTo")
              | {{ accessoryPageButton }}
              i.fas.fa-chevron-right
</template>

<script>
import { mapState } from 'vuex'

import Gallery from '~/components/Common/Galery.vue'
import VehicleDescription from '~/components/Product/Steps/Common/VehicleDescription.vue'
import MainVehicleInfo from '~/components/Product/Steps/Common/MainVehicleInfo.vue'
import DetailedVehicleInfo from '~/components/Product/Steps/Common/DetailedVehicleInfo.vue'
import CostDescription from '~/components/Product/Steps/Common/CostDescription.vue'
import Check from '~/components/svg/check.vue'

export default {
  name: 'StepOptions',
  components: {
    Gallery,
    VehicleDescription,
    MainVehicleInfo,
    DetailedVehicleInfo,
    CostDescription,
    Check
  },
  data: () => ({
    isPopup: false
  }),
  computed: {
    ...mapState('product', ['vehicle', 'modelColor']),
    ...mapState('filters', ['finance_form_name']),
    ...mapState('reseller', {
      siteStyle: (state) =>
        state.siteStyle.accessoryPage ? state.siteStyle.accessoryPage : {},
      accessoryPageButton: (state) =>
        state.siteStyle.accessoryPage
          ? state.siteStyle.accessoryPage.submit_btn_text
          : 'VIDARE TILL BESTÄLL'
    }),
    accessories: {
      get() {
        return this.$store.state.order.accessories
      },
      set(value) {
        this.$store.commit('order/setAccessories', value)
      }
    },
    localAccessories() {
      if (!this.vehicle.accessories) return []

      return this.vehicle.accessories.data
    },
    isDownPayment() {
      return this.finance_form_name === 'Down payment'
    }
  },
  methods: {
    showPopup(e) {
      if (this.isDownPayment && e.target.checked) {
        this.$set(this.$data, 'isPopup', true)
      }
    },
    closePopup() {
      this.$set(this.$data, 'isPopup', false)
    },
    goTo() {
      this.$emit('goTo', 2)
    }
  }
}
</script>
