<template>
  <SideBar :navigationState="navigationState"/>

  <h1>{{t('roundEnd.title', {round})}}</h1>

  <ul class="mt-4">
    <li v-html="t('roundEnd.emperorScoring.title')"></li>
    <ul>
      <li v-html="t('roundEnd.emperorScoring.scoreVP')"></li>
      <li v-html="t('roundEnd.emperorScoring.resetMarkers', {steps:emperorResetTrackSteps})"></li>
      <li v-html="t('roundEnd.emperorScoring.gainBonusPenalty')"></li>
    </ul>
    <li v-html="t('roundEnd.swapTurnOrderTiles')"></li>
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
      return `/round/${this.round}/turn/4/${this.navigationState.previousPlayer}`
    },
    isEmperorScoring() : boolean {
      return this.round == 3 || this.round == 5 || this.round == 7
    },
    emperorResetTrackSteps() : number {
      if (this.isEmperorScoring) {
        return this.round
      }
      return 0
    }
  },
  methods: {
    next() : void {
      if (this.round == 7) {
        this.router.push(`/endOfGame`)
      }
      else {
        this.router.push(`/round/${this.round + 1}/start`)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
div > ul > li {
  margin-top: 0.5rem;
}
</style>
