import DeckType from '@/services/enum/DeckType'
import Expansion from '@/services/enum/Expansion'

/**
 * Get deck type matching the selected expansions.
 * @param expansions Selected expansions
 * @returns Deck type
 */
export default function(expansions: Expansion[]) : DeckType {
  if (expansions.includes(Expansion.LETS_WALTZ_MODULE_1_VIENNA_BALLROOMS)
      || expansions.includes(Expansion.LETS_WALTZ_MODULE_2_CELEBRITIES)) {
    return DeckType.ELISABETH
  }
  else {
    return DeckType.LEOPOLD
  }
}
