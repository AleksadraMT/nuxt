import axios from 'axios'

class OrderApi {
  async bankIdLogin(data) {
    const { auth, route, personNumber } = data

    try {
      return await axios({
        method: 'POST',
        url: `${process.env.BASE_URL}bankid/login`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        data: {
          callbackUrl: route,
          personNumber
        }
      })
    } catch (error) {
      return error.response.data
    }
  }

  async postOrders(data) {
    const { auth, values } = data

    try {
      return await axios({
        method: 'POST',
        url: `${process.env.BASE_URL}orders`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        data: {
          ...values
        }
      })
    } catch (error) {
      return error.response.data
    }
  }
}

export default new OrderApi()
