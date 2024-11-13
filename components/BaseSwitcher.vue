<template>
  <div class="switcher">
    <span>{{ props.text }}</span>
    <div class="buttons">
      <label
        v-for="(option, key) in props.options"
        :key="option.name"
        class="button"
      >
        <input
          type="radio"
          v-model="model"
          :value="key"
          :disabled="option.disabled"
        >
        <span>{{ option.name }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends string">
const props = defineProps<SwitcherProps>()

const model = defineModel<T>()

type SwitcherProps = {
  text: string
  options: Record<T, optionState>
};

type optionState = {
  name: string
  disabled: boolean
};
</script>

<style scoped>
.switcher {
  font-size: inherit;
  line-height: 1.333333em;
}

.switcher>span {
  display: block;
  margin-bottom: 0.444444em;
  font-weight: bold;
}

.buttons {
  display: flex;
  column-gap: 4px;
  row-gap: 5px;
  flex-wrap: wrap;
}

.button {
  user-select: none;
}

.button input {
  opacity: 0;
  position: absolute;
}

.button span {
  position: relative;
  cursor: pointer;
  display: block;
  padding: calc(0.277777em - 2px) calc(0.5em - 2px) calc(0.5em - 2px);
  border: 2px solid #89a8b8;
  border-radius: 6px;
}

.button input:checked+span {
  background-color: #135d86;
  border-color: #135d86;
  color: #ffffff;
}

.button input:disabled+span {
  color: #bbbbbb;
  background-color: #fbfbfb;
  border-color: #dddddd;
}

.button input:focus-visible+span {
  outline-width: 2px;
  outline-style: solid;
  outline-color: #1f73e3;
}

@media (hover: hover) {
  .button span {
    -webkit-transition-property: background-color, border-color, color;
    transition-property: background-color, border-color, color;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
    -webkit-transition-duration: .22s;
    transition-duration: .22s;
  }

  .button span:hover {
    background-color: #ecf1f4;
    -webkit-transition: none;
    transition: none;
  }

  .button input:disabled+span:hover {
    cursor: not-allowed;
  }
}
</style>
