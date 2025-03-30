import NavigationState from '@/util/NavigationState'
import { expect } from 'chai'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import Player from '@/services/enum/Player'

const state = mockState({rounds:[
  mockRound({round:1, turns:[
    mockTurn({round:1, turn:1, pile:[2,1,3], discard:[]}),
    mockTurn({round:1, turn:2, pile:[1,3], discard:[2]}),
    mockTurn({round:1, turn:3, pile:[1,3], discard:[2]}),
    mockTurn({round:1, turn:4, pile:[3], discard:[1,2]}),
    mockTurn({round:1, turn:5, pile:[3], discard:[1,2]}),
  ]}),
]})

describe('util/NavigationState', () => {
  it('roundStart', () => {
    const route = mockRouteLocation({params:{round:'1'}})
    const navigationState = new NavigationState(route, state)

    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(0)
    expect(navigationState.nextPlayer).to.eq(Player.BOT)
    expect(navigationState.previousPlayer).to.eq(Player.BOT)
  })

  it('botTurn1', () => {
    const route = mockRouteLocation({params:{round:'1',turn:'1'}})
    const navigationState = new NavigationState(route, state)

    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(1)
    expect(navigationState.nextPlayer).to.eq(Player.PLAYER)
  })

  it('playerTurn2', () => {
    const route = mockRouteLocation({params:{round:'1',turn:'2'}})
    const navigationState = new NavigationState(route, state)

    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(2)
    expect(navigationState.nextPlayer).to.eq(Player.PLAYER)
    expect(navigationState.previousPlayer).to.eq(Player.BOT)
  })

  it('playerTurn3', () => {
    const route = mockRouteLocation({params:{round:'1',turn:'3'}})
    const navigationState = new NavigationState(route, state)

    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(3)
    expect(navigationState.nextPlayer).to.eq(Player.BOT)
    expect(navigationState.previousPlayer).to.eq(Player.PLAYER)
  })

  it('botTurn4', () => {
    const route = mockRouteLocation({params:{round:'1',turn:'4'}})
    const navigationState = new NavigationState(route, state)

    expect(navigationState.round).to.eq(1)
    expect(navigationState.turn).to.eq(4)
    expect(navigationState.nextPlayer).to.eq(Player.PLAYER)
    expect(navigationState.previousPlayer).to.eq(Player.PLAYER)
  })

  it('roundStart-round2', () => {
    const route = mockRouteLocation({params:{round:'2'}})
    const navigationState = new NavigationState(route, state)

    expect(navigationState.round).to.eq(2)
    expect(navigationState.turn).to.eq(0)
    expect(navigationState.nextPlayer).to.eq(Player.PLAYER)
    expect(navigationState.previousPlayer).to.eq(Player.PLAYER)
  })
})
