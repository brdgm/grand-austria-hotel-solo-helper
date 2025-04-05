<template>
  <ActionBox :instructionTitle="t('rules.action.placeDancer.title')" :tieBreaker="botActions.tieBreaker">
    <template #action>
      <div class="action">
        <AppIcon v-if="additionalAction.ballroomSelection" type="ballroom-selection" :name="additionalAction.ballroomSelection" class="icon"/>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.placeDancer.placeDancer')"></p>
      <ul v-if="additionalAction.ballroomSelection">
        <li>
          <AppIcon type="ballroom-selection" :name="additionalAction.ballroomSelection" class="ballroomSelectionRulesIcon"/>
          <span v-html="t(`rules.action.guestSelection.placeDancer.ballroomSelection.${additionalAction.ballroomSelection}`)"></span>
        </li>
      </ul>
      <p v-html="t('rules.action.guestSelection.placeDancer.noChampagneNoBonus')"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '../ActionBox.vue'
import AppIcon from '../../structure/AppIcon.vue'
import { AdditionalAction } from '@/services/Card'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'PlaceDancer',
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    additionalAction: {
      type: Object as PropType<AdditionalAction>,
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
    height: 4.5rem;
  }
}
.ballroomSelectionRulesIcon {
  float: right;
  height: 4.5rem;
  margin-left: 0.5rem;
}
</style>
