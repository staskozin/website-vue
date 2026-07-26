<template>
  <ul class="links">
    <li v-for="link in visibleLinks" :key="link.id">
      <NuxtLink v-if="link.internal" :to="link.url">
        {{ link.label }}
      </NuxtLink>
      <a v-else :href="link.url">
        {{ link.label }}
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { SiteLink } from '../shared/site-links'

const props = defineProps<{
  items: readonly SiteLink[]
}>()

const route = useRoute()
const visibleLinks = computed(() => props.items.filter(
  link => !link.hiddenOnPaths?.includes(route.path),
))
</script>

<style scoped>
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 1em;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

@media screen and (min-width: 667px) {
  .links {
    gap: 0;
    margin-left: -0.6rem;
  }

  .links a {
    padding: 0.3em 0.6rem;
  }
}
</style>
