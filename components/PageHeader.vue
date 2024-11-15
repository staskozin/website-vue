<template>
  <header class="header">
    <div
      v-if="route.path === '/'"
      class="name"
    >
      <NuxtImg
        class="photo"
        src="/img/stas.png"
        alt="Фото Стасяна"
        width="80"
        height="80"
      />
      <span>Станислав Козин</span>
    </div>
    <NuxtLink
      v-else
      class="name"
      to="/"
    >
      <NuxtImg
        class="photo"
        src="/img/stas.png"
        alt="Фото Стасяна"
        width="80"
        height="80"
      />
      <span>Станислав Козин</span>
    </NuxtLink>

    <h1 class="title">
      {{ props.title }}
    </h1>

    <p v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</p>
    <MyContacts v-else />
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const props = defineProps<{
  title: string
  subtitle?: string
}>()
</script>

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

.subtitle {
  margin: 0;
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
}
</style>
