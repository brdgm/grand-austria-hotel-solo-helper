import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import GuestCategory from './enum/GuestCategory'
import TieBreaker from './enum/TieBreaker'
import DieSelection from './enum/DieSelection'
import Action from './enum/Action'
import ObjectiveCard from './enum/ObjectiveCard'
import DifficultyLevel from './enum/DifficultyLevel'
import DeckType from './enum/DeckType'
import BallroomSelection from './enum/BallroomSelection'

/**
 * Patrouille boards.
 */
const cards : Card[] = [

  /* --- LEOPOLD DECK --- */
  {
    id: 193,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.BLUE_NOBLE
      },
    ],
    dieSelection: [DieSelection.ONE],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.ANY,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 194,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
    ],
    dieSelection: [DieSelection.TWO],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 1
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.B
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 195,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.ANY
      },
    ],
    dieSelection: [DieSelection.THREE],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.C
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 196,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.YELLOW_ARTIST
      },
    ],
    dieSelection: [DieSelection.FOUR],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.A,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 197,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.GREEN_TOURIST,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    dieSelection: [DieSelection.FIVE],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 3
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 198,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
    ],
    dieSelection: [DieSelection.SIX],
    additionalAction: [
      {
        action: Action.STAFF_CARD
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.B,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 199,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.BLUE_NOBLE
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.C
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 200,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.ANY,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.A
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 201,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.YELLOW_ARTIST
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 1
      },
      {
        action: Action.STAFF_CARD
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 202,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 3
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.ANY,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 203,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.GREEN_TOURIST
      },
      {
        guestCategory: GuestCategory.ANY,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.A
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 204,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.GREEN_TOURIST
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.B
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 193,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.BLUE_NOBLE
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.STAFF_CARD,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 194,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.YELLOW_ARTIST
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.STAFF_CARD
      },
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 207,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
      {
        guestCategory: GuestCategory.ANY,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    dieSelection: [DieSelection.ONE, DieSelection.TWO],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.STAFF_CARD,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 208,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.ANY
      },
    ],
    dieSelection: [DieSelection.THREE, DieSelection.FOUR],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 1
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.C,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 209,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.GREEN_TOURIST
      },
    ],
    dieSelection: [DieSelection.FIVE, DieSelection.SIX],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 1
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.A
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 210,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.BLUE_NOBLE
      },
    ],
    dieSelection: [DieSelection.TWO, DieSelection.THREE],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 4
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 211,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.ANY
      },
    ],
    dieSelection: [DieSelection.FOUR, DieSelection.FIVE],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.B
      },
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 212,
    decktType: DeckType.LEOPOLD,
    guestSelection: [
      {
        guestCategory: GuestCategory.YELLOW_ARTIST
      },
      {
        guestCategory: GuestCategory.ANY
      },
    ],
    dieSelection: [DieSelection.ONE, DieSelection.SIX],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.C
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },

  /* --- ELISABETH DECK --- */
  {
    id: 213,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.BLUE_NOBLE
      },
    ],
    dieSelection: [DieSelection.ONE],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.ANY,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 214,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.RED_CITIZEN,
        ballroomSelection: BallroomSelection.NEXT_2
      },
    ],
    dieSelection: [DieSelection.TWO],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 1
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.B
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 215,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.ANY
      },
    ],
    dieSelection: [DieSelection.THREE],
    additionalAction: [
      {
        action: Action.PLACE_DANCER,
        ballroomSelection: BallroomSelection.NEXT_1
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.C
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 216,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.YELLOW_ARTIST,
        ballroomSelection: BallroomSelection.NEXT_1
      },
    ],
    dieSelection: [DieSelection.FOUR],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.A,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 217,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.GREEN_TOURIST,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    dieSelection: [DieSelection.FIVE],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 3
      },
      {
        action: Action.PLACE_DANCER,
        ballroomSelection: BallroomSelection.NEXT_2,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 218,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
    ],
    dieSelection: [DieSelection.SIX],
    additionalAction: [
      {
        action: Action.STAFF_CARD
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.B,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 219,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.BLUE_NOBLE
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.C
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 220,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.ANY,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.PLACE_DANCER,
        ballroomSelection: BallroomSelection.NEXT_1
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.A
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 221,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.YELLOW_ARTIST
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 1
      },
      {
        action: Action.STAFF_CARD
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 222,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 3
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.ANY,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 223,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.GREEN_TOURIST
      },
      {
        guestCategory: GuestCategory.ANY,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.PLACE_DANCER,
        ballroomSelection: BallroomSelection.NEXT_2
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.A
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 224,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.GREEN_TOURIST
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.B
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 225,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.BLUE_NOBLE,
        ballroomSelection: BallroomSelection.NEXT_1
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.STAFF_CARD,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 226,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.YELLOW_ARTIST
      },
    ],
    dieSelection: [DieSelection.ANY],
    additionalAction: [
      {
        action: Action.STAFF_CARD
      },
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2,
        difficultyLevel: [DifficultyLevel.MEDIUM, DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 227,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.RED_CITIZEN
      },
      {
        guestCategory: GuestCategory.ANY,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    dieSelection: [DieSelection.ONE, DieSelection.TWO],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
      {
        action: Action.STAFF_CARD,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 228,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.ANY,
        ballroomSelection: BallroomSelection.NEXT_1
      },
    ],
    dieSelection: [DieSelection.THREE, DieSelection.FOUR],
    additionalAction: [
      {
        action: Action.PLACE_DANCER,
        ballroomSelection: BallroomSelection.NEXT_1
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.C,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 229,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.GREEN_TOURIST
      },
    ],
    dieSelection: [DieSelection.FIVE, DieSelection.SIX],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 1
      },
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.A
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 230,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.BLUE_NOBLE
      },
    ],
    dieSelection: [DieSelection.COLOR_MAX],
    additionalAction: [
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 4
      },
      {
        action: Action.PLACE_DANCER,
        ballroomSelection: BallroomSelection.NEXT_1,
        difficultyLevel: [DifficultyLevel.HARD]
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },
  {
    id: 231,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.ANY
      },
    ],
    dieSelection: [DieSelection.COLOR_MAX],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.B
      },
      {
        action: Action.EMPEROR_TRACK,
        emperorTrackSteps: 2
      },
    ],
    tieBreaker: TieBreaker.RIGHT
  },
  {
    id: 232,
    decktType: DeckType.ELISABETH,
    guestSelection: [
      {
        guestCategory: GuestCategory.YELLOW_ARTIST
      },
      {
        guestCategory: GuestCategory.ANY,
        ballroomSelection: BallroomSelection.NEXT_1
      },
    ],
    dieSelection: [DieSelection.COLOR_MAX],
    additionalAction: [
      {
        action: Action.OBJECTIVE_CARD,
        objectiveCard: ObjectiveCard.C
      },
    ],
    tieBreaker: TieBreaker.LEFT
  },

]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns WarCard
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param deckType Deck type
   * @returns WarCards
   */
  getAll(deckType: DeckType) : Card[] {
    return cards.filter(card => card.decktType === deckType)
  }

}
