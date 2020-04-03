<template lang="pug">
  div
    footer#footer-block.noindex(v-if="Object.keys(categories).length > 0")
      .container
        nav
          .row
            dl.col-xl-4.col-md-4.col-sm-6.footer-column(
              v-for="(footerItem, index) in categories"
              :key="index"
            )
              dt.footer-title
                span {{ footerItem.name }}

              div(v-if="footerItem.items.data.length > 0")
                dd(
                  v-for="(item, index) in footerItem.items.data" 
                  :key="index" 
                  :class="{'social-item': item.type === 'Image'}"
                )
                  a(
                    v-if="item.type === 'Text'"
                    :href="item.url" 
                    target="_blank" 
                    rel="nofollow noopener"
                  )
                    span {{ item.name }}
                  a.social-icon(
                    v-if="item.type === 'Image'"
                    :style="{ 'background-image': `url(${item.image})` }"
                    :href="item.url" 
                    target="_blank" 
                    rel="nofollow noopener"
                  )

      .footer-bottom(v-if="resellerInfo.copyright")
        .container
          nav
            .footer-flex
              .footer-legal
                a(
                  href="#!"
                  :title="resellerInfo.name"
                ) &#169; {{ resellerInfo.copyright }}

    .footer-powered
      .container
        b POWERED BY: 
        a(
          href="https://www.ecarsuite.com/"
          target="_blank"
          rel="nofollow noopener"
        )  E-CAR Suite
        | , a product from Leaseonline
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  computed: {
    ...mapState('reseller', ['resellerInfo', 'siteStyle']),
    categories() {
      return this.siteStyle.footerCategories
        ? this.siteStyle.footerCategories.data
        : {}
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/layout/Footer.sass'
</style>
