<template>
  <h1>{{t('endOfGameAmounts.title')}}</h1>

  <FinalAmounts/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import FinalAmounts from '@/components/scoring/FinalAmounts.vue'
import { useStateStore } from '@/store/state'

export default defineComponent({
  name: 'EndOfGameAmounts',
  components: {
    FooterButtons,
    FinalAmounts
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    backButtonRouteTo() : string {
      return '/round/7/end'
    }
  }
})
</script>
