<template>
  <h1>{{t('setup.title')}}</h1>

  <DifficultyLevel/>
  <ExpansionsSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupBot()" data-testid="setupBotButton">
    {{t('setupBot.title', {opponentName: t(`opponentName.${deckType}`)})}}
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
import DeckType from '@/services/enum/DeckType'
import getMatchingDeckType from '@/util/getMatchingDeckType'
import Expansion from '@/services/enum/Expansion'
import randomEnum from '@brdgm/brdgm-commons/src/util/random/randomEnum'
import BotUniqueHotel from '@/services/enum/BotUniqueHotel'

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
  computed: {
    deckType() : DeckType {
      return getMatchingDeckType(this.state.setup.expansions)
    }
  },
  methods: {
    setupBot() : void {
      if (this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS)
        && this.state.setup.botUniqueHotel == undefined) {
        this.state.setup.botUniqueHotel = randomEnum(BotUniqueHotel)
      }
      this.router.push('/setupBot')
    }
  }
})
</script>
