import axios from 'axios'

class FilterApi {
  async getTypes(data) {
    const { auth, financeFormId } = data

    try {
      return await axios({
        method: 'GET',
        url: process.env.BASE_URL + 'filter/types',
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        params: {
          financeFormId
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getAll(data) {
    const { selectedFilters, auth, financeFormId, resellerId } = data

    try {
      return await axios({
        method: 'GET',
        url: `${process.env.BASE_URL}filter/types/${resellerId}/items`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        params: {
          financeFormId,
          ...selectedFilters
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new FilterApi()
