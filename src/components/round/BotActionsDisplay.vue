<template>
  <h5 class="mt-3">{{t('turnBot.guest')}}</h5>
  <div class="actionList container-fluid">
    <div class="row" v-for="(guestSelection,index) in botActions.guestSelection" :key="index">
      <GuestSelectionDisplay :guestSelection="guestSelection" :botActions="botActions"/>
    </div>
  </div>
  <h5 class="mt-3">{{t('turnBot.die')}}</h5>
  <div class="actionList container-fluid">
    <div class="row">
      <DieSelectionDisplay :dieSelection="[...botActions.dieSelection]" :botActions="botActions"/>
    </div>
  </div>
  <h5 class="mt-3">{{t('turnBot.additionalAction')}}</h5>
  <div class="actionList container-fluid">
    <div class="row" v-for="(actionItem,index) in botActions.additionalAction" :key="index">
      <component :is="actionItem.action" :additionalAction="actionItem" :botActions="botActions"/>
    </div>
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
import DieSelectionDisplay from './action/DieSelection.vue'
import GuestSelectionDisplay from './action/GuestSelection.vue'

export default defineComponent({
  name: 'BotActionsDisplay',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    GuestSelectionDisplay,
    DieSelectionDisplay,
    ObjectiveCard,
    EmperorTrack,
    StaffCard
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
  }
})
</script>

<style lang="scss" scoped>
.actionList {
  display: flex;
  gap: 2.5rem;
}
</style>
