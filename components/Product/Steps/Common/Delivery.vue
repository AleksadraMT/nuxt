<template lang="pug">
  div
    div(v-if="homeDelivery && vehicle.home_delivery")
      .step-subtitle.m-t-20 
        strong Leveransalternativ

      .row.m-t-15
        .col-md-4.col-6
          input.radio-block-input(
            type="radio"
            id="delivery_type_stardard"
            value="delivery_type_stardard"
            v-model="deliveryType"
            :checked="true"
          )
          label.radio-block(for="delivery_type_stardard")
            .radio-block-title Hämta själv
            .radio-block-info Standard

        .col-md-4.col-6
          input.radio-block-input(
            type="radio"
            id="delivery_type_home"
            value="delivery_type_home"
            v-model="deliveryType"
          )
          label.radio-block(for="delivery_type_home")
            .radio-block-title Hemleverans
            .radio-block-info.red-text
              | + {{ homeDeliveryPrice }} kr/mån <br>

    div(v-if="deliveryType === 'delivery_type_stardard'")
      .step-subtitle.step-subtitle-info.m-t-20 
        strong {{ stepStyle.location_title }}
        .infotooltip
          .infotooltip-content Meddela oss gärna om du saknar en uthämtningsplats nära dig så försöker vi hitta en lösning!

      .input-group.m-t-15.m-b-20
        ValidationProvider(v-slot="{ errors }" name="location" rules="required")
          select.custom-select(
            v-model="locationId"
            :class="{'is-invalid':errors[0]}"
          )
            option(selected="" disabled="" value="") {{ stepStyle.delivery_title }}
            option(
              v-for="(location, index) in locations"
              :value='location.id'
              :key="index"
            ) {{ location.name }} {{ location.dealer ? '- ' + location.dealer : '' }}
          
          span.text-danger {{ errors[0] }}

    div(v-if="deliveryType === 'delivery_type_home'")
      .step-subtitle.m-t-20 
        strong Postnummer

      .m-t-15.m-b-20
        ValidationProvider(v-slot="{ errors }" name="postcode" rules="required|min:5|max:5|numeric")
          .input-group-nowrap
            input.form-control(
              v-model="postcode"
              :class="{'is-invalid': errors[0]}"
              @input="postcodeInput"
            )

            button.btn.btn-general(
              :disabled="errors[0]"
              @click.prevent="checkPostCode"
            ) Kontrollera postnummer

          div
            .m-t-15.m-b-20.invalid(
              v-if="errors[0]"
            ) Värdet ska vara numeriskt och exakt 5 siffror.

            .input-group.m-t-15.m-b-20(
              :class="{'postcode_validation': !waitingForResponse}"
            ) Kontroll...

            .input-group.m-t-15.m-b-20(
              class="postcode_validation"
              :class="{'invalid': postcode_validation === 'invalid'}"
            ) Tyvärr är inte hemleverans tillgängligt till ditt postnummer, var god välj 'Hämta själv' och närmaste uthämtningsställe eller prova ett annat postnummer.

            .input-group.m-t-15.m-b-20(
              class="postcode_validation"
              :class="{'valid': postcode_validation === 'valid'}"
            ) Leverans till det angivna postnumret är möjlig
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import { ValidationProvider } from 'vee-validate'

import ProductApi from '~/api/product'

export default {
  name: 'Delivery',
  components: {
    ValidationProvider
  },
  data: () => ({
    postcode: '',
    postcode_validation: '',
    waitingForResponse: false
  }),
  computed: {
    ...mapState('settings', ['homeDelivery']),
    ...mapState('product', ['vehicle']),
    ...mapState('filters', ['finance_form_name']),
    ...mapState('reseller', {
      stepStyle: (state) =>
        state.siteStyle.firstStep ? state.siteStyle.firstStep : {},
      token: (state) => state.token
    }),
    ...mapGetters('product', ['calculatePrice']),
    locationId: {
      get() {
        return this.$store.state.order.locationId
      },
      set(value) {
        this.$store.commit('order/setLocationId', value)
      }
    },
    deliveryType: {
      get() {
        return this.$store.state.product.deliveryType
      },
      set(value) {
        this.$store.commit('product/setDeliveryType', value)

        this.SET({
          mutation: 'setHomeDelivery',
          value: this.deliveryType === 'delivery_type_home'
        })

        this.SET({
          mutation: 'setTotalMonthlyPrice',
          value: this.calculatePrice
        })
      }
    },
    locations() {
      return this.vehicle.locations ? this.vehicle.locations.data : []
    },
    location() {
      return this.vehicle.locations
        ? this.vehicle.locations.data.find(
            (item) => item.id === this.locationId
          )
        : {}
    },
    homeDeliveryPrice() {
      const { prices } = this.vehicle

      if (!(prices && prices.data.length)) return

      const pricesObj = prices.data.find(
        (item) => item.finance_form === this.finance_form_name
      )

      return pricesObj ? pricesObj.home_delivery : 0
    }
  },
  mounted() {
    this.SET({
      mutation: 'setHomeDelivery',
      value: this.deliveryType === 'delivery_type_home'
    })
  },
  methods: {
    ...mapActions('order', ['SET']),
    postcodeInput() {
      this.$set(this.$data, 'postcode_validation', '')
    },
    async checkPostCode() {
      const numeric = new RegExp('^(0|[1-9][0-9]*)$')

      if (this.postcode.length !== 5 || !numeric.test(this.postcode)) {
        this.$set(this.$data, 'postcode_validation', 'invalid')

        return
      }

      this.$set(this.$data, 'waitingForResponse', true)

      const response = await ProductApi.checkPostalCode({
        auth: this.token,
        postcode: this.postcode
      })

      this.$set(this.$data, 'waitingForResponse', false)

      if (response.status_code === 404) {
        this.$set(this.$data, 'postcode_validation', 'invalid')
      } else if (response.status === 200) {
        this.$set(this.$data, 'postcode_validation', 'valid')
        this.SET({
          mutation: 'setPostalCodeId',
          value: response.data.id
        })
      }
    }
  }
}
</script>
