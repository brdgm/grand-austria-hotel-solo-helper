import { State, Turn } from '@/store/state'
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
  readonly playerPassCount : number

  constructor(params:{round: number, turn?: number, state: State}) {
    this.round = params.round
    this.turn = params.turn ?? MAX_TURN
    this.state = params.state

    this.startPlayer = getStartPlayer(this.round)
    this.currentPlayer = getTurnPlayer(this.turn, this.startPlayer)
    this.nextPlayer = getTurnPlayer(this.turn + 1, this.startPlayer)
    this.previousPlayer = getTurnPlayer(this.turn - 1, this.startPlayer)
    this.playerPassCount = getPlayerPassCount(this.state, this.round, this.turn)
  }

  /**
   * Get route to next step in round.
   */
  public getNextRouteTo() : string {
    if (this.turn < 4 + this.playerPassCount && this.playerPassCount < MAX_PASS_COUNT) {
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

  /**
   * Get current empty turn order tile number for player (also checking for passed turns).
   * @returns 
   */
  public getPlayerTurnOrderTileTurn() : number {
    if (this.turn <= 4) {
      return this.turn
    }
    const playerTurns = getPlayerTurns(this.round)
    const playerExecutedMainTurns = getPlayerTurnsFromState(this.state, this.round, this.turn-1).filter(item => !item.pass && item.turn <= 4)
    const playerExecutedAdditionalTurns = getPlayerTurnsFromState(this.state, this.round, this.turn-1).filter(item => !item.pass && item.turn > 4)
    const remainingTurns = playerTurns.filter(turn => !playerExecutedMainTurns.find(item => item.turn == turn))
    if (remainingTurns.length > playerExecutedAdditionalTurns.length) {
      return remainingTurns[playerExecutedAdditionalTurns.length]
    }
    return 0
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

function getStartPlayer(round: number) : Player {
  return round % 2 == 0 ? Player.PLAYER : Player.BOT
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

function getPlayerTurns(round: number) : number[] {
  const startPlayer = getStartPlayer(round)
  const turns : number[] = []
  for (let turn = 1; turn <= 4; turn++) {
    if (getTurnPlayer(turn, startPlayer) == Player.PLAYER) {
      turns.push(turn)
    }
  }
  return turns
}

function getPlayerTurnsFromState(state: State, round: number, turn: number) : Turn[] {
  const playerTurns = getPlayerTurns(round)
  const roundData = state.rounds.find(item => item.round == round)
  if (roundData) {
    return roundData.turns.filter(item => item.turn <= turn && (playerTurns.includes(item.turn) || item.turn > 4))
  }
  return []
}

/**
 * Get number of player passed turns in current round.
 */
function getPlayerPassCount(state: State, round: number, turn: number) : number {
  return getPlayerTurnsFromState(state, round, turn).filter(item => item.pass).length
}
