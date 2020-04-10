import { extend } from 'vee-validate'
import { required, min, max, numeric, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('min', min)
extend('max', max)
extend('email', email)
extend('numeric', numeric)

const regTel = new RegExp(/^([+]46|[+]45|0)([0-9]{9,11})$/)

extend('telepnone', {
  getMessage: (field) => 'Telephone number is not correct',
  validate: (value) => regTel.test(value)
})
