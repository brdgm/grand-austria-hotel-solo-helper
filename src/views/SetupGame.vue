<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>
  <ExpansionsSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupBot()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    DifficultyLevel,
    ExpansionsSetup
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const state = useStateStore()
    return { t, router, state }
  },
  methods: {
    setupBot() : void {
      this.router.push('/round/1/start')
    }
  }
})
</script>
