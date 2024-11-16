<template>
  <div class="recipe">
    <div>
      <ImageResponsive>
        <NuxtImg
          src="/img/rice-calculator/pot-sushi-1.jpg"
          alt=""
        />
      </ImageResponsive>
      <span>1. Промыть рис, пока вода не&nbsp;станет прозрачной.</span>
    </div>

    <div>
      <ImageResponsive>
        <NuxtImg
          src="/img/rice-calculator/pot-sushi-2.jpg"
          alt=""
        />
      </ImageResponsive>
      <span>2. Добавить {{ props.water }}&nbsp;{{ declension('грамм', 'грамм', 'грамма', props.water) }} воды
        и&nbsp;довести до&nbsp;кипения.</span>
    </div>

    <div>
      <ImageResponsive>
        <NuxtImg
          src="/img/rice-calculator/pot-sushi-3.jpg"
          alt=""
        />
      </ImageResponsive>
      <span>3. Накрыть крышкой, включить минимальный огонь и&nbsp;подождать 15&nbsp;минут.</span>
    </div>

    <div>
      <ImageResponsive>
        <NuxtImg
          src="/img/rice-calculator/pot-sushi-4.jpg"
          alt=""
        />
      </ImageResponsive>
      <span>4. Выключить огонь и&nbsp;подождать ещё&nbsp;15&nbsp;минут.</span>
    </div>

    <div>
      <ImageResponsive>
        <NuxtImg
          src="/img/rice-calculator/pot-sushi-5.jpg"
          alt=""
        />
      </ImageResponsive>
      <span>5. {{ props.purpose !== 'sushi' ? 'Перемешать рис.' : 'Добавить заправку и&nbsp;перемешать.' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Purpose } from '../pages/rice-calculator.vue'

const props = defineProps<RiceRecipeProps>()

function declension(oneNominative: string, severalGenitive: string, severalNominative: string, number: number): string {
  number = number % 100;
  if (number <= 14 && number >= 11)
    return severalGenitive
  if ((number %= 10) < 5) {
    if (number > 2)
      return severalNominative
    if (number === 1)
      return oneNominative
    if (number === 0)
      return severalGenitive
    return severalNominative
  }
  else
    return severalGenitive
}

type RiceRecipeProps = {
  water: number
  purpose: Purpose
}
</script>

<style>
.recipe {
  font-size: 18px;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);
  line-height: 1.25;
}

.recipe img {
  border-radius: 6px;
  width: 100%;
}

@media screen and (max-width: 1023px) {
  .recipe {
    grid-template-columns: 1fr;
  }
}
</style>
