import { Turn } from '@/store/state'

export default function (params?: MockTurnParams) : Turn {
  const turn : Turn = {
    round: params?.round ?? 1,
    turn: params?.turn ?? 1,
    cardDeck: { pile: params?.pile ?? [193,194,195], discard: params?.discard ?? [] }
  }
  if (params?.pass) {
    turn.pass = true
  }
  return turn
}

export interface MockTurnParams {
  round? : number
  turn? : number
  pass?: boolean
  pile?: number[]
  discard?: number[]
}
