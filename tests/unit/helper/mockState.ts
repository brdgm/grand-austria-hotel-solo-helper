import BotUniqueHotel from '@/services/enum/BotUniqueHotel'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import { CardDeckPersistence, Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.EASY,
      expansions: params?.expansions ?? [],
      botUniqueHotel: params?.botUniqueHotel,
      initialCardDeck: params?.initialCardDeck
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel
  expansions?: Expansion[]
  botUniqueHotel?: BotUniqueHotel
  initialCardDeck?: CardDeckPersistence
  rounds?: Round[]
}
