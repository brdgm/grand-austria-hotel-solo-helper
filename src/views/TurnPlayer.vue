<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    {{t('turnPlayer.title')}}
    <TurnOrderTilePair :navigationState="navigationState" :turn="navigationState.playerTurnOrderTileTurn ?? turn"/>
  </h1>

  <p v-if="turn > 4" class="mt-4 alert alert-primary" v-html="t('turnPlayer.removeDiceReroll')"></p>

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

  <button class="btn btn-success btn-lg mt-4 me-2" @click="next(false)">
    {{t('turnPlayer.executed')}}
  </button>
  <button class="btn btn-danger btn-lg mt-4" @click="next(true)">
    {{t('turnPlayer.pass')}}
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
import RouteCalculator from '@/services/RouteCalculator'

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
      const routeCalculator = new RouteCalculator({round:this.round, turn:this.turn, state:this.state})
      return routeCalculator.getBackRouteTo()
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
    next(pass: boolean) : void {
      const turn : Turn = {
        round: this.round,
        turn: this.turn,
        cardDeck: this.navigationState.cardDeck.toPersistence()
      }
      if (pass) {
        turn.pass = true
      }
      this.state.storeTurn(turn)
      const routeCalculator = new RouteCalculator({round:this.round, turn:this.turn, state:this.state})
      this.router.push(routeCalculator.getNextRouteTo())
    },
    isBotUniqueHotel(botUniqueHotel : BotUniqueHotel) : boolean {
      return this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS)
          &&  this.state.setup.botUniqueHotel == botUniqueHotel
    },
  }
})
</script>
