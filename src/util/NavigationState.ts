import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import DeckType from '@/services/enum/DeckType'
import getMatchingDeckType from './getMatchingDeckType'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  
  readonly difficultyLevel : DifficultyLevel
  readonly deckType : DeckType
  
  readonly nextPlayer : Player
  readonly previousPlayer : Player

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    
    this.difficultyLevel = state.setup.difficultyLevel
    this.deckType = getMatchingDeckType(state.setup.expansions)

    if (isEven(this.round)) {
      this.nextPlayer = getTurnPlayer(this.turn + 1, Player.PLAYER)
      this.previousPlayer = getTurnPlayer(this.turn - 1, Player.PLAYER)
    }
    else {
      this.nextPlayer = getTurnPlayer(this.turn + 1, Player.BOT)
      this.previousPlayer = getTurnPlayer(this.turn - 1, Player.BOT)
    }
  }

}

function isEven(n: number) : boolean {
  return n % 2 == 0
}

function getTurnPlayer(turn: number, startPlayer: Player) : Player {
  if (turn == 1 || turn == 4 || turn < 0) {
    return startPlayer
  }
  else if (startPlayer == Player.PLAYER) {
    return Player.BOT
  }
  else {
    return Player.PLAYER
  }
}
