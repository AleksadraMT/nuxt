import moment from 'moment'

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
  residual: 0,
  cash_payment: 0
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
  }
}
