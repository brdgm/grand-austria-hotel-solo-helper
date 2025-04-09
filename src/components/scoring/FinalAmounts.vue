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
          <span v-html="t('endOfGameAmounts.scoringTrack')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          <ScoringTextInput v-model="amount.scoringTrackVP[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGameAmounts.staffCards')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          <ScoringTextInput v-model="amount.staffCardsVP[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGameAmounts.occupiedRoomsLevel4')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          <ScoringTextInput v-model="amount.occupiedRoomsLevel4[index-1]" :max="5"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGameAmounts.occupiedRoomsLevel3')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          <ScoringTextInput v-model="amount.occupiedRoomsLevel3[index-1]" :max="5"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGameAmounts.occupiedRoomsLevel2')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          <ScoringTextInput v-model="amount.occupiedRoomsLevel2[index-1]" :max="5"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGameAmounts.occupiedRoomsLevel1')"></span>
        </th>
        <td v-for="index in playerCount" :key="index">
          <ScoringTextInput v-model="amount.occupiedRoomsLevel1[index-1]" :max="5"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGameAmounts.money')"></span>
        </th>
        <td>
          <ScoringTextInput v-model="amount.money[0]" :max="20"/>
        </td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGameAmounts.dishesDrinks')"></span>
        </th>
        <td>
          <ScoringTextInput v-model="amount.dishesDrinks[0]"/>
        </td>
        <td></td>
      </tr>
      <tr>
        <th scope="row">
          <span v-html="t('endOfGameAmounts.remainingGuests')"></span>
        </th>
        <td>
          <ScoringTextInput v-model="amount.remainingGuests[0]" :max="4"/>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

</template>

<script lang="ts">
import { useStateStore, FinalScoringAmount } from '@/store/state'
import getMatchingDeckType from '@/util/getMatchingDeckType'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ScoringTextInput from '@brdgm/brdgm-commons/src/components/form/ScoringTextInput.vue'

export default defineComponent({
  name: 'FinalAmounts',
  components: {
    ScoringTextInput
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()
    const deckType = getMatchingDeckType(state.setup.expansions)

    const amount = state.finalScoringAmount ?? 
      {
        scoringTrackVP: [],
        staffCardsVP: [],
        occupiedRoomsLevel4: [],
        occupiedRoomsLevel3: [],
        occupiedRoomsLevel2: [],
        occupiedRoomsLevel1: [],
        money: [],
        dishesDrinks: [],
        remainingGuests: []
      } as FinalScoringAmount

    const playerCount = 2

    return { t, state, router, amount, playerCount, deckType }
  },
  methods: {
    next() : void {
      this.state.finalScoringAmount = this.amount
      this.router.push('/endOfGame')
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 2.5rem;
  margin-right: 0.25rem;
  &.small {
    width: 2rem;
    height: 2rem;
  }
}
th, td {
  text-align: center;
  padding: 0.5rem;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  white-space: nowrap;
  vertical-align: middle;
}
th:nth-child(1) {
  font-weight: normal;
}
input {
  width: 5rem;
}
</style>
