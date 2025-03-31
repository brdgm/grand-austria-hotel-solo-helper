import Cards from '@/services/Cards'
import DeckType from '@/services/enum/DeckType'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get(193)

    expect(card).to.not.undefined
    expect(card?.id).to.eq(193)
  })

  it('getAll', () => {
    expect(Cards.getAll(DeckType.LEOPOLD).length).to.eq(20)
    expect(Cards.getAll(DeckType.ELISABETH).length).to.eq(20)
  })
})
