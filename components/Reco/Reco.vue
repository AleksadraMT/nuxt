<template lang="pug">
  .reco-wrapper.static-page-wrapper
    .reco-images
      //- .reco-image.reco-2016
      //-   img(
      //-     src="~@/assets/img/reco/reco-2016.png"
      //-   )
      //- .reco-image.reco-2017
      //-   img(
      //-     src="~@/assets/img/reco/reco-2017.png"
      //-   )
      .reco-image.reco-2018
        img(
          src="~@/assets/img/reco/reco-all.png"
        )
    .reco
      iframe(
        src="https://widget.reco.se/v2/widget/3999644?mode=HORIZONTAL_QUOTE"
        width="100%"
        height="225"
        scrolling="no"
        style="border:0; display:block;"
        data-reactroot=""
        id="recoIframe"
      )
      .reco-hack.reco-hack-top
      .reco-hack.reco-hack-right
      .reco-hack.reco-hack-bottom
      .reco-hack.reco-hack-left
</template>

<style lang="sass">
@import '~/assets/sass/components/Reco.sass'
</style>
