<template>
  <table>
    <tbody>
      <tr>
        <th scope="col">
        </th>
        <th scope="col">
          <span>{{t('endOfGame.player')}}</span>
        </th>
        <th scope="col">
          <span>{{t(`opponentName.${deckType}`)}}</span>
        </th>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.scoringTrack')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          {{toNumber(amount.scoringTrackVP[index-1])}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.staffCards')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          {{toNumber(amount.staffCardsVP[index-1])}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.occupiedRoomsLevel4')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          {{toNumber(amount.occupiedRoomsLevel4[index-1]) * 4}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.occupiedRoomsLevel3')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          {{toNumber(amount.occupiedRoomsLevel3[index-1]) * 3}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.occupiedRoomsLevel2')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          {{toNumber(amount.occupiedRoomsLevel2[index-1]) * 2}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.occupiedRoomsLevel1')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          {{toNumber(amount.occupiedRoomsLevel1[index-1]) * 1}}
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.money')"></span>
        </th>
        <td>
          {{toNumber(amount.money[0])}}
        </td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.dishesDrinks')"></span>
        </th>
        <td>
          {{toNumber(amount.dishesDrinks[0])}}
        </td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.remainingGuests')"></span>
        </th>
        <td>
          {{toNumber(amount.remainingGuests[0]) * -5}}
        </td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGame.total')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          <b>{{toNumber(totalVP[index-1])}}</b>
        </td>
      </tr>
    </tbody>
  </table>
  <p class="alert mt-4" :class="{'alert-success': isWinner, 'alert-danger': !isWinner}"
      v-html="t(`endOfGame.${isWinner ? 'won' : 'lost'}`)"></p>
</template>

<script lang="ts">
import { useStateStore, FinalScoringAmount } from '@/store/state'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import getMatchingDeckType from '@/util/getMatchingDeckType'

export default defineComponent({
  name: 'FinalScoring',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const deckType = getMatchingDeckType(state.setup.expansions)

    const playerCount = 2

    return { t, state, playerCount, deckType }
  },
  props: {
    amount: {
      type: Object as PropType<FinalScoringAmount>,
      required: true
    }
  },
  computed: {
    totalVP() : number[] {
      const result = []
      for (let i=0; i<this.playerCount; i++) {
        result[i] = this.toNumber(this.amount.scoringTrackVP[i])
            + this.toNumber(this.amount.staffCardsVP[i])
            + (this.toNumber(this.amount.occupiedRoomsLevel4[i]) * 4)
            + (this.toNumber(this.amount.occupiedRoomsLevel3[i]) * 3)
            + (this.toNumber(this.amount.occupiedRoomsLevel2[i]) * 2)
            + (this.toNumber(this.amount.occupiedRoomsLevel1[i]) * 1)
            + this.toNumber(this.amount.money[i])
            + this.toNumber(this.amount.dishesDrinks[i])
            + (this.toNumber(this.amount.remainingGuests[i]) * -5)
      }
      return result
    },
    isWinner() : boolean {
      return this.totalVP[0] > this.totalVP[1]
    }
  },
  methods: {
    toNumber(value? : number) {
      if (typeof value == 'string') {
        return 0
      }
      else {
        return value ?? 0
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.scoring-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  .finalResult {
    max-width: 500px;
    .totalVPPlayer {
      font-size: 40px;
      text-align: center;
    }
    th {
      color: darkgoldenrod;
    }
    .markScore {
      th, td {
        background-color: #cfc;
      }
    }
  }
}
.icon {
  height: 2.5rem;
  margin-right: 0.25rem;
  &.small {
    width: 2rem;
    height: 2rem;
  }
}
.table-wrapper {
  overflow-x: auto;
}
th, td {
  text-align: center;
  padding: 0.5rem;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th:nth-child(1) {
  font-weight: normal;
}
th {
  white-space: nowrap;
  vertical-align: middle;
}
</style>
