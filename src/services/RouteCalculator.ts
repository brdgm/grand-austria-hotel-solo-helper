import { State } from '@/store/state'
import Player from './enum/Player'

/**
 * Calculate routes for next/back respecting "passed" state of players.
 */
export default class RouteCalculator {

  readonly round : number
  readonly turn : number
  readonly state : State

  readonly startPlayer : Player
  public readonly currentPlayer : Player
  readonly nextPlayer : Player
  readonly previousPlayer : Player
  readonly passCount : number

  constructor(params:{round: number, turn?: number, state: State}) {
    this.round = params.round
    this.turn = params.turn ?? MAX_TURN
    this.state = params.state

    this.startPlayer = isEven(this.round) ? Player.PLAYER : Player.BOT
    this.currentPlayer = getTurnPlayer(this.turn, this.startPlayer)
    this.nextPlayer = getTurnPlayer(this.turn + 1, this.startPlayer)
    this.previousPlayer = getTurnPlayer(this.turn - 1, this.startPlayer)
    this.passCount = getPassCount(this.state, this.round, this.turn)
  }

  /**
   * Get route to next step in round.
   */
  public getNextRouteTo() : string {
    if (this.turn < 4 + this.passCount && this.passCount < MAX_PASS_COUNT) {
      return routeTo({round:this.round, turn:this.turn+1, player:this.nextPlayer})
    }
    else {
      return `/round/${this.round}/end`
    }
  }

  /**
   * Get route to previous step in round.
   */
  public getBackRouteTo() : string {
    if (this.turn > 1) {
      return routeTo({round:this.round, turn:this.turn-1, player:this.previousPlayer})
    }
    return `/round/${this.round}/start`
}

  /**
   * Get route to first turn in round.
   */
  public getFirstTurnRouteTo() : string {
    return routeTo({round:this.round, turn:1, player:this.startPlayer})
  }

  /**
   * Get route to last turn in round.
   */
  public getLastTurnRouteTo() : string {
    const roundData = this.state.rounds.find(item => item.round == this.round)
    if (roundData) {
      const lastTurn = roundData.turns.toSorted((item1,item2) => item2.turn - item1.turn)[0]
      if (lastTurn) {
        return routeTo({round:this.round, turn:lastTurn.turn, player:getTurnPlayer(lastTurn.turn, this.startPlayer)})
      }
    }
    return ''
  }

}

export const MAX_TURN = 999
export const MAX_PASS_COUNT = 10

interface Step {
  readonly round: number
  readonly turn: number
  readonly player: Player
}

function routeTo(step?: Step) : string {
  if (!step) {
    return ''
  }
  else {
    return `/round/${step.round}/turn/${step.turn}/${step.player}`
  }
}

function isEven(n: number) : boolean {
  return n % 2 == 0
}

function getTurnPlayer(turn: number, startPlayer: Player) : Player {
  if (turn > 4) {
    return Player.PLAYER
  }
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

/**
 * Get number of passes in current round (only possible by player).
 */
function getPassCount(state: State, round: number, turn: number) : number {
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    return roundData.turns.filter(item => item.turn <= turn && item.pass).length
  }
  return 0
}
