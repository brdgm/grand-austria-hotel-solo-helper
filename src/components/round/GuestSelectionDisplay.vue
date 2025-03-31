<template>
  <ActionBox :instructionTitle="t('rules.action.gainVp.title')">
    <template #action>
      <div class="action">
        <AppIcon type="guest-category" :name="guestSelection.guestCategory" class="icon"/>
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
import ActionBox from './ActionBox.vue'
import AppIcon from '../structure/AppIcon.vue'
import { GuestSelection } from '@/services/Card'

export default defineComponent({
  name: 'GuestSelectionDisplay',
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    guestSelection: {
      type: Object as PropType<GuestSelection>,
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
