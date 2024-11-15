<template>
  <div class="main-container">
    <slot />
    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import '~/assets/globals.css'

useHead({
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico',
      sizes: '32x32'
    },
    {
      rel: 'icon',
      href: '/icon.png',
      sizes: '192x192'
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png'
    }
  ]
})
</script>
