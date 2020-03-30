<template lang="pug">
  .bottom(:class="{'bottom-campaign': Object.keys(campaigns).length }")
    .banner-content-wrapper
      .banner-content
        h1.banner-heading Beställ din bil online.
        h5.banner-subheading Snabbt, enkelt & tryggt genom Leaseonline.
        .banner-content-btns
          .white-btn.scroll-item(
            title="Sök bil nu!" 
            data-id="filter"
            @click="setSortVariant($event, 'asc')"
          ) Sök
          .scroll-item( 
            data-id="list-sort"
            @click="setSortVariant($event, 'campaign')"
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
