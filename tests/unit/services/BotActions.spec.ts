import { expect } from 'chai'
import BotActions from '@/services/BotActions'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Cards from '@/services/Cards'
import mockState from '../helper/mockState'
import GuestCategory from '@/services/enum/GuestCategory'
import DieSelection from '@/services/enum/DieSelection'
import Action from '@/services/enum/Action'
import TieBreaker from '@/services/enum/TieBreaker'
import Expansion from '@/services/enum/Expansion'

describe('services/BotActions', () => {
  it('card207-level1', () => {
    const botActions = new BotActions(Cards.get(207), mockState({difficultyLevel: DifficultyLevel.EASY}))
    expect(botActions.guestSelection).to.eql([
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
    ])
    expect(botActions.dieSelection).to.eql([DieSelection.ONE, DieSelection.TWO])
    expect(botActions.additionalAction).to.eql([
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
    ])
    expect(botActions.tieBreaker).to.eq(TieBreaker.RIGHT)
  })

  it('card207-level2', () => {
    const botActions = new BotActions(Cards.get(207), mockState({difficultyLevel: DifficultyLevel.MEDIUM}))
    expect(botActions.guestSelection).to.eql([
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
    ])
    expect(botActions.dieSelection).to.eql([DieSelection.ONE, DieSelection.TWO])
    expect(botActions.additionalAction).to.eql([
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
    ])
    expect(botActions.tieBreaker).to.eq(TieBreaker.RIGHT)
  })

  it('card207-level2', () => {
    const botActions = new BotActions(Cards.get(207), mockState({difficultyLevel: DifficultyLevel.HARD}))
    expect(botActions.guestSelection).to.eql([
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
      {
        guestCategory: GuestCategory.ANY,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ])
    expect(botActions.dieSelection).to.eql([DieSelection.ONE, DieSelection.TWO])
    expect(botActions.additionalAction).to.eql([
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.STAFF_CARD,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ])
    expect(botActions.tieBreaker).to.eq(TieBreaker.RIGHT)
  })

  it('card232', () => {
    const botActions = new BotActions(Cards.get(232), mockState({expansions: []}))
    expect(botActions.dieSelection).to.eql([DieSelection.ANY])
  })

  it('card232-celebrities', () => {
    const botActions = new BotActions(Cards.get(232), mockState({expansions: [Expansion.LETS_WALTZ_MODULE_2_CELEBRITIES]}))
    expect(botActions.dieSelection).to.eql([DieSelection.COLOR_MAX])
  })
})
