<template>
  <ActionBox :instructionTitle="t('rules.action.staffCard.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="staff-card" class="icon"/>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.staffCard.drawCard')"></p>
      <p v-html="t('rules.action.staffCard.finalScoring')"></p>
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
  name: 'StaffCard',
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
</style>
