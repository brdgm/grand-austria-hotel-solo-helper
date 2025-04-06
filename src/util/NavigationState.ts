import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Player from '@/services/enum/Player'
import DeckType from '@/services/enum/DeckType'
import getMatchingDeckType from './getMatchingDeckType'
import CardDeck from '@/services/CardDeck'
import BotActions from '@/services/BotActions'
import RouteCalculator, { MAX_TURN } from '@/services/RouteCalculator'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly difficultyLevel : DifficultyLevel
  readonly deckType : DeckType
  readonly cardDeck : CardDeck
  readonly botActions? : BotActions

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    
    this.difficultyLevel = state.setup.difficultyLevel
    this.deckType = getMatchingDeckType(state.setup.expansions)

    this.cardDeck = getCardDeckFromLastTurn(state, this.round, this.turn)
    const routeCalculator = new RouteCalculator({round:this.round, turn:this.turn})
    if (routeCalculator.currentPlayer == Player.BOT && this.turn > 0) {
      const currentCard = this.cardDeck.draw()
      this.botActions = new BotActions(currentCard, state)
    }
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
    return getCardDeckFromLastTurn(state, round - 1, MAX_TURN)
  }
  if (state.setup.initialCardDeck) {
    return CardDeck.fromPersistence(state.setup.initialCardDeck)
  }
  // should never happen
  return CardDeck.new(getMatchingDeckType(state.setup.expansions))
}
