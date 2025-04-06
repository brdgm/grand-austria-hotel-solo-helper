import { expect } from 'chai'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import RouteCalculator from '@/services/RouteCalculator'
import Player from '@/services/enum/Player'

const state = mockState({initialCardDeck: {pile:[193,194,195], discard:[]}, rounds:[
  mockRound({round:1, turns:[
    mockTurn({round:1, turn:1, pile:[194,195], discard:[193]}),
    mockTurn({round:1, turn:2, pile:[194,195], discard:[193]}),
    mockTurn({round:1, turn:3, pile:[194,195], discard:[193]}),
    mockTurn({round:1, turn:4, pile:[195], discard:[194,193]}),
  ]}),
]})

describe('services/RouteCalculator', () => {
  it('roundStart', () => {
    const routeCalculator = new RouteCalculator({round:1})

    expect(routeCalculator.getFirstTurnRouteTo()).to.eq('/round/1/turn/1/bot')
  })

  it('botTurn1', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:1})

    expect(routeCalculator.currentPlayer).to.eq(Player.BOT)
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/player')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/start')
  })

  it('playerTurn2', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:2})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/3/player')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/bot')
  })

  it('playerTurn3', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:3})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/4/bot')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/2/player')
  })

  it('botTurn4', () => {
    const routeCalculator = new RouteCalculator({round:1, turn:4})

    expect(routeCalculator.currentPlayer).to.eq(Player.BOT)
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/end')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/3/player')
  })

  it('roundStart-round2', () => {
    const routeCalculator = new RouteCalculator({round:2})

    expect(routeCalculator.getFirstTurnRouteTo()).to.eq('/round/2/turn/1/player')
  })
})
