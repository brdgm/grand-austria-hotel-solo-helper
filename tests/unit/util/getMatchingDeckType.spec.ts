import DeckType from '@/services/enum/DeckType'
import Expansion from '@/services/enum/Expansion'
import getMatchingDeckType from '@/util/getMatchingDeckType'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import { expect } from 'chai'

describe('util/getMatchingDeckType', () => {
  it('getMatchingDeckType', () => {
    expect(getMatchingDeckType([])).to.eql(DeckType.LEOPOLD)
    expect(getMatchingDeckType([Expansion.LETS_WALTZ_MODULE_1_VIENNA_BALLROOMS])).to.eql(DeckType.ELISABETH)
    expect(getMatchingDeckType([Expansion.LETS_WALTZ_MODULE_2_CELEBRITIES])).to.eql(DeckType.ELISABETH)
    expect(getMatchingDeckType([Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS])).to.eql(DeckType.LEOPOLD)
    expect(getMatchingDeckType([Expansion.LETS_WALTZ_MODULE_5_SOME_MORE])).to.eql(DeckType.LEOPOLD)
    expect(getMatchingDeckType(getAllEnumValues(Expansion))).to.eql(DeckType.ELISABETH)
  })
})
