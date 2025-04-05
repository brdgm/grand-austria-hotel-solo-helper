<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <div class="debug">
      <div v-if="cardDeck.currentCard"><b>currentCard:</b>: {{cardDeck.currentCard}}</div>
      <div><b>cardDeck</b>: {{cardDeck.toPersistence()}}</div>
      <div><b>difficultyLevel</b>: {{state.setup.difficultyLevel}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import CardDeck from '@/services/CardDeck';

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const state = useStateStore()
    return { state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    cardDeck(): CardDeck {
      return this.navigationState.cardDeck
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
p.debug, ul.debug {
  margin: 0;
}
</style>
