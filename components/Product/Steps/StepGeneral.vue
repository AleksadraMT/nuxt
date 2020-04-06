<template lang="pug">
  .page.page-model
    .container
      .row
        .col-md-6.order-md-1.order-2
          .m-b-15
            Gallery(
              :main-image-url="mainImageUrl"
              :images="vehicle.images ? vehicle.images.data : []"
              :alt="`${vehicle.brand} ${vehicle.model}`"
            )
</template>

<script>
import { mapState } from 'vuex'
import Gallery from '~/components/Common/Galery.vue'

export default {
  name: 'StepGeneral',
  components: {
    Gallery
  },
  computed: {
    ...mapState('product', ['modelColor', 'vehicle']),
    mainImageUrl() {
      return this.modelColor && this.modelColor.image
        ? this.modelColor.image.url
        : ''
    }
  }
}
</script>
