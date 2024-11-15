<template>
  <PageHeader
    title="Как варить рис"
    subtitle="Интерактивный рецепт"
  />
  <div class="container">
    <form сlass="form">
      <div class="wrap">
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
          class="rice-input"
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
        <RiceIngredients
          :purpose="purpose"
          :rice="rice"
          :water="water"
          :vinegar="vinegar"
          :sugar="sugar"
          :salt="salt"
        />
      </div>
    </form>
  </div>
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
const purpose = ref<Purpose>('sushi')
const riceType = ref<RiceType>('round')
const pot = ref<Pot>('pot')

watch(purpose, (newPurpose) => {
  if (newPurpose === 'porridge' || newPurpose === 'sushi') {
    riceType.value = 'round'
    if (pot.value === 'pan') {
      pot.value = 'pot'
    }
    riceTypeOptions.long.disabled = true
    riceTypeOptions.parboiled.disabled = true
  } else if (newPurpose === 'side') {
    riceTypeOptions.long.disabled = false
    riceTypeOptions.parboiled.disabled = false
  }
})

const ratio = computed<number>(() => {
  switch (riceType.value) {
    case 'round':
      return 1.15
    case 'long':
      return 1.25
    case 'parboiled':
      return 1.3
  }
})

const water = computed<number>(() => Math.round(rice.value * ratio.value))

const proportion = computed<number>(() => Math.abs(rice.value / 500))
const sugar = computed<number>(() => Math.round(45 * proportion.value))
const salt = computed<number>(() => Math.round(5 * proportion.value))
const vinegar = computed<number>(() => Math.round(55 * proportion.value))

const riceTypeOptions = reactive<Record<RiceType, { name: string, disabled: boolean }>>({
  'round': {
    name: 'Круглый',
    disabled: false
  },
  'long': {
    name: 'Длинный',
    disabled: true
  },
  'parboiled': {
    name: 'Пропаренный',
    disabled: true
  }
})

const purposeOptions = reactive<Record<Purpose, { name: string, disabled: boolean }>>({
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
})

const potOptions = reactive<Record<Pot, { name: string, disabled: boolean }>>({
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
})

export type Purpose = 'sushi' | 'side' | 'porridge';
export type RiceType = 'round' | 'long' | 'parboiled';
export type Pot = 'pot' | 'multi' | 'pan';
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 0.75fr 2fr;
  gap: 31px 24px;
}

.container form {
  font-size: 18px;
}

.wrap {
  position: sticky;
  top: 6px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rice-input {
  margin-bottom: -0.5em;
}

@media screen and (max-width: 1023px) {
  .container {
    grid-template-columns: 0.66fr 1fr;
  }
}

@media screen and (max-width: 676px) {
  .container {
    grid-template-columns: 1fr;
  }

  .container form {
    order: -1;
  }
}
</style>
