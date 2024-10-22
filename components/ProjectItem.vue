<template>
  <a class="project" :href="props.href">
    <ImageResponsive>
      <slot />
    </ImageResponsive>
    <span class="text">{{ props.text }}</span>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string
  text: string
}>()
</script>

<style scoped>
.project {
  display: block;
  width: 100%;
}

.project>div {
  margin-bottom: 4px;
}

.text {
  line-height: 1.25;
}
</style>
