<template>
  <div class="input-wrap">
    <span v-if="props.textBefore">{{ props.textBefore }}</span>
    <input
      v-model.number="model"
      class="input"
      @keypress="filterKeys"
      @paste="parsePastedText"
      @input="clampValue"
      @keydown="blur"
      @blur="setDefaultValue"
      inputMode="numeric"
    />
    <span v-if="props.textAfter">{{ props.textAfter }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<BaseInputProps>()
const model = defineModel<number>()

function filterKeys(e: KeyboardEvent) {
  const allowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  if (!allowed.includes(e.key))
    e.preventDefault()
}

function parsePastedText(e: ClipboardEvent) {
  const text = e.clipboardData?.getData('text')
  if (!text) return

  e.preventDefault()

  const parsed = Math.abs(Number.parseInt(text))
  if (Number.isNaN(parsed)) return

  const input = (e.target as HTMLInputElement)
  const cursorPosition: number = input.selectionStart!
  if (cursorPosition === 0 && parsed === 0) return

  const parsedText = parsed.toString()
  const newCursorPosition = cursorPosition + parsedText.length
  const result = Number(input.value.slice(0, cursorPosition) + parsedText + input.value.slice(cursorPosition))

  if (result > props.maxValue) {
    model.value = props.maxValue
  } else {
    model.value = result
    setTimeout(() => { input.setSelectionRange(newCursorPosition, newCursorPosition) }, 0) // Иначе не обновляется позиция курсора
  }
}

function clampValue(e: Event) {
  const input = e.target as HTMLInputElement
  if (Number(input.value) > props.maxValue) {
    model.value = props.maxValue
    input.value = props.maxValue.toString()
  } else if (input.value.startsWith('0')) {
    model.value = +input.value
    input.value = (+input.value).toString()
    input.setSelectionRange(0, 0)
  }
}

function blur(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === 'Escape')
    (e.target as HTMLInputElement).blur()
}

function setDefaultValue(e: FocusEvent) {
  if (!model.value || +(e.target as HTMLInputElement).value === 0)
    model.value = props.defaultValue
}

type BaseInputProps = {
  defaultValue: number
  maxValue: number
  textBefore?: string
  textAfter?: string
};
</script>

<style scoped>
.input-wrap {
  display: flex;
  align-items: baseline;
  gap: 0.333333em;
}

.input-wrap>span:first-child {
  font-weight: bold;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input {
  -moz-appearance: textfield;
  appearance: textfield;
  font-family: 'YsabeauOffice';
  font-size: inherit;
  text-align: right;
  border: 2px solid #89a8b8;
  border-radius: 6px;
  padding: 0.333333em 0.5em 0.444444em;
  width: 7ch;
  -webkit-transition-property: border-color;
  transition-property: border-color;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  -webkit-transition-duration: .22s;
  transition-duration: .22s;
}

@media (hover: hover) {
  .input:hover {
    border-color: hsl(200, 25%, 78%);
    -webkit-transition: none;
    transition: none;
  }
}
</style>
