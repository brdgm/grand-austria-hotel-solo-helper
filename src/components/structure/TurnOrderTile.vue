<template>
  <div class="tile" :class="{active}">
    <div>
      <span class="no">№</span>
      <span class="number">{{value}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TurnOrderTile',
  props: {
    value: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>
.tile {
  display: inline-flex;
  width: 45px;
  height: 45px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border: 2px solid #000;
  border-radius: 10px;
  padding-bottom: 4px;
  font-size: 1rem;
  font-weight: normal;
  .number {
    margin-left: 2px;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    -webkit-text-stroke: #000 1px;
  }
  &.active {
    background-color: #b8bda1;
  }
}
</style>
