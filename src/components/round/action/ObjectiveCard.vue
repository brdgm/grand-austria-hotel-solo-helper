<template>
  <ActionBox :instructionTitle="t('rules.action.objectiveCard.title')" :tieBreaker="botActions.tieBreaker">
    <template #action>
      <div class="action">
        <AppIcon type="action" name="objective-card" class="icon"/>
        <div v-if="additionalAction.objectiveCard" class="cardNo">{{getCardNo(additionalAction.objectiveCard)}}</div>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.objectiveCard.checkCard')"></p>
      <ul>
        <li v-html="t('rules.action.objectiveCard.hasMarker')"></li>
        <li v-html="t('rules.action.objectiveCard.noMarker')"></li>
      </ul>
      <p v-html="t('rules.action.objectiveCard.anyCard')"></p>
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
import ObjectiveCard from '@/services/enum/ObjectiveCard'

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
  },
  methods: {
    getCardNo(objectiveCard: ObjectiveCard) : string {
      if (objectiveCard == ObjectiveCard.ANY) {
        return '?'
      }
      return objectiveCard
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  position: relative;
  .icon {
    height: 4.5rem;
  }
  .cardNo {
    position: absolute;
    left: 0px;
    top: 9px;
    width: 2.9rem;
    font-size: 35px;
    text-align: center;
  }
}
</style>
