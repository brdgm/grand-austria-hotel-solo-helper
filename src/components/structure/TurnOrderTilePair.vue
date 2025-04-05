<template>
  <div class="tiles">
    <TurnOrderTile v-for="t of turns" :key="t" :value="t" :active="t==turn"/>
  </div>
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

<style lang="scss" scoped>
.tiles {
  display: inline-flex;
  gap: 6px;
  transform: translateY(-5px);
}
</style>
