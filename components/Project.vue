<style scoped>
.project {
  display: block;
  margin-bottom: var(--masonry-gap);
  width: 100%;
}

.project>div {
  margin-bottom: 4px;
}

.text {
  line-height: 1.25;
}
</style>

<script setup lang="ts">
const props = defineProps<{
  href: string
  text: string
}>()
</script>

<template>
  <a class="project" :href="props.href">
    <ResponsiveImage>
      <slot />
    </ResponsiveImage>
    <span className={s.text}>{{ props.text }}</span>
  </a>
</template>
