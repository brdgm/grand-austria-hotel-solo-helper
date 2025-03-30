import { Round, State } from '@/store/state'

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  rounds?: Round[]
}
