<template>
  <ActionBox :instructionTitle="t('rules.action.dieSelection.title')">
    <template #action>
      <div class="action">
        <AppIcon v-for="die of dieSelection" :key="die" type="die-selection" :name="die" class="icon" extension="svg"/>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.dieSelection.instruction')"></p>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '../ActionBox.vue'
import AppIcon from '../../structure/AppIcon.vue'
import DieSelection from '@/services/enum/DieSelection'
import BotActions from '@/services/BotActions'

export default defineComponent({
  name: 'DieSelectionDisplay',
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    dieSelection: {
      type: Array as PropType<DieSelection[]>,
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
