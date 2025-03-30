<template>
  <SideBar :navigationState="navigationState"/>

  <h1>{{t(`opponentName.${navigationState.deckType}`)}}</h1>

  <TurnOrderTilePair :turn="turn"/>

  <p>...</p>

  <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/round/SideBar.vue'
import TurnOrderTilePair from '@/components/structure/TurnOrderTilePair.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    TurnOrderTilePair
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
      if (this.turn > 1) {
        return `/round/${this.round}/turn/${this.turn-1}/${this.navigationState.previousPlayer}`
      }
      return `/round/${this.round}/start`
    }
  },
  methods: {
    next() : void {
      if (this.turn == 4) {
        this.router.push(`/round/${this.round}/end`)
      }
      else {
        this.router.push(`/round/${this.round}/turn/${this.turn+1}/${this.navigationState.nextPlayer}`)
      }
    }
  }
})
</script>
