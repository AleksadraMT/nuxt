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
  setStatus: (state, value) => (state.status = value)
}

export const actions = {}
