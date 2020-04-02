<template lang="pug">
  .collapse-box
    .collapse-button(@click="toggleShow" v-if="!alwaysShow && isTop")
      slot(name="button" :show="show")
        span.equipment-list-show.m-t-25.m-b-10
          span(v-if="!show") Se mer av utrustningslistan
          span(v-else) Se mindre av utrustningslistan
          i.fas.fa-chevron-down.arrow(:class="{turn:show}")
    .collapse-content(:style="styleContent", :class="{show: show || alwaysShow}" )
      .slot(ref="content")
        slot
    .collapse-button(@click="toggleShow" v-if="!alwaysShow && isBottom")
      slot(name="button" :show="show")
        span.equipment-list-show.m-t-25.m-b-10
          span(v-if="!show") Se mer av utrustningslistan
          span(v-else) Se mindre av utrustningslistan
          i.fas.fa-chevron-down.arrow(:class="{turn:show}")

</template>

<script>
export default {
  props: {
    minHeight: {
      type: Number,
      default: 80
    },
    alwaysShow: {
      type: Boolean,
      default: false
    },
    overflow: {
      type: Boolean,
      default: false
    },
    buttonPosition: {
      type: String,
      default: 'bottom'
    },
    contentShow: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    show: false,
    height: 0,
    windowWidth: 0
  }),
  computed: {
    computedMinHeight() {
      return this.height > this.minHeight ? this.minHeight : this.height
    },
    heightContent() {
      return this.show || this.alwaysShow
        ? `height:${this.height}px;`
        : `height:${this.computedMinHeight}px;`
    },
    overflowConent() {
      if (!this.show) {
        if (this.overflow) {
          return 'overflow: hidden'
        } else if (!this.alwaysShow) {
          return 'visibility: hidden; opacity: 0;'
        } else {
          return ''
        }
      }

      return ''
    },
    styleContent() {
      return `${this.heightContent} ${this.overflowConent}`
    },
    isTop() {
      return this.buttonPosition === 'top'
    },
    isBottom() {
      return this.buttonPosition === 'bottom'
    }
  },
  mounted() {
    this.getHeight()
    this.onReSize()

    window.addEventListener('resize', () => {
      this.onReSize()
      this.getHeight()
    })

    this.show = this.contentShow
  },
  updated() {
    this.getHeight()
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    getHeight() {
      this.$nextTick(() => {
        this.height = this.$slots.default
          ? this.$slots.default[0].elm.clientHeight
          : 0
      })
    },
    onReSize() {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/sass/components/Common/CollapseBox.sass'
</style>
