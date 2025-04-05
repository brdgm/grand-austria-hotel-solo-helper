<template>
  <h1 class="mb-3">{{t('endOfGame.title')}}</h1>

  <h5>{{t('endOfGame.finalScoring')}}</h5>
  <ul>
    <li v-html="t('endOfGame.staffCards')"></li>
    <li v-html="t('endOfGame.occupiedRooms')"></li>
    <li v-html="t('endOfGame.moneyDishDrinks')"></li>
    <li v-html="t('endOfGame.remainingGuests')"></li>
    <ul>
      <li>
        <span class="fst-italic" v-html="t('rules.botUniqueHotel.hautel-couture.title')"></span>:
        <span v-html="t('rules.botUniqueHotel.hautel-couture.endOfGame')"></span>
      </li>
    </ul>
  </ul>
  <p class="fst-italic" v-html="t('endOfGame.winCondition')"></p>

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
