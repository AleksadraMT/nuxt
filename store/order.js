/* eslint-disable no-prototype-builtins */
import moment from 'moment'

import OrderApi from '~/api/order'

export const state = () => ({
  status: 1,
  ordersList: {},
  vehicleId: '',
  modelColorId: '',
  vehicleCostId: '',
  locationId: '',
  postal_code_id: '',
  home_delivery: false,
  accessories: [],
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  personNumber: '',
  pickUpDate: '',
  pickUpTime: '',
  companyNumber: '',
  address: '',
  coAddress: '',
  city: '',
  zipCode: '',
  comments: '',
  totalMonthlyPrice: '',
  drivingLicense: '',
  residual: null,
  cash_payment: null
})

export const getters = {}

export const mutations = {
  setStatus: (state, value) => (state.status = value),
  setVehicleId: (state, vehicleId) => (state.vehicleId = vehicleId),
  setOrdersList: (state, ordersList) => (state.ordersList = ordersList),
  setModelColorId: (state, modelColorId) => (state.modelColorId = modelColorId),
  setVehicleCostId: (state, vehicleCostId) =>
    (state.vehicleCostId = vehicleCostId),
  setLocationId: (state, locationId) => (state.locationId = locationId),
  setAccessories: (state, accessories) => (state.accessories = accessories),
  setPickUpDate: (state, pickUpDate) =>
    (state.pickUpDate = moment(pickUpDate).format('Y-MM-DD')),
  setPickUpTime: (state, pickUpTime) => (state.pickUpTime = pickUpTime),
  setFirstName: (state, firstName) => (state.firstName = firstName),
  setLastName: (state, lastName) => (state.lastName = lastName),
  setEmail: (state, email) => (state.email = email),
  setPhone: (state, phone) => (state.phone = phone),
  setPersonNumber: (state, personNumber) => (state.personNumber = personNumber),
  setCompanyName: (state, companyName) => (state.companyName = companyName),
  setCompanyNumber: (state, companyNumber) =>
    (state.companyNumber = companyNumber),
  setAddress: (state, address) => (state.address = address),
  setCoAddress: (state, coAddress) => (state.coAddress = coAddress),
  setCity: (state, city) => (state.city = city),
  setZipCode: (state, zipCode) => (state.zipCode = zipCode),
  setComments: (state, comments) => (state.comments = comments),
  setTotalMonthlyPrice: (state, totalMonthlyPrice) =>
    (state.totalMonthlyPrice = totalMonthlyPrice),
  setDrivingLicense: (state, drivingLicense) =>
    (state.drivingLicense = drivingLicense),
  setResidual: (state, value) => (state.residual = value),
  setCashPayment: (state, value) => (state.cash_payment = value),
  setPostalCodeId: (state, code) => (state.postal_code_id = code),
  setHomeDelivery: (state, value) => (state.home_delivery = value)
}

export const actions = {
  SET({ commit }, data) {
    const { mutation, value } = data

    commit(mutation, value)
  },
  async sendBankId({ state, rootState }, { data }) {
    const route = `${window.location.origin}${
      window.location.pathname
    }/confirmed/${btoa(data.id)}?id=${data.vehicle.id}?collectionType=${
      this.$route.params.collectionType
    }`

    localStorage.setItem('orderInfo', data.id)

    await OrderApi.bankIdLogin({
      auth: rootState.reseller.token,
      route,
      personNumber: state.personNumber
    })
  },
  async postOrder({ state, rootState }) {
    const data = {}

    // eslint-disable-next-line no-extend-native
    String.prototype.camelCaseToUnderScoreCase = function() {
      return this.replace(/([A-Z])/g, function($1) {
        return '_' + $1.toLowerCase()
      })
    }

    for (const field in state) {
      data[field.camelCaseToUnderScoreCase()] = state[field]
    }

    if (data.hasOwnProperty('orders_list')) delete data.orders_list

    if (
      !['Down payment', 'Corporate leasing'].includes(
        rootState.filters.finance_form_name
      )
    ) {
      if (data.hasOwnProperty('residual')) delete data.residual
      if (data.hasOwnProperty('cash_payment')) delete data.cash_payment
    }

    if (
      !['Private rental', 'Corporate rental'].includes(
        rootState.filters.finance_form_name
      )
    ) {
      if (data.hasOwnProperty('pick_up_date')) delete data.pick_up_date
      if (data.hasOwnProperty('pick_up_time')) delete data.pick_up_time
    }
    if (
      !['Corporate leasing', 'Corporate rental'].includes(
        rootState.filters.finance_form_name
      )
    ) {
      if (data.hasOwnProperty('company_number')) delete data.company_number
    }

    if (!rootState.product.residualVisibility) {
      if (data.hasOwnProperty('residual')) delete data.residual
    }

    if (rootState.product.deliveryType === 'delivery_type_stardard') {
      if (data.hasOwnProperty('postal_code_id')) delete data.postal_code_id
    } else if (rootState.product.deliveryType === 'delivery_type_home') {
      if (data.hasOwnProperty('location_id')) delete data.location_id
    }

    data.home_delivery = state.home_delivery

    return await OrderApi.postOrders({
      auth: rootState.reseller.token,
      values: data
    })
  }
}
