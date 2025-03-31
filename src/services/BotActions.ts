import { State } from '@/store/state'
import Card, { AdditionalAction, GuestSelection } from './Card'
import DieSelection from './enum/DieSelection'
import DifficultyLevel from './enum/DifficultyLevel'
import Expansion from './enum/Expansion'
import TieBreaker from './enum/TieBreaker'

/**
 * Manages the bot actions.
 */
export default class BotActions {

  readonly _currentCard : Card
  readonly _difficultyLevel : DifficultyLevel
  readonly _hasCelebritiesExpansion : boolean
  
  public constructor(currentCard: Card, state: State) {
    this._currentCard = currentCard
    this._difficultyLevel = state.setup.difficultyLevel
    this._hasCelebritiesExpansion = state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_2_CELEBRITIES)
  }

  public get guestSelection() : readonly GuestSelection[] {
    return this._currentCard.guestSelection
        .filter(item => item.difficultyLevel == undefined || item.difficultyLevel.includes(this._difficultyLevel))
  }

  public get dieSelection() : readonly DieSelection[] {
    return this._currentCard.dieSelection
        .map(item => item == DieSelection.COLOR_MAX && !this._hasCelebritiesExpansion ? DieSelection.ANY : item)
  }

  public get additionalAction() : readonly AdditionalAction[] {
    return this._currentCard.additionalAction
        .filter(item => item.difficultyLevel == undefined || item.difficultyLevel.includes(this._difficultyLevel))
  }

  public get tieBreaker() : TieBreaker {
    return this._currentCard.tieBreaker
  }

}
