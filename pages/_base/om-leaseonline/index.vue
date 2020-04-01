<template lang="pug">
  div.static-page-wrapper
    .container
      h1.subpage-heading Om Leaseonline

      //- p.static-block
      //-   b Välkommen till Leaseonline!
      p.static-block Leaseonline AB startade 2014 och erbjuder online försäljning av nya fordon. Vi samarbetar med svenska märkesåterförsäljare som säkerställer trygga leveranser av våra fordon samt hjälper till att utföra kvalificerad underhållsservice.
      p.static-block Vi på Leaseonline tycker att både beställa och leva med sin bil skall vara enkelt och problemfritt. Vi har som målsättning att vara ett stöd för våra kunder genom att förenkla hela ägandet och ge dig som bilköpare möjligheten att tryggt kunna jämföra olika erbjudanden och beställa din bil i lugn och ro direkt online.

      p.static-block
        b Så här gör vi det:
      ul.static-list
        li.static-item – Vi erbjuder många märken och gör det enkelt att söka bland och jämföra bland massor av modeller och fordonstyper 
        li.static-item – Vi erbjuder fordon med modern finansiering
        li.static-item – Vi inkluderar alltid service samt erbjuder konkurrenskraftiga priser på försäkring och vinterhjul som tillval
        li.static-item – Vi gör det möjligt att beställa din nya bil snabbt, enkelt och tryggt online!

      p.static-block
        span Att använda Leaseonline innebär för dig som kund att:

        ul.static-list
          li.static-item – Du slipper lägga timmar eller dagar på att samla information och ta reda på totalkostnader för olika märken och modeller

          li.static-item – Du kan i lugn och ro tryggt beställa ditt fordon direkt via vår webbtjänst
          li.static-item – Väljer du privatleasing får du en modern och flexibel finansiering utan kontantinsats eller deposition och du slipper oroa dig för vad bilens service kommer att kosta så länge du kör den
          li.static-item – Du slipper bekymra dig för andrahandsvärden och besvär med att sälja bilen
          li.static-item – Du får ett modernt och bekymmersfritt ägande med en förutsägbar kostnadsbudget

      p.static-block
        | Läs gärna vad våra kunder tycker om oss på
        a(href="https://www.reco.se/leaseonline-stockholm") Reco!

      p.static-block 
        b Vid frågor, vänligen maila på
          a(href="mailto:info@leaseonline.se") info@leaseonline.se
          | eller kontakta vår kundtjänst på tel
          a(href="tel:0200210320") 0200-210 320 
          | alternativt:

      p.static-block 
        span Sverker Andersson, VD
        br
        span E.post: 
          a(href="mailto:sverker.andersson@leaseonline.se") sverker.andersson@leaseonline.se
        br
        span Tel: 
          a(href="tel:0762701099") 0762-701 099
        
      p.static-block eller

      p.static-block 
        span Sverker Carlsson, Affärsutveckling
        br
        span E.post: 
          a(href="mailto:sverker.carlsson@leaseonline.se") sverker.carlsson@leaseonline.se
        br
        span Tel: 
          a(href="tel: 0708577735") 0708-577 735

      p.static-block eller

      p.static-block 
        span Linda Kolmodin, Marknadschef
        br
        span E.post: 
          a(href="mailto:linda@leaseonline.se") linda@leaseonline.se
        br
        span Tel: 
          a(href="tel: 0737490900") 0737-490 900

      p.static-block 
        span Adress: 
        br
        span Leaseonline Sweden AB
        br
        span Office Room, Alströmergatan 22, 112 47 Stockholm

</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Helper from '~/mixins/Helper'

export default {
  mixins: [Helper],
  data: () => ({
    metaDescription:
      'Leaseonline AB startade 2014 och erbjuder online försäljning av nya bilar på privatleasing. Vi samarbetar med utvalda svenska ...',
    metaTitle: 'Leaseonline - Om Leaseonline.se'
  }),
  computed: {
    ...mapGetters({
      style: 'reseller/getSiteStyle'
    })
  },
  mounted() {
    this.setIsHomePage(false)
  },
  methods: {
    ...mapMutations('settings', ['setIsHomePage'])
  },
  head() {
    return this.metaData({
      title: this.metaTitle,
      logo: this.style.logoFont.favicon,
      description: this.metaDescription
    })
  }
}
</script>

<style lang="sass">
.support
  &-center
    margin: 40px 0 0
    padding: 80px 0
    background: #008C7D
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

  &-center-title
    font-size: 42px
    font-weight: 300
    text-align: center
    margin-bottom: 40px
    text-transform: none
    color: #fff
    line-height: 130%

.bigger
  padding: 15px 40px
  font-size: 18px

p, li
  margin-top: 0
  font-size: 16px
  font-weight: 100
  line-height: 150%
  color: #515255

ul, li
  list-style: none
  color: #515255

a
  color: #44b37e

a.round-btn
  color: #fff
</style>
