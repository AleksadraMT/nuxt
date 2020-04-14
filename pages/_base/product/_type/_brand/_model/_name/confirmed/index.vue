<template lang="pug">
div
  header#order-status.order-status
    .container.d-none.d-lg-block
      .row
        .col-md-6
          ul.order-steps
            li.order-steps-item(
              v-for="step in steps" 
              :key="step.index + 1"
              :class="{'active': step.index === 4}"
            )
              .num {{ step.index }}
              span {{ step.title }}
  .page.page-model.page-model-confirmed
    .container
      .result-model-img
        img(:src="vehicleInfo.image" :alt="vehicleInfo ? vehicleInfo.name : ''")
      .result-model-name.m-t-10
        span.model-title
          | {{ confirmPage.headline }} <b> {{ vehicleInfo.brand }} {{  vehicleInfo.model }} </b>
      .result-model-desc.m-t-10 {{ confirmPage.intro }}
      .title-separ.m-t-70
        span.title-separ-text {{ confirmPage.title }}
      .row.row-steps.m-t-50.justify-content-center(v-if="!!confirmPage.items && !!confirmPage.items.data.length")
        .col-12.col-lg-2(
          v-for="(item, key) in confirmPage.items.data" 
          :key="key"
        )
          .next-step
            .next-step-icon
              img(:src="item.image" :alt="item.title")
            .next-step-num
              span.num {{ key + 1 }}
            .next-step-text
              .next-step-title {{ item.title }}
              .next-step-desc {{ item.description }}
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

import ImageBuilder from '~/components/Common/ImageBuilder.vue'

export default {
  name: 'Confirmed',
  components: {
    ImageBuilder
  },
  data: () => ({
    confirmPage: {},
    vehicleInfo: {}
  }),
  computed: {
    ...mapState('product', ['steps']),
    ...mapGetters({
      style: 'reseller/getSiteStyle'
    })
  },
  mounted() {
    this.setIsHomePage(false)

    const siteStyleStorage = JSON.parse(localStorage.getItem('siteStyle'))
    const vehicleInfo = localStorage.getItem('vehicleInfo')
    const orderId = localStorage.getItem('orderInfo')
    const auth = localStorage.getItem('Authorization')

    this.vehicleInfo = vehicleInfo !== null ? JSON.parse(vehicleInfo) : {}

    if (siteStyleStorage !== null) {
      this.confirmPage = siteStyleStorage.confirmPage
    } else {
      this.confirmPage = this.style.confirmPage
    }

    if (this.$route.query.grandidsession && orderId !== null) {
      axios({
        method: 'PUT',
        url: `${
          process.env.BASE_URL
        }orders/${orderId.toString()}/change-status`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        data: {
          status: 1
        }
      })
    }
  },
  methods: {
    ...mapMutations('settings', ['setIsHomePage'])
  }
}
</script>
