<template>
  <PageHeader
    title="Как варить рис"
    subtitle="Интерактивный рецепт"
  />
</template>

<script setup lang="ts">
useHead({
  title: 'Как варить рис. Интерактивный рецепт',
  meta: [
    {
      name: 'description',
      content: 'Интерактивный рецепт риса: для суши, гарнир и каша'
    }
  ]
})

const rice = ref<number>(450)
const ratio = ref<number>(1.15)
const purpose = ref<Purpose>('sushi')
const riceType = ref<RiceType>('round')
const pot = ref<Pot>('pot')
const ingredients = ref<Ingredients>({
  water: 518,
  vinegar: 50,
  salt: 5,
  sugar: 41
})

export type Purpose = 'sushi' | 'side' | 'porridge';
export type RiceType = 'round' | 'long' | 'parboiled';
export type Pot = 'pot' | 'multi' | 'pan';
type Ingredients = {
  water: number
  vinegar: number
  sugar: number
  salt: number
};
</script>
