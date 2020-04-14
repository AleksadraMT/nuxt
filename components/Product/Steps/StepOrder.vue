<template lang="pug">
  .page.page-model
    .container
      .row
        .col-md-6.order-md-1.order-2
          .m-b-15
            Gallery(
              :main-image-url="modelColor && modelColor.image ? modelColor.image.url : '' "
              :images="vehicle.images ? vehicle.images.data : []"
              :alt="vehicle ? vehicle.name : ''"
            )
        .col-md-6.order-md-2.order-1
          VehicleDescription(
            :title="`${vehicle.brand} ${vehicle.model}`" 
            :description="`${vehicle.grade} ${vehicle.name}`"
          )

      ValidationObserver(ref="observer" v-slot="{ invalid }" tag="form" @submit.prevent)
        .row.m-t-10
          .col-md-6
            .step-text.m-t-10 {{ siteStyle.intro }}
            .row.m-t-20
              .col-md-6
                ValidationProvider.form-group(v-slot="{ errors }" name="firstName" rules="required")
                  label(for="first_name") Förnamn
                  input#first_name.form-control(
                    type="text"
                    v-model="firstName"
                    :class="{'is-invalid':errors[0]}"
                  )

              .col-md-6
                ValidationProvider.form-group(v-slot="{ errors }" name="lastName" rules="required")
                  label(for="last_name") Efternamn
                  input#last_name.form-control(
                    type="text"
                    v-model="lastName"
                    :class="{'is-invalid':errors[0]}"
                  )

            .row
              .col-md-12(v-if="['Corporate leasing', 'Corporate rental'].includes(finance_form_name)")
                ValidationProvider.form-group(v-slot="{ errors }" name="companyNumber" rules="required|min:10|max:10")
                  label(for="company_number") Organisationsnummer
                  input.form-control(
                    id="company_number"
                    v-model="companyNumber"
                    :class="{'is-invalid':errors[0]}"
                  )

              .col-md-12
                ValidationProvider.form-group(v-slot="{ errors }" name="personNumber" rules="required|min:12|max:12")
                  label(for="person_number") Personnummer (ÅÅÅÅMMDD-NNNN)
                  input.form-control(
                    id="person_number"
                    v-model="personNumber"
                    :class="{'is-invalid':errors[0] || getPersonNumberError !== ''}"
                  )

                .input-group.m-t-15.m-b-20(
                  v-show="getPersonNumberError !== ''"
                  class="postcode_validation invalid"
                ) {{ getPersonNumberError }}

            ValidationProvider.form-group(v-slot="{ errors }" name="address" rules="required")
              label(for="inp6") Adress
              input#inp6.form-control(
                type="text"
                v-model="address"
                :class="{'is-invalid':errors[0]}"
              )

            .form-group
              label(for="inp7") C/O adress (valfritt)
              input#inp7.form-control(
                type="text"
                v-model="coAddress"
              )

            .row
              .col-md-4
                ValidationProvider.form-group(v-slot="{ errors }" name="zipCode" rules="required|numeric|min:5|max:5")
                  label(for="zip_code") Postnummer
                  input.form-control(
                    id="zip_code"
                    type="text"
                    v-model="zipCode"
                    :class="{'is-invalid':errors[0]}"
                  )

              .col-md-8
                ValidationProvider.form-group(v-slot="{ errors }" name="city" rules="required")
                  label(for="inp10") Ort
                  input#inp10.form-control(
                    type="text"
                    v-model="city"
                    :class="{'is-invalid':errors[0]}"
                  )

            ValidationProvider.form-group(v-slot="{ errors }" name="phone" rules="required|telepnone")
              label(for="inp11") Telefon
              input#inp11.form-control(
                type="tel"
                v-model="phone"
                :class="{'is-invalid':errors[0]}"
              )

            ValidationProvider.form-group(v-slot="{ errors }" name="email" rules="required|email")
              label(for="inp12") E-post
              input#inp12.form-control(
                type="email"
                v-model="email"
                :class="{'is-invalid':errors[0]}"
              )

            ValidationProvider.form-group(v-slot="{ errors }" name="drivingLicense" rules="required|numeric|min:9|max:9")
              label(for="drivingLicense") Körkortsnummer (fält 4d på ditt körkort, 9 siffror)
              input.form-control(
                id="drivingLicense"
                v-model="drivingLicense"
                :class="{'is-invalid':errors[0]}"
              )

            .form-group
              label(for="inp13") Övriga frågor / Kommentarer
              textarea#inp13.form-control(
                rows="4" 
                v-model="comments"
              )
            ValidationProvider.form-group(v-if="terms.active" v-slot="{ errors }" name="confirmTerm" rules="required")
              label.custom-check.m-t-10(
                for="confirm"
                :class="{'is-invalid':errors[0]}"
              )
                input#confirm.custom-check-input(
                  type="checkbox"
                  data-trig="wheels"
                  v-model="confirmTerm"
                  :class="{'is-invalid':errors[0]}"
                )
                .check
                  Check
                .custom-check-text
                  span Jag godkänner de
                  | &nbsp;
                  a(:href="terms.pdf" target="_blank") allmänna villkoren.

            .step-subtitle.m-t-20 {{ siteStyle.title }}

            div(v-if="siteStyle.items && !!siteStyle.items.data.length")
              .advant.m-t-20(v-for="item in siteStyle.items.data")
                .advant-img
                  img(
                    alt="icon"
                    :src="item.image"
                  )
                .advant-info
                  .advant-title {{ item.title }}
                  .advant-text {{ item.description }}

          .col-md-6
            .step-title Sammanställning
            MainVehicleInfo
            DetailedVehicleInfo

            .cost-block.m-t-20
              CostDescription

            .step-btns.m-t-20.d-none.d-lg-block
              button.step-btn.btn-hover(
                @click="sendOrder"
                :disabled="invalid"
              )
                | Vidare till signering
                i.fas.fa-chevron-right
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Gallery from '~/components/Common/Galery.vue'
import VehicleDescription from '~/components/Product/Steps/Common/VehicleDescription.vue'
import MainVehicleInfo from '~/components/Product/Steps/Common/MainVehicleInfo.vue'
import DetailedVehicleInfo from '~/components/Product/Steps/Common/DetailedVehicleInfo.vue'
import CostDescription from '~/components/Product/Steps/Common/CostDescription.vue'
import Check from '~/components/svg/check.vue'

export default {
  name: 'StepOrder',
  components: {
    ValidationProvider,
    ValidationObserver,
    Gallery,
    VehicleDescription,
    Check,
    MainVehicleInfo,
    DetailedVehicleInfo,
    CostDescription
  },
  data: () => ({
    confirmTerm: false
  }),
  computed: {
    ...mapState('product', ['vehicle', 'modelColor']),
    ...mapState('reseller', {
      siteStyle: (state) =>
        state.siteStyle.orderPage ? state.siteStyle.orderPage : '',
      resellerInfo: (state) => state.resellerInfo
    }),
    ...mapState('settings', ['terms', 'bankId']),
    ...mapState('filters', ['finance_form_name']),
    ...mapGetters('product', ['getPersonNumberError']),
    firstName: {
      get() {
        return this.$store.state.order.firstName
      },
      set(value) {
        this.$store.commit('order/setFirstName', value)
      }
    },
    lastName: {
      get() {
        return this.$store.state.order.lastName
      },
      set(value) {
        this.$store.commit('order/setLastName', value)
      }
    },
    email: {
      get() {
        return this.$store.state.order.email
      },
      set(value) {
        this.$store.commit('order/setEmail', value)
      }
    },
    phone: {
      get() {
        return this.$store.state.order.phone
      },
      set(value) {
        this.$store.commit('order/setPhone', value)
      }
    },
    personNumber: {
      get() {
        return this.$store.state.order.personNumber
      },
      set(value) {
        this.updatePersonNumberError('')

        this.$store.commit('order/setPersonNumber', value)
      }
    },
    address: {
      get() {
        return this.$store.state.order.address
      },
      set(value) {
        this.$store.commit('order/setAddress', value)
      }
    },
    coAddress: {
      get() {
        return this.$store.state.order.coAddress
      },
      set(value) {
        this.$store.commit('order/setCoAddress', value)
      }
    },
    city: {
      get() {
        return this.$store.state.order.city
      },
      set(value) {
        this.$store.commit('order/setCity', value)
      }
    },
    zipCode: {
      get() {
        return this.$store.state.order.zipCode
      },
      set(value) {
        this.$store.commit('order/setZipCode', value)
      }
    },
    comments: {
      get() {
        return this.$store.state.order.comments
      },
      set(value) {
        this.$store.commit('order/setComments', value)
      }
    },
    drivingLicense: {
      get() {
        return this.$store.state.order.drivingLicense
      },
      set(value) {
        this.$store.commit('order/setDrivingLicense', value)
      }
    },
    location() {
      return this.vehicle.locations
        ? this.vehicle.locations.data.find(
            (item) => item.id === this.locationId
          ) || {}
        : {}
    }
  },
  methods: {
    ...mapActions('product', ['updatePersonNumberError']),
    ...mapActions('order', ['postOrder', 'sendBankId']),
    async sendOrder() {
      const isValid = await this.$refs.observer.validate()

      if (!isValid) return

      if (this.bankId.active) {
        this.postOrderWithBankId()
      } else {
        this.postOrderWithoutBankId()
      }
    },
    async postOrderWithBankId() {
      const postOrderData = await this.postOrder()
      const responseData = await this.sendBankId(postOrderData)

      await this.saveResponse(responseData)
    },
    async postOrderWithoutBankId() {
      const postOrderData = await this.postOrder()

      // eslint-disable-next-line no-debugger
      this.$router.push({
        name: 'base-product-type-brand-model-name-confirmed',
        query: {
          id: this.vehicle.id,
          key: postOrderData.id,
          collectionType: this.$route.params.collectionType
        }
      })

      localStorage.setItem(
        'vehicleInfo',
        JSON.stringify({
          image: this.modelColor ? this.modelColor.image.url : '',
          type: this.vehicle.type,
          brand: this.vehicle.brand,
          model: this.vehicle.model,
          grade: this.vehicle.grade,
          name: this.vehicle.name,
          modelColor: this.modelColor
        })
      )
    },
    saveResponse(response) {
      if (response.status === 200) {
        localStorage.setItem(
          'vehicleInfo',
          JSON.stringify({
            image: this.modelColor ? this.modelColor.image.url : '',
            type: this.vehicle.type,
            brand: this.vehicle.brand,
            model: this.vehicle.model,
            name: this.vehicle.name,
            grade: this.vehicle.grade,
            modelColor: this.modelColor
          })
        )

        window.location.href = response.data.redirectUrl
      } else if (response && response.status === 204) {
        this.$router.push({ name: 'base-noorder' })
      }
    }
  }
}
</script>
