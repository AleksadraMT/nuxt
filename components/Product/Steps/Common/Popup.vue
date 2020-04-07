<template lang="pug">
  .popup(v-if="show")
    .popup-wrapper
      slot.content
      i.close.fa.fa-times-circle(
        aria-hidden="true"
        @click="closePopup"
      )
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      isOpen: this.show
    }
  },
  methods: {
    closePopup() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass">
.popup
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #fff
  z-index: 99999
  display: flex
  justify-content: center
  align-items: center
  align-content: center
  &-wrapper
    position: absolute
    left: 0
    right: 0
    width: 70%
    height: auto
    margin: auto
    background: #fff
    padding: 30px
    box-shadow: 0 20px 70px 0 #545454
  .close
    display: none
    position: absolute
    right: 10px
    top: 10px
    cursor: pointer
    font-size: 30px
    color: #666
    transition: color .2s
    &:hover
      color: #000

    &:after
      content: ''
      width: 22px
      height: 22px
      background-color: #fff
      position: absolute
      display: inline-block
      right: 4px
      top: 4px
      z-index: -1
      border-radius: 100%

  &.transparent
    background: rgba(255,255,255,.3)

    .close
      display: block
</style>
