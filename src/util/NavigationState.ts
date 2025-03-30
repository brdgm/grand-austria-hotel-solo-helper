import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import DifficultyLevel from '@/services/enum/DifficultyLevel'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly difficultyLevel : DifficultyLevel

  constructor(route: RouteLocation, state: State) {    
    this.round = getIntRouteParam(route, 'round')
    this.turn = getIntRouteParam(route, 'turn')
    this.difficultyLevel = state.setup.difficultyLevel
  }

}
