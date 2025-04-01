<template>
  <div class="actionBox col" @click="showInstructions">
    <slot name="action"></slot>
    <AppIcon v-if="tieBreaker" type="tie-breaker" :name="tieBreaker" class="tieBreakerIcon"/>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle" :scrollable="true" :size-lg="modalSizeLg">
    <template #body>
      <slot name="instruction"></slot>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'
import { PropType } from 'vue'
import TieBreaker from '@/services/enum/TieBreaker'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const modalId = `modal-${crypto.randomUUID()}`
    return { modalId }
  },
  props: {
    instructionTitle: {
      type: String,
      required: true
    },
    tieBreaker: {
      type: Object as PropType<TieBreaker>,
      required: false
    },
    modalSizeLg: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    showInstructions() {
      showModal(this.modalId)
    }
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  position: relative;
  color: white;
  background-color: #e5d295;
  border: 1px solid #645039;
  border-radius: 0.5rem;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem #888);
  padding: 1rem;
  padding-right: 2rem;
  cursor: pointer;
  background-image: url('@/assets/icons/help-semi-transparent.png');
  background-repeat: no-repeat;
  background-position: right 5px top 5px;
  background-size: 1.25rem;
  .tieBreakerIcon {
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 30px;
  }
}
</style>
