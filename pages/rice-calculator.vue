<template>
  <PageHeader
    title="Как варить рис"
    subtitle="Интерактивный рецепт"
  />
</template>

<script setup lang="ts">
const store = useRiceStore()

useHead({
  title: 'Как варить рис. Интерактивный рецепт',
  meta: [
    {
      name: 'description',
      content: 'Интерактивный рецепт риса: для суши, гарнир и каша'
    }
  ]
})
</script>
