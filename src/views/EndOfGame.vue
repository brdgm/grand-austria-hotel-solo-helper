<template>
  <h1 class="mb-3">{{t('endOfGame.title')}}</h1>

  <p class="fst-italic">TODO: Final Scoring</p>
  <ul>
    <li>Player/Opponent: You receive Victory Points for your Staff cards that provide them.</li>
    <li>Player/Opponent: You receive Victory Points for your occupied rooms: 1 Victory Point for each room in the fi rst row of your Hotel board, 2 Victory Points each in the second row, 3 Victory Points each in the third row, and 4 Victory Points each in the top row.</li>
    <li>Player: You receive 1 Victory Point for each krone and left over dish and drink in your Kitchen.</li>
    <li>Player: You lose 5 Victory Points for each guest in your Café.</li>
    <ul>
      <li>
        <span class="fst-italic" v-html="t('rules.botUniqueHotel.hautel-couture.title')"></span>:
        <span v-html="t('rules.botUniqueHotel.hautel-couture.endOfGame')"></span>
      </li>
    </ul>
  </ul>
  <p class="fst-italic">You win if you have more victory points than Leopold. Otherwise, Leopold wins.</p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import BotUniqueHotel from '@/services/enum/BotUniqueHotel'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    return { t, state, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/round/7/end'
    },
    isBotUniqueHotelHautelCouture() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.HAUTEL_COUTURE)
    },
  },
  methods: {
    isBotUniqueHotel(botUniqueHotel : BotUniqueHotel) : boolean {
      return this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS)
          &&  this.state.setup.botUniqueHotel == botUniqueHotel
    },
  }
})
</script>
