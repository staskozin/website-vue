export const useRiceStore = defineStore('rice', {
  state: () => {
    return {
      scale: true,
      rice: 450,
      ratio: 1.15,
      riceType: 'round',
      pot: 'pot',
      purpose: 'sushi',
      ingredients: {
        water: 518,
        vinegar: 50,
        salt: 5,
        sugar: 41,
      },
      disabledButtons: {
        riceType: {
          round: false,
          long: true,
          parboiled: true,
        },
        pot: {
          pot: false,
          multi: true,
          pan: true,
        },
        purpose: {
          sushi: false,
          side: false,
          porridge: true,
        },
      },
    }
  },
  getters: {},
  actions: {},
})

type CalcState = {
  scale: boolean
  rice: number
  ratio: number
  purpose: purposeVariant
  riceType: riceTypeVariant
  pot: potVariant
  ingredients: Ingredients
  disabledButtons: DisabledButtons
}

type purposeVariant = 'sushi' | 'side' | 'porridge'
type riceTypeVariant = 'round' | 'long' | 'parboiled'
type potVariant = 'pot' | 'multi' | 'pan'

type Ingredients = {
  water: number
  vinegar: number
  sugar: number
  salt: number
}

type DisabledButtons = {
  purpose: {
    sushi: boolean
    side: boolean
    porridge: boolean
  }
  riceType: {
    round: boolean
    long: boolean
    parboiled: boolean
  }
  pot: {
    pot: boolean
    multi: boolean
    pan: boolean
  }
}
