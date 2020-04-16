import FilterApi from '~/api/filter'

export const strict = false

export const state = () => ({
  finance_form_id: null,
  finance_form_name: '',
  types: {},
  type: '',
  selectedTypeOfSort: 'asc',
  sortOptions: [
    {
      label: 'Pris, lägst överst',
      value: 'asc',
      type: 'price'
    },
    {
      label: 'Pris, högst överst',
      value: 'desc',
      type: 'price'
    },
    {
      label: 'Kort leveranstid',
      value: 'delivery_asc',
      type: 'delivery'
    },
    {
      label: 'Lång leveranstid',
      value: 'delivery_desc',
      type: 'delivery'
    },
    {
      label: 'Genom kampanjer',
      value: 'campaign',
      type: 'campaign'
    }
  ],
  selectedFilters: {},
  filters: [],
  filterShow: true
})

export const getters = {
  getTypes: (state) => state.types,
  getType: (state) => state.type,
  getSelectedTypeOfSort: (state) => state.selectedTypeOfSort,
  getFilters: (state) => state.filters,
  getSelectedFilters: (state) => state.selectedFilters
}

export const mutations = {
  setFinanceFormId: (state, id) => (state.finance_form_id = id),
  setFinanceFormName: (state, name) => (state.finance_form_name = name),
  setTypes: (state, types) => (state.types = types),
  setType: (state, type) => (state.type = type),
  setSelectedTypeOfSort: (state, selectedTypeOfSort) =>
    (state.selectedTypeOfSort = selectedTypeOfSort),
  setFilters: (state, values) => (state.filters = values),
  removeFilters: (state) => (state.filters = []),
  setSelectedFilters: (state, selectedFilter) => {
    if (!state.selectedFilters[selectedFilter.name])
      state.selectedFilters[selectedFilter.name] = []

    const newArray = [
      ...state.selectedFilters[selectedFilter.name],
      ...selectedFilter.values
    ]

    state.selectedFilters[selectedFilter.name] = [...new Set(newArray)]
  },
  removeSelectedFilters: (state) => (state.selectedFilters = {}),
  setFilterShow: (state, value) => (state.filterShow = value)
}

export const actions = {
  async FETCH_TYPES({ commit, state, rootState }) {
    const response = await FilterApi.getTypes({
      auth: rootState.reseller.token,
      financeFormId: state.finance_form_id
    })

    const type = response.data.data.find((item) => item.default)

    commit('setTypes', response.data.data)
    commit('setType', type)
  },
  UPDATE_DEFAULTS({ commit, dispatch, rootState }) {
    const { financeForms } = rootState.reseller.resellerInfo
    const financeFormsArr = financeForms.data ? financeForms.data : financeForms
    const financeFormCollectionName =
      rootState.reseller.financeFormCollectionName
    let urlFormName

    if (process.client) {
      // when direct url to the car take finance form from the URL of the car
      const urlForm = window.location.search
        .replace('?', '')
        .split('&')
        .find((item) => item.includes('financeform'))
      urlFormName = urlForm
        ? urlForm.replace('financeform=', '').replace('-', ' ')
        : ''
    }

    const defaultForm = financeFormsArr.find((item) => {
      // if client and we have data about finane form in the url
      if (process.client && urlFormName) {
        return (
          item.name.toLowerCase() === urlFormName &&
          item.type.toLowerCase() === financeFormCollectionName
        )
      } else {
        return (
          item.default && item.type.toLowerCase() === financeFormCollectionName
        )
      }
    })

    commit('setFinanceFormId', defaultForm.id)
    commit('setFinanceFormName', defaultForm.name)
  },
  async FETCH_FILTERS({ commit, state, rootState }, data) {
    const response = await FilterApi.getAll({
      selectedFilters: state.selectedFilters,
      resellerId: state.type.id,
      auth: rootState.reseller.token,
      financeFormId: state.finance_form_id
    })

    const fixedField = data && data.name ? data.name : null
    const filteredData = response.data.filters.data.filter(
      (item) => item.key !== fixedField
    )
    let getFixedData

    if (fixedField !== null) {
      getFixedData = state.filters.find((item) => item.key === fixedField)

      const newData = response.data.filters.data.map((item) => {
        if (item.key === fixedField) {
          item.items = getFixedData.items

          return item
        }

        return item
      })

      commit('setFilters', newData)
    } else {
      commit('setFilters', filteredData)
    }
  },
  SET({ commit }, { mutation, value }) {
    commit(mutation, value)
  },
  UPDATE_FILTERS({ dispatch, commit }, data) {
    commit('setSelectedFilters', data)
    dispatch('FETCH_FILTERS', data)
  },
  UPDATE_TYPE({ commit, dispatch }, typeData) {
    commit('setType', typeData)
    commit('removeFilters')
    commit('removeSelectedFilters')
    dispatch('FETCH_FILTERS')
    dispatch('product/FETCH_ALL', { toNextPage: false }, { root: true })
  },
  UPDATE_FINANCE_FORM({ commit, dispatch }, form) {
    commit('setFinanceFormId', form.id)
    commit('setFinanceFormName', form.name)

    dispatch('reseller/FETCH_STYLE', null, { root: true })

    commit('removeFilters')
    commit('removeSelectedFilters')
    dispatch('FETCH_FILTERS')
    dispatch('product/FETCH_ALL', { toNextPage: false }, { root: true })
  },
  RESET_FILTERS({ commit, dispatch }) {
    commit('removeSelectedFilters')
    commit('removeFilters')

    dispatch('FETCH_FILTERS')
    dispatch('product/FETCH_ALL', { toNextPage: false }, { root: true })
  },
  UPDATE_VIEW({ commit, dispatch }, { toThe, sort, openSeo }) {
    let toTheBlock = document.getElementById(toThe)

    if (toTheBlock === null && !openSeo) return

    if (
      openSeo &&
      !document.querySelector('.seo-unvisible').classList.contains('visible')
    ) {
      document.querySelector('.seo-show-more').click()

      toTheBlock = document.getElementById(toThe)
    }

    setTimeout(function() {
      toTheBlock.scrollIntoView({
        block: 'start',
        inline: 'start'
      })
    }, 0)

    if (sort) {
      commit('setSelectedTypeOfSort', sort)

      dispatch('product/FETCH_ALL', { toNextPage: false }, { root: true })
    }
  }
}
