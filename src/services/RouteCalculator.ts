import { State } from '@/store/state'
import Player from './enum/Player'

/**
 * Calculate routes for next/back respecting "passed" state of players.
 */
export default class RouteCalculator {

  readonly round : number
  readonly turn : number
  readonly startPlayer : Player
  public readonly currentPlayer : Player
  readonly nextPlayer : Player
  readonly previousPlayer : Player

  constructor(params:{round: number, turn?: number}) {
    this.round = params.round
    this.turn = params.turn ?? MAX_TURN

    this.startPlayer = isEven(this.round) ? Player.PLAYER : Player.BOT
    this.currentPlayer = getTurnPlayer(this.turn, this.startPlayer)
    this.nextPlayer = getTurnPlayer(this.turn + 1, this.startPlayer)
    this.previousPlayer = getTurnPlayer(this.turn - 1, this.startPlayer)
  }

  /**
   * Get route to next step in round.
   */
  public getNextRouteTo(state: State) : string {
    if (this.turn < 4) {
      return RouteCalculator.routeTo({round:this.round, turn:this.turn+1, player:this.nextPlayer})
    }
    else {
      return `/round/${this.round}/end`
    }
  }

  /**
   * Get route to previous step in round.
   */
  public getBackRouteTo(state: State) : string {
    if (this.turn > 1) {
      return RouteCalculator.routeTo({round:this.round, turn:this.turn-1, player:this.previousPlayer})
    }
    return `/round/${this.round}/start`
}

  /**
   * Get route to first turn in round.
   */
  public getFirstTurnRouteTo() : string {
    return RouteCalculator.routeTo({round:this.round, turn:1, player:this.startPlayer})
  }

  /**
   * Get route to last turn in round.
   */
  public getLastTurnRouteTo(state: State) : string {
    return RouteCalculator.routeTo({round:this.round, turn:4, player:this.startPlayer})
  }

  /**
   * Build route to player/bot step
   */
  private static routeTo(step?: Step) : string {
    if (!step) {
      return ''
    }
    else {
      return `/round/${step.round}/turn/${step.turn}/${step.player}`
    }
  }

}

export const MAX_TURN = 999

interface Step {
  readonly round: number
  readonly turn: number
  readonly player: Player
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
