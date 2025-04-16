import Action from './enum/Action'
import BallroomSelection from './enum/BallroomSelection'
import DeckType from './enum/DeckType'
import DieSelection from './enum/DieSelection'
import DifficultyLevel from './enum/DifficultyLevel'
import GuestCategory from './enum/GuestCategory'
import ObjectiveCard from './enum/ObjectiveCard'
import TieBreaker from './enum/TieBreaker'

export default interface Card {
  id: number
  decktType: DeckType
  guestSelection: GuestSelection[]
  dieSelection: DieSelection[]
  additionalAction: AdditionalAction[]
  tieBreaker: TieBreaker
}

export interface GuestSelection {
  guestCategory: GuestCategory
  ballroomSelection?: BallroomSelection
  difficultyLevel?: DifficultyLevel[]
}

export interface AdditionalAction {
  action: Action
  emperorTrackSteps?: number
  objectiveCard?: ObjectiveCard
  ballroomSelection?: BallroomSelection
  difficultyLevel?: DifficultyLevel[]
}
