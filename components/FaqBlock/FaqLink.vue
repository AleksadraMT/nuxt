<template lang="pug">
  .link-list-item(
    @click="active = !active"
  )
    .sub-menu-link {{ article.title }}
      .faq-links-icon-content
        AddSvg(
          customClass="faq-links-icon"
          v-show="!active"
        )
        RemoveSvg(
          customClass="faq-links-icon"
          v-show="active"
        )
    
    .sub-menu-text(
      v-show="active"
      v-html="article.body"
    )
</template>

<script>
export default {
  name: 'FaqLink',
  components: {
    AddSvg: () => import('~/components/svg/add.vue'),
    RemoveSvg: () => import('~/components/svg/remove.vue')
  },
  props: {
    article: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    active: false
  })
}
</script>
