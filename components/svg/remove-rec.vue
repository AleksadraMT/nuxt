<template>
  <svg
    id="Layer_1"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 455 455"
    style="enable-background:new 0 0 455 455;"
    xml:space="preserve"
  >
    <path
      class="remove-svg"
      :class="customClass"
      d="M0,0v455h455V0H0z M358.865,242.5h-263v-30h263V242.5z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    customClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass">
.remove-svg
  fill: #008C7D
</style>
