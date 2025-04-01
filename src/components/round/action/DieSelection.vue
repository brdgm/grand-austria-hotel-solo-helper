<template>
  <ActionBox :instructionTitle="t('rules.action.dieSelection.title')" :tieBreaker="botActions.tieBreaker">
    <template #action>
      <div class="action">
        <template v-for="(die,index) of dieSelection" :key="die">
          <div v-if="index > 0" class="separator">/</div>
          <AppIcon type="die-selection" :name="die" class="icon" :extension="getExtension(die)"/>
        </template>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.dieSelection.takeDie')"></p>
      <ul>
        <li v-html="t('rules.action.dieSelection.twoDice')"></li>
        <li v-html="t('rules.action.dieSelection.anyDie')"></li>
        <li v-html="t('rules.action.dieSelection.tieBreaker')"></li>
      </ul>
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
  },
  methods: {
    getExtension(die: DieSelection): string {
      return die === DieSelection.COLOR_MAX ? 'webp' : 'svg'
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  gap: 0.5rem;
  .icon {
    height: 2.5rem;
  }
  .separator {
    font-size: 25px;
  }
}
</style>
