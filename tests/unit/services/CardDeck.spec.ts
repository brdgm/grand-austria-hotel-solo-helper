import CardDeck from '@/services/CardDeck'
import DeckType from '@/services/enum/DeckType'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new-leopold', () => {
    const deck = CardDeck.new(DeckType.LEOPOLD)

    expect(deck.currentCard, 'currentCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(20)
    expect(deck.discard.length, 'discard').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(20)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('new-elisabeth', () => {
    const deck = CardDeck.new(DeckType.ELISABETH)

    expect(deck.currentCard, 'currentCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(20)
    expect(deck.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({pile: [193,194], discard: []})

    expect(deck.currentCard, 'currentCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(2)
    expect(deck.discard.length, 'discard').to.eq(0)

    let card = deck.draw()
    expect(card.id, 'card.id').to.eq(193)
    expect(deck.currentCard?.id, 'currentCard').to.eq(card.id)
    expect(deck.pile.length, 'pile').to.eq(1)
    expect(deck.discard.length, 'discard').to.eq(1)

    card = deck.draw()
    expect(card.id, 'card.id').to.eq(194)
    expect(deck.currentCard?.id, 'currentCard').to.eq(card.id)
    expect(deck.pile.length, 'pile').to.eq(0)
    expect(deck.discard.length, 'discard').to.eq(2)

    deck.draw()  // deck is reshuffled
    expect(deck.currentCard, 'currentCard').to.not.undefined
    expect(deck.pile.length, 'pile').to.eq(1)
    expect(deck.discard.length, 'discard').to.eq(1)
  })

})
