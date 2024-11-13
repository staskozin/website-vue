<template>
  <PageHeader
    title="Как варить рис"
    subtitle="Интерактивный рецепт"
  />

  <BaseSwitcher
    text="Для чего"
    v-model="purpose"
    :options="purposeOptions"
  />

  <InputIntPositive
    v-model="rice"
    :defaultValue="450"
    :maxValue="2000000"
    textBefore="Кол-во риса"
    textAfter="г"
  />

  <BaseSwitcher
    text="Вид риса"
    v-model="riceType"
    :options="riceTypeOptions"
  />

  <BaseSwitcher
    text="Посуда"
    v-model="pot"
    :options="potOptions"
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

const riceTypeOptions: Record<RiceType, { name: string, disabled: boolean }> = {
  'round': {
    name: 'Круглый',
    disabled: false
  },
  'long': {
    name: 'Длинный',
    disabled: false
  },
  'parboiled': {
    name: 'Пропаренный',
    disabled: false
  }
}

const purposeOptions: Record<Purpose, { name: string, disabled: boolean }> = {
  'sushi': {
    name: 'Суши',
    disabled: false
  },
  'side': {
    name: 'Гарнир',
    disabled: false
  },
  'porridge': {
    name: 'Каша',
    disabled: true
  }
}

const potOptions: Record<Pot, { name: string, disabled: boolean }> = {
  'pot': {
    name: 'Кастрюля',
    disabled: false
  },
  'multi': {
    name: 'Мультиварка',
    disabled: true
  },
  'pan': {
    name: 'Сковорода',
    disabled: true
  }
}

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
