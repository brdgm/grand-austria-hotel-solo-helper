<template>
  <ActionBox :instructionTitle="t('rules.action.gainVp.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="objective-card" class="icon"/>
        <div class="value">{{additionalAction.objectiveCard}}</div>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.gainVp.instruction')"></p>
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
  name: 'ObjectiveCard',
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
    height: 3.5rem;
  }
}
</style>
