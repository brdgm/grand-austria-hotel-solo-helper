<template>
  <SideBar :navigationState="navigationState"/>

  <h1>{{t('turnPlayer.title')}}</h1>

  <TurnOrderTilePair :turn="turn"/>

  <p class="mt-4" v-html="t('turnPlayer.takeYourTurn')"></p>

  <p v-if="isBotUniqueHotelHautelCouture">
    <span class="fst-italic" v-html="t('rules.botUniqueHotel.hautel-couture.title')"></span>:
    <span v-html="t('rules.botUniqueHotel.hautel-couture.turnPlayer')"></span>
  </p>
  <p v-if="isBotUniqueHotelNineStarsInn">
    <span class="fst-italic" v-html="t('rules.botUniqueHotel.nine-stars-inn.title')"></span>:
    <span v-html="t('rules.botUniqueHotel.nine-stars-inn.turnPlayer')"></span>
  </p>
  <p v-if="isBotUniqueHotelSushiResort">
    <span class="fst-italic" v-html="t('rules.botUniqueHotel.sushi-resort.title')"></span>:
    <span v-html="t('rules.botUniqueHotel.sushi-resort.turnPlayer')"></span><br/>
    <span v-html="t('rules.botUniqueHotel.sushi-resort.guestCogwheelScoring')"></span>
  </p>
  <p v-if="isBotUniqueHotelTollBridgeHotel">
    <span class="fst-italic" v-html="t('rules.botUniqueHotel.toll-bridge-hotel.title')"></span>:
    <span v-html="t('rules.botUniqueHotel.toll-bridge-hotel.turnPlayer')"></span>
  </p>

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
import { Turn, useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import SideBar from '@/components/round/SideBar.vue'
import TurnOrderTilePair from '@/components/structure/TurnOrderTilePair.vue'
import Expansion from '@/services/enum/Expansion'
import BotUniqueHotel from '@/services/enum/BotUniqueHotel'

export default defineComponent({
  name: 'TurnPlayer',
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
    },
    isBotUniqueHotelHautelCouture() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.HAUTEL_COUTURE)
    },
    isBotUniqueHotelNineStarsInn() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.NINE_STARS_INN)
    },
    isBotUniqueHotelSushiResort() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.SUSHI_RESORT)
    },
    isBotUniqueHotelTollBridgeHotel() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.TOLL_BRIDGE_HOTEL)
    },
  },
  methods: {
    next() : void {
      const turn : Turn = {
        round: this.round,
        turn: this.turn,
        cardDeck: this.navigationState.cardDeck.toPersistence()
      }
      this.state.storeTurn(turn)
      if (this.turn == 4) {
        this.router.push(`/round/${this.round}/end`)
      }
      else {
        this.router.push(`/round/${this.round}/turn/${this.turn+1}/${this.navigationState.nextPlayer}`)
      }
    },
    isBotUniqueHotel(botUniqueHotel : BotUniqueHotel) : boolean {
      return this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS)
          &&  this.state.setup.botUniqueHotel == botUniqueHotel
    },
  }
})
</script>
