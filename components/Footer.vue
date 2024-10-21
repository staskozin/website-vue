<template>
  <footer class="footer">
    <span>Станислав Козин, 2016–н.в.</span>
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
  </footer>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped>
.footer {
  margin: 4.5em 0 2em;
  font-size: 0.75em;
}

.footer>span {
  margin-bottom: 0.5em;
  display: block;
}

.contacts {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 1em;
}
</style>
