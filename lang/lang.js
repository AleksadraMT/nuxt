/* eslint-disable prettier/prettier */
const message = {
  sv: {
    'private': 'privat',
    'corporate': 'företag'
  },
  en: {
    'privat': 'private',
    'företag': 'corporate'
  }
}

const translate = (lang, text) => message[lang][text]

export default translate
