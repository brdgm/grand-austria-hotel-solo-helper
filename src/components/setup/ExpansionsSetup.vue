<template>
  <h3 class="mt-4 mb-3">{{t('setup.expansions.title')}}</h3>

  <div class="row" v-for="expansion of expansions" :key="expansion">
    <div class="col">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" :id="`expansion-${expansion}`"
            :checked="hasExpansion(expansion)" @input="toggleExpansion(expansion)">
        <label class="form-check-label" :for="`expansion-${expansion}`">
          {{t(`setup.expansions.${expansion}`)}}
        </label>
      </div>
      <div v-if="isAndHasUniqueHotelsExpansion(expansion)" class="ms-5 mb-3">
        <label>
          <span class="form-label fst-italic">{{t('setup.expansions.botUniqueHotel', {opponentName: t(`opponentName.${deckType}`)})}}</span>
          <select class="form-select" v-model="state.setup.botUniqueHotel">
            <option :value="undefined">{{t('setup.expansions.botUniqueHotelRandom')}}</option>
            <option v-for="item in botUniqueHotels" :key="item" :value="item">{{t(`rules.botUniqueHotel.${item}.title`)}}</option>
          </select>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'
import BotUniqueHotel from '@/services/enum/BotUniqueHotel'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import DeckType from '@/services/enum/DeckType'
import getMatchingDeckType from '@/util/getMatchingDeckType'

export default defineComponent({
  name: 'ExpansionsSetup',
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  computed: {
    expansions() : Expansion[] {
      return Object.values(Expansion)
    },
    botUniqueHotels() : BotUniqueHotel[] {
      return getAllEnumValues(BotUniqueHotel)
    },
    deckType() : DeckType {
      return getMatchingDeckType(this.state.setup.expansions)
    }
  },
  methods: {
    hasExpansion(expansion : Expansion) : boolean {
      return (this.state.setup.expansions ?? []).includes(expansion)
    },
    toggleExpansion(expansion : Expansion) : void {
      this.state.setupToggleExpansion(expansion)
    },
    isAndHasUniqueHotelsExpansion(expansion : Expansion) : boolean {
      return expansion == Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS
        && this.hasExpansion(Expansion.LETS_WALTZ_MODULE_3_UNIQUE_HOTELS)
    }
  }
})
</script>
