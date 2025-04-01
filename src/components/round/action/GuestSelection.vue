<template>
  <ActionBox :instructionTitle="t('rules.action.guestSelection.title')" :tieBreaker="botActions.tieBreaker" :modalSizeLg="true">
    <template #action>
      <div class="action">
        <AppIcon type="guest-category" :name="guestSelection.guestCategory" class="icon"/>
        <AppIcon v-if="guestSelection.ballroomSelection" type="ballroom-selection" :name="guestSelection.ballroomSelection" class="ballroomSelectionIcon"/>
      </div>
    </template>
    <template #instruction>
      <h6>{{t('rules.action.guestSelection.select.title')}}</h6>
      <ul>
        <li v-html="t('rules.action.guestSelection.select.takeGuest')"></li>
        <li v-html="t('rules.action.guestSelection.select.multipleGuests')"></li>
        <li v-html="t('rules.action.guestSelection.select.noSuchGuest')"></li>
        <li v-html="t('rules.action.guestSelection.select.allRooms')"></li>
        <li v-html="t('rules.action.guestSelection.select.tieBreaker')"></li>
      </ul>
      <p v-html="t('rules.action.guestSelection.select.noGuest')"></p>
      <template v-if="!guestSelection.ballroomSelection">
        <h6>{{t('rules.action.guestSelection.accommodate.title')}}</h6>
        <p v-html="t('rules.action.guestSelection.accommodate.takeGuest')"></p>
        <ul>
          <li v-html="t('rules.action.guestSelection.accommodate.allRoomsPrepared')"></li>
          <li v-html="t('rules.action.guestSelection.accommodate.noAdjacencyRule')"></li>
          <ul>
            <li>
              <AppIcon type="room-direction" name="row-bottom" class="roomDirectionIcon"/>
              <span v-html="t('rules.action.guestSelection.accommodate.blueRedYellowGuest')"></span>
            </li>
            <li>
              <AppIcon type="room-direction" name="column-last" class="roomDirectionIcon"/>
              <span v-html="t('rules.action.guestSelection.accommodate.greenGuest')"></span>
            </li>
          </ul>
          <li v-html="t('rules.action.guestSelection.accommodate.spaceVP')"></li>
          <li v-html="t('rules.action.guestSelection.accommodate.noRoomCost')"></li>
          <li v-html="t('rules.action.guestSelection.accommodate.noOccupancyBonus')"></li>
          <li v-html="t('rules.action.guestSelection.accommodate.noReward')"></li>
        </ul>
        <p v-html="t('rules.action.guestSelection.accommodate.discardGuest')"></p>
      </template>
      <template v-else>
        <h6>{{t('rules.action.guestSelection.placeDancer.title')}}</h6>
        <ul>
          <li v-html="t('rules.action.guestSelection.placeDancer.scoreVpDiscard')"></li>
          <li v-html="t('rules.action.guestSelection.placeDancer.placeDancer')"></li>
          <ul>
            <li>
              <AppIcon type="ballroom-selection" :name="guestSelection.ballroomSelection" class="ballroomSelectionRulesIcon"/>
              <span v-html="t(`rules.action.guestSelection.placeDancer.ballroomSelection.${guestSelection.ballroomSelection}`)"></span>
            </li>
          </ul>
          <li v-html="t('rules.action.guestSelection.placeDancer.noChampagneNoBonus')"></li>
          <li v-html="t('rules.action.guestSelection.placeDancer.noRoomTile')"></li>
        </ul>
      </template>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '../ActionBox.vue'
import AppIcon from '../../structure/AppIcon.vue'
import { GuestSelection } from '@/services/Card'
import BotActions from '@/services/BotActions'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'GuestSelection',
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    guestSelection: {
      type: Object as PropType<GuestSelection>,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  .icon {
    height: 3.5rem;
  }
  .ballroomSelectionIcon {
    height: 4.5rem;
    margin-left: -1.25rem;
  }
}
.roomDirectionIcon {
  width: 2.5rem;
  height: 2rem;
  object-fit: contain;
  float: right;
  margin-left: 1rem;
}
.ballroomSelectionRulesIcon {
  float: right;
  height: 4.5rem;
  margin-left: 0.5rem;
}
</style>
