<template lang="pug">
  .bottom(:class="{'bottom-campaign': Object.keys(campaigns).length }")
    .banner-content-wrapper
      .banner-content
        h1.banner-heading Beställ din bil online.
        h5.banner-subheading Snabbt, enkelt & tryggt genom Leaseonline.
        .banner-content-btns
          //- @click="setSortVariant($event, 'asc')"
          .white-btn.scroll-item(
            title="Sök bil nu!" 
            data-id="filter"
          ) Sök
          //- @click="setSortVariant($event, 'campaign')"
          .scroll-item( 
            data-id="list-sort"
          ) Se kampanjer

    .main-campaign-wrapper
      .main-campaign(v-cloak v-if="Object.keys(campaigns).length")
        .main-campaign-headline {{campaigns.headline}}
        .main-campaign-info
          .main-campaign-title
            .main-campaign-title-name {{ mainCampaign.brand }} {{ mainCampaign.model }}
          .main-campaign-description(v-if="hasDeliveryTime")
            .main-campaign-title-delivery-days(v-if="mainCampaign.deliveryTime")
              span {{mainCampaign.grade}} {{mainCampaign.name}} &nbsp; 
              strong {{ getDays(mainCampaign.deliveryTime.from, false) }} - {{ getDays(mainCampaign.deliveryTime.to, 'short') }} leveranstid
          .main-campaign-price
            .main-campaign-price-text
              span.num {{ standardPrice }}
              span.mes kr/mån
            a.btn.btn-og.invert.btn-hover.slide-item-price-btn(
              :href="campaigns.link"
            ) Beställ
</template>

<script>
import { mapState } from 'vuex'
import ProductApi from '~/api/product'

export default {
  computed: {
    ...mapState('reseller', {
      campaigns: (state) =>
        state.siteStyle.campaigns && !!state.siteStyle.campaigns.data.length
          ? state.siteStyle.campaigns.data[0]
          : [],
      token: (state) => state.token
    }),
    ...mapState('filters', {
      financeFormId: (state) => state.finance_form_id,
      typeId: (state) => state.type.type.id
    })
  },
  methods: {
    async getCampaignCar() {
      const { link } = this.campaigns

      if (!link) return false

      const linkIdString = link.split('?id=')[1]
      const linkId = Number.parseInt(linkIdString)

      const response = await ProductApi.getVehicle({
        id: linkId,
        auth: this.token,
        financeFormId: this.finance_form_id,
        typeId: this.typeId
      })

      this.$set(this.$data, 'mainCampaign', response.data)
    }
  }
}
</script>
