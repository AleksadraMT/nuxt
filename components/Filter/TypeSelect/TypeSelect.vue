<template lang="pug">
    #type-container.filter-uniq-type-container(
      v-show="types.length > 1"
    )
      .container-user
        .row
          .col-md-12(v-if="isMobileWidth")
            .filter-uniq-type.filter-uniq-type-mobile
              .filter-title-uniq Välj fordonstyp &#8811;
              div
                .filter-item-uniq
                  DropDown(
                    option-label="name"
                    option-value="id"
                    label=""
                    :options="typesOptions"
                    :disabled="false"
                    :multiple="false"
                    @click="change($event)"
                  )
          .col-md-12(v-if="!isMobileWidth")
            .filter-uniq-type.filter-uniq-type-desktop
              .filter-title-uniq Välj fordonstyp:
              .uniq-types-list
                .uniq-types-option(
                  v-for="(option, key) in types"
                  :class="{'active': type.type.id === option.type.id}"
                  :key="key"
                )
                  label
                    input(
                      type="radio"
                      name="uniq-type"
                      :value="option"
                      @change="change(option.type.id)"
                    )
                    span
                      img(
                        v-show="option.image"
                        :src="option.image"
                        :alt="option.type.name"
                      )
                      span {{ option.type.name }}

</template>

<script>
import { mapState, mapMutations } from 'vuex'

import DropDown from '~/components/Common/DropDown.vue'

export default {
  components: {
    DropDown
  },
  data: () => ({
    isMobileWidth: false
  }),
  computed: {
    ...mapState('filters', {
      types: (state) => state.types,
      type: (state) => state.type
    }),
    typesOptions() {
      return this.types.reduce((arr, next) => {
        arr.push(next.type)

        return arr
      }, [])
    }
  },
  mounted() {
    const _this = this

    this.isMobileWidth = window.matchMedia('(max-width: 480px)').matches

    window.addEventListener('resize', function() {
      _this.checkMobileWidth()
    })
  },
  methods: {
    ...mapMutations('filters', ['setType']),
    change(value) {
      this.$emit(
        'change',
        this.types.find((item) => item.type.id === value)
      )
    },
    checkMobileWidth() {
      return this.$set(
        this.$data,
        'isMobileWidth',
        window.matchMedia('(max-width: 480px)').matches
      )
    }
  }
}
</script>
