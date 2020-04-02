<template lang="pug">
  .wrap-image(:class="imageState")
    div(
      class="gallery-item"
      :data-src="resultSrc"
      :show="imageState === 'loading'"
    )
      img(:src="resultSrc" :class="imageClass" :alt="alt")
</template>

<script>
export default {
  name: 'ImageBuilder',
  props: {
    imageSource: {
      type: String,
      required: true
    },
    imageClass: {
      type: String,
      required: false,
      default: ''
    },
    imageErrorCallback: {
      type: Function,
      required: false,
      default() {}
    },
    imageSuccessCallback: {
      type: Function,
      required: false,
      default() {}
    },
    alt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageWidth: 0,
      imageHeight: 0,
      imageState: 'loading',
      asyncImage: '',
      resultSrc: ''
    }
  },
  watch: {
    imageSource(n) {
      this.fetchImage(n)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchImage()
    })

    this.asyncImage = new Image()
  },
  methods: {
    fetchImage() {
      this.imageState = 'loading'
      this.asyncImage.onload = this.imageOnLoad
      this.asyncImage.onerror = this.imageOnError
      this.asyncImage.src = this.imageSource
    },
    imageOnLoad() {
      this.imageState = 'loaded'
      this.imageWidth = this.asyncImage.naturalWidth
      this.imageHeight = this.asyncImage.naturalHeight
      this.resultSrc = this.asyncImage.src
      this.imageSuccessCallback()
    },
    imageOnError() {
      this.imageState = 'error'
      this.imageErrorCallback()
    }
  }
}
</script>
