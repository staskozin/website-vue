<template>
  <div class="ingredients">
    <div class="head">
      <span>Ингредиенты</span>
      <button
        type="button"
        @click="copyIngredients"
      ></button>
      <div class="copied">
        <span ref="copyNotificationRef">Скопировано</span>
      </div>
    </div>
    <ul ref="ingredientsRef">
      <li>Рис — {{ props.rice }} г</li>
      <li>Вода — {{ props.water }} г</li>
      <template v-if="props.purpose === 'sushi'">
        <li>Для заправки:</li>
        <li>Уксус 3% — {{ props.vinegar }} мл</li>
        <li>Сахар — {{ props.sugar }} г</li>
        <li>Соль — {{ props.salt }} г</li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Purpose } from '../pages/rice-calculator.vue';

const props = defineProps<IngredientsProps>()

const copyNotificationRef = useTemplateRef<HTMLSpanElement>('copyNotificationRef')
const ingredientsRef = useTemplateRef<HTMLUListElement>('ingredientsRef')

function copyIngredients() {
  navigator.clipboard.writeText(ingredientsRef.value!.innerText)
  copyNotificationRef.value!.classList.remove('play')
  copyNotificationRef.value!.offsetWidth
  copyNotificationRef.value!.classList.add('play')
}

type IngredientsProps = {
  purpose: Purpose
  rice: number
  water: number
  vinegar: number
  sugar: number
  salt: number
};
</script>

<style scoped>
.ingredients {
  line-height: 1.333333em;
}

.head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  margin-bottom: 8px;
}

.head button {
  width: 18px;
  height: 18px;
  padding: 0;
  background-image: url(/img/ui/copy.svg);
  background-color: rgba(0, 0, 0, 0);
  border: none;
  margin-top: 2px;
  cursor: pointer;
}

.copied {
  position: relative;
}

.copied span:last-child {
  position: absolute;
  font-size: 0.8em;
  font-weight: normal;
  background-color: rgb(0 0 0 / 80%);
  color: white;
  border-radius: 4px;
  padding: 0 8px 4px;
  top: -13px;
  opacity: 0;
}

.play {
  animation: 2s popup;
}

@keyframes popup {
  from {
    opacity: 0;
  }

  6% {
    opacity: 1;
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.ingredients ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.ingredients ul>li {
  margin-bottom: 8px;
}
</style>
