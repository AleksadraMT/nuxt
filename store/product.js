/* eslint-disable no-prototype-builtins */
import ProductApi from '~/api/product'

export const state = () => ({
  nextPage: 1,
  pagination: {},
  vehicles: [],
  vehicle: {},
  vehicleMeta: {},
  steps: [
    {
      index: 1,
      buttonLabel: 'Vidare till tillval',
      title: 'Grundval'
    },
    {
      index: 2,
      buttonLabel: 'VIDARE TILL BESTÄLL',
      title: 'Tillval'
    },
    {
      index: 3,
      buttonLabel: 'Slutför beställning',
      title: 'Beställ nu'
    },
    {
      index: 4,
      buttonLabel: '',
      title: 'Bekräftelse'
    }
  ],
  redirectUrl: '',
  sortedCosts: {},
  deliveryType: 'delivery_type_stardard',
  modelColor: {},
  defaults: {},
  residualVisibility: true,
  personNumberError: ''
})

export const getters = {
  getNextPage: (state) => {
    const currentPage = state.pagination.current_page
    const totalPages = state.pagination.total_pages

    return currentPage + 1 <= totalPages ? currentPage + 1 : null
  },
  getVehicle: (state) => state.vehicle,
  getCurrentStep: (state) => state.steps[state.currentStepIndex] || false,
  getSortedCosts: (state) => state.sortedCosts,
  calculatePrice: (state, getters, rootState) => {
    let price = 0

    if (state.vehicle.costs) {
      const pricesObj = state.vehicle.prices.data.find(
        (item) => item.finance_form === rootState.filters.finance_form_name
      )

      price = state.vehicle.standard_price

      if (
        state.vehicle.prices.data.length &&
        state.deliveryType === 'delivery_type_home'
      )
        price += pricesObj.home_delivery

      if (rootState.order.accessories.length) {
        rootState.order.accessories.forEach((item) => {
          const accessor = state.vehicle.accessories.data.find(
            (accessor) => accessor.id === item
          )

          price += accessor ? accessor.calculated_price : 0
        })
      }

      if (state.modelColor) {
        price += state.modelColor.calculated_price || 0

        return price
      }
    }

    return 0
  },
  isVatIncluded: (state, getters, rootState) => {
    if (
      state.vehicle.costs &&
      Object.keys(state.defaults).length &&
      rootState.filters.finance_form_name
    ) {
      const costObj = state.vehicle.costs.data.find(
        (item) =>
          item.finance_form === rootState.filters.finance_form_name &&
          item.months ===
            state.defaults[rootState.filters.finance_form_name].months &&
          item.distance ===
            state.defaults[rootState.filters.finance_form_name].distance
      )

      return costObj ? costObj.vat_included : false
    }
  },
  deliveryDaysCountFrom: (state) => {
    const days =
      state.modelColor &&
      state.modelColor.hasOwnProperty('delivery_days_from') &&
      state.modelColor.delivery_days_from !== null
        ? state.modelColor.delivery_days_from
        : state.vehicle && state.vehicle.hasOwnProperty('deliveryTime')
        ? state.vehicle.deliveryTime.from
        : 0

    return days
  },
  deliveryDaysCountTo: (state) => {
    const days =
      state.modelColor &&
      state.modelColor.hasOwnProperty('delivery_days_to') &&
      state.modelColor.delivery_days_to !== null
        ? state.modelColor.delivery_days_to
        : state.vehicle && state.vehicle.hasOwnProperty('deliveryTime')
        ? state.vehicle.deliveryTime.to
        : 0

    return days
  },
  deliveryDaysCount: (state) =>
    state.modelColor
      ? state.modelColor.delivery_days_from
      : state.vehicle.deliveryTime.days_count,
  getDefaults: (state) => state.defaults,
  getFixedCostByMonthAndDistance: (state) => ([month, distance]) => {
    if (state.vehicle.costs)
      return (
        state.vehicle.costs.data.find(
          (item) => item.months === month && item.distance === distance
        ) || {}
      )

    return {}
  },
  getPersonNumberError: (state) => state.personNumberError
}

export const mutations = {
  setPagination: (state, pagination) => (state.pagination = pagination),
  setVehicles: (state, vehicles) =>
    vehicles.forEach((vehicle) => {
      const allVehicleIds = state.vehicles.map((item) => item.id)

      if (!allVehicleIds.includes(vehicle.id)) state.vehicles.push(vehicle)
    }),
  setAllVehicles: (state, vehicles) => (state.vehicles = vehicles),
  setVehicle: (state, vehicle) => (state.vehicle = vehicle),
  setVehicleMeta: (state, meta) => (state.vehicleMeta = meta),
  setCurrentStepIndex: (state, index) => (state.currentStepIndex = index),
  setRedirectUrl: (state, url) => (state.redirectUrl = url),
  setSortedCosts: (state, sortedCosts) => (state.sortedCosts = sortedCosts),
  setModelColor: (state, modelColor) => (state.modelColor = modelColor),
  setResidualVisibility: (state, visibility) =>
    (state.residualVisibility = visibility),
  setDefaults: (state, defaults) => (state.defaults = defaults),
  setDeliveryType: (state, deliveryType) => (state.deliveryType = deliveryType),
  setPersonNumberError: (state, error) => (state.personNumberError = error)
}

export const actions = {
  async FETCH_ALL({ commit, rootState, getters }, data) {
    const { toNextPage, add } = data

    const response = await ProductApi.getAll({
      nextPage: toNextPage ? getters.getNextPage : 1,
      perPage: 6,
      sort: rootState.filters.selectedTypeOfSort,
      auth: rootState.reseller.token,
      financeFormId: rootState.filters.finance_form_id,
      typeId: rootState.filters.type.type.id,
      selectedFilters: rootState.filters.selectedFilters
    })

    add
      ? commit('setVehicles', response.data.data)
      : commit('setAllVehicles', response.data.data)

    commit('setPagination', response.data.meta.pagination)
  },
  async FETCH_VEHICLE({ commit, dispatch, getters, rootState }, { id }) {
    const response = await ProductApi.getVehicle({
      id,
      auth: rootState.reseller.token,
      financeFormId: rootState.filters.finance_form_id,
      typeId: rootState.filters.type.type.id
    })
    const vehicle = response.data
    const metaData = Array.isArray(response.data.metaData)
      ? {}
      : response.data.metaData

    dispatch(
      'order/SET',
      { mutation: 'setVehicleId', value: id },
      { root: true }
    )

    const cost = vehicle.costs.data
      .filter(
        (item) => item.finance_form === rootState.filters.finance_form_name
      )
      .sort((a, b) => b.months - a.months)
      .reduce((accum, value) =>
        accum.calculated_price < value.calculated_price ? accum : value
      )

    dispatch(
      'order/SET',
      { mutation: 'setVehicleCostId', value: cost.id },
      { root: true }
    )

    const modelColorsArr = vehicle.costs.data.find(
      (item) => item.id === cost.id
    ).modelColors
    const modelColor =
      modelColorsArr.data.find((item) => item.default) || modelColorsArr.data

    commit('setModelColor', modelColor)

    commit('setVehicleMeta', {
      title: `${metaData.title || ''} ${vehicle.category} ${vehicle.brand} 
        ${vehicle.model} ${vehicle.name}`,
      description: `${metaData.description || ''} ${vehicle.description} 
        ${vehicle.specs}`,
      keywords: `${metaData.keywords || ''}`,
      url: `${metaData.url || ''}`,
      image: modelColor && modelColor.image ? modelColor.image.url : ''
    })

    dispatch(
      'order/SET',
      { mutation: 'setModelColorId', value: modelColor.id },
      { root: true }
    )

    commit('setVehicle', vehicle)
    dispatch('NEW_DEFAULTS')

    dispatch(
      'order/SET',
      { mutation: 'setTotalMonthlyPrice', value: getters.calculatePrice },
      { root: true }
    )
  },
  async FETCH_CALC_DEPENDENCIES({
    commit,
    dispatch,
    rootState,
    state,
    getters
  }) {
    const response = await ProductApi.calculateDependencies({
      id: rootState.order.vehicleCostId,
      auth: rootState.reseller.token,
      residual: rootState.order.residual,
      cash_payment: rootState.order.cash_payment
    })

    const newVehicle = {
      ...state.vehicle,
      ...{
        winter_tires: response.data.winterTires,
        accessories: response.data.accessories,
        modelColors: response.data.modelColors,
        standard_price: response.data.monthlyPrice,
        effectiveInterest: response.data.effectiveInterest
      }
    }

    const preselected = response.data.accessories.data
      .map((item) => {
        if (!item.opt_in) {
          return item.id
        }
      })
      .filter((item) => !!item)

    if (preselected.length) {
      dispatch(
        'order/SET',
        { mutation: 'setAccessories', value: preselected },
        { root: true }
      )
    }

    commit('setVehicle', newVehicle)

    dispatch(
      'order/SET',
      { mutation: 'setTotalMonthlyPrice', value: getters.calculatePrice },
      { root: true }
    )
  },
  updateSortedCosts({ commit }, data) {
    commit('setSortedCosts', data)
  },
  NEW_DEFAULTS({ commit, state, rootState }) {
    commit('setDefaults', {})

    const defaults = state.vehicle.costs.data.reduce((obj, item) => {
      if (!obj.hasOwnProperty(item.finance_form))
        obj[item.finance_form] = {
          months: item.months,
          distance: item.distance,
          price: getPrice(item),
          residual: item.residual,
          id: item.id
        }

      const { months, distance, price, residual, id } = obj[item.finance_form]

      const generalPrice = getPrice(item)

      const check =
        generalPrice < price ||
        (generalPrice === price && item.months < months) ||
        (generalPrice === price &&
          item.months === months &&
          item.distance < distance)

      obj[item.finance_form].months = check ? item.months : months

      obj[item.finance_form].distance = check ? item.distance : distance

      obj[item.finance_form].price = check ? generalPrice : price

      obj[item.finance_form].residual = check ? item.residual : residual

      obj[item.finance_form].id = check ? item.id : id

      return obj
    }, {})

    commit('setDefaults', defaults)
  },
  updateDefaults({ commit, state }, data) {
    const { form, months, distance, price, residual, id } = data

    const copyDefaults = JSON.parse(JSON.stringify(state.defaults))

    if (months) copyDefaults[form].months = months

    if (distance) copyDefaults[form].distance = distance

    if (price) copyDefaults[form].price = price

    if (residual) copyDefaults[form].residual = residual

    if (id) copyDefaults[form].id = id

    commit('setDefaults', copyDefaults)
  },
  updatePersonNumberError({ commit }, errorString) {
    commit('setPersonNumberError', errorString)
  }
}

const getPrice = (costs, standardPrice) => {
  let extraPrice = 0
  const serviceCost = costs.service_cost !== null ? costs.service_cost : 0
  const basicPrice = standardPrice || costs.calculated_price

  if (costs.extraFields.data.length) {
    extraPrice = costs.extraFields.data.reduce((sum, item) => {
      return sum + item.price
    }, 0)
  }

  return basicPrice + serviceCost + extraPrice
}
