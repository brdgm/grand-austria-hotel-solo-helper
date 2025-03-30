import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import toggleArrayItem from '@brdgm/brdgm-commons/src/util/array/toggleArrayItem'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        difficultyLevel: DifficultyLevel.EASY,
        expansions: []
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
    },
    setupToggleExpansion(expansion: Expansion) : void {
      toggleArrayItem(this.setup.expansions, expansion)
    },
    storeTurn(turn : Turn) {
      let round = this.rounds.find(item => item.round === turn.round)
      if (!round) {
        round = { round: turn.round, turns: [] }
        this.rounds.push(round)
      }
      round.turns = round.turns.filter(item => item.turn != turn.turn)
      round.turns.push(turn)
    }
  },
  persist: true
})

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  expansions: Expansion[]
  debugMode?: boolean
}
export interface Round {
  round: number
  turns: Turn[]
}
export interface Turn {
  round: number
  turn: number
  cardDeck: CardDeckPersistence
}

export interface CardDeckPersistence {
  pile: number[]
  discard: number[]
}
