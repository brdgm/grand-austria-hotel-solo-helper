<template>
  <CommonsFooterButtons :backLabel="t('action.back')" :backButtonRouteTo="backButtonRouteTo"
        :endGameLabel="t('action.'+endGameButtonType)" :endGameConfirmMessage="t(`action.${endGameButtonType}Confirm`)" :cancelLabel="t('action.cancel')" @endGame="endGame" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CommonsFooterButtons from '@brdgm/brdgm-commons/src/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'FooterButtons',
  components: {
    CommonsFooterButtons
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const state = useStateStore()
    return { t, router, state }
  },
  props: {
    endGameButtonType: {
      type: String,  /* Type of end game button <X> (i18n action.<X> and action.<X>Confirm needs to be present); button is hidden when not set */
      required: false
    },
    backButtonRouteTo: {
      type: String,  /* router-link to */
      required: false
    },
  },
  methods: {
    endGame() {
      this.state.resetGame()
      this.router.push('/')
    }
  }})
</script>
