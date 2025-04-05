<template>
  <h5 class="mt-3">{{t('turnBot.guest')}}</h5>
  <div class="actionList container-fluid">
    <div class="row" v-for="(guestSelection,index) in botActions.guestSelection" :key="index">
      <GuestSelection :guestSelection="guestSelection" :botActions="botActions"/>
    </div>
  </div>
  <p class="mt-4" v-if="isBotUniqueHotelSushiResort">
    <span class="fst-italic" v-html="t('rules.botUniqueHotel.sushi-resort.title')"></span>:
    <span v-html="t('rules.botUniqueHotel.sushi-resort.turnBot')"></span><br/>
    <span v-html="t('rules.botUniqueHotel.sushi-resort.guestCogwheelScoring')"></span>
  </p>

  <h5 class="mt-3">{{t('turnBot.die')}}</h5>
  <div class="actionList container-fluid">
    <div class="row">
      <DieSelection :dieSelection="[...botActions.dieSelection]" :botActions="botActions"/>
    </div>
  </div>
  <p class="mt-4" v-if="isBotUniqueHotelTollBridgeHotel">
    <span class="fst-italic" v-html="t('rules.botUniqueHotel.toll-bridge-hotel.title')"></span>:
    <span v-html="t('rules.botUniqueHotel.toll-bridge-hotel.turnBot')"></span><br/>
  </p>

  <h5 class="mt-3">{{t('turnBot.additionalAction')}}</h5>
  <div class="actionList container-fluid">
    <div class="row" v-for="(actionItem,index) in botActions.additionalAction" :key="index">
      <component :is="actionItem.action" :additionalAction="actionItem" :botActions="botActions"/>
    </div>
  </div>
  <div class="mt-4" v-if="isBotUniqueHotelNineStarsInnAndObjectiveCard">
    <img src="@/assets/bot-unique-hotel/nine-stars-inn-example.webp" alt="" class="exampleImage"/>
    <p>
      <span class="fst-italic" v-html="t('rules.botUniqueHotel.nine-stars-inn.title')"></span>:
      <span v-html="t('rules.botUniqueHotel.nine-stars-inn.turnBot')"></span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import BotActions from '@/services/BotActions'
import ObjectiveCard from './action/ObjectiveCard.vue'
import EmperorTrack from './action/EmperorTrack.vue'
import StaffCard from './action/StaffCard.vue'
import DieSelection from './action/DieSelection.vue'
import GuestSelection from './action/GuestSelection.vue'
import PlaceDancer from './action/PlaceDancer.vue'
import BotUniqueHotel from '@/services/enum/BotUniqueHotel'
import Expansion from '@/services/enum/Expansion'
import { useStateStore } from '@/store/state'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'BotActionsDisplay',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  components: {
    GuestSelection,
    DieSelection,
    ObjectiveCard,
    EmperorTrack,
    StaffCard,
    PlaceDancer
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    }
  },
  computed: {
    isBotUniqueHotelNineStarsInnAndObjectiveCard() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.NINE_STARS_INN)
          && this.navigationState.botActions?.additionalAction.find(item => item.action == Action.OBJECTIVE_CARD) != undefined
    },
    isBotUniqueHotelSushiResort() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.SUSHI_RESORT)
    },
    isBotUniqueHotelTollBridgeHotel() : boolean {
      return this.isBotUniqueHotel(BotUniqueHotel.TOLL_BRIDGE_HOTEL)
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

<style lang="scss" scoped>
.actionList {
  display: flex;
  gap: 2.5rem;
}
.exampleImage {
  display: block;
  height: 7rem;
  max-width: 100%;
  object-fit: contain;
  @media (min-width: 450px) {
    float: right;
    margin-left: 1rem;
  }
}
</style>
