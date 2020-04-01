/* eslint-disable prettier/prettier */
const message = {
  sv: {
    'private': 'privat',
    'corporate': 'företag',
    'Private leasing': 'Privatleasing',
		'Private rental': 'Långtidshyra',
		'Down payment': 'Avbetalning',
		'Corporate leasing': 'Finansiell leasing',
		'Corporate rental': 'Företagshyra',
  },
  en: {
    'privat': 'private',
    'företag': 'corporate',
    'Privatleasing': 'Private leasing',
    'Långtidshyra': 'Private rental',
    'Avbetalning': 'Down payment',
    'Finansiell leasing': 'Corporate leasing',
    'Företagshyra': 'Corporate rental'
  }
}

const translate = (lang, text) => message[lang][text]

export default translate
