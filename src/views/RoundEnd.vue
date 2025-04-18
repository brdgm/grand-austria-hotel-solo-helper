<template>
  <SideBar :navigationState="navigationState"/>

  <h1>{{t('roundEnd.title', {round})}}</h1>

  <ul class="mt-4">
    <li v-if="hasCelebritiesExpansion && !isLastRound" v-html="t('roundEnd.celebrities')"></li>
    <template v-if="isEmperorScoring">
      <li v-html="t('roundEnd.emperorScoring.title')"></li>
      <ul>
        <li v-html="t('roundEnd.emperorScoring.scoreVP')"></li>
        <li v-html="t('roundEnd.emperorScoring.resetMarkers', {steps:emperorResetTrackSteps})"></li>
        <li v-html="t('roundEnd.emperorScoring.gainBonusPenalty')"></li>
      </ul>
    </template>
    <li v-if="isBotUniqueHotelNineStarsInn && isEmperorScoring">
      <span class="fst-italic" v-html="t('rules.botUniqueHotel.nine-stars-inn.title')"></span>:
      <span v-html="t('rules.botUniqueHotel.nine-stars-inn.emperorScoring')"></span>
    </li>
    <li v-if="hasViennaBallroomsExpansion && isEmperorScoring" v-html="t('roundEnd.viennaBallrooms')"></li>
    <li v-if="!isLastRound" v-html="t('roundEnd.swapTurnOrderTiles')"></li>
  </ul>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/round/SideBar.vue'
import Expansion from '@/services/enum/Expansion'
import BotUniqueHotel from '@/services/enum/BotUniqueHotel'
import RouteCalculator from '@/services/RouteCalculator'

export default defineComponent({
  name: 'RoundEnd',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round } = navigationState

    return { t, router, state, navigationState, round }
  },
  computed: {
    backButtonRouteTo() : string {
      const routeCalculator = new RouteCalculator({round:this.round, state:this.state})
      return routeCalculator.getLastTurnRouteTo()
    },
    isLastRound() : boolean {
      return this.round == 7
    },
    isEmperorScoring() : boolean {
      return this.round == 3 || this.round == 5 || this.round == 7
    },
    emperorResetTrackSteps() : number {
      if (this.isEmperorScoring) {
        return this.round
      }
      return 0
    },
    hasViennaBallroomsExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_1_VIENNA_BALLROOMS)
    },
    hasCelebritiesExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_2_CELEBRITIES)
    },
    isBotUniqueHotelNineStarsInn() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.NINE_STARS_INN)
    },
  },
  methods: {
    next() : void {
      if (this.round == 7) {
        this.router.push('/endOfGameAmounts')
      }
      else {
        this.router.push(`/round/${this.round + 1}/start`)
      }
    },
    isBotUniqueHotel(botUniqueHotel : BotUniqueHotel) : boolean {
      return this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS)
          &&  this.state.setup.botUniqueHotel == botUniqueHotel
    },
  }
})
</script>

<style lang="scss" scoped>
div > ul > li {
  margin-top: 0.5rem;
}
</style>
