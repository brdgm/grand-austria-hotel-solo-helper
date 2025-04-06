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
  mockRound({round:2, turns:[
    mockTurn({round:2, turn:1, pass:true}),  // player passes
    mockTurn({round:2, turn:2}),
    mockTurn({round:2, turn:3}),
    mockTurn({round:2, turn:4, pass:true}),  // player passes
    mockTurn({round:2, turn:5, pass:true}),  // 1 dice removed, player passes
    mockTurn({round:2, turn:6}),  // 1 dice removed, player takes dice
    mockTurn({round:2, turn:7}),  // 1 dice removed, player takes dice
  ]}),
]})

describe('services/RouteCalculator', () => {
  it('round1', () => {
    const routeCalculator = new RouteCalculator({round:1,state})

    expect(routeCalculator.getFirstTurnRouteTo()).to.eq('/round/1/turn/1/bot')
    expect(routeCalculator.getLastTurnRouteTo()).to.eq('/round/1/turn/4/bot')
  })

  it('round1-botTurn1', () => {
    const routeCalculator = new RouteCalculator({round:1,turn:1,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.BOT)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/1/turn/2/player')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/1/start')
  })

  it('round1-playerTurn2', () => {
    const routeCalculator = new RouteCalculator({round:1,turn:2,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/1/turn/3/player')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/1/turn/1/bot')
    expect(routeCalculator.getPlayerTurnOrderTileTurn()).to.eq(2)
  })

  it('round1-playerTurn3', () => {
    const routeCalculator = new RouteCalculator({round:1,turn:3,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/1/turn/4/bot')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/1/turn/2/player')
    expect(routeCalculator.getPlayerTurnOrderTileTurn()).to.eq(3)
  })

  it('round1-botTurn4', () => {
    const routeCalculator = new RouteCalculator({round:1,turn:4,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.BOT)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/1/end')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/1/turn/3/player')
  })

  it('round2', () => {
    const routeCalculator = new RouteCalculator({round:2,state})

    expect(routeCalculator.getFirstTurnRouteTo()).to.eq('/round/2/turn/1/player')
    expect(routeCalculator.getLastTurnRouteTo()).to.eq('/round/2/turn/7/player')
  })

  it('round2-playerTurn1', () => {
    const routeCalculator = new RouteCalculator({round:2,turn:1,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/2/turn/2/bot')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/2/start')
    expect(routeCalculator.getPlayerTurnOrderTileTurn()).to.eq(1)
  })

  it('round2-playerTurn4', () => {
    const routeCalculator = new RouteCalculator({round:2,turn:4,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/2/turn/5/player')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/2/turn/3/bot')
    expect(routeCalculator.getPlayerTurnOrderTileTurn()).to.eq(4)
  })

  it('round2-playerTurn5', () => {
    const routeCalculator = new RouteCalculator({round:2,turn:5,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/2/turn/6/player')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/2/turn/4/player')
    expect(routeCalculator.getPlayerTurnOrderTileTurn()).to.eq(1)
  })

  it('round2-playerTurn6', () => {
    const routeCalculator = new RouteCalculator({round:2,turn:6,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/2/turn/7/player')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/2/turn/5/player')
    expect(routeCalculator.getPlayerTurnOrderTileTurn()).to.eq(1)
  })

  it('round2-playerTurn7', () => {
    const routeCalculator = new RouteCalculator({round:2,turn:7,state})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/2/end')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/2/turn/6/player')
    expect(routeCalculator.getPlayerTurnOrderTileTurn()).to.eq(4)
  })

  it('round1-pass2-execute3', () => {
    const routeCalculator = new RouteCalculator({round:1,turn:5,state:mockState({rounds:[
      mockRound({round:1, turns:[
        mockTurn({round:1, turn:1}), // bot
        mockTurn({round:1, turn:2, pass:true}), // player pass
        mockTurn({round:1, turn:3}), // player
        mockTurn({round:1, turn:4}), // bot
      ]})
    ]})})

    expect(routeCalculator.currentPlayer).to.eq(Player.PLAYER)
    expect(routeCalculator.getNextRouteTo()).to.eq('/round/1/end')
    expect(routeCalculator.getBackRouteTo()).to.eq('/round/1/turn/4/bot')
    expect(routeCalculator.getPlayerTurnOrderTileTurn()).to.eq(2)
  })
})
