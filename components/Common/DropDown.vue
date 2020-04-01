<template lang="pug">
  .drop-down(:class="{'active': show}" :ref="generateRef('dropDown')")
    label {{ label }}
    button.drop-down-toggle(
    :ref="generateRef('toggle')"
    :disabled="disabled"
    :readonly="suitable"
    ) {{ selectedValues }}
    .drop-down-menu(v-show="show" :ref="generateRef('menu')" data-menu)
      .drop-down-menu-item(
        :ref="generateRef('menuItem')"
        v-for="(option, index) in options"
        :key="option.id || option.key"
        :class="{active: isActive(option[optionValue])}"
        @click="update(option[optionValue] || option)"
      )
        .checkbox
        span {{ option.value || option[optionLabel] || option }}
</template>

<script>
/* eslint-disable vue/require-prop-types */
/* eslint-disable vue/require-default-prop */

export default {
  model: {
    prop: 'value',
    event: 'click'
  },
  props: {
    optionLabel: {},
    optionValue: {},
    options: {},
    label: {},
    multiple: {
      default: false
    },
    disabled: {
      default: false
    },
    value: {
      default: () => []
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    suitable() {
      return this.options !== [] && this.options && this.options !== 'undefined'
    },
    selectedValues() {
      // if it's not Array, turn it to from the Object to the Array

      const options = Array.isArray(this.options)
        ? this.options
        : Object.values(this.options)

      const value = options
        .filter((option) => {
          return Array.isArray(this.value)
            ? this.value.includes(option.id) || this.value.includes(option.key)
            : Number(this.value) === Number(option.id) ||
                Number(this.value) === Number(option.key)
        })
        .map((option) => option[this.optionLabel])

      return value.length <= 1 ? value[0] || 'Alla' : this.countSelected
    },
    countSelected() {
      return `${this.value.length} av ${this.options.length} val`
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.close)
  },
  methods: {
    generateRef(ref) {
      return `${ref}_${this._uid}`
    },
    update(value) {
      if (this.multiple) {
        const index = this.value.indexOf(value)
        if (index !== -1) {
          this.value.splice(index, 1)
        } else {
          this.value.push(value)
        }
        this.$emit('click', this.value)
      } else {
        this.$emit('click', value)
      }

      if (window.matchMedia('(max-width: 767px)').matches) {
        this.showToggle()
      }
    },
    showToggle() {
      this.show = !this.show
    },
    isActive(value) {
      if (this.multiple) {
        return this.value.includes(value)
      } else {
        return Array.isArray(this.value)
          ? this.value.includes(value)
          : this.value === value
      }
    },
    close(e) {
      const target = e.target
      const attrs = target.getAttributeNames()
      const toggle = this.$refs[this.generateRef('toggle')]
      const menuItems = this.$refs[this.generateRef('menuItem')]

      if (this.show) {
        if (attrs.includes('data-menu')) return

        const menuHasTarget = menuItems.includes(target)

        if (!menuHasTarget || target === toggle) {
          this.show = false
        }
      } else if (target === toggle) {
        this.showToggle()
      }
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/Common/DropDown.sass'
</style>
