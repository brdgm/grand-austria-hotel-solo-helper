<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    {{t(`opponentName.${navigationState.deckType}`)}}
    <TurnOrderTilePair :navigationState="navigationState" :turn="turn"/>
  </h1>

  <BotActionsDisplay v-if="navigationState.botActions"
      :navigationState="navigationState" :botActions="navigationState.botActions"/>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { Turn, useStateStore } from '@/store/state'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/round/SideBar.vue'
import TurnOrderTilePair from '@/components/structure/TurnOrderTilePair.vue'
import DebugInfo from '@/components/round/DebugInfo.vue'
import BotActionsDisplay from '@/components/round/BotActionsDisplay.vue'
import RouteCalculator from '@/services/RouteCalculator'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    TurnOrderTilePair,
    BotActionsDisplay,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { round, turn } = navigationState

    return { t, router, state, navigationState, round, turn }
  },
  computed: {
    backButtonRouteTo() : string {
      const routeCalculator = new RouteCalculator({round:this.round, turn:this.turn, state:this.state})
      return routeCalculator.getBackRouteTo()
    }
  },
  methods: {
    next() : void {
      const turn : Turn = {
        round: this.round,
        turn: this.turn,
        cardDeck: this.navigationState.cardDeck.toPersistence()
      }
      this.state.storeTurn(turn)
      const routeCalculator = new RouteCalculator({round:this.round, turn:this.turn, state:this.state})
      this.router.push(routeCalculator.getNextRouteTo())
    }
  }
})
</script>
