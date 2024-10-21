<template>
  <div class="wrap">
    <slot>
      Добавьте картинку
    </slot>
  </div>
</template>

<style scoped>
.wrap {
  width: 100%;
  position: relative !important;
}

.wrap img {
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
}
</style>
