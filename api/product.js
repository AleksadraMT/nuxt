/* eslint-disable camelcase */
import axios from 'axios'

class ProductApi {
  async getAll(data) {
    const {
      nextPage,
      perPage,
      sort,
      auth,
      financeFormId,
      typeId,
      selectedFilters
    } = data

    try {
      return await axios({
        method: 'get',
        url: process.env.BASE_URL + `vehicles`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        params: {
          financeFormId,
          typeId,
          page: nextPage,
          perPage,
          sort,
          ...selectedFilters
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getVehicle(data) {
    const { id, auth, financeFormId, typeId } = data

    try {
      return await axios({
        method: 'GET',
        url: process.env.BASE_URL + `vehicles/${id}`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        params: {
          financeFormId,
          typeId
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async calculateDependencies(data) {
    const { id, auth, residual, cash_payment } = data

    const params = {}

    if (residual) params.residual = residual
    if (cash_payment) params.cash_payment = cash_payment

    try {
      return await axios({
        method: 'GET',
        url: process.env.BASE_URL + `costs/${id}/calculate-dependencies`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        params
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async checkPostalCode(data) {
    const { auth, postcode } = data

    try {
      return await axios({
        method: 'GET',
        url: process.env.BASE_URL + `postal-code`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        params: {
          postcode
        }
      })
    } catch (error) {
      return error.response.data
    }
  }
}

// eslint-disable-next-line no-undef
export default new ProductApi()
