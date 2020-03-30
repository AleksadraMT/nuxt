/* eslint-disable no-prototype-builtins */
/* eslint-disable no-extra-boolean-cast */
const parseCss = (input) => {
  let outputCss = ''

  function parseProperties(properties) {
    let parsedProperties = ''
    for (const property in properties) {
      if (!properties.hasOwnProperty(property)) {
        continue
      }

      parsedProperties += ` ${property}: ${properties[property]}; `
    }
    return parsedProperties
  }

  for (const rule in input) {
    if (!input.hasOwnProperty(rule)) {
      continue
    }

    if (rule === '@media') {
      input[rule].map(
        (item) =>
          (outputCss += ` @media (${item.condition.join(
            ') and ('
          )}) { ${parseCss(item.content)} } `)
      )
      continue
    }

    outputCss += ` ${rule} { ${parseProperties(input[rule])} } `
  }

  return outputCss
}

const buildMediaQuery = (conditions, rules) => {
  return {
    condition: conditions,
    content: rules
  }
}

const hexToRgbA = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
}

function setStyles(newStyles) {
  const oldStyle = document.getElementById('custom-style')

  if (oldStyle !== null) oldStyle.remove()

  const styles = JSON.parse(JSON.stringify(newStyles))

  styles.topHeaders.data = !!styles.topHeaders.data.length
    ? styles.topHeaders.data
    : [{}]
  styles.campaigns.data = !!styles.campaigns.data.length
    ? styles.campaigns.data
    : [{}]
  styles.includes.data = !!styles.includes.data.length
    ? styles.includes.data
    : [{}]

  const cssObject = {
    '@font-face': {
      'font-family': 'CustomFont',
      src: `url(${styles.logoFont.font})`
    },
    '.nav-title': {
      color: `${styles.topHeaders.data[0].color}`,
      'text-align': `${styles.topHeaders.data[0].position}`,
      margin: `${styles.topHeaders.data[0].position_margin}px`,
      'margin-top': `${styles.topHeaders.data[0].margin_top}px`,
      'font-size': `${styles.topHeaders.data[0].size}px`
    },
    '.customizable .main-campaign-headline': {
      'font-size': `${styles.campaigns.data[0].size}px`,
      margin: `0 ${styles.campaigns.data[0].position_margin}px 0 ${styles.campaigns.data[0].position_margin}px`,
      'padding-top': `${styles.campaigns.data[0].margin_top}px`,
      'text-align': `${styles.campaigns.data[0].position}`,
      color: `${styles.campaigns.data[0].color}`
    },
    '.customizable .filter': {
      background: `${styles.filterBlock.background_color}`
    },
    '.customizable .pre-loader.filter-container.show:before': {
      background: `${styles.filterBlock.background_color}`
    },
    '.customizable .filter .drop-down label': {
      color: `${styles.filterBlock.label_color}`
    },
    '.customizable .filter .btn-collapse .text': {
      color: `${styles.filterBlock.collapse_btn_color}`
    },
    '.customizable .filter .btn-collapse .bar, .customizable .filter .btn-collapse .bar:after, .customizable .filter .btn-collapse .bar:before': {
      background: `${styles.filterBlock.collapse_btn_color}`
    },
    '.customizable .filter-headline': {
      color: `${styles.filterBlock.headline_color}`
    },
    '.customizable .filter .expand-filter-btn': {
      fill: `${styles.filterBlock.show_more_btn_color}`
    },
    '.customizable .slide-item-price': {
      background: `${styles.listItem.background_color}`,
      color: `${styles.listItem.text_color}`
    },
    '.customizable .filter .btn-reset': {
      background: `${styles.filterBlock.reset_btn_color}`,
      color: `${styles.filterBlock.reset_btn_text_color}`
    },
    '.customizable .filter .btn.btn-search': {
      background: `${styles.filterBlock.search_btn_color}`,
      color: `${styles.filterBlock.search_btn_text_color}`
    },
    '.customizable .product-card-info': {
      background: `${styles.listItem.background_color}`,
      color: `${styles.listItem.text_color}`
    },
    '.customizable .btn-hover.invert': {
      background: `${styles.listItem.choose_btn_color}`,
      color: `${styles.listItem.choose_btn_text_color}`
    },
    '.customizable .btn-general': {
      background: `${styles.listItem.choose_btn_color}`,
      color: `${styles.listItem.choose_btn_text_color}`
    },
    '.customizable footer': {
      background: `${styles.footer.bg_color}`,
      color: `${styles.footer.text_color}`
    },
    '.customizable footer a': {
      color: `${styles.footer.text_color}`
    },
    '.customizable .footer-bottom': {
      background: `${styles.footer.copyright_bg_color}`,
      color: `${styles.footer.copyright_text_color}`
    },
    '.customizable .order-status': {
      background: `${styles.steps.bg_color}`,
      color: `${styles.steps.text_color}`
    },
    '.customizable .order-steps li': {
      background: `${styles.steps.bg_color}`,
      color: `${styles.steps.text_color}`
    },
    '.customizable .order-steps li.active': {
      background: `${styles.steps.active_bg_color}`,
      color: `${styles.steps.active_text_color}`
    },
    '.customizable .order-info-btn .btn': {
      background: `${styles.listItem.choose_btn_color}`,
      color: `${styles.listItem.choose_btn_text_color}`
    },
    '.customizable .check-list-circle': {
      background: `${styles.includes.data[0].circle_color}`,
      color: `${styles.includes.data[0].circle_text_color}`
    },
    '.customizable .product-card-price-symbol': {
      color: `${styles.listItem.campaign_tag_text_color}`,
      background: `${styles.listItem.campaign_tag_color}`
    },
    '.customizable .order-steps li:not(.active):hover': {
      background: `${
        styles.filterBlock.search_btn_color
          ? hexToRgbA(styles.filterBlock.search_btn_color, '0.6')
          : '#E5E4E5'
      }`
    },
    '.customizable .cost-block': {
      background: `${styles.accessoryPage.desc_block_bg_color}`,
      color: `${styles.accessoryPage.desc_block_text_color}`
    },
    '.customizable .step-btn i': {
      color: `${styles.filterBlock.search_btn_text_color}`
    },
    '.customizable .step-btn.btn-hover': {
      background: `${styles.listItem.choose_btn_color}`,
      color: `${styles.listItem.choose_btn_text_color}`
    },
    'button.btn.btn-grey.btn-hover': {
      background: `${styles.filterBlock.search_btn_color}`,
      color: `${styles.filterBlock.search_btn_text_color}`
    },
    '.cls-1': {
      fill: `${styles.listItem.choose_btn_color}`
    },
    '.cls-2': {
      background: `${styles.listItem.choose_btn_color}`,
      color: `${styles.filterBlock.search_btn_text_color}`
    },
    '.cls-21': {
      stroke: `${styles.filterBlock.search_btn_text_color}`,
      fill: `${styles.listItem.choose_btn_color}`
    },
    '.cls-3': {
      fill: `${styles.filterBlock.search_btn_text_color}`
    },
    '.customizable .custom-check-input:checked + .check': {
      background: `${styles.listItem.choose_btn_color}`,
      'border-color': `${styles.listItem.choose_btn_text_color}`
    },
    '.customizable .step-btn': {
      background: `${styles.listItem.choose_btn_text_color}`,
      color: `${styles.listItem.choose_btn_text_color}`
    },
    '.customizable .next-step-num': {
      color: `${styles.listItem.choose_btn_text_color}`
    },
    '.customizable .radio-block-input:checked + .radio-block': {
      'border-color': `${styles.listItem.choose_btn_color}`
    },
    '.customizable .costs-list-content .vue-slider-process': {
      'background-color': `${styles.filterBlock.search_btn_color}`
    },
    '.customizable .costs-list-content .vue-slider-dot-handle': {
      'background-color': `${styles.filterBlock.search_btn_color}`
    },
    '.customizable .vue-slider-dot-tooltip-top': {
      color: `${styles.filterBlock.search_btn_text_color}`,
      'background-color': `${styles.filterBlock.search_btn_color}`
    },
    '.customizable .vue-slider-dot-handle:after': {
      'border-top-color': `${styles.filterBlock.search_btn_color}`
    },
    '.customizable .costs-list-title': {
      'border-color': `${styles.filterBlock.search_btn_color}`
    },
    '.customizable .costs-list-content': {
      'border-color': `${styles.filterBlock.search_btn_color}`
    },
    '.costs-list.active .costs-list-title': {
      'background-color': `${styles.filterBlock.search_btn_color}`,
      color: `${styles.filterBlock.search_btn_text_color}`,
      'border-color': `${styles.filterBlock.search_btn_color}`
    },
    '.customizable .costs-list-title:hover': {
      'background-color': `${styles.filterBlock.search_btn_color}`,
      color: `${styles.filterBlock.search_btn_text_color}`
    },
    body: {
      'font-family': `CustomFont, sans-serif`
    },
    'a.navbar-brand.logo.router-link-exact-active.active': {
      'margin-top': `${styles.logoFont.logo_margin_top}px`,
      'margin-left': `${styles.logoFont.logo_margin_left}px`
    },
    'header .bottom': {
      height: `${
        styles.topHeaders.data && Object.keys(styles.topHeaders.data[0]).length
          ? 700
          : 700
      }px`
    },
    '.infotooltip': {
      'background-color': `${styles.filterBlock.search_btn_color}`
    },
    '.infotooltip-content': {
      'background-color': `${styles.filterBlock.search_btn_color}`,
      color: `${styles.filterBlock.search_btn_text_color}`
    },
    '.infotooltip-content:after': {
      'background-color': `${styles.filterBlock.search_btn_color}`
    },
    '.customizable .abstract-forms-input:checked+span': {
      background: `${styles.listItem.choose_btn_color}`,
      color: `${styles.listItem.choose_btn_text_color}`
    },
    '.customizable .active-collection': {
      background: `${styles.listItem.choose_btn_color}`,
      color: `${styles.listItem.choose_btn_text_color}`
    },
    '@media': [
      buildMediaQuery(['max-width: 1200px'], {
        '.customizable header .bottom': {
          'background-image': `url(${styles.topHeaders.data[0].image_md})`
        }
      }),
      buildMediaQuery(['max-width: 667px'], {
        '.customizable header .bottom': {
          'background-image': `url(${styles.topHeaders.data[0].image_sm})`
        },
        'header .bottom .description': {
          display: 'none'
        }
      }),
      buildMediaQuery(['max-width: 337px'], {
        '.customizable header .bottom': {
          'background-image': `url(${styles.topHeaders.data[0].image_xs})`
        }
      }),
      buildMediaQuery(['min-width: 1201px'], {
        '.customizable header .bottom': {
          'background-image': `url(${styles.topHeaders.data[0].image_lg})`
        }
      })
    ]
  }

  const css = parseCss(cssObject)
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')

  style.setAttribute('id', 'custom-style')

  head.appendChild(style)

  document.body.classList.add('customizable')

  style.type = 'text/css'

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
}

export default ({ app }, inject) => {
  inject('siteStyle', (data) => setStyles(data))
}
