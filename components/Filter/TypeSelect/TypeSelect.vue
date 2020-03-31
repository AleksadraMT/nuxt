<template lang="pug">
    #type-container.filter-uniq-type-container(
      v-show="allTypes.length > 1"
    )
      .container-user
        .row
          .col-md-12(v-if="isMobileWidth")
            .filter-uniq-type.filter-uniq-type-mobile
              .filter-title-uniq Välj fordonstyp &#8811;
              div
                .filter-item-uniq
                  v-drop-down(
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
                  v-for="(option, key) in allTypes"
                  :class="{'active': type.includes(option.type.id)}"
                  :key="key"
                )
                  label
                    input(
                      type="radio"
                      name="uniq-type"
                      :value="option.type.id"
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

export default {
  components: {
    VDropDown: () => import('@/components/helps/DropDown')
  },
  data: () => ({
    isMobileWidth: false
  }),
  computed: {
    ...mapState('filters', {
      types: (state) => state.type,
      type: (state) => state.type.type.id
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
    change(id) {
      console.log(id)

      this.$emit('change', id)
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
