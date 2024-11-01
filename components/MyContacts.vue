<template>
  <ul class="contacts">
    <li v-if="!route.fullPath.includes('/cv')">
      <NuxtLink to="/cv">Резюме</NuxtLink>
    </li>
    <li>
      <a href="https://github.com/staskozin">Гитхаб</a>
    </li>
    <li>
      <a href="https://t.me/staskozin">Телеграм</a>
    </li>
    <li>
      <a href="mailto:stas@staskozin.ru">stas@staskozin.ru</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style>
.contacts {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 1em;
}

@media screen and (min-width: 667px) {
  .contacts {
    gap: 0;
    margin-left: -0.6rem;
  }

  .contacts a {
    padding: 0.3em 0.6rem;
  }
}
</style>
