import { extend } from 'vee-validate'
import { required, min, max, numeric } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('min', min)
extend('max', max)
extend('numeric', numeric)
