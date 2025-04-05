<template>
  <SideBar :navigationState="navigationState"/>

  <h1>{{t('roundStart.title', {round})}}</h1>

  <ul class="mt-4">
    <li v-html="t('roundStart.rollDice')"></li>
    <li v-if="isBotUniqueHotelHautelCouture && round > 1">
      <span class="fst-italic" v-html="t('rules.botUniqueHotel.hautel-couture.title')"></span>:
      <span v-html="t('rules.botUniqueHotel.hautel-couture.roundStart')"></span>
    </li>
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

export default defineComponent({
  name: 'RoundStart',
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
      if (this.round > 1) {
        return `/round/${this.round - 1}/end`
      }
      return ''
    },
    isBotUniqueHotelHautelCouture() : boolean {
      return this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS)
          &&  this.state.setup.botUniqueHotel == BotUniqueHotel.HAUTEL_COUTURE
    },
  },
  methods: {
    next() : void {
      this.router.push(`/round/${this.round}/turn/1/${this.navigationState.nextPlayer}`)
    }
  }
})
</script>

<style lang="scss" scoped>
ul > li {
  margin-top: 0.5rem;
}
</style>
