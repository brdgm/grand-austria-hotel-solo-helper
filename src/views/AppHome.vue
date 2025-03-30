<template>

  <div class="float-end m-2 w-25">
    <a href="https://boardgamegeek.com/boardgame/182874/grand-austria-hotel" target="_blank" rel="noopener">
      <img src="../assets/game-grand-austria-hotel.webp" class="rounded shadow w-100 mb-3" alt=""/>
    </a>
  </div>

  <h1>{{t('home.title')}}</h1>

  <p v-html="t('home.play1')"></p>
  <p v-html="t('home.play2')"></p>

<!--
  <p class="text-muted fst-italic">
    {{t('home.feedback')}}
    <a href="https://boardgamegeek.com/thread/XXX/brdgmme-grand-austria-hotel-solo-helper-web-application" target="_blank" rel="noopener">Board Game Geek Thread</a> |
    <a href="https://github.com/brdgm/grand-austria-hotel-solo-helper" target="_blank" rel="noopener">GitHub</a>
  </p>
-->

  <button class="btn btn-primary btn-lg mt-3" @click="startGame()">{{t('action.playGame')}}</button>

  <p class="disclaimer">
    This is not an official Lookout Games product and has no affiliation with <a href="https://www.lookout-spiele.de/" target="_blank" rel="noopener">Lookout Games</a>.
    All art in this app is from <a href="https://www.lookout-spiele.de/en/games/grandaustriahotel.html" target="_blank" rel="noopener">Grand Austria Hotel</a>.
    See <a href="#" data-bs-toggle="modal" data-bs-target="#creditsModal">{{t('footer.credits')}}</a>.
    <a href="https://ko-fi.com/brdgm_me" target="_blank" rel="noopener"><img class="kofi-button" src="@/assets/kofi_button_dark.png" alt="Support me on Ko-fi"/></a>
  </p>

</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AppHome',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const state = useStateStore()
    return { t, router, state }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      this.router.push('/setupGame')
    }
  }
})
</script>

<style lang="scss" scoped>
.disclaimer {
  clear: both;
  margin-top: 4rem;
  font-size: smaller;
}
.kofi-button {
  height: 1.4rem;
}
.hello {
  background-color: #2e4950;
  border-radius: 15px;
  margin-right: 15px;
  margin-left: 10px;
  max-width: 600px;
  .vici {
    position: relative;
    float: right;
    width: 200px;
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    img {
      width: 100%;
    }
    @media (max-width: 600px) {
      width: 150px;
    }
    .viciText {
      position: absolute;
      top: 32px;
      left: 115px;
      text-align: center;
      transform: rotate(5deg);
      line-height: 1.25rem;
      @media (max-width: 600px) {
        top: 22px;
        left: 88px;
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
  .text {
    padding: 10px;
    font-style: italic;
    color: #fff;
  }
}
</style>
