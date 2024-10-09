<style scoped>
.header {
  margin-bottom: 1.5em;
}

.name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.photo {
  width: 32px;
  height: 32px;
}

.title {
  font-size: 32px;
  margin: 10px 0 18px;
  font-weight: normal;
}

.contacts {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: flex;
  gap: 12px 24px;
  flex-wrap: wrap;
}

@media screen and (min-width: 667px) {
  .header {
    margin-bottom: 1.666666em;
  }

  .photo {
    width: 40px;
    height: 40px;
  }

  .title {
    font-size: 48px;
    margin: 2px 0 20px;
  }

  .contacts {
    gap: 0;
  }

  .contacts a {
    padding: 0.8em;
    margin-left: -0.8em;
  }
}
</style>

<script setup lang="ts">
const route = useRoute()
const props = defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <header class="header">
    <div v-if="route.path === '/'" class="name">
      <NuxtImg class="photo" src="/img/stas.png" alt="Фото Стасяна" width="80" height="80" />
      <span>Станислав Козин</span>
    </div>
    <NuxtLink v-else class="name" to="/">
      <NuxtImg class="photo" src="/img/stas.png" alt="Фото Стасяна" width="80" height="80" />
      <span>Станислав Козин</span>
    </NuxtLink>

    <h1 class="title">
      {{ props.title }}
    </h1>

    <ul class="contacts">
      <li v-if="props.subtitle">{{ props.subtitle }}</li>
      <template v-else>
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
      </template>
    </ul>
  </header>
</template>
