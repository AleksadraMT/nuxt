import axios from 'axios'

class ResellerApi {
  async get() {
    try {
      return await axios({
        method: 'POST',
        url: process.env.BASE_URL + 'reseller/auth',
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json'
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

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
        data: {
          financeFormId
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getBuilder(data) {
    const { auth, financeFormId, typeId } = data

    try {
      return await axios({
        method: 'GET',
        url: process.env.BASE_URL + 'reseller/builder',
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        data: {
          financeFormId,
          typeId
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}

// eslint-disable-next-line no-undef
export default new ResellerApi()
