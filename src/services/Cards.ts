import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'

/**
 * Patrouille boards.
 */
const cards : Card[] = [
  {
    id: 1
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
   * @returns WarCards
   */
  getAll() : Card[] {
    return cards
  }

}
