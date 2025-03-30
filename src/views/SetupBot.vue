<template>
  <h1>{{t('setupBot.title', {deckType: t(`deckType.${deckType}`)})}}</h1>


  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import Expansion from '@/services/enum/Expansion'
import { useRouter } from 'vue-router'
import DeckType from '@/services/enum/DeckType'
import getMatchingDeckType from '@/util/getMatchingDeckType'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const state = useStateStore()
    return { t, router, state }
  },
  data() {
    return {
      showStartingSpace: false
    }
  },
  computed: {
    expansions() : Expansion[] {
      return this.state.setup.expansions
    },
    deckType() : DeckType {
      return getMatchingDeckType(this.expansions)
    }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      this.router.push('/round/1/turn/1')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
</style>
