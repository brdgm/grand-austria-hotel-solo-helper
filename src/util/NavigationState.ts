import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import DeckType from '@/services/enum/DeckType'
import getMatchingDeckType from './getMatchingDeckType'
import CardDeck from '@/services/CardDeck'
import BotActions from '@/services/BotActions'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly difficultyLevel : DifficultyLevel
  readonly deckType : DeckType
  readonly currentPlayer : Player
  readonly nextPlayer : Player
  readonly previousPlayer : Player
  readonly cardDeck : CardDeck
  readonly botActions? : BotActions

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    
    this.difficultyLevel = state.setup.difficultyLevel
    this.deckType = getMatchingDeckType(state.setup.expansions)

    const startPlayer = isEven(this.round) ? Player.PLAYER : Player.BOT
    this.currentPlayer = getTurnPlayer(this.turn, startPlayer)
    this.nextPlayer = getTurnPlayer(this.turn + 1, startPlayer)
    this.previousPlayer = getTurnPlayer(this.turn - 1, startPlayer)

    this.cardDeck = getCardDeckFromLastTurn(state, this.round, this.turn)
    if (this.currentPlayer == Player.BOT && this.turn > 0) {
      const currentCard = this.cardDeck.draw()
      this.botActions = new BotActions(currentCard, state)
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

function getCardDeckFromLastTurn(state: State, round: number, turn: number) : CardDeck {
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    const descendingLastTurns = roundData.turns.filter(item => item.turn < turn).toSorted((item1,item2) => item2.turn - item1.turn)
    const lastTurn = descendingLastTurns[0]
    if (lastTurn) {
      return CardDeck.fromPersistence(lastTurn.cardDeck)
    }
  }
  if (round > 1) {
    return getCardDeckFromLastTurn(state, round - 1, 999)
  }
  if (state.setup.initialCardDeck) {
    return CardDeck.fromPersistence(state.setup.initialCardDeck)
  }
  // should never happen
  return CardDeck.new(getMatchingDeckType(state.setup.expansions))
}
