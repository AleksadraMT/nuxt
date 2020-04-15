<template lang="pug">
  div
    TypeSelect
    FinanceFormsMobile

    #filter.filter(v-if="getFilters.length > 0")
      CollapseBox(
        :min-height="0"
        :always-show="false"
        :content-show="filterShow"
        button-position="top"
      )
        .btn-collapse(
          slot="button"
          slot-scope="data"
          @click="SET({ mutation: 'setFilterShow', value: !isMobile() })"
        )
          span.text(v-if="!data.show") Visa filter
          span.text(v-else) Göm filter
          span.bar
        
        .container
          .row
            .col-md-12
              h3.filter-headline {{ filterHeadline }}
          .row
            .filter-wrapper
              .filter-container
                .filter-item(
                  v-for="(filter, index) in getFilters"
                  :key="index"
                  :class="{'item-hidden': !showMore && index > 3}"
                )
                  DropDown(
                    option-label="value"
                    option-value="key"
                    :value="getSelectedFilters[filter.key]"
                    :label="filter.label"
                    :options="filter.items"
                    :disabled="filter.items.length === 0"
                    :multiple="true"
                    @click="UPDATE_FILTERS({name: filter.key, values: $event})"
                  )
              .filter-btns-container(
                :class="showMore?'active':''"
              )
                .filter-item
                  button.btn.btn-reset.btn-hover(
                    @click="RESET_FILTERS"
                  )  Rensa Filter
                .filter-item
                  button.btn.btn-search.btn-hover(
                    @click="FETCH_ALL({toNextPage: true})"
                  ) Sök Bilar

          .row(v-if="getFilters.length > 4")
            div.show-more-row
            div.show-more(
              :class="{'active': showMore}"
              @click="showMore = !showMore"
            ) 
              span.show-more-sign
                span(v-if="!showMore")
                  AddSvg(
                    customClass="expand-filter-btn"
                  )
                span(v-else)
                  RemoveSvg(
                    customClass="expand-filter-btn"
                  )
              span {{ showMore ? 'Färre alternativ' : 'Fler alternativ' }}

    .finance-forms-wrapper(v-if="showFormsFilter")
      FinanceForms

    .filter-sort-block.bordered.m-b-30
      .container.display-flex.content-flex-end
        Sort
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

import TypeSelect from '~/components/Filter/TypeSelect/TypeSelect.vue'
import FinanceFormsMobile from '~/components/Filter/FinanceForms/FinanceFormsMobile.vue'
import FinanceForms from '~/components/Filter/FinanceForms/FinanceForms.vue'
import Sort from '~/components/Filter/Sort/Sort.vue'

import CollapseBox from '~/components/Common/CollapseBox.vue'
import DropDown from '~/components/Common/DropDown.vue'
import AddSvg from '~/components/svg/add.vue'
import RemoveSvg from '~/components/svg/remove.vue'

import Helper from '~/mixins/Helper.js'

export default {
  name: 'UserFilter',
  components: {
    TypeSelect,
    FinanceFormsMobile,
    FinanceForms,
    Sort,
    CollapseBox,
    DropDown,
    AddSvg,
    RemoveSvg
  },
  mixins: [Helper],
  props: {
    showFormsFilter: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    showMore: false
  }),
  computed: {
    ...mapState('reseller', {
      filterHeadline: (state) =>
        state.siteStyle.filterBlock ? state.siteStyle.filterBlock.headline : ''
    }),
    ...mapState('filters', ['filterShow']),
    ...mapGetters('filters', ['getSelectedFilters', 'getFilters'])
  },
  mounted() {
    this.SET({ mutation: 'setFilterShow', value: !this.isMobile() })
  },
  methods: {
    ...mapActions('filters', [
      'SET',
      'FETCH_FILTERS',
      'UPDATE_FILTERS',
      'RESET_FILTERS'
    ]),
    ...mapActions('product', ['FETCH_ALL'])
  }
}
</script>
