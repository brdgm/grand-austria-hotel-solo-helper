<template>
  <ActionBox :instructionTitle="t('rules.action.dieSelection.title')" :tieBreaker="botActions.tieBreaker" :modalSizeLg="hasCelebritiesExpansion">
    <template #action>
      <div class="action">
        <template v-for="(die,index) of dieSelection" :key="die">
          <div v-if="index > 0" class="separator">/</div>
          <AppIcon type="die-selection" :name="die" class="icon" :extension="getExtension(die)"/>
        </template>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.dieSelection.takeDie')"></p>
      <ul>
        <template v-if="hasColorMaxDieSelection">
          <li>
            <AppIcon type="die-selection" name="color-max" class="dieSelectionRulesIcon"/>
            <span v-html="t('rules.action.dieSelection.colorMaxDie')"></span>
          </li>
        </template>
        <template v-else>
          <li v-html="t('rules.action.dieSelection.twoDice')"></li>
          <li v-html="t('rules.action.dieSelection.anyDie')"></li>
        </template>
        <li v-html="t('rules.action.dieSelection.tieBreaker')"></li>
      </ul>
      <template v-if="hasCelebritiesExpansion">
        <h6>{{t('rules.action.dieSelection.coloredDie.title')}}</h6>
        <p v-html="t('rules.action.dieSelection.coloredDie.takeColoredDie')"></p>
        <ul>
          <li v-html="t('rules.action.dieSelection.coloredDie.multipleColored')"></li>
          <li v-html="t('rules.action.dieSelection.coloredDie.celebrityTile')"></li>
          <li v-html="t('rules.action.dieSelection.coloredDie.ignoreCelebrityEffect')"></li>
          <ul>
            <li v-for="color in celebrityEffects" :key="color">
              <AppIcon type="celebrity-effect" :name="color" class="celebrityEffectsIcon"/>
              <span v-html="t(`rules.action.dieSelection.coloredDie.celebrityEffect.${color}`)"></span>
            </li>
          </ul>
        </ul>
      </template>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import ActionBox from '../ActionBox.vue'
import AppIcon from '../../structure/AppIcon.vue'
import DieSelection from '@/services/enum/DieSelection'
import BotActions from '@/services/BotActions'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'DieSelection',
  components: {
    ActionBox,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    dieSelection: {
      type: Array as PropType<DieSelection[]>,
      required: true
    },
    botActions: {
      type: BotActions,
      required: true
    }
  },
  computed: {
    hasCelebritiesExpansion(): boolean {
      return this.state.setup.expansions.includes(Expansion.LETS_WALTZ_MODULE_2_CELEBRITIES)
    },
    hasColorMaxDieSelection() : boolean {
      return this.dieSelection.includes(DieSelection.COLOR_MAX)
    },
    celebrityEffects() : string[] {
      return [ "red", "yellow", "blue" ]
    }
  },
  methods: {
    getExtension(die: DieSelection): string {
      return die === DieSelection.COLOR_MAX ? 'webp' : 'svg'
    }
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  gap: 0.5rem;
  .icon {
    height: 2.5rem;
  }
  .separator {
    font-size: 25px;
  }
}
.dieSelectionRulesIcon {
  float: right;
  height: 2.5rem;
  margin-left: 0.5rem;
}
.celebrityEffectsIcon {
  float: left;
  height: 2.5rem;
  width: 5rem;
  object-fit: contain;
  margin-right: 0.5rem;
}
</style>
