<template>
  <TurnOrderTile v-for="t of turns" :key="t" :value="t" :active="t==turn"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TurnOrderTile from './TurnOrderTile.vue'

export default defineComponent({
  name: 'TurnOrderTilePair',
  components: {
    TurnOrderTile
  },
  props: {
    turn: {
      type: Number,
      required: true
    }
  },
  computed: {
    turns() : number[] {
      if (this.turn == 1 || this.turn == 4) {
        return [1,4]
      }
      else {
        return [2,3]
      }
    }
  }
})
</script>
