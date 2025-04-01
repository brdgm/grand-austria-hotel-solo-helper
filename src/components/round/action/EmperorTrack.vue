<template>
  <ActionBox :instructionTitle="t('rules.action.emperorTrack.title')">
    <template #action>
      <div class="action">
        <div class="steps">+{{additionalAction.emperorTrackSteps}}</div>
        <AppIcon type="action" name="emperor-track" class="icon"/>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.emperorTrack.advance')"></p>
      <p v-html="t('rules.action.emperorTrack.scoreVP')"></p>
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
  name: 'EmperorTrack',
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
  display: flex;
  gap: 0.25rem;
  .steps {
    font-size: 30px;
    letter-spacing: -0.2rem;
    padding-top: 0.2rem;
  }
  .icon {
    height: 3.5rem;
  }
}
</style>
