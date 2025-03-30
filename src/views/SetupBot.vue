<template>
  <h1>{{t('setupBot.title', {opponentName: t(`opponentName.${deckType}`)})}}</h1>

  <div class="instructions mt-3">
    <p v-html="t('setupBot.setup2Players')"></p>
    <ol>
      <li v-html="t('setupBot.turnOrderTile')"></li>
      <li v-html="t('setupBot.hotelBoardSide')"></li>
      <li v-html="t('setupBot.moneyTrack')"></li>
      <li v-html="t('setupBot.itemsKitchen')"></li>
      <li v-html="t('setupBot.botStaffCards')"></li>
      <li v-html="t('setupBot.playerStaffCards')"></li>
      <li v-html="t('setupBot.initialGuestRooms')"></li>
    </ol>
    <template v-if="hasViennaBallrooms">
      <h4>{{t('setupBot.viennaBallrooms.title')}}</h4>
      <ol>
        <li v-html="t('setupBot.viennaBallrooms.rehearsalRoomBoardPlayer')"></li>
        <li v-html="t('setupBot.viennaBallrooms.rehearsalRoomBoardBot')"></li>
        <li v-html="t('setupBot.viennaBallrooms.noChampagne')"></li>
      </ol>
    </template>
    <template v-if="hasUniqueHotels">
      <h4>{{t('setupBot.uniqueHotels.title')}}</h4>
      <ol>
        <li v-html="t('setupBot.uniqueHotels.hotelEntranceBot', {hotelEntrance:t(`botUniqueHotel.${state.setup.botUniqueHotel}.title`)})"></li>
        <template v-if="isBotUniqueHotelHautelCouture">
          <ol type="a">
            <li v-html="t('botUniqueHotel.hautel-couture.setup.drawGuests')"></li>
            <li v-html="t('botUniqueHotel.hautel-couture.setup.placeVacantRooms')"></li>
            <li v-html="t('botUniqueHotel.hautel-couture.setup.prepareItemPool')"></li>
            <li v-html="t('botUniqueHotel.hautel-couture.setup.placeItems')"></li>
          </ol>
        </template>
        <template v-if="isBotUniqueHotelNineStarsInn">
          <ul>
            <li v-html="t('botUniqueHotel.nine-stars-inn.setup.objectiveCard')"></li>
          </ul>
          <img src="@/assets/bot-unique-hotel/nine-stars-inn-setup.webp" alt="" class="setupImage"/>
        </template>
        <template v-if="isBotUniqueHotelSushiResort">
          <ul>
            <li v-html="t('botUniqueHotel.sushi-resort.setup.placeCogwheelTokens')"></li>
            <ul>
              <li v-html="t('botUniqueHotel.sushi-resort.setup.floor1')"></li>
              <li v-html="t('botUniqueHotel.sushi-resort.setup.floor2')"></li>
              <li v-html="t('botUniqueHotel.sushi-resort.setup.floor3')"></li>
            </ul>
          </ul>
          <img src="@/assets/bot-unique-hotel/sushi-resort-setup.webp" alt="" class="setupImage"/>
        </template>
        <template v-if="isBotUniqueHotelTollBridgeHotel">
          <ul>
            <li v-html="t('botUniqueHotel.toll-bridge-hotel.setup.none')"></li>
          </ul>
        </template>
        <li v-html="t('setupBot.uniqueHotels.hotelEntrancePlayer')"></li>
        <li v-html="t('setupBot.uniqueHotels.startingMoneyPlayer')"></li>
      </ol>
    </template>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import Expansion from '@/services/enum/Expansion'
import { useRouter } from 'vue-router'
import DeckType from '@/services/enum/DeckType'
import getMatchingDeckType from '@/util/getMatchingDeckType'
import BotUniqueHotel from '@/services/enum/BotUniqueHotel'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const state = useStateStore()
    return { t, router, state }
  },
  data() {
    return {
      showStartingSpace: false
    }
  },
  computed: {
    expansions() : Expansion[] {
      return this.state.setup.expansions
    },
    deckType() : DeckType {
      return getMatchingDeckType(this.expansions)
    },
    hasViennaBallrooms() : boolean {
      return this.expansions.includes(Expansion.LETS_WALTZ_MODULE_1_VIENNA_BALLROOMS)
    },
    hasUniqueHotels() : boolean {
      return this.expansions.includes(Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS)
    },
    isBotUniqueHotelHautelCouture() : boolean {
      return this.state.setup.botUniqueHotel == BotUniqueHotel.HAUTEL_COUTURE
    },
    isBotUniqueHotelNineStarsInn() : boolean {
      return this.state.setup.botUniqueHotel == BotUniqueHotel.NINE_STARS_INN
    },
    isBotUniqueHotelSushiResort() : boolean {
      return this.state.setup.botUniqueHotel == BotUniqueHotel.SUSHI_RESORT
    },
    isBotUniqueHotelTollBridgeHotel() : boolean {
      return this.state.setup.botUniqueHotel == BotUniqueHotel.TOLL_BRIDGE_HOTEL
    },
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      this.router.push('/round/1/turn/1')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  & > ol > li {
    margin-top: 0.5rem;
  }
  .setupImage {
    display: block;
    margin-top: 0.5rem;
    margin-left: 1rem;
    height: 10rem;
    max-width: 100%;
    object-fit: contain;
  }
}
</style>
